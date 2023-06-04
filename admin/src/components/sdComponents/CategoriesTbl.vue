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
                            <th class="text-right">شناسه</th>
                            <th class="text-right">دسته بندی والد</th>
                            <th class="text-right">نام انگلیسی</th>
                            <th class="text-right">نام فارسی</th>
                            <th class="text-center">مدیریت</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in categories" :key="i">
                            <td>{{ i + 1 }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.parent_category }}</td>
                            <td>{{ item.en_name }}</td>
                            <td>{{ item.fa_name }}</td>
                            <td class="text-center">
                                <v-row justify="center">
                                    <v-btn
                                        @click="
                                            (dialog = true),
                                                (showingCategory = item)
                                        "
                                        icon
                                        color="error lightn-1"
                                    >
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-row>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>

        <v-dialog v-model="dialog" width="290">
            <v-card>
                <v-card-title class="headline"> حذف دسته بندی </v-card-title>
                <v-card-text>
                    <div class="text-large">
                        آیا مایل به حذف دسته بندی زیر هستید؟
                    </div>
                    <div class="mt-2">
                        <span> نام دسته بندی: </span>
                        <span class="px-1">
                            {{ showingCategory.name }}
                        </span>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                        برگشت
                    </v-btn>
                    <v-btn color="error" text @click="onDelete"> حذف </v-btn>
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
        categories: Array,
        pagination: Object,
    },
    data: () => ({
        dialog: false,
        showingCategory: {},
    }),
    components: {},
    methods: {
        async onDelete() {
            try {
                const result = await api.main.categoryDelete({
                  categoryId: this.showingCategory.id,
                });
                if (result.data.data.categoryDelete.id) {
                  this.dialog = false;
                  this.$emit('fetch-categories')
                  this.showingCategory = [];
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {},
};
</script>
