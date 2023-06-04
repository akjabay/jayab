<template>
    <div>
        <v-btn
            outlined
            color="primary"
            @click="selectDialog = true"
        >
            <span v-if="category && category.name">
            {{ category.fa_name }}
            <v-icon class="mr-1">mdi-check</v-icon>
            </span>
            <span v-else>
            انتخاب دسته بندی
            <v-icon class="mr-1">mdi-arrow-left</v-icon>
            </span>
        </v-btn>

        <v-dialog
        v-model="selectDialog"
        scrollable
        max-width="350px"
        >
        <v-card>
            <v-card-title>انتخاب دسته بندی</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;" v-if="!secondCategories[0]">
            <v-list-item
                v-for="(item, i) in rootCategories"
                :key="i"
                class="pointer"
                @click="onSelectParentCategory(item)"
            >
                <v-list-item-icon>
                <v-icon v-text="item.icon_url"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title v-text="item.fa_name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                <v-icon>mdi-arrow-left</v-icon>
                </v-list-item-icon>
            </v-list-item>
            </v-card-text>
            <v-card-text style="height: 300px;" v-else>
            <div>
                <v-btn icon class="text-center" @click="secondCategories = []">
                <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
                <span>
                {{ secondCategories[0].parent_fa_name }}
                </span>
            </div>
            <v-list-item
                v-for="(item, i) in secondCategories"
                :key="i"
                class="pointer"
                @click="onSelectCategory(item)"
            >
                <v-list-item-icon>
                <v-icon v-if="item.icon_url">{{ item.icon_url }}</v-icon>
                <span v-else>{{ i+1 }}</span>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title v-text="item.fa_name"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
            <v-btn
                color="error"
                text
                @click="onSelectCategory()"
            >
                <v-icon>mdi-window-close</v-icon>
                پاک کردن
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
            color="error"
            text
            @click="selectDialog = false"
            >
                <v-icon>mdi-menu-right</v-icon>
                انصراف
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
</template>

<script>
import api from "@/api/index.js";

export default {
    name: "CategorySelectComponent",
    props: {
        category: {
            type: Object,
            required: false,
        }
    },
    data: () => ({
        rootCategories: [],
        categories: [],
        secondCategories: [],
        selectDialog: false,
    }),
    methods: {
        async fetchData () {
            try {
                const result = await api.main.categoryFindAll();
                const scategories = result.data.data.categoryFindAll;
                this.rootCategories = scategories.filter((sc) => { return sc.parent_category === 'root' })
                this.categories = scategories;
            } catch (error) {
                console.log(error);
            }
        },
        onSelectParentCategory (item) {
            this.secondCategories = this.categories.filter((cs) => {
                return cs.parent_category == item.name
            })
            if (this.secondCategories.length > 0) {
                this.secondCategories[0].parent_fa_name = item.fa_name
            } else {
                this.onSelectCategory(item);
            }
        },

        onSelectCategory (item) {
            this.$emit('on-select-category', item)
            this.secondCategories = [];
            this.selectDialog = false;
        },
    },
    mounted () {
        this.fetchData()
    }
}
</script>