<template>
  <div class="row q-py-lg">
    <div
      :class="
        'main-line ' +
        'main-line1-position'+
        ($t('direction') == 'rtl' ? '-rtl' : '')
      "
    ></div>
    <div
      :class="`ad-blog-title ${$t('direction') === 'rtl' ? 'q-mr-xl': 'q-ml-xl'}`"
    >
      ⬥ {{ title }}
    </div>
    <q-space />
    <div class="q-mx-xs ad-font-color" v-if="toLink">
      <q-btn
        flat
        no-caps
        dense
        @click="$router.push(toLink)"
        label="viewAll"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainTitleComp",
  props: {
    title: String,
    toLink: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped></style>
