<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="10">
                <BaseCard heading="لیست همه پست ها">
                    <posts-tbl
                        :posts="posts"
                        :pagination="pagination"
                        v-on:fetch-posts="fetchData"
                    ></posts-tbl>
                </BaseCard>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import api from "@/api/index.js";

export default {
    name: "PostsList",

    components: {
        PostsTbl: () => import("@/components/sdComponents/PostsTbl"),
        BaseCard: () => import("@/components/commonComponents/BaseCard"),
    },
    data: () => ({
        posts: [],
        pagination: {},
        limit: 10,
        loaded: false,
    }),
    methods: {
        fetchData: async function (page) {
            let offset = page ? (page - 1) * this.limit : 0;
            const visibility = this.$route.params.visibility;
            try {
                const result = await api.post.postFindAll({ limit: this.limit, offset, visibility });
                const sposts = result.data.data.postFindAll.hits;
                this.pagination = result.data.data.postFindAll.pagination;
                this.posts = sposts
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
