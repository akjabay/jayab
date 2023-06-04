<template>
  <div>
    <Chart
      v-if="!loading"
      :randomId="randomId"
      type="line"
      :labels="labels"
      :datasets="[
        {
          label: 'پروژه ها',
          data: projects,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ]"
    />
    <LoadingComponent v-else :loading="loading" />
  </div>
</template>


<script>
import moment from "jalali-moment"
import pdata from "./pdata.js"

export default {
  name: "ProjectChart",
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
      // set labels
      for (let i = this.labelRange[0]; i <= this.labelRange[1]; i++ ) {
        const label = new Date(new Date().setMonth(new Date().getMonth() - i))
          .toLocaleDateString('fa-IR').replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728))
        this.labels.push(
          label.substr(0, label.lastIndexOf("/"))
        )
      }
      const now = new Date();
      const dateTime = {
        first_date: now.toISOString().slice(0,-5),
        to_date: now.toISOString().slice(0,-5)
      }
      if (this.labelRange) {
        dateTime.first_date = new Date(new Date().setMonth(new Date().getMonth() - this.labelRange[1])).toISOString().slice(0, -5);
        dateTime.to_date = new Date(new Date().setMonth(new Date().getMonth() - this.labelRange[0])).toISOString().slice(0,-5);
      }
      // let queryOptions = "";
      // queryOptions = queryOptions + ` from_date: "${dateTime.first_date}" \n`;
      // queryOptions = queryOptions + ` to_date: "${dateTime.to_date}" \n`;

      // const result = await this.$axios.post(
      //   "/graphql",
      //   {
      //     query: `query {
      //       projectReports(query: {
      //         pagination:{
      //           offset: 0
      //           limit: 10000
      //         }
      //         ${queryOptions}
      //       }) {
      //         hits {
      //             id
      //             title
      //             description
      //             lat
      //             long
      //             requirements{
      //               _id
      //               name
      //               type
      //             }
      //             created_at
      //         }

      //         pagination{
      //             offset
      //             limit
      //             total
      //         }
      //       }
      //     }`,
      //   },
      //   authHeader()
      // );
      // if (result.data.errors) {
      //   console.log(result.data.errors[0]);
      // } else if (result.data.data.projectReports) {
      //   // this.projects = result.data.data.projectReports.hits;
      //   // this.projects = projectsRes.map((pr) => {
      //   // })
      // }
      const projectsRes = pdata
      projectsRes.sort(function(a,b){
        return new Date(b.created_at) - new Date(a.created_at);
      });
      const projects = projectsRes.map((pr) => {
        return moment(pr.created_at, 'YYYY-MM-DDTHH:mm:ss').format('jYYYY/jMM')
      })
      var counts = {};
      projects.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
      this.projects = Object.values(counts)
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