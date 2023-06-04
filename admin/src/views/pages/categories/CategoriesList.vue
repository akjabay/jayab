<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="10">
                <BaseCard heading="همه دسته بندی ها">
                    <categories-tbl
                        :categories="categories"
                        v-on:fetch-categories="fetchData"
                    ></categories-tbl>
                </BaseCard>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import api from "@/api/index.js";

export default {
    name: "CategoriesList",

    components: {
        CategoriesTbl: () => import("@/components/sdComponents/CategoriesTbl"),
        BaseCard: () => import("@/components/commonComponents/BaseCard"),
    },
    data: () => ({
        categories: [],
        loaded: false,
    }),
    methods: {
        fetchData: async function () {
            try {
                const result = await api.main.categoryFindAll({ });
                const scategories = result.data.data.categoryFindAll;
                this.categories = scategories;
                this.loaded = true;
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted () {
        this.fetchData()
    }
}
</script>
