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
                            <th class="text-right">کاربر</th>
                            <th class="text-right">تصویر</th>
                            <th class="text-right">نام پست</th>
                            <th class="text-center">مدیریت</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in posts" :key="i">
                            <td>{{ (page - 1) * 10 + i + 1 }}</td>
                            <td class="text-center">
                                <UserSmallComponent
                                    :user="item.userId"
                                ></UserSmallComponent>
                            </td>
                            <td>
                                <v-img
                                    width="60px"
                                    class="text-pointer"
                                    @click="
                                        $router.push(
                                            '/views/posts/edit/' + item.id
                                        )
                                    "
                                    :src="
                                        $store.state.auth.baseURL +
                                        '/public/w90/' +
                                        item.thumbnail
                                    "
                                ></v-img>
                            </td>
                            <td>{{ item.title }}</td>
                            <td class="text-center">
                                <v-row justify="center">
                                    <v-btn
                                        :to="'/views/posts/edit/' + item.id"
                                        icon
                                        color="primary lightn-1"
                                    >
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn
                                        @click="
                                            (dialog = true),
                                                (showingPost = item)
                                        "
                                        icon
                                        color="primary lightn-1"
                                    >
                                        <v-icon>mdi-eye</v-icon>
                                    </v-btn>
                                </v-row>
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
                    @input="$emit('fetch-posts', page)"
                ></v-pagination>
            </div>
        </div>

        <div>
            <v-dialog v-model="dialog" width="500">
                <v-card>
                    <v-card-title class="headline grey lighten-2">
                        جزئیات پست
                    </v-card-title>

                    <v-card-text class="py-4">
                        شناسه: {{ showingPost.id }}<br />
                        نام: {{ showingPost.title }}<br />
                    </v-card-text>
                    <v-card-text class="pb-4">
                        <div>
                            <span>وضعیت: </span>
                            <span v-show="!showingPost.disabled">فعال</span>
                            <span v-show="showingPost.disabled">غیرفعال</span>
                        </div>
                        <div>
                            تاریخ ایجاد:
                            {{
                                Math.ceil(Number(showingPost.createdAt) / 1000)
                                    | moment("jYYYY-jMM-jDD HH:MM")
                            }}
                        </div>
                        <br />
                    </v-card-text>

                    <hr class="style-one" />

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="black"
                            @click="changePostVisibility()"
                        >
                            <span v-if="showingPost.visibility">
                                غیرقابل مشاهده
                                <v-icon>mdi-do-not-disturb</v-icon>
                            </span>
                            <span v-else>
                                قابل مشاهده
                                <v-icon>mdi-check-circle</v-icon>
                            </span>
                        </v-btn>
                        <v-btn
                            text
                            color="success"
                            :to="'/views/posts/edit/' + showingPost.id"
                        >
                            ویرایش
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import api from "@/api/index.js";

export default {
    name: "TableSimpleFixHeader",

    props: {
        posts: Array,
        pagination: Object,
    },
    data: () => ({
        page: 1,
        dialog: false,
        showingPost: {},
    }),
    components: {
        UserSmallComponent: () =>
            import("@/components/sdComponents/UserSmallComponent.vue"),
    },
    methods: {
        async changePostVisibility() {
            try {
                const result = await api.post.postUpdateVisibility({
                    id: this.showingPost.id,
                    visibility: !this.showingPost.visibility,
                });
                if (result.data.data.postUpdateVisibility) {
                    this.showingPost.visibility =
                        result.data.data.postUpdateVisibility.visibility;
                    this.loaded = true;
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        length: function () {
            if (this.posts[0]) {
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
