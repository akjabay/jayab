<template>
    <div class="row justify-center">
      <div class="col-12 col-md-3 col-sm-4 col-xs-6 q-my-xs" v-for="(item, i) in items" :key="i">
        <product-card :product="item" style="margin: auto;"></product-card>
      </div>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import ProductCard from "/src/components/product/ProductCard.vue";

export default defineComponent({
  name: "ListComp",
  components: { ProductCard },
  props: {
    items: Array
  },
  setup() {
    return {
    };
  },
  methods: {
    
    fetch: function () {

    },
  },
  mounted() {
    this.fetch();
  },
});
</script>

<style>

</style>
