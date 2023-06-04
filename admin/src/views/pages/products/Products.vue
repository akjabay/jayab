<template>
    <v-container>

        <v-row justify="center">
        <IsCard
            class="ma-2"
            title="افزودن محصول"
            routePath="/views/products/add"
            isCardIcon="mdi-plus"
            colorClass="secondary"
        ></IsCard>
        <IsCard
            class="ma-2"
            title="همه محصول ها"
            routePath="/views/products/list"
            isCardIcon="mdi-view-dashboard"
            colorClass="secondary"
        ></IsCard>
        <IsCard
            class="ma-2"
            title="محصول های فعال"
            routePath="/views/products/list/true"
            isCardIcon="mdi-eye"
            colorClass="secondary"
        ></IsCard>
        <IsCard
            class="ma-2"
            title="محصول های غیرفعال"
            routePath="/views/products/list/false"
            isCardIcon="mdi-eye-off"
            colorClass="secondary"
        ></IsCard>
        </v-row>

    </v-container>
</template>

<script>
export default {
    name: "Products",

    components: {
        IsCard: () => import("@/components/commonComponents/IsCard"),
    },
    data: () => ({
    }),
}
</script>