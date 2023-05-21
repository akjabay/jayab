<template>
  <div class="q-px-md q-mb-md">
    <sub-title-comp :title="$t('introduce')"></sub-title-comp>
    <div class="">
      {{ $t("introduceCompanyText1") }}
    </div>
    <sub-title-comp :title="$t('companyGoals')"></sub-title-comp>
    <div class="">
      {{ $t("introduceCompanyText2") }}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import SubTitleComp from "/src/components/main/SubTitleComp.vue";

export default defineComponent({
  name: "AboutCompanyComp",
  props: {},
  components: {
    SubTitleComp,
  },
  setup() {
    return {};
  },
});
</script>
