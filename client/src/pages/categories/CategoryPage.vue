<template>
  <q-page>
    <main-title-comp
      :title="
        ($t('direction') == 'rtl' ? $t('categoryTitle') + ' ' : '') +
        (category[$i18n.locale.split('-')[0] + '_name'] ? category[$i18n.locale.split('-')[0] + '_name'] : '')+
        ($t('direction') != 'rtl' ? ' ' + $t('categoryTitle') : '')
      "
    ></main-title-comp>

    <sub-title-comp :title="$t('products')"></sub-title-comp>
    <div class="q-px-xs">
      <div v-if="category.productIds && category.productIds.length > 0">
        <div class="row">
          <div
            v-for="(product, i) in category.productIds"
            :key="i"
            class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-py-sm"
          >
            <ProductCard style="margin: auto" :product="product" />
          </div>
        </div>
      </div>
      <div v-else>
        <empty-comp></empty-comp>
      </div>
    </div>

    <pagination-comp
      v-if="
        (category.productIds && category.productIds.length > 0) ||
        (category.postIds && category.postIds.length > 0)
      "
      v-on:select-page="onChangePage"
      :currentPage="currentPage"
      :pagination="pagination"
    ></pagination-comp>

    <q-inner-loading :showing="!loaded"> </q-inner-loading>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import MainTitleComp from "src/components/main/MainTitleComp.vue";
import SubTitleComp from "src/components/main/SubTitleComp.vue";
import ProductCard from "/src/components/product/ProductCard.vue";
import PaginationComp from "/src/components/common/PaginationComp.vue";
import EmptyComp from "/src/components/main/EmptyComp.vue";
import api from "/src/api/index.js";

export default defineComponent({
  name: "CategoryPage",
  setup() {
    return {
      category: ref({}),
      currentPage: ref(1),
      pagination: ref({
        limit: 10,
        offset: 0,
        total: 1,
      }),
      loaded: ref(false),
    };
  },
  components: {
    MainTitleComp,
    SubTitleComp,
    ProductCard,
    PaginationComp,
    EmptyComp,
  },
  methods: {
    async onChangePage(page) {
      await this.fetchData({ page });
      this.currentPage = page;
    },
    fetchData: async function ({ page } = []) {
      const categoryId = this.$route.params.categoryId;
      if (page) {
        this.pagination.offset = (page - 1) * this.pagination.limit;
      }
      try {
        const result = await api.main.categoryFindByCategory({
          categoryId,
          limit: this.pagination.limit,
          offset: this.pagination.offset,
          language: this.$i18n.locale,
        });
        if (result.data.errors) {
          this.$q.notify({
            type: "warning",
            message: this.$t("failed"),
            caption: this.$t("failed"),
          });
        } else if (result.data.data.categoryFindByCategory) {
          const category = result.data.data.categoryFindByCategory;
          if (result.data.data.categoryFindByCategory.pagination) {
            this.pagination =
              result.data.data.categoryFindByCategory.pagination;
          }
          this.category = category;
          this.loaded = true;
        }
      } catch (error) {
        console.log(error, "error on fecth data");
        this.$q.notify({
          type: "negative",
          message: this.$t("failed"),
          caption: this.$t("failed"),
        });
      }
    },
  },
  mounted() {
    this.fetchData();
  },
});
</script>
