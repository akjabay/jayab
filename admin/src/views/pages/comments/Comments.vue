<template>
    <v-container>

        <v-row justify="center">
            <v-col cols="12" lg="10">
                <BaseCard heading="لیست همه نظرات">
                    <comments-tbl
                        :comments="comments"
                        :pagination="pagination"
                        v-on:fetch-comments="fetchData"
                    ></comments-tbl>
                </BaseCard>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import api from "@/api/index.js";

export default {
    name: "Comments",

    components: {
        CommentsTbl: () => import("@/components/sdComponents/CommentsTbl"),
        BaseCard: () => import("@/components/commonComponents/BaseCard"),
    },
    data: () => ({
        comments: [],
        pagination: {},
        limit: 10,
        loaded: false,
    }),
    methods: {
        fetchData: async function (page) {
            let offset = page ? (page - 1) * this.limit : 0;
            try {
                const result = await api.comment.commentFindAll({ limit: this.limit, offset, isMain: true });
                const sComments = result.data.data.commentFindAll.hits;
                this.pagination = result.data.data.commentFindAll.pagination;
                this.comments = sComments;
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
