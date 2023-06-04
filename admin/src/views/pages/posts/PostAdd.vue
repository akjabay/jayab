<template>
    <v-container>
        <div class="text-begin text-h3 pa-2 mb-2">پست جدید</div>

        <v-row justify="center">
            <v-col order="12" cols="12" xs="12" sm="11" md="10" lg="9">
                <v-card class="pa-1" outlined>
                    <v-card-title> جزئیات </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="6" xs="8">
                                <CategorySelectComponent
                                    class="mt-2"
                                    v-on:on-select-category="onSelectCategory"
                                    :category="category"
                                ></CategorySelectComponent>
                            </v-col>
                            <v-col cols="12" sm="6" xs="8">
                                <v-select
                                    v-model="language"
                                    :items="['en-US', 'fa-IR']"
                                    label="زبان"
                                    outlined
                                    required
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-text-field
                            auto-grow
                            outlined
                            class="mt-2"
                            v-model="title"
                            label="عنوان"
                            :rules="[rules.required, rules.min]"
                            required
                        ></v-text-field>
                    </v-card-text>
                </v-card>

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
                                v-for="img in containers[index].imageBoxs"
                                :key="img"
                                :boxLength="containers[index].imageBoxs.length"
                                v-on:image-inputs="(v) => imageInput(v, index)"
                                v-on:remove-image-input="
                                    (v) => removeImageInput(v, index)
                                "
                                v-on:delete-image-box="
                                    (val) =>
                                        (containers[index].imageBoxs =
                                            containers[index].imageBoxs.filter(
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
                                            containers[index].imageBoxs.push(
                                                `${Math.floor(
                                                    Math.random() * 1000000
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
                            v-on:on-update="(v) => onUpdateContent(v, index)"
                        ></text-editor>
                    </v-card>
                </div>

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
            </v-col>

            <v-col
                order="12"
                cols="12"
                xs="12"
                sm="11"
                md="10"
                lg="9"
                class="text-center"
            >
                <AlertComponent
                    v-if="alertMsg"
                    :alertMsg="alertMsg"
                    :alertType="alertType"
                >
                </AlertComponent>

                <v-btn
                    block
                    depressed
                    :loading="loading"
                    :disabled="loading"
                    @click="addPost"
                    color="primary"
                >
                    تایید و ثبت پست
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
import { Sticky } from "@/middleware/sticky";

export default {
    directives: {
        Sticky,
    },
    data: () => ({
        title: "",
        language: "fa-IR",
        containers: [],
        category: {},
        plusButton: false,
        deleteDialog: false,
        deletingContainerIdx: -1,
        loading: false,
        alertMsg: "",
        alertType: "",
        rules: {
            required: (v) => !!v || "فیلد ضروری!",
            min: (v) => v.length >= 8 || "حداقل ۸ کاراکتر!",
            min4: (v) => v.length >= 4 || !isNaN(v) || "حداقل ۴ کاراکتر!",
            min11: (v) =>
                v.length == 11 || isNaN(v) || "شماره موبایل ۱۱ رقمی است!",
            emailMatch: (v) =>
                !v.includes("@") ||
                /\S+@\S+\.\S+/.test(v) ||
                "ایمیل را درست وارد کنید!",
        },
    }),
    components: {
        ImageUploaderComponent: () =>
            import("@/components/commonComponents/ImageUploaderComponent.vue"),
        AlertComponent: () =>
            import("@/components/sdComponents/AlertComponent"),
        CategorySelectComponent: () =>
            import("@/components/commonComponents/CategorySelectComponent.vue"),
        TextEditor: () =>
            import("@/components/commonComponents/TextEditor.vue"),
    },
    methods: {
        onAddToContainer(type) {
            this.containers.push({
                content: "",
                images: [],
                imageBoxs: [],
                type,
                idx: this.containers.length,
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
        onSelectCategory(item) {
            this.category = item;
        },
        onUpdateContent(content, i) {
            this.containers[i].content = content;
        },
        async addPost() {
            this.loading = true;
            this.alertMsg = "";
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
                        .map((c) =>
                            c.images.map((cm) => c.idx + "idx" + cm).join(",")
                        );
                    const result = await api.post.postCreate({
                        title: this.title,
                        language: this.language,
                        contents: contents.join(","),
                        thumbnail: thumbnail,
                        categoryId: this.category.id,
                        images: images.join(","),
                    });
                    if (result.data.data.errors) {
                        this.alertMsg = "خطا در اطلاعات ورودی";
                        this.alertType = "warning";
                    } else if (result.data.data.postCreate.id) {
                        this.alertType = "success";
                        this.alertMsg = "پست جدید با موفقیت اضافه شد.";
                    }
                } else {
                    this.alertMsg = "پست حاوی حداقل یک متن می باشد!";
                    this.alertType = "error";
                }
            } catch (error) {
                console.log(error);
                this.alertMsg = "لطفا همه موارد را به درستی کامل کنید";
                this.alertType = "error";
            }
            this.loading = false;
        },
    },
    mounted() {},
};
</script>

<style scoped></style>
