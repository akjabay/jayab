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
                            <th class="text-right">تصویر</th>
                            <th class="text-right">عنوان</th>
                            <th class="text-right">توضیحات</th>
                            <th class="text-right">زبان</th>
                            <th class="text-center">مدیریت</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in slides" :key="i">
                            <td>{{ i + 1 }}</td>
                            <td>
                                {{ item.title ? item.title : '' }}
                            </td>
                            <td>
                                {{ item.description ? item.description : '' }}
                            </td>
                            <td>
                                {{ item.language }}
                            </td>
                            <td>
                                <v-img
                                    width="60px"
                                    class="text-pointer"
                                    :src="
                                        $store.state.auth.baseURL +
                                        '/public/w90/' +
                                        item.imageUrl
                                    "
                                ></v-img>
                            </td>
                            <td class="text-center">
                                <v-btn @click="onDelete(item)" color="error">
                                    حذف
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>

        <v-dialog v-model="dialog" width="290">
            <v-card>
                <v-card-title class="headline"> حذف اسلاید </v-card-title>
                <v-card-text>
                    <div class="text-large">
                        آیا مایل به حذف اسلاید زیر هستید؟
                    </div>
                    <div class="mt-2">
                        <span> عنوان اسلاید: </span>
                        <span class="px-1">
                            {{ showingSlide.title }}
                        </span>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                        برگشت
                    </v-btn>
                    <v-btn color="error" text @click="deleteItem"> حذف </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import api from "@/api/index.js";

export default {
    name: "TableSimpleFixHeader",

    props: {
        slides: Array,
        pagination: Object,
    },
    data: () => ({
        dialog: false,
        showingSlide: [],
    }),
    components: {},
    methods: {
        async onDelete(item) {
            this.dialog = true;
            this.showingSlide = item;
        },
        async deleteItem() {
            try {
                const result = await api.main.slideDelete({
                    slideId: this.showingSlide.id,
                });
                if (result.data.data.slideDelete.id) {
                    this.dialog = false;
                    this.$emit("fetch-slides");
                    this.showingSlide = [];
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {},
};
</script>
