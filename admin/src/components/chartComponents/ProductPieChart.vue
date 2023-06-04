<template>
  <div>
    <Chart
      v-if="!loading"
      :randomId="randomId"
      type="doughnut"
      :labels="labels"
      :datasets="[
        {
          label: 'پروژه ها',
          data: projects,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 4
        },
      ]"
    />
    <LoadingComponent v-else :loading="loading" />
  </div>
</template>


<script>
import api from "@/api/index.js";

export default {
  name: "ProjectPieChart",
  props: {
    randomId: {
        type: Number,
    },
    labelRange: {
        type: Array,
    }
  },
  data: () => ({
      projects: [],
      labels: [],
      loading: false,
  }),
  components: {
    Chart: () => import("@/components/chartComponents/Chart.vue"),
    LoadingComponent: () => import("@/components/commonComponents/LoadingComponent"),
  },
  methods: {
    fetchData: async function () {
      this.loading = true;
      this.labels = []
      this.projects = []
      const dateTime = {
        first_date: new Date().toISOString().slice(0,-5),
        to_date: new Date().toISOString().slice(0,-5)
      }
      if (this.labelRange) {
        dateTime.first_date = new Date(new Date().setMonth(new Date().getMonth() - this.labelRange[1])).toISOString().slice(0, -5);
        dateTime.to_date = new Date(new Date().setMonth(new Date().getMonth() - this.labelRange[0])).toISOString().slice(0,-5);
      }
      let queryOptions = "";
      queryOptions = queryOptions + ` from_date: "${dateTime.first_date}" \n`;
      queryOptions = queryOptions + ` to_date: "${dateTime.to_date}" \n`;

      const result = await api.product.reportProduct({ queryOptions });
      if (result.data.errors) {
        console.log(result.data.errors[0]);
      } else if (result.data.data.reportProduct) {
        const productRes = result.data.data.reportProduct;
        this.labels = [...new Set(productRes.map((pr) => pr.label))];
        this.labels.forEach((label) => {
          const count = productRes.filter((pr) => pr.label === label).length;
          this.projects.push(count)
        })
      }
      this.loading = false;
    },
  },
  mounted () {
    this.fetchData();
  },
  watch: {
      labelRange: function () {
          this.fetchData()
      }
  }
};
</script>