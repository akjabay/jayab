<template>
    <v-container>
        <div class="text-begin text-h3 pa-2 mb-2">اسلاید جدید</div>

        <v-row justify="center">
            <v-col order="12" cols="12" xs="12" sm="11" md="10" lg="9">
                <v-card>
                    <v-card-text>
                        <h3
                            class="title blue-grey--text text--darken-2 font-weight-regular"
                        >
                            افزودن اسلاید
                        </h3>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-text>
                        <ImageUploaderComponent
                            :boxLength="1"
                            v-on:image-inputs="(v) => (slide.imageUrl = v)"
                            v-on:remove-image-input="() => (slide.imageUrl = '')"
                            imageIdx="1"
                        >
                        </ImageUploaderComponent>

                        <v-text-field
                            type="text"
                            v-model="slide.title"
                            label="عنوان (اختیاری)"
                            filled
                            background-color="transparent"
                        ></v-text-field>

                        <v-text-field
                            type="text"
                            v-model="slide.description"
                            label="توضیحات (اختیاری)"
                            filled
                            background-color="transparent"
                        ></v-text-field>

                        <v-select
                          v-model="slide.language"
                          :items="['en-US', 'fa-IR']"
                          label="زبان"
                        ></v-select>

                        <v-btn
                            @click="addSlide"
                            class="text-capitalize mt-5 element-0"
                            color="primary"
                        >
                            تایید و افزودن
                        </v-btn>
                    </v-card-text>
                </v-card>

                <AlertComponent
                    v-if="alertMsg"
                    :alertMsg="alertMsg"
                    :alertType="alertType"
                >
                </AlertComponent>
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
        slide: {
            title: "",
            description: "",
            language: "fa-IR",
            imageUrl: "",
        },
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
        AlertComponent: () =>
            import("@/components/sdComponents/AlertComponent"),
        ImageUploaderComponent: () =>
            import("@/components/commonComponents/ImageUploaderComponent.vue"),
    },
    methods: {
        async addSlide() {
            this.loading = true;
            this.alertMsg = "";
            try {
                if (
                    this.slide.language &&
                    this.slide.imageUrl
                ) {
                    const result = await api.main.slideCreate({
                        title: this.slide.title,
                        description: this.slide.description,
                        language: this.slide.language,
                        imageUrl: this.slide.imageUrl,
                    });
                    if (result.data.data.errors) {
                        this.alertMsg = "خطا در اطلاعات ورودی";
                        this.alertType = "warning";
                    } else if (result.data.data.slideCreate.id) {
                        this.$router.push("/views/slides/list");
                    }
                } else {
                    this.alertMsg = "موارد ضروری را کامل کنید";
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
