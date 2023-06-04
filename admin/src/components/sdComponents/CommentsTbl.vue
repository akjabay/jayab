<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TableSimpleFixHeader -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <div class="mt-4">
            <v-simple-table fixed-header height="300px">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-right">ردیف</th>
                            <th class="text-right">تاریخ</th>
                            <th class="text-right">پست</th>
                            <th class="text-right">کاربر</th>
                            <th class="text-right">متن</th>
                            <th class="text-right">قابلیت مشاهده</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in comments" :key="i">
                            <td>{{ (page - 1) * 10 + i + 1 }}</td>
                            <td>
                                {{
                                    Math.ceil(Number(item.createdAt) / 1000)
                                        | moment("jYYYY-jMM-jDD HH:MM")
                                }}
                            </td>
                            <td>
                                <v-img
                                    width="60px"
                                    class="text-pointer"
                                    @click="
                                        $router.push(
                                            '/views/posts/edit/' + item.postId.id
                                        )
                                    "
                                    :src="
                                        $store.state.auth.baseURL +
                                        '/public/w90/' +
                                        item.postId.thumbnail
                                    "
                                ></v-img>
                            </td>
                            <td class="text-center">
                                <UserSmallComponent
                                    :user="item.userId"
                                ></UserSmallComponent>
                            </td>
                            <td>
                                {{ item.body }}
                            </td>
                            <td>
                                <v-switch
                                    @click="
                                        changeStatus({
                                            item,
                                            visibility: !item.visibility,
                                        })
                                    "
                                    :input-value="item.visibility"
                                ></v-switch>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <div class="text-center pt-2">
                <v-pagination
                    v-model="page"
                    :length="length"
                    total-visible="5"
                    @input="$emit('fetch-comments', page)"
                ></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/index.js";

export default {
    name: "CommentsTbl",

    props: {
        comments: Array,
        pagination: Object,
    },
    data: () => ({
        page: 1,
        showingTicket: [],
    }),
    components: {
        UserSmallComponent: () =>
            import("@/components/sdComponents/UserSmallComponent.vue"),
    },
    methods: {
        async changeStatus(args = []) {
            const { item, visibility, disabled, isPublic } = args;
            try {
                const result = await api.comment.commentUpdate({
                    id: item.id,
                    visibility,
                    disabled,
                    isPublic,
                });
                if (result.data.data.commentUpdate.id) {
                    this.$emit("fetch-comments", this.page);
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        length: function () {
            if (this.comments[0]) {
                return Math.ceil(
                    parseInt(this.pagination.total) /
                        parseInt(this.pagination.limit)
                );
            } else {
                return 0;
            }
        },
    },
};
</script>
