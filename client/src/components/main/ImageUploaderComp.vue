<template>
    <div class="text-right">
        <q-icon
            v-if="imageIdx != 1"
            @click="deleteUploadBox"
            class="text-pointer text-red"
            color="red"
            size="sm"
            name="mdi-minus-circle"
        ></q-icon>
        <q-card
            flat
            style="width: 100px; height: 100px; overflow: hidden;"
            class="pointer q-mx-xs q-mb-xs q-px-sm"
            :class="(image ? 'q-py-xs ': 'q-py-lg ') + (!image && circleBorder ? 'ad-profile-box' :'ad-image-box')"
        >

        <div
            v-if="image"
        >
            <q-img
                @click="deleteImage"
                width="90"
                height="80"
                :src="
                    image.slice(0, 5) === 'image'
                        ? $api.defaults.baseURL + '/public/wsm/' + image
                        : image
                "
            >
                <q-icon size="md" class="text-red" name="mdi-delete"></q-icon>
            </q-img>
        
        </div>

            <div
                v-else
                class="text-primary text-center centering"
                @click="chooseImage"
            >
                <span class="text-center">
                    <q-icon size="md" color="primary" name="mdi-image"></q-icon><br />
                    <span v-if="boxLength == 1" class="text-caption">{{ $t('addImage') }}</span>
                </span>
            </div>

            <input
                hidden
                ref="fileInput"
                accept="image/*"
                type="file"
                @input="onSelectImage"
            />
        </q-card>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import api from "/src/api/index.js";

export default defineComponent({
    name: "ImageUploaderComp",

    props: {
        circleBorder: {
            type: Boolean,
            default: false,
        },
        imageIdx: {
            type: String,
            default: "0",
        },
        boxLength: {
            type: Number,
            default: 0,
        },
        fetchedImage: {
            type: String || Number,
        },
    },
    components: {},
    setup () {
        return {
            image: ref(null),
            fileNewName: ref(null),
        }
    },
    methods: {
        chooseImage() {
            this.$refs.fileInput.click();
        },
        async onSelectImage() {
            const input = this.$refs.fileInput;
            const files = input.files;
            if (files && files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.image = e.target.result;
                };
                reader.readAsDataURL(files[0]);
                this.$emit("input", files[0]);
                const fd = new FormData();
                fd.append("image", files[0]);
                const result = await api.main.upload({ fd });
                if (result.data.success) {
                    const fileNames = result.data.files.map((f) => f.filename)
                    this.fileNewName = fileNames[0];
                    this.$emit("image-inputs", this.fileNewName);
                }
            }
        },
        async deleteImage() {
            if (this.fileNewName) {
                this.$emit("remove-image-input", this.fileNewName);
                await api.main.uploadDeleteFile({ filename: this.fileNewName });
                this.fileNewName = null;
                this.image = null;
                this.$refs.fileInput.value = null;
            }
        },

        async deleteUploadBox() {
            await this.deleteImage();
            this.$emit("delete-image-box", this.imageIdx);
        },
    },
    mounted () {
        if (this.fetchedImage && this.fetchedImage.slice(0, 5) == 'image') {
            this.image = this.fetchedImage;
            this.fileNewName = this.fetchedImage;
        }
    }
});
</script>

<style scoped>
/* .ad-image-box {
  border-width: 2px;
  border-style: dashed;
  border-color: #fb9517;
} */
.ad-profile-box {
    border-radius: 50%;
    border: solid 1px hsl(0, 0%, 63%);
}
.ad-image-box {
    border: dashed 3px hsla(0, 95%, 35%, 1);
}
.centering {
    margin-left: auto;
    margin-right: auto;
}

.delete-badge {
    position: absolute;
    margin-top: -45%;
    margin-right: -25%;
    z-index: 2;
}
</style>
