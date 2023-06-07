<template>
  <q-page>
    <div
      v-if="products.length > 0"
    >
      <list-comp :items="products"></list-comp>
      <pagination-comp
        v-on:select-page="onChangePage"
        :currentPage="currentPage"
        :pagination="pagination"
      ></pagination-comp>
    </div>
    <div v-else>
      <empty-comp></empty-comp>
    </div>
    <q-inner-loading :showing="!loaded" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import ListComp from "/src/components/list/ListComp.vue";
import PaginationComp from "/src/components/common/PaginationComp.vue";
import EmptyComp from "/src/components/main/EmptyComp.vue";
import { useAuthStore } from "src/stores/auth";
import { mapState } from 'pinia';
import api from "/src/api/index";

export default defineComponent({
  name: "ListPage",
  props: {
    filterOptions: Object,
  },
  setup () {
    return {
      products: ref([]),
      currentPage: ref(1),
      pagination: ref({
        limit: 10,
        offset: 0,
        total: 1,
      }),
      loaded: ref(false),
      filtering: ref(false),
    }
  },
  components: {
    ListComp,
    PaginationComp,
    EmptyComp,
  },
  methods: {
    async onChangePage(page) {
      await this.fetchData({ page });
      this.currentPage = page;
    },
    async fetchData (args = []) {
      try {
        const { page } = args;
        if (page) {
          this.pagination.offset = (page - 1) * this.pagination.limit;
        }
        const params = {};
        Object.keys(this.filterOptions).forEach((key) => {
          if (typeof this.filterOptions[key] === 'object' && (Object.keys(this.filterOptions[key]).includes('min'))) {
            params[key] = `${this.filterOptions[key].min},${this.filterOptions[key].max}`
          } else {
            params[key] = this.filterOptions[key];
          }
        });
        const result = await api.product.productFindAll({
          limit: this.pagination.limit,
          offset: this.pagination.offset,
          sorting: 'cteaedAt: -1',
          categoryId: this.filterOptions.category ? this.filterOptions.category.id: '',
          latlng: this.filterOptions.city ? this.filterOptions.city.lat_long : '',
          ...params,
        });

        if (result.status === 200) {
          const products = result.data.data.productFindAll.hits;
          this.products = products;
          this.pagination = result.data.data.productFindAll.pagination;
        }

        this.loaded = true;

      } catch (error) {
        console.log(error);
        this.$q.notify({
          type: "negative",
          message: this.$t("failed"),
          caption: this.$t("failed"),
        });
      }
    },
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
  mounted () {
    this.fetchData();
  }
});
</script>
