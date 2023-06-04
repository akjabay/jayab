<template>
    <v-container>

        <v-row justify="center">
            <v-col cols="12" lg="10">
                <BaseCard heading="لیست همه پرسش ها">
                    <tickets-tbl
                        :tickets="tickets"
                        :pagination="pagination"
                        v-on:fetch-tickets="fetchData"
                    ></tickets-tbl>
                </BaseCard>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import api from "@/api/index.js";

export default {
    name: "Tickets",

    components: {
        TicketsTbl: () => import("@/components/sdComponents/TicketsTbl"),
        BaseCard: () => import("@/components/commonComponents/BaseCard"),
    },
    data: () => ({
        tickets: [],
        pagination: {},
        limit: 10,
        loaded: false,
    }),
    methods: {
        fetchData: async function (page) {
            let offset = page ? (page - 1) * this.limit : 0;
            try {
                const result = await api.ticket.ticketFindAll({ limit: this.limit, offset, isMain: true });
                const sTickets = result.data.data.ticketFindAll.hits;
                this.pagination = result.data.data.ticketFindAll.pagination;
                this.tickets = sTickets;
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
