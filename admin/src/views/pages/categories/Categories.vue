<template>
    <v-container>

        <v-row justify="center">
        <IsCard
            class="ma-2"
            title="افزودن دسته بندی"
            routePath="/views/categories/add"
            isCardIcon="mdi-plus"
            colorClass="green"
        ></IsCard>
        <IsCard
            class="ma-2"
            title="همه دسته بندی ها"
            routePath="/views/categories/list"
            isCardIcon="mdi-view-dashboard"
            colorClass="green"
        ></IsCard>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "Categories",

    components: {
        IsCard: () => import("@/components/commonComponents/IsCard"),
    },
    data: () => ({
    }),
}
</script>
