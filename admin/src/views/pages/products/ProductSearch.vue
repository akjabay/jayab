<template>
  <v-container fluid class="down-top-padding">
    <v-row justify="center">
      <v-col cols="12" lg="10">
        <BaseCard heading="جستجو کاربران">
          <v-row justify="center">
            <v-col cols="12" class="text-center">
                <v-form>
                    <v-container>
                        <v-row justify="center">
                            <v-col cols="12" md="6" sm="6" xs="12">
                            <v-text-field
                                v-model="searchText"
                                append-outer-icon="mdi-magnify"
                                prepend-icon="mdi-account"
                                outlined
                                clear-icon="mdi-close-circle"
                                clearable
                                label="جستجو"
                                type="text"
                                @click:append-outer="searchProducts(0)"
                            ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="12" md="8" sm="8" xs="12">
                                <ProductsTbl
                                    v-if="searchResult && searchResult[0]"
                                    v-bind:products="searchResult"
                                    v-bind:pagination="searchPagination"
                                    v-on:fetch-products="searchProducts"
                                    v-on:view-product="viewProduct"
                                >
                                </ProductsTbl>
                            </v-col>
                            <v-col cols="12" class="text-center" v-if="resultText">
                                <span class="text-small">نتیجه ای یافت نشد!</span>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-col>
          </v-row>
        </BaseCard>
      </v-col>
    </v-row>

    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            جزئیات محصول
          </v-card-title>

          <v-card-text class="py-4">
            شناسه: {{ showingProduct.id }}<br />
            نام کاربری: {{ showingProduct.username }}<br />
          </v-card-text>
          <v-card-text
            class="py-4"
          >
            <div>
              دسترسی ها: 
            </div>
            <div v-if="showingProduct.permissions && showingProduct.permissions[0]">
              <span v-for="(pm, i) in showingProduct.permissions" :key="i">
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                >
                  {{ pm.persian_codename }}
                </v-chip>
              </span>
            </div>
            <div v-else>
              -دسترسی افزوده نشده-
            </div>
          </v-card-text>
          <v-card-text class="pb-4">
            <div>
              <span>وضعیت: </span>
              <span v-show="showingProduct.status_auth === 'active'">فعال</span>
              <span v-show="showingProduct.status_auth === 'inactive'">فعال نشده</span>
              <span v-show="showingProduct.status_auth === 'ban'">مسدود شده</span>
            </div>
            <div>
              تاریخ عضویت: {{ Math.ceil(Number(showingProduct.createdAt ) / 1000) | moment("jYYYY-jMM-jDD HH:MM") }}
            </div><br />
          </v-card-text>
          
          <hr class="style-one">
          
          <v-card-actions>
                <v-btn
                  text
                  color="error"
                  @click="deletedialog = !deletedialog"
                >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="black"
                    :disabled="showingProduct.status_auth === 'inactive'"
                    @click="toggleUserStatus()"
                >
                  <span v-if="showingProduct.status_auth !== 'ban'">
                    مسدود کردن
                    <v-icon>mdi-do-not-disturb</v-icon>
                  </span>
                  <span v-else>
                    آزاد کردن
                    <v-icon>mdi-check-circle</v-icon>
                  </span>
                </v-btn>
                <v-btn
                    text
                    color="success"
                    :to="'/views/users/edit/' + showingProduct.id"
                >
                  ویرایش
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div class="text-center">
      <v-dialog
        v-model="deletedialog"
        width="290"
      >
        <v-card>
          <v-card-title class="headline">
            حذف کاربر
          </v-card-title>
          <v-card-text>
            <div class="text-large">
              آیا مایل به حذف کاربر زیر هستید؟
            </div>
            <div class="mt-2">
              <span>
                نام کاربر: 
              </span>
              <span class="px-1">
                {{ this.showingProduct.username }}
              </span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="deletedialog = false"
            >
              برگشت
            </v-btn>
            <v-btn
              color="error"
              text
              @click="onDeleteUser"
            >
              حذف
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-snackbar
      v-model="snackbar"
    >
      {{ snackbar_text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          بستن
        </v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script>
import api from "@/api/index.js";

export default {
  name: "ProfileSearch",

  data: () => ({
    dialog: false,
    deletedialog: false,
    showingProduct: {},
    searchResult: [],
    searchText: "",
    resultText: "",
    snackbar: false,
    snackbar_text: "",
    searchPagination: {
      limit: 0,
      offset: 0,
      total: 0,
    },
  }),
  components: {
    ProductsTbl: () => import("@/components/sdComponents/ProductsTbl"),
  },
  methods: {
    async toggleUserStatus () {
      const status_auth = this.showingProduct.status_auth === "ban" ?
        "active" : "ban";
        const result = await api.user.userUpdateStatus({
          id: this.showingProduct.id,
          status_auth: status_auth
        })
        if (result.data.errors) {
            console.log(result.data.errors[0]);
        } else if (result.data.data.userUpdate) {
            this.snackbar = true;
            this.snackbar_text = "تغییر وضعیت با موفقیت ثبت شد."
            this.fetchUsers();
        }
    },
    
    async onDeleteUser () {
        const result = await api.userDelete({
          id: this.showingProduct.id
        })
        if (result.data.errors) {
            console.log(result.data.errors[0]);
        } else if (result.data.data.userDelete) {
            this.snackbar = true;
            this.snackbar_text = "کاربر با موفقیت حذف شد."
            this.fetchUsers();
        }
    },

    async searchProducts (page) {
      const offset = !page ? 0 : (page - 1) * 10;
      const response = await api.user.userSearchAdmin({ searchText: this.searchText, offset, limit: 10 });
      if (response.data.errors) {
        console.log(response.data.errors[0]);
      } else if (response.data.data.userSearch.hits[0]) {
        this.searchResult = response.data.data.userSearch.hits;
        this.searchPagination = {
          limit: response.data.data.userSearch.pagination.limit,
          offset: response.data.data.userSearch.pagination.offset,
          total: response.data.data.userSearch.pagination.total,
        };
      } else {
        this.resultText = true
      }
    },
    viewProduct(id) {
      this.showingProduct = this.searchResult.filter((item) => item.id === id)[0];
      this.dialog = true;
    },
  },
};
</script>
