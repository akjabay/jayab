<template>
  <div>
    <Chart
      v-if="!loading"
      :randomId="randomId"
      type="bar"
      :labels="labels"
      :datasets="[
        {
          label: 'پست ها',
          data: posts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          hoverOffset: 4
        },
      ]"
    />
    <LoadingComponent v-else :loading="loading" />
  </div>
</template>


<script>
import api from '@/api/index.js';

export default {
  name: "PostBarChart",
  props: {
    randomId: {
        type: Number,
    },
    labelRange: {
        type: Array,
    }
  },
  data: () => ({
      posts: [],
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
      this.posts = []
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

      const result = await api.post.reportPost({ queryOptions });
      if (result.data.errors) {
        console.log(result.data.errors[0]);
      } else if (result.data.data.reportPost) {
        const postRes = result.data.data.reportPost;
        this.labels = [...new Set(postRes.map((pr) => pr.date))];
        this.labels.forEach((label) => {
          const count = postRes.filter((pr) => pr.date === label).length;
          this.posts.push(count);
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