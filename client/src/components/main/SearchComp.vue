<template>
  <div class="">
    <filter-comp ref="filterComp" v-on:on-change-filter="onChangeFilter" :filterOptions="filterOptions"></filter-comp>
      <div class="row">
        <q-space></q-space>
        <q-btn @click="onResetFilter" outline class="q-ma-xs ad-font-color" :label="$t('clean')" no-caps></q-btn>
        <q-btn @click="onClickToSearch" class="q-ma-xs ad-primary-btn" :label="$t('search')" no-caps>
          <q-icon class="q-pr-md" name="fa fa-magnifying-glass"/>
        </q-btn>
      </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import FilterComp from "/src/components/main/FilterComp.vue";

export default defineComponent({
  name: "SearchComp",
  props: {
    category: Object,
  },
  components: {
    FilterComp
  },
  setup: () => {
    return {
      filterOptions: ref({})
    }
  },
  methods: {
    onResetFilter () {
      this.filterOptions = {};
      this.$refs.filterComp.resetState();
    },
    onChangeFilter (filter) {
      this.filterOptions = filter;
    },
    onClickToSearch () {
      const filterItems = JSON.stringify(this.filterOptions);
      this.$router.push({
        path: '/items/list',
        query: {
          filterOptions: filterItems
        }
      })
    }
  }
});
</script>

<style scoped>
.ad-category {
  opacity: 0.7;
  font-size: 12px;
}
</style>
