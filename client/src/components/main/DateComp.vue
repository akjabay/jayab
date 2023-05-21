<template>
  <div class="ad-box-date">
    {{ getFormatedDate() }}
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DateComp",
  props: {
    date: String,
  },
  methods: {
    getFormatedDate() {
      if (this.date) {
        const d = new Date(+this.date);
        return d.toLocaleDateString(this.$i18n.locale);
      } else {
        return "";
      }
    },
  },
});
</script>
