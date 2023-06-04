<template>
    <v-container fluid class="down-top-padding">
        <v-row justify="center">
            <v-col cols="12" lg="8" md="8" sm="8" xs="11">
                <v-card>
                    <v-card-text>
                        <h3
                            class="title blue-grey--text text--darken-2 font-weight-regular"
                        >
                            ویرایش پست
                        </h3>
                        <h6 class="font-weight-light">ویرایش مشخصات پست</h6>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div>
                            <span>شناسه پست: </span>
                            <span>{{ fetchedPost.id }}</span>
                        </div>
                        <div>
                            <span>عنوان پست: </span>
                            <span>{{ fetchedPost.title }}</span>
                        </div>
                        <v-row justify="center" class="mt-2">
                            <v-col cols="12" sm="10" xs="10">
                                <CategorySelectComponent
                                    v-on:on-select-category="onSelectCategory"
                                    :category="category"
                                ></CategorySelectComponent>
                            </v-col>
                            <v-col cols="12" sm="10" xs="10">
                                <v-text-field
                                    outlined
                                    ref="name"
                                    v-model="fetchedPost.title"
                                    :rules="[rules.required]"
                                    label="عنوان"
                                    placeholder="عنوان پست"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-text>
                        <div v-for="(_, index) in containers" :key="index">
                            <v-card
                                v-if="containers[index].type == 'image'"
                                outlined
                                class="pb-2 mt-1"
                            >
                                <v-card-title>
                                    تصویر
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        @click="onRemoveContainer(index)"
                                        outlined
                                        color="error"
                                    >
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-card-title>
                                <v-row justify="center" class="pa-2">
                                    <ImageUploaderComponent
                                        v-for="img in containers[index]
                                            .imageBoxs"
                                        :key="img"
                                        :fetchedImage="img"
                                        :boxLength="containers[index]
                                            .imageBoxs.length"
                                        v-on:image-inputs="
                                            (v) => imageInput(v, index)
                                        "
                                        v-on:remove-image-input="
                                            (v) => removeImageInput(v, index)
                                        "
                                        v-on:delete-image-box="
                                            (val) =>
                                                (containers[index].imageBoxs =
                                                    containers[
                                                        index
                                                    ].imageBoxs.filter(
                                                        (idx) => idx != val
                                                    ))
                                        "
                                        :imageIdx="img"
                                    >
                                    </ImageUploaderComponent>
                                    <v-card
                                        flat
                                        outlined
                                        style="width: 100px"
                                        class="ma-1 py-8 px-2 d-flex align-center"
                                    >
                                        <v-row justify="center">
                                            <v-btn
                                                icon
                                                class="text-center"
                                                @click="
                                                    containers[
                                                        index
                                                    ].imageBoxs.push(
                                                        `${Math.floor(
                                                            Math.random() *
                                                                1000000
                                                        )}`
                                                    )
                                                "
                                            >
                                                <v-icon>mdi-plus</v-icon>
                                            </v-btn>
                                        </v-row>
                                    </v-card>
                                </v-row>
                            </v-card>
                            <v-card
                                v-if="containers[index].type == 'content'"
                                outlined
                                class="pb-2 mt-1"
                            >
                                <v-card-title>
                                    متن
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        @click="onRemoveContainer(index)"
                                        outlined
                                        color="error"
                                    >
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-card-title>

                                <text-editor
                                    class="ma-1"
                                    :fetchedContent="containers[index].content"
                                    v-on:on-update="
                                        (v) => onUpdateContent(v, index)
                                    "
                                ></text-editor>
                            </v-card>
                        </div>
                    </v-card-text>
                </v-card>

                <div class="text-center">
                    <v-btn
                        v-model="plusButton"
                        color="blue darken-2"
                        fab
                        plain
                        @click="plusButton = !plusButton"
                    >
                        <v-icon v-if="plusButton"> mdi-chevron-up </v-icon>
                        <v-icon v-else> mdi-plus </v-icon>
                    </v-btn>
                    <v-expand-transition class="ma-2">
                        <div v-if="plusButton">
                            <v-btn
                                fab
                                dark
                                color="green"
                                class="mx-2"
                                @click="onAddToContainer('image')"
                            >
                                <v-icon>mdi-image</v-icon>
                            </v-btn>
                            <v-btn
                                fab
                                dark
                                color="indigo"
                                class="mx-2"
                                @click="onAddToContainer('content')"
                            >
                                <v-icon>mdi-text</v-icon>
                            </v-btn>
                        </div>
                    </v-expand-transition>
                </div>

                <AlertComponent
                    v-if="alert_msg"
                    :alertMsg="alert_msg"
                    :alertType="alert_type"
                >
                </AlertComponent>
                <v-btn
                    @click="editPost"
                    block
                    class="text-capitalize mt-5 element-0"
                    color="primary"
                >
                    ثبت ویرایش
                </v-btn>
            </v-col>
        </v-row>

        <v-dialog width="290" v-model="deleteDialog">
            <v-card>
                <v-card-title class="headline"> حذف محتوا </v-card-title>
                <v-card-text>
                    <div class="text-large">
                        آیا از حذف این محتوا مطمئن هستید؟
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="deleteDialog = false">
                        برگشت
                    </v-btn>
                    <v-btn color="error" text @click="onDeleteContainer">
                        حذف
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import api from "@/api/index.js";

