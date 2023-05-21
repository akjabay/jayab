<template>
  <div class="text-pointer ad-category q-my-md">
    <div v-if="category" @click="$router.push('/categories/' + category.id)">
      <q-icon class="" size="xs" name="library_add_check" />
      <!-- <q-icon class="" size="xs" :name="'fa ' + category.icon_url_fa" /> -->
      <span class="q-px-xs">{{
        category[$i18n.locale.split("-")[0] + "_name"]
      }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CategoryComp",
  props: {
    category: Object,
  },
});
</script>

<style scoped>
.ad-category {
  opacity: 0.7;
  font-size: 12px;
}
</style>
