<template>
  <div class="row q-py-md">
    <div
      :class="
        'sub-line90 ' +
        'sub-line1-position' +
        ($t('direction') === 'rtl' ? '-rtl' : '')
      "
    ></div>
    <div
      :class="`ad-blog-sub-title ${$t('direction') === 'rtl' ? 'q-mr-lg': 'q-ml-lg'}`"
    >
      {{ title }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SubTitleComp",
  props: {
    title: String,
  },
});
</script>

<style scoped></style>
