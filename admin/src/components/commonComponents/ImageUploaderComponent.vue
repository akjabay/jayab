<template>
    <div>
        <v-card
            flat
            style="width: 100px"
            class="pointer is-image-box ma-1 px-2 d-flex align-center"
            :class="image ? 'py-1': 'py-8'"
        >
            <span
                class="delete-badge"
                @click="deleteUploadBox"
                v-if="imageIdx != 1"
            >
                <v-icon class="red--text" color="error"
                    >mdi-minus-circle</v-icon
                >
            </span>

            <v-img
                v-if="image"
                width="90"
                height="80"
                :src="
                    image.slice(0, 5) == 'image'
                        ? $store.state.auth.baseURL + '/public/w90/' + image
                        : image
                "
            >
                <v-btn icon @click="deleteImage">
                    <v-icon class="red--text">mdi-delete</v-icon>
                </v-btn>
            </v-img>

            <div
                v-else
                class="primary--text text-center centering"
                @click="chooseImage"
            >
                <span class="text-center">
                    <v-icon class="" color="primary">mdi-image</v-icon><br />
                    <span v-if="boxLength == 1" class="text-caption"
                        >افزودن عکس</span
                    >
                </span>
            </div>

            <input
                hidden
                ref="fileInput"
                accept="image/*"
                type="file"
                @input="onSelectImage"
            />
        </v-card>
    </div>
</template>

<script>
import api from "@/api/index.js";

export default {
    name: "ImageInputComponent",

    props: {
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
    data: () => ({
        image: null,
        fileNewName: null,
    }),
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
};
</script>

<style scoped>
/* .is-image-box {
  border-width: 2px;
  border-style: dashed;
  border-color: #fb9517;
} */
.is-image-box {
    border: dashed 3px hsla(0, 95%, 35%, 1);
}
.centering {
    margin-left: auto;
    margin-right: auto;
}

.delete-badge {
    position: absolute;
    margin-top: -100%;
    margin-right: -1.4rem;
    z-index: 2;
}
</style>
