<template>
  <div class="q-px-md">
    <span v-if="!isDense" class="">{{ $t('darkMode') }}</span>
    <q-toggle v-model="isDark" @click="onToggle" icon="dark_mode" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "DarkComp",
  components: {},
  props: {
    isDense: Boolean,
  },

  setup() {
    const $q = useQuasar();
    return {
      isDark: ref($q.dark.isActive),
    };
  },

  methods: {
    onToggle: function () {
      if (this.isDark == false || this.isDark == true) {
        this.$q.dark.set(this.isDark);
        localStorage.setItem("mode", this.isDark);
      }
    },
  },
  mounted() {},
});
</script>
