<template>
  <div class="">
    <div v-if="categories && categories.length > 0">
      <div class="row justify-center">
        <div
          v-for="(category, i) in categories"
          :key="i"
          class="col-6 col-md-2 col-sm-3 col-xs-4 q-my-sm"
        >
          <div
            @click="$router.push('/categories/' + category.id)"
            class="fixed-width-box ad-box-bordered q-pa-sm text-center pointer"
          >
            <q-icon
              class="q-pa-md border-radius-inherit"
              size="xl"
              :name="'fa-solid ' + category.icon_url"
              :color="
                i % 3 == 0 ? 'primary' : i % 3 == 1 ? 'secondary' : 'accent'
              "
            />
            <div>
              {{ category[$i18n.locale.split("-")[0] + "_name"] }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <empty-comp></empty-comp>
    </div>
    <q-inner-loading :showing="!loaded" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import api from "/src/api/index.js";
import EmptyComp from "/src/components/main/EmptyComp.vue";

export default defineComponent({
  name: "CategoriesComp",
  props: {},
  components: {
    EmptyComp,
  },
  setup() {
    return {
      categories: ref([]),
      loaded: ref(false),
    };
  },
  methods: {
    async fetchData() {
      try {
        const result = await api.main.categoryFindAll();
        if (result.data.errors) {
          this.$q.notify({
            type: "warning",
            message: this.$t("failed"),
            caption: this.$t("userNotFound"),
          });
        } else if (result.data.data.categoryFindAll) {
          const categories = result.data.data.categoryFindAll;
          this.categories = categories.filter((c) => c.en_name !== 'root' && c.parent_id !== "root");
          this.loaded = true;
        }
      } catch (error) {
        console.log(error, "error on fecth data");
        this.$q.notify({
          type: "negative",
          message: this.$t("failed"),
          caption: this.$t("failed"),
        });
      }
    },
  },
  mounted() {
    this.fetchData();
  },
});
</script>
<style scoped>
.fixed-width-box {
  width: 8rem;
  min-height: 8rem;
  border-radius: 0.5rem;
  margin: auto;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}
</style>
