<template>
  <q-layout view="lHh Lpr lFf" class="ad-layout">

    <app-header></app-header>

    <q-page-container class="ad-page">
      <router-view />
      <app-footer></app-footer>
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useAuthStore } from "src/stores/auth";
import { mapActions } from "pinia";
import AppHeader from 'src/components/main/AppHeader.vue'
import AppFooter from 'src/components/main/AppFooter.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    AppHeader,
    AppFooter
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(useAuthStore, ["tryAutoLogin"]),
    onSetLocals() {
      const lang = localStorage.getItem("locale");
      if (lang) {
        this.$i18n.locale = lang;
      } else {
        this.$i18n.locale = "fa-IR";
      }
      const mode = localStorage.getItem("mode");
      if (mode) {
        this.$q.dark.set(mode == "true" ? true : false);
      }
    },
  },
  created () {
    this.tryAutoLogin();
    this.onSetLocals();
  }
})
</script>
