<template>
    <v-container>
        <div class="text-begin text-h3 pa-2 mb-2">دسته بندی جدید</div>

        <v-row justify="center">
            <v-col order="12" cols="12" xs="12" sm="11" md="10" lg="9">

                <v-card>
          <v-card-text>
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >
              دسته بندی جدید
            </h3>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <div class="my-2">دسته بندی والد (غیر ضروری)</div>
            <CategorySelectComponent
                class=""
                v-on:on-select-category="(val) => selectCategory = val"
                :category="selectCategory"
            ></CategorySelectComponent>
          </v-card-text>
          <v-card-text>

            <v-text-field
              type="text"
              v-model="category.name"
              label="شناسه دسته بندی (انگلیسی)"
              :rules="[
                rules.required,
                rules.min4,
              ]"
              filled
              background-color="transparent"
            ></v-text-field>

            <v-text-field
              type="text"
              v-model="category.fa_name"
              label="نام فارسی"
              :rules="[
                rules.required,
                rules.min4,
              ]"
              filled
              background-color="transparent"
            ></v-text-field>

            <v-text-field
              type="text"
              v-model="category.en_name"
              label="نام انگلیسی"
              :rules="[
                rules.required,
                rules.min4,
              ]"
              filled
              background-color="transparent"
            ></v-text-field>

            <v-btn
              @click="addCategory"
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
        category: {
            name: "",
            fa_name: "",
            en_name: "",
        },
        selectCategory: {},
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
        CategorySelectComponent: () =>
            import("@/components/commonComponents/CategorySelectComponent.vue"),
    },
    methods: {
        async addCategory() {
            this.loading = true;
            this.alertMsg = "";
            try {
                if (this.category.name && this.category.fa_name && this.category.en_name) {
                    const result = await api.main.categoryCreate({
                        name: this.category.name,
                        fa_name: this.category.fa_name,
                        en_name: this.category.en_name,
                        parent_category: this.selectCategory && this.selectCategory.id ? this.selectCategory.parent_category : '',
                    });
                    if (result.data.data.errors) {
                        this.alertMsg = "خطا در اطلاعات ورودی";
                        this.alertType = "warning";
                    } else if (result.data.data.categoryCreate.id) {
                        this.$router.push("/views/categories/list");
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
