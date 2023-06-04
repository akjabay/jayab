<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="10">
                <BaseCard heading="لیست همه سفارشات">
                    <orders-tbl
                        :orders="orders"
                        :pagination="pagination"
                        v-on:fetch-orders="fetchData"
                    ></orders-tbl>
                </BaseCard>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import api from "@/api/index.js";

export default {
    name: "Products",

    components: {
        OrdersTbl: () => import("@/components/sdComponents/OrdersTbl"),
        BaseCard: () => import("@/components/commonComponents/BaseCard"),
    },
    data: () => ({
        orders: [],
        pagination: {},
        limit: 10,
        loaded: false,
    }),
    methods: {
        fetchData: async function (page) {
            let offset = page ? (page - 1) * this.limit : 0;
            try {
                const result = await api.order.orderFindAll({ limit: this.limit, offset });
                this.orders = result.data.data.orderFindAll.hits;
                this.pagination = result.data.data.orderFindAll.pagination;
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