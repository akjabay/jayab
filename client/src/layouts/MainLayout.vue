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
  }
})
</script>