export default {
    name: "PostEdit",

    data: () => ({
        fetchedPost: "",
        deleteDialog: false,
        plusButton: false,
        category: {},
        title: "",
        containers: "",
        loading: false,
        alert_msg: "",
        alert_type: "",
        rules: {
            required: (value) => !!value || "فیلد ضروری!",
            min: (v) => v.length >= 8 || "حداقل ۸ کاراکتر!",
            min4: (v) => v.length >= 4 || !isNaN(v) || "حداقل ۴ کاراکتر!",
            min11: (v) =>
                v.length == 11 || isNaN(v) || "شماره موبایل ۱۱ رقمی است!",
            max100: (v) =>
                v ? v.length == 11 || isNaN(v) || "حداکثر 100 کاراکتر" : "",
            emailMatch: (v) =>
                !v.includes("@") ||
                /\S+@\S+\.\S+/.test(v) ||
                "ایمیل را درست وارد کنید!",
        },
    }),
    components: {
        AlertComponent: () =>
            import("@/components/sdComponents/AlertComponent"),
        ImageUploaderComponent: () =>
            import("@/components/commonComponents/ImageUploaderComponent.vue"),
        CategorySelectComponent: () =>
            import("@/components/commonComponents/CategorySelectComponent.vue"),
        TextEditor: () =>
            import("@/components/commonComponents/TextEditor.vue"),
    },
    methods: {
        onSelectCategory(item) {
            this.category = item;
        },
        onAddToContainer(type) {
            this.containers.push({
                content: "",
                images: [],
                imageBoxs: [],
                type,
                idx: this.containers.length-1,
            });
            this.plusButton = !this.plusButton;
        },
        onRemoveContainer(index) {
            this.deleteDialog = true;
            this.deletingContainerIdx = index;
        },
        onDeleteContainer() {
            if (this.deletingContainerIdx > -1) {
                this.containers.splice(this.deletingContainerIdx, 1);
            }
            this.deleteDialog = false;
            this.deletingContainerIdx = -1;
        },
        imageInput(filename, i) {
            this.containers[i].images.push(filename);
        },
        removeImageInput(filename, i) {
            const index = this.containers[i].images.findIndex((e) => {
                return e != filename;
            });
            if (index > -1) {
                this.containers[i].images.splice(index, 1);
            }
        },
        onUpdateContent(content, i) {
            this.containers[i].content = content;
        },
        async editPost() {
            this.alert_msg = "";
            this.alert_type = null;
            const postId = this.fetchedPost.id;
            try {
                const contents = this.containers
                    .filter((c) => c.type == "content")
                    .map((c) => c.idx + "idx" + c.content);
                if (this.containers.length > 0 && contents.length > 0) {
                    const thumbnail = this.containers.filter(
                        (c) => c.type == "image"
                    )[0].images[0];
                    const images = this.containers
                        .filter((c) => c.type == "image")
                        .map((c) => c.images.map(cm => c.idx + "idx" + cm).join(','));
                    const result = await api.post.postUpdate({
                        id: postId,
                        title: this.fetchedPost.title,
                        thumbnail,
                        contents: contents.join(","),
                        categoryId: this.category.id,
                        images: images.join(","),
                    });
                    if (result.data.data.postUpdate.id) {
                        this.alert_type = "success";
                        this.alert_msg = "مشخصات پست با موفقیت ویرایش شد.";
                    } else {
                        this.alert_type = "error";
                        this.alert_msg = "اطلاعات وارد شده صحیح نیست.";
                    }
                } else {
                    this.alertMsg = "پست حاوی حداقل یک متن می باشد!";
                    this.alertType = "error";
                }
            } catch (error) {
                this.alert_type = "error";
                this.alert_msg = "اطلاعات وارد شده صحیح نیست.";
                console.error(error);
            }
        },

        fetchData: async function () {
            const postId = this.$route.params.postId;
            try {
                const result = await api.post.postFind({ id: postId });
                if (result.data.data.errors) {
                    this.alert_msg = result.data.data.errors[0].message;
                } else if (result.data.data.postFind) {
                    this.fetchedPost = result.data.data.postFind;
                    this.category = this.fetchedPost.categoryId;
                    const images = [];
                    this.fetchedPost.images.forEach((image) => {
                        if (image.url) {
                            const index = images.findIndex(
                                (im) => image.idx == im.idx
                            );
                            if (index > -1) {
                                images[index].images.push(image.url);
                                images[index].imageBoxs.push(image.url);
                            } else {
                                images.push({
                                    images: [image.url],
                                    imageBoxs: [image.url],
                                    idx: image.idx,
                                    type: "image",
                                });
                            }
                        }
                    });
                    const containers = [
                        ...images,
                        ...this.fetchedPost.contents.map((ic) => {
                            return {
                                content: ic.value,
                                idx: ic.idx,
                                type: "content",
                            };
                        }),
                    ].sort((a, b) => a.idx - b.idx);

                    this.containers = containers;
                    this.containers.forEach((c) => {
                        if (c.type == "content") {
                            this.onUpdateContent(c.content, c.idx);
                        }
                    });
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
    created() {
        this.fetchData();
    },
};
</script>
