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
                            <th class="text-right">کاربر</th>
                            <th class="text-right">تصویر</th>
                            <th class="text-right">عنوان</th>
                            <th class="text-right">قابلیت مشاهده</th>
                            <th class="text-right">وضعیت عمومی</th>
                            <th class="text-right">وضعیت</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in tickets" :key="i">
                            <td>{{ (page - 1) * 10 + i + 1 }}</td>
                            <td>
                                {{
                                    Math.ceil(Number(item.createdAt) / 1000)
                                        | moment("jYYYY-jMM-jDD HH:MM")
                                }}
                            </td>
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
                                            '/views/tickets/view/' + item.id
                                        )
                                    "
                                    :src="
                                        $store.state.auth.baseURL +
                                        '/public/w90/' +
                                        item.thumbnail
                                    "
                                ></v-img>
                            </td>
                            <td
                                class="text-pointer"
                                @click="
                                    $router.push(
                                        '/views/tickets/view/' + item.id
                                    )
                                "
                            >
                                {{ item.title }}
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
                            <td>
                                <v-switch
                                    @click="
                                        changeStatus({
                                            item,
                                            isPublic: !item.isPublic,
                                        })
                                    "
                                    :input-value="item.isPublic"
                                ></v-switch>
                            </td>
                            <td>
                                <v-switch
                                    @click="
                                        changeStatus({
                                            item,
                                            disabled: !item.disabled,
                                        })
                                    "
                                    :input-value="!item.disabled"
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
                    @input="$emit('fetch-tickets', page)"
                ></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/index.js";

export default {
    name: "TableSimpleFixHeader",

    props: {
        tickets: Array,
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
                const result = await api.ticket.ticketUpdate({
                    id: item.id,
                    visibility,
                    disabled,
                    isPublic,
                });
                if (result.data.data.ticketUpdate.id) {
                    this.$emit("fetch-tickets", this.page);
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        length: function () {
            if (this.tickets[0]) {
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
