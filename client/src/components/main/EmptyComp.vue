<template>
  <div class="q-ma-xl text-center">
    <div class="ad-nothing-text">
      <q-icon size="lg" name="list" />
      <div class="text-bold">
        {{ text ? text : "emptyList" }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmptyComp",
  props: {
    text: String,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.ad-nothing-text {
  opacity: 0.6;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
  supported by Chrome, Edge, Opera and Firefox */
}
</style>
