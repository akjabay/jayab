<template>
  <v-container fluid class="down-top-padding">
    <v-row justify="center">
      <IsCard
        class="ma-2"
        title="جستجو کاربران"
        routePath="/views/users/search"
        isCardIcon="mdi-magnify"
        colorClass="cyan"
      ></IsCard>
      <IsCard
        class="ma-2"
        title="افزودن کاربر"
        routePath="/views/users/add"
        isCardIcon="mdi-plus"
        colorClass="cyan"
      ></IsCard>
      <IsCard
        class="ma-2"
        title="همه کاربران"
        routePath="/views/users/list"
        isCardIcon="mdi-view-list"
        colorClass="cyan"
      ></IsCard>
      <IsCard
        class="ma-2"
        title="کاربران غیرفعال"
        routePath="/views/users/list/not-active"
        isCardIcon="mdi-eye-off"
        colorClass="cyan"
      ></IsCard>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "Users",

  data: () => ({
  }),
  components: {
    IsCard: () => import("@/components/commonComponents/IsCard"),
  },
};
</script>
