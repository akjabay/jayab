<template>
  <div class="q-mt-xs">
    <q-table
      :title="$t('products')"
      :rows="items"
      :columns="columns"
      row-key="pid"
      hide-pagination
    >
      <template v-slot:body="props">
        <q-tr :props="props" :class="props.row.status === 'deleted' ? 'bg-red-1' : ''">
          <q-td key="name" :props="props">
            <div>{{ props.row.name }}</div>
            <category-comp :category="props.row.categoryId"></category-comp>
            <div>{{ props.row.address }}</div>
            <date-comp :date="props.row.createdAt"></date-comp>
          </q-td>
          <q-td key="thumbnail" :props="props">
            <image-comp
              class="text-pointer"
              @click="$router.push('/products/' + props.row.pid)"
              :link="props.row.thumbnail"
              size="50px"
              :isThumb="true"
            ></image-comp>
          </q-td>
          <q-td key="area" :props="props">
            {{ props.row.area }}
          </q-td>
          <q-td key="areaOfBuilding" :props="props">
            {{ props.row.areaOfBuilding }}
          </q-td>
          <q-td key="price" :props="props">
            <div v-if="props.row.price">
              {{ props.row.price.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` (${$t('total')})` }}
            </div>
            <div v-if="props.row.pricePerMeter">
              {{  props.row.pricePerMeter.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` (${$t('perMeter')})` }}
            </div>
          </q-td>
          <q-td key="isPublic" :props="props">
            <div class="q-px-md">
                <q-toggle v-model="props.row.isPublic" @click="onToggle({ pid: props.row.pid, isPublic: props.row.isPublic })" icon="people" />
            </div>
          </q-td>
          <q-td key="pid" :props="props">
             <q-btn flat :to="'/products/' + props.row.pid" class="ad-font-color" size="sm" icon="fa fa-eye" />
          </q-td>
          <q-td key="manage" :props="props">
             <q-btn flat @click="onEdit({ pid: props.row.pid })" class="ad-font-color" size="sm" icon="fa fa-edit" />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <map-add-point-comp
      ref="pointAddDialog"
      v-on:on-submit-point="onSubmitPoint"
    ></map-add-point-comp>

  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import ImageComp from "/src/components/common/ImageComp.vue";
import CategoryComp from "/src/components/main/CategoryComp.vue";
import DateComp from "/src/components/main/DateComp.vue";
import MapAddPointComp from "/src/components/map/MapAddPointComp.vue";
import api from "/src/api/index";


export default defineComponent({
  name: "TableComp",
  components: {
    ImageComp,
    CategoryComp,
    DateComp,
    MapAddPointComp,
  },
  props: {
    items: Array,
  },
  setup() {
    return {
      columns: ref([]),
    };
  },
  methods: {
    onSubmitPoint({ updatedMarker }) {
      if (updatedMarker) {
        this.$emit('on-update-items')
      }
    },
    onEdit: function ({ pid }) {
      const marker = this.items.find((m) => m.pid === pid);
      this.$refs.pointAddDialog.onSetInfo({ marker });
    },
    onToggle: async function ({ pid, isPublic }) {
      try {
        const result = await api.product.productUpdate({
          pid: pid,
          isPublic: isPublic,
        });
        if (result.status === 200) {
            this.$q.notify({
              type: "positive",
              message: this.$t("success"),
              caption: this.$t("success"),
            });
          }
      } catch (error) {
        console.log(error);
        this.$q.notify({
          type: "negative",
          message: this.$t("failed"),
          caption: this.$t("failed"),
        });
      }
    },
    onSetup: function () {
      this.columns = [
        {
          name: "name",
          label: this.$t("detail"),
          field: "name",
          sortable: false,
        },
        {
          name: "thumbnail",
          label: this.$t("image"),
          field: "thumbnail",
          sortable: false,
        },
        {
          name: "area",
          label: this.$t("area"),
          field: "area",
          sortable: false,
        },
        {
          name: "areaOfBuilding",
          label: this.$t("areaOfBuilding"),
          field: "areaOfBuilding",
          sortable: false,
        },
        {
          name: "price",
          label: this.$t("price"),
          field: "price",
          sortable: false,
        },
        {
          name: "isPublic",
          label: this.$t("isPublic"),
          field: "isPublic",
          sortable: false,
        },
        {
          name: "pid",
          label: this.$t("show"),
          field: "pid",
          sortable: false,
        },
        {
          name: "manage",
          label: this.$t("manage"),
          sortable: false,
        },
      ];
    },
  },
  mounted() {
    this.onSetup();
  },
});
</script>

<style></style>
