<template>
  <v-container fluid class="down-top-padding">
    <v-row justify="center">
      <v-col cols="12" lg="8" md="8" sm="8" xs="11">
        <v-card>
          <v-card-text>
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >
              ویرایش محصول
            </h3>
            <h6 class="font-weight-light">
              ویرایش مشخصات محصول
            </h6>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <div>
              <span>شناسه محصولی: </span>
              <span>{{ fetchedProduct.id }}</span>
            </div>
            <div>
              <span>نام محصولی محصول: </span>
              <span>{{ fetchedProduct.title }}</span>
            </div>
          </v-card-text>
          <v-card-text>
            <v-row justify="center" class="pb-3">
              <ImageUploaderComponent
                v-for="img in imageBoxs"
                :key="img"
                :fetchedImage="img"
                v-on:image-inputs="imageInput"
                v-on:remove-image-input="removeImageInput"
                v-on:delete-image-box="(val) => imageBoxs = imageBoxs.filter((bx) => bx != val)"
                :imageIdx="img"
              >
              </ImageUploaderComponent>
              <v-card
                flat
                outlined
                style="width: 100px;"
                class="py-8 px-2 d-flex align-center"
              >
                <v-row justify="center">
                  <v-btn icon class="text-center" @click="imageBoxs.push(`${Math.floor(Math.random() * 1000000)}`)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-row>
              </v-card>
            </v-row>

            <v-row>
              <v-col cols="12">
                <CategorySelectComponent
                  v-on:on-select-category="onSelectCategory"
                  :category="category"
                ></CategorySelectComponent>
              </v-col>
              <v-col cols="12" sm="6" xs="8">
                <v-text-field
                  outlined
                  ref="name"
                  v-model="fetchedProduct.title"
                  :rules="[rules.required]"
                  label="نام"
                  placeholder="نام محصول"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" xs="8">
                <v-text-field
                  outlined
                  ref="deadline"
                  v-model="fetchedProduct.deadline_date"
                  :rules="[rules.required]"
                  label="مهلت فروش"
                  placeholder="انتخاب تاریخ اتمام مهلت فروش"
                  id="my-custom-input"
                  required
                ></v-text-field>
                <date-picker
                  v-model="fetchedProduct.deadline_date"
                  format="jYYYY-jMM-jDD"
                  element="my-custom-input"
                />
              </v-col>
            </v-row>
            <v-textarea
              filled
              ref="description"
              v-model="fetchedProduct.description"
              :rules="[rules.required, rules.max300]"
              label="توضیحات"
              placeholder="توضیحات محصول"
              counter="300"
              required
            ></v-textarea>
            <v-row>
                <v-spacer></v-spacer>
                <v-btn
                @click="editProduct"
                class="text-capitalize mt-5 element-0"
                color="primary"
                >
                ثبت ویرایش
                </v-btn>
            </v-row>
          </v-card-text>
        </v-card>

        <AlertComponent
          v-if="alert_msg"
          :alertMsg="alert_msg"
          :alertType="alert_type"
        >
        </AlertComponent>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/api/index.js";
import moment from "jalali-moment"

export default {
  name: "ProductEdit",

  data: () => ({
    fetchedProduct: "",
    category: {},
    categories: [],
    images: [],
    isNavSticky: true,
    imageBoxs: [],
    loading: false,
    alert_msg: '',
    alert_type: '',
    rules: {
      required: (value) => !!value || "فیلد ضروری!",
      min: (v) => v.length >= 8 || "حداقل ۸ کاراکتر!",
      min4: (v) => v.length >= 4 || !isNaN(v) || "حداقل ۴ کاراکتر!",
      min11: (v) => v.length == 11 || isNaN(v) || "شماره موبایل ۱۱ رقمی است!",
      max300: (v) => v ? v.length <= 300 || isNaN(v) || "حداکثر 300 کاراکتر": "",
      emailMatch: (v) =>
        !v.includes("@") ||
        /\S+@\S+\.\S+/.test(v) ||
        "ایمیل را درست وارد کنید!",
    },
  }),
  components: {
    AlertComponent: () => import("@/components/sdComponents/AlertComponent"),
    ImageUploaderComponent: () =>
      import("@/components/commonComponents/ImageUploaderComponent.vue"),
    DatePicker: () => import("vue-persian-datetime-picker"),
    CategorySelectComponent: () =>
      import("@/components/commonComponents/CategorySelectComponent.vue"),
  },
  methods: {
    onSelectCategory (item) {
      this.category = item;
    },
    imageInput(filename) {
      this.images.push(filename);
    },
    removeImageInput(filename) {
      this.images.filter((e) => {
        e != filename;
      });
    },
    async editProduct() {
      this.alert_msg = "";
      this.alert_type = null;
      const productId = this.fetchedProduct.id;
      try {
        const result = await api.product.productUpdate({
          id: productId,
          title: this.fetchedProduct.title,
          deadline_date: this.fetchedProduct.deadline_date,
          thumbnail: this.images[0],
          description: this.fetchedProduct.description,
          categoryId: this.category.id,
          images: this.images.toString(),
        })
        if (result.data.data.productUpdate.id) {
          this.alert_type = "success";
          this.alert_msg = "مشخصات محصول با موفقیت ویرایش شد.";
        } else {
          this.alert_type = "error";
          this.alert_msg = "اطلاعات وارد شده صحیح نیست.";
        }
      } catch (error) {
        this.alert_type = "error";
        this.alert_msg = "خطا در ارتباط با سرور!";
        console.error(error);
      }
    },

    fetchData: async function () {
      const productId = this.$route.params.productId;
        try {
          const result = await api.product.productFind({ id: productId });
          if (result.data.data.errors) {
            this.alert_msg = result.data.data.errors[0].message;
          } else if (result.data.data.productFind) {
            this.fetchedProduct = result.data.data.productFind;
            if (
                this.fetchedProduct.images &&
                this.fetchedProduct.images.length > 0
            ) {
                this.fetchedProduct.images.forEach((pi) => {
                    this.imageBoxs.push(pi.url);
                    this.images.push(pi.url);
                });
            }
            this.fetchedProduct.deadline_date = moment(
              new Date(+this.fetchedProduct.deadline_date),
              'YYYY-MM-DDTHH:mm:ss'
            ).format('jYYYY-jMM-jDD')
            this.category = this.fetchedProduct.categoryId;
          }
        } catch (error) {
          console.error(error);
        }
    }
  },
  created () {
      this.fetchData()
  },
}
</script>
