<template>
  <q-page>
    <div>
      <div class="row">
        <q-btn-group push class="q-ma-xs">
           <q-btn :outline="view === 'table'" :class="view === 'table' ? 'ad-font-color' : ''" @click="onClickToView('table')">
            <q-icon size="1.3em" name="fa fa-list" />
           </q-btn>
           <q-btn :outline="view === 'list'" :class="view === 'list' ? 'ad-font-color' : ''" @click="onClickToView('list')">
            <q-icon size="1.3em" name="fa fa-table-columns" />
           </q-btn>
        </q-btn-group>
        <q-space></q-space>
        <q-btn @click="filtering = !filtering" outline class="q-ma-xs ad-font-color" no-caps>
          <q-icon class="" size="1.3em" v-if="filtering" name="fas fa-caret-up" />
          <q-icon class="" size="1.3em" v-else name="fa fa-filter" />
        </q-btn>
      </div>
      
      <div v-if="filtering">
        <filter-comp ref="filterComp" v-on:on-change-filter="onChangeFilter" :filterOptions="filterOptions"></filter-comp>
        <div class="row">
          <q-space></q-space>
          <q-btn @click="onResetFilter" outline class="q-ma-xs ad-font-color" :label="$t('clean')" no-caps></q-btn>
          <q-btn @click="fetchData" class="q-ma-xs ad-primary-btn" :label="$t('search')" no-caps>
            <q-icon class="q-pr-md" name="fa fa-magnifying-glass"/>
          </q-btn>
        </div>
      </div>
    </div>
    <div
      v-if="products.length > 0"
    >
    <div v-if="view === 'table'">
      <table-comp :items="products" v-on:on-update-items="fetchData({ page: currentPage })"></table-comp>
    </div>
    <div v-if="view === 'list'">
      <list-comp :items="products"></list-comp>
    </div>
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
import FilterComp from "/src/components/main/FilterComp.vue";
import ListComp from "/src/components/list/ListComp.vue";
import TableComp from "/src/components/list/TableComp.vue";
import PaginationComp from "/src/components/common/PaginationComp.vue";
import EmptyComp from "/src/components/main/EmptyComp.vue";
import { useAuthStore } from "src/stores/auth";
import { mapState } from 'pinia';
import api from "/src/api/index";

export default defineComponent({
  name: "ManageListPage",
  setup () {
    return {
      filterOptions: ref({}),
      products: ref([]),
      currentPage: ref(1),
      pagination: ref({
        limit: 10,
        offset: 0,
        total: 1,
      }),
      loaded: ref(false),
      filtering: ref(false),
      view: ref('table')
    }
  },
  components: {
    FilterComp,
    ListComp,
    TableComp,
    PaginationComp,
    EmptyComp,
  },
  methods: {
    onClickToView (next) {
      if (this.view !== next) {
        this.view = this.view === 'list' ? 'table' : 'list';
      }
    },
    onResetFilter () {
      this.filterOptions = {};
      this.$refs.filterComp.resetState();
    },
    onChangeFilter (filter) {
      this.filterOptions = filter;
    },
    async onChangePage(page) {
      await this.fetchData({ page });
      this.currentPage = page;
    },
    async fetchData (args = []) {
      try {
        this.loaded = false;
        const { page } = args;
        if (page) {
          this.pagination.offset = (page - 1) * this.pagination.limit;
        }
        const params = {};
        if (this.filterOptions && typeof this.filterOptions === 'object') {
          Object.keys(this.filterOptions).forEach((key) => {
            if (typeof this.filterOptions[key] === 'object' && (Object.keys(this.filterOptions[key]).includes('min'))) {
              params[key] = `${this.filterOptions[key].min},${this.filterOptions[key].max}`
            } else {
              params[key] = this.filterOptions[key];
            }
          });
        }
        const result = await api.product.productFindMyProducts({
          limit: this.pagination.limit,
          offset: this.pagination.offset,
          sorting: 'cteaedAt: -1',
          categoryId: this.filterOptions.category ? this.filterOptions.category.id: '',
          latlng: this.filterOptions.city ? this.filterOptions.city.lat_long : '',
          ...params,
        });

        if (result.status === 200) {
          const products = result.data.data.productFindMyProducts.hits;
          this.products = products;
          this.pagination = result.data.data.productFindMyProducts.pagination;
        }

        this.loaded = true;

      } catch (error) {
        this.loaded = true;
        console.log(error);
        this.$q.notify({
          type: "negative",
          message: this.$t("failed"),
          caption: this.$t("failed"),
        });
      }
      this.loaded = true;
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
