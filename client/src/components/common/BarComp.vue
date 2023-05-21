<template>
  <div class="row justify-center">
    <div v-for="(nav, i) in navs" :key="i">
      <div
        class="pointer q-pa-md q-mx-xs"
        :class="navValue == i ? 'nav-active' : null"
        @click="$emit('nav-change', i)"
      >
        <q-icon class="q-ml-sm" :name="nav.item_icon"></q-icon>
        <span>{{ nav.item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: "BarComp",

  props: {
    navs: {
      type: Array,
      required: true,
    },
    navValue: {
        type: Number,
        rewuired: true
    }
  },
  setup: () => ({
  }),
});
</script>

<style lang="css" scoped>
.nav-active {
  border-width: 3px 0px 0px 0px;
  border-style: solid;
  border-color: #8a8a8a;
}
</style>