<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TableSimpleFixHeader -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <div class="mt-4">
            <v-simple-table fixed-header>
                <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-right">ردیف</th>
                        <th class="text-right">کاربر</th>
                        <th class="text-right">محصولات</th>
                        <th class="text-right">مبلغ</th>
                        <th class="text-right">زمان تحویل</th>
                        <th class="text-center">مشاهده</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in orders" :key="i">
                        <td>{{ (page - 1) * 10 + i+1 }}</td>
                        <td>
                          <UserSmallComponent :user="item.userId"></UserSmallComponent>
                        </td>
                        <td>
                          <v-card
                            flat
                            class="ma-1"
                            v-for="(product, j) in item.products" :key="j"
                          >
                            <v-card-text>
                              <v-row>
                                <v-col cols="2">
                                  <v-img
                                    width="60px"
                                    class="text-pointer"
                                    @click="$router.push('/p/' + product.product.pid)"
                                    :src="
                                      $store.state.auth.baseURL + '/public/w90/' + product.product.thumbnail
                                    "
                                  ></v-img>
                                </v-col>
                                <v-col class="text-right" cols="6">
                                  <div>
                                    {{ product.product.title }}
                                  </div>
                                  <div class="blue-grey darken-1 px-1 white--text rounded-circle d-inline-block">
                                    {{ product.quantity }}
                                  </div>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </td>
                        <td>
                          {{
                            item.order_amount.toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }}
                          تومان
                        </td>
                        <td
                          class="text-center"
                        >
                        <v-row justify="center">
                          <v-btn
                            @click="$emit('on-view', item)"
                            icon
                            color="primary lightn-1"
                          >
                            <v-icon>mdi-eye</v-icon>
                          </v-btn>
                        </v-row>
                        </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <div class="text-center pt-2">
                <v-pagination
                  v-model="page"
                  :length="length"
                  total-visible="5"
                  @input="$emit('fetch-orders', page)"
                ></v-pagination>
            </div>
        </div>

        <div>
          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                جزئیات سفارش
              </v-card-title>

              <v-card-text class="py-4">
                شناسه: {{ showingOrder.id }}<br />
                نام: {{ showingOrder.title }}<br />
              </v-card-text>
              <v-card-text class="pb-4">
                <div>
                  <span>وضعیت: </span>
                  <span v-show="!showingOrder.disabled">فعال</span>
                  <span v-show="showingOrder.disabled">غیرفعال</span>
                </div>
                <div>
                  تاریخ ایجاد: {{ Math.ceil(Number(showingOrder.createdAt ) / 1000) | moment("jYYYY-jMM-jDD HH:MM") }}
                </div><br />
              </v-card-text>
              
              <hr class="style-one">
              
              <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="black"
                        @click="changeProductVisibility()"
                    >
                      <span v-if="showingOrder.visibility">
                        غیرقابل مشاهده
                        <v-icon>mdi-do-not-disturb</v-icon>
                      </span>
                      <span v-else>
                        قابل مشاهده
                        <v-icon>mdi-check-circle</v-icon>
                      </span>
                    </v-btn>
                    <v-btn
                        text
                        color="success"
                        :to="'/views/orders/edit/' + showingOrder.id"
                    >
                      ویرایش
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
    </div>
</template>

<script>
export default {
  name: "OrdersTbl",

  props: {
    orders: Array,
    pagination: Object,
  },
  data: () => ({
    page: 1,
    dialog: false,
    showingOrder: []
  }),
  components: {
    UserSmallComponent: () => import("@/components/sdComponents/UserSmallComponent.vue"),
  },
  methods: {
    changeProductVisibility () {
      // on change product visibility
    }
  },
  computed: {
    length: function () {
      if (this.orders[0]) {
        return Math.ceil(parseInt(this.pagination.total)/parseInt(this.pagination.limit))
      } else {
        return 0
      }
    }
  }
};
</script>