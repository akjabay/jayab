<template>
    <v-container>

        <v-row justify="center">
        <IsCard
            class="ma-2"
            title="افزودن پست"
            routePath="/views/posts/add"
            isCardIcon="mdi-plus"
        ></IsCard>
        <IsCard
            class="ma-2"
            title="همه پست ها"
            routePath="/views/posts/list"
            isCardIcon="mdi-view-dashboard"
        ></IsCard>
        <IsCard
            class="ma-2"
            title="پست های فعال"
            routePath="/views/posts/list/true"
            isCardIcon="mdi-eye"
        ></IsCard>
        <IsCard
            class="ma-2"
            title="پست های غیرفعال"
            routePath="/views/posts/list/false"
            isCardIcon="mdi-eye-off"
        ></IsCard>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "Posts",

    components: {
        IsCard: () => import("@/components/commonComponents/IsCard"),
    },
    data: () => ({
    }),
}
</script>
