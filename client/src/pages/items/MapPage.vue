<template>
  <q-page>
    <map-comp ref="mapComponent" :liteMode="true" v-on:on-change-view="onChangeView"></map-comp>
    <q-inner-loading :showing="!loaded" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import MapComp from "/src/components/map/MapComp.vue";
import { useAuthStore } from "src/stores/auth";
import { mapState } from 'pinia';
import api from "/src/api/index";

export default defineComponent({
  name: "MapPage",
  props: {
    filterOptions: Object
  },
  setup () {
    return {
      products: ref([]),
      currentPage: ref(1),
      pagination: ref({
        limit: 10,
        offset: 0,
        total: 1,
      }),
      loaded: ref(false),
      filtering: ref(false),
    }
  },
  components: {
    MapComp,
  },
  methods: {
    onChangeView ({ maxDistance, center }) {
      this.fetchData({ maxDistance, center })
    },
    async onChangePage(page) {
      await this.fetchData({ page });
      this.currentPage = page;
    },
    async fetchData (args = []) {
      try {
        const { page, maxDistance = 100000, center } = args;
        if (page) {
          this.pagination.offset = (page - 1) * this.pagination.limit;
        }
        const latlng = center
          ? center.join(',')
          : (this.filterOptions.city
            ? this.filterOptions.city.lat_long
            : (this.user && this.user.city ? this.user.city.lat_long : '')
          );
        const params = {};
        Object.keys(this.filterOptions).forEach((key) => {
          if (typeof this.filterOptions[key] === 'object' && (Object.keys(this.filterOptions[key]).includes('min'))) {
            params[key] = `${this.filterOptions[key].min},${this.filterOptions[key].max}`
          } else {
            params[key] = this.filterOptions[key];
          }
        });
        const result = await api.product.productFindAll({
          limit: this.pagination.limit,
          offset: this.pagination.offset,
          sorting: 'cteaedAt: -1',
          categoryId: this.filterOptions.category ? this.filterOptions.category.id: '',
          latlng,
          isMap: true,
          maxDistance,
          ...params
        });

        if (result.status === 200) {
          const products = result.data.data.productFindAll.hits;
          this.products = products;
          this.pagination = result.data.data.productFindAll.pagination;
          this.$refs.mapComponent.onAddingMarker({ markers: this.products });
          
          if (!center) {
            const latlng = this.user && this.user.city ? this.user.city.lat_long : '';
            const location = latlng ? {
              latitude: latlng.split(',')[0],
              longitude: latlng.split(',')[1]
            }: {};

            this.$refs.mapComponent.setCurrentPositionMap({ location });
          }
        }

        this.loaded = true;

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
  mounted () {
    // this.$nextTick(function () {
      // this.fetchData();
    // });
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
});
</script>
