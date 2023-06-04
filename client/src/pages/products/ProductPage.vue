<template>
  <q-page>
    <ProductMain v-if="loaded" :product="product"></ProductMain>
    <q-inner-loading :showing="!loaded" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import ProductMain from "/src/components/product/ProductMain.vue";
import api from "/src/api/index.js";

export default defineComponent({
  name: "ProductPage",
  components: {
    ProductMain,
  },
  setup() {
    return {
      product: ref({}),
      loaded: ref(false),
    };
  },
  methods: {
    fetchData: async function () {
      const pid = this.$route.params.pid;
      try {
        const result = await api.product.productFindComplete({ pid });
        this.product = result.data.data.productFind;
        this.loaded = true;
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
