<template>
    <v-container fluid class="down-top-padding">
      <div class="text-begin text-h3 pa-2 mb-2">اسلاید</div>
      <v-row justify="center">
        <IsCard
            class="ma-2"
            title="افزودن اسلاید"
            routePath="/views/slides/add"
            isCardIcon="mdi-plus"
            colorClass="gray"
        ></IsCard>
        <IsCard
            class="ma-2"
            title="همه اسلایدها"
            routePath="/views/slides/list"
            isCardIcon="mdi-view-dashboard"
            colorClass="gray"
        ></IsCard>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "slidesearch",

    data: () => ({}),
    components: {
      IsCard: () => import("@/components/commonComponents/IsCard"),
    },
    methods: {
        
    },
};
</script>
