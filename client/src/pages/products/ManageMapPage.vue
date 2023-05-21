<template>
  <q-page>
    <map-comp ref="map"></map-comp>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { mapState } from 'pinia';
import MapComp from "/src/components/map/MapComp.vue";
import api from "/src/api/index";

export default defineComponent({
  name: "ManageMapPage",
  components: {
    MapComp,
  },
  setup() {
    return {
      products: ref([]),
      pagination: ref({
        limit: 10,
        offset: 0,
        total: 1,
      }),
    };
  },
  methods: {
    async fetch() {
      try {
        const result = await api.product.productFindMyProducts({
          sorting: "cteaedAt: -1",
          latlng: this.user && this.user.city ? this.user.city.lat_long : '',
          isMap: true,
        });

        if (result.status === 200) {
          const products = result.data.data.productFindMyProducts.hits;
          this.products = products;
          this.pagination = result.data.data.productFindMyProducts.pagination;

          this.$refs.map.onAddingMarker({ markers: this.products });
          const latlng = this.user.city.lat_long;

          const location = latlng ? {
            latitude: latlng.split(',')[0],
            longitude: latlng.split(',')[1]
          }: {};

          this.$refs.map.setCurrentPositionMap({ location });
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
  },
  mounted() {
    this.fetch();
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
});
</script>
