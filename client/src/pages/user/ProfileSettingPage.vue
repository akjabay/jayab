<template>
  <div class="">
    <main-title-comp :title="$t('editUser')"></main-title-comp>
    <sub-title-comp :title="$t('settings')"></sub-title-comp>
    <dark-comp></dark-comp>
    <sub-title-comp :title="$t('edit')"></sub-title-comp>

    <user-edit-comp></user-edit-comp>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import MainTitleComp from "/src/components/main/MainTitleComp.vue";
import SubTitleComp from "/src/components/main/SubTitleComp.vue";
import UserEditComp from "/src/components/user/UserEditComp.vue";
import DarkComp from "/src/components/common/DarkComp.vue";

export default defineComponent({
  name: "ProfileSettingPage",
  components: {
    MainTitleComp,
    SubTitleComp,
    UserEditComp,
    DarkComp,
  },

  setup() {
    return {};
  },

  methods: {},
  mounted() {},
});
</script>
