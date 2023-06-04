<template>
    <v-container>
        <div class="text-begin pa-2 mb-2">افزودن محصول جدید</div>

        <v-row justify="center">
            <v-col order="12" cols="12" xs="12" sm="11" md="10" lg="9">
                <v-card outlined class="my-2 pa-2">
                    <v-card-title>عکس محصول</v-card-title>

                    <v-row justify="center" class="pa-2">
                        <ImageUploaderComponent
                            v-for="img in imageBoxs"
                            :key="img"
                            :boxLength="imageBoxs.length"
                            v-on:image-inputs="imageInput"
                            v-on:remove-image-input="removeImageInput"
                            v-on:delete-image-box="
                                (val) =>
                                    (imageBoxs = imageBoxs.filter(
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
                                        imageBoxs.push(
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
                <v-card class="pa-2 px-md-2 px-sm-2" outlined>
                    <v-form>
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
                            <v-col cols="12" sm="6" xs="8">
                                <v-text-field
                                    v-model="title"
                                    label="نام محصول"
                                    :rules="[rules.required]"
                                    outlined
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" xs="8">
                                <v-text-field
                                    outlined
                                    ref="deadline_date"
                                    v-model="deadline_date"
                                    :rules="[rules.required]"
                                    label="مهلت فروش"
                                    placeholder="انتخاب تاریخ اتمام مهلت فروش"
                                    id="my-custom-input"
                                    required
                                ></v-text-field>
                                <VuePersianDatetimePicker
                                    v-model="deadline_date"
                                    format="jYYYY-jMM-jDD"
                                    element="my-custom-input"
                                />
                            </v-col>

                            <v-col cols="12">
                                <v-textarea
                                    filled
                                    rows="3"
                                    counter="300"
                                    v-model="description"
                                    label="توضیحات"
                                    :rules="[rules.required]"
                                    required
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
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
                    v-if="alert_msg"
                    :alertMsg="alert_msg"
                    :alertType="alert_type"
                >
                </AlertComponent>
                <v-btn
                    block
                    depressed
                    :loading="loading"
                    :disabled="loading"
                    @click="addProduct"
                    color="primary"
                >
                    افزودن
                </v-btn>
            </v-col>
        </v-row>
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
        category: {},
        categories: [],
        title: "",
        deadline_date: "",
        description: "",
        language: "fa-IR",
        images: [],
        imageBoxs: [],
        loading: false,
        alert_msg: "",
        alert_type: "",
        rules: {
            required: (value) => !!value || "فیلد ضروری!",
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
        VuePersianDatetimePicker: () => import("vue-persian-datetime-picker"),
        AlertComponent: () =>
            import("@/components/sdComponents/AlertComponent"),
        CategorySelectComponent: () =>
            import("@/components/commonComponents/CategorySelectComponent.vue"),
    },
    methods: {
        async fetchData() {
            try {
                const result = await api.main.categoryFindAll();
                const scategories = result.data.data.categoryFindAll;
                this.categories = scategories;
            } catch (error) {
                console.log(error);
            }
        },
        imageInput(filename) {
            this.images.push(filename);
        },
        removeImageInput(filename) {
            this.images.filter((e) => {
                e != filename;
            });
        },
        onSelectCategory(item) {
            this.category = item;
        },
        async addProduct() {
            this.loading = true;
            this.alert_msg = "";
            if (!this.price) this.price = this.realprice;
            try {
                const result = await api.product.productCreate({
                    title: this.title,
                    deadline_date: this.deadline_date,
                    thumbnail: this.images[0],
                    description: this.description,
                    language: this.language,
                    categoryId: this.category.id,
                    images: this.images.toString(),
                });
                if (result.data.data.productCreate.id) {
                    this.alert_type = "success";
                    this.alert_msg = "محصول جدید با موفقیت اضافه شد.";
                }
            } catch (error) {
                console.log(error);
                this.alert_msg = "لطفا همه موارد را به درستی کامل کنید";
                this.alert_type = "error";
            }
            this.loading = false;
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<style scoped></style>
