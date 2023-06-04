<template>
    <v-container>

        <v-row justify="center">
            <v-col cols="12" lg="10">
                <BaseCard heading="لیست همه محصولات">
                    <products-tbl
                        :products="products"
                        :pagination="pagination"
                        v-on:fetch-products="fetchData"
                    ></products-tbl>
                </BaseCard>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import api from "@/api/index.js";

export default {
    name: "ProductsList",

    components: {
        ProductsTbl: () => import("@/components/sdComponents/ProductsTbl"),
        BaseCard: () => import("@/components/commonComponents/BaseCard"),
    },
    data: () => ({
        products: [],
        pagination: {},
        limit: 10,
        loaded: false,
    }),
    methods: {
        fetchData: async function (page) {
            let offset = page ? (page - 1) * this.limit : 0;
            const visibility = this.$route.params.visibility;
            try {
                const result = await api.product.productFindAll({ limit: this.limit, offset, visibility });
                const sproducts = result.data.data.productFindAll.hits;
                this.pagination = result.data.data.productFindAll.pagination;
                this.products = sproducts
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