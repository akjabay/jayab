<template>
  <v-container fluid class="down-top-padding">

    <div>
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        انتخاب محدوده زمانی
        <span>{{ labelRange }} ماه گذشته</span>
      </h3>
    </div>
    <v-row justify="center">
      <v-col cols="12" lg="8" md="10">
        <v-range-slider
          v-model="labelRange"
          :value="[0, 6]"
          max="24"
          min="0"
          step="3"
        >
          <template v-slot:thumb-label="props">
            {{ props.value }} ماه
          </template>
        </v-range-slider>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" lg="5" md="5">
        <BaseCard heading="دسته بندی محصولات">
          <ProductPieChart
            :randomId="1"
            :labelRange="labelRange"
          />
        </BaseCard>
      </v-col>
      <v-col cols="12" lg="5" md="5">
        <BaseCard heading="دسته بندی پست ها">
          <PostPieChart
            :randomId="2"
            :labelRange="labelRange"
          />
        </BaseCard>
      </v-col>
      <v-col cols="12" lg="5" md="5">
        <BaseCard heading="فراوانی محصولات">
          <ProductBarChart
            :randomId="3"
            :labelRange="labelRange"
          />
        </BaseCard>
      </v-col>
      <v-col cols="12" lg="5" md="5">
        <BaseCard heading="فراوانی پست ها">
          <PostBarChart
            :randomId="4"
            :labelRange="labelRange"
          />
        </BaseCard>
      </v-col>
    </v-row>

  </v-container>
</template>


<script>
import api from "@/api/index.js";

export default {
  name: "BasicDashboard",
  data: () => ({
    labelRange: [0, 3],
  }),
  components: {
    // OrdersChart: () => import('@/components/chartComponents/OrdersChart.vue'),
    ProductPieChart: () => import('@/components/chartComponents/ProductPieChart.vue'),
    PostPieChart: () => import('@/components/chartComponents/PostPieChart.vue'),
    ProductBarChart: () => import('@/components/chartComponents/ProductBarChart.vue'),
    PostBarChart: () => import('@/components/chartComponents/PostBarChart.vue'),
  },
  methods: {
    async fetchData() {
            try {
                const result = await api.auth.authFindMe();
                if (result.data.errors) {
                    console.log(result.data.errors);
                }
                if (result.data.data.authFindMe.id) {
                    const user = result.data.data.authFindMe;
                    this.$store.dispatch("auth/setUser", user);
                }
            } catch (error) {
                console.log(error);
            }
        },
  },
  mounted() {
        this.fetchData();
    },
};
</script>
