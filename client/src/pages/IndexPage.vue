<template>
  <q-page>
    <main-intro-comp></main-intro-comp>
    <main-title-comp :title="$t('categoriesTitle')"></main-title-comp>
    <categories-comp class="q-my-sm" />
    <main-title-comp id="aboutUs" :title="$t('aboutCompany')"></main-title-comp>
    <about-company-comp></about-company-comp>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import MainTitleComp from "/src/components/main/MainTitleComp.vue";
import CategoriesComp from "/src/components/main/CategoriesComp.vue";
import AboutCompanyComp from "/src/components/main/AboutCompanyComp.vue";
import MainIntroComp from "/src/components/main/MainIntroComp.vue";

export default defineComponent({
  name: 'IndexPage',
  setup () {
    return {
    }
  },
  components: {
    MainTitleComp,
    AboutCompanyComp,
    CategoriesComp,
    MainIntroComp
  }
})
</script>

<style>

</style>
