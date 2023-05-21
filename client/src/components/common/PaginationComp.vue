<template>
  <div class="row q-my-md justify-center">
    <q-pagination
      v-model="page"
      :max="Math.ceil(pagination.total / pagination.limit)"
      :max-pages="4"
      style="direction: ltr"
      direction-links
      flat
      color="grey"
      active-color="primary"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PaginationComp",
  props: {
    currentPage: Number,
    pagination: {
      type: Object,
      default: ref({
        limit: 10,
        offset: 0,
        total: 1,
      }),
    },
  },
  setup() {
    return {
      page: ref(1),
    };
  },
  watch: {
    page: {
      handler(val) {
        this.$emit("select-page", val);
      },
    },
  },
  components: {},
  methods: {},
  mounted() {
    if (this.currentPage) {
      this.page = this.currentPage;
    }
  },
});
</script>

<style scoped></style>
