<template>
  <q-page>
    <div>
      <div class="text-center q-ma-sm ad-box-bordered">
        <q-toggle class="ad-font-color" v-model="isActive">
          {{ "افزودن و ویرایش ملک" }}
        </q-toggle>
      </div>
      <q-dialog v-model="isActive" seamless position="bottom">
        <q-card style="width: 350px" class="ad-box-bordered ad-font-color">
          <q-card-section class="row items-center no-wrap">
              <div>
                لطفا مکان ملک مورد نظر خود را انتخاب کنید
              </div>
              <q-space />
              <q-icon size="lg" name="fa fa-location" />
          </q-card-section>
        </q-card>
      </q-dialog>
      <map-comp :isAdding="isActive" ref="map"></map-comp>
    </div>
    <q-inner-loading :showing="!loaded" />
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
      isActive: ref(false),
      loaded: ref(false),
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

        this.loaded = false;
        if (this.$route.query && this.$route.query.adding) {
          this.isActive = true;
        }

        if (!this.user || !this.user.city) {
          this.$q.notify({
            type: "warning",
            message: this.$t("setCityIsRequired"),
            caption: this.$t("failed"),
          });
          this.$router.push('/accounts/profile/setting');
        }

        const params = {};
        if (this.filterOptions && typeof this.filterOptions === 'object') {
          Object.keys(this.filterOptions).forEach((key) => {
            if (typeof this.filterOptions[key] === 'object' && (Object.keys(this.filterOptions[key]).includes('min'))) {
              params[key] = `${this.filterOptions[key].min},${this.filterOptions[key].max}`
            } else {
              params[key] = this.filterOptions[key];
            }
          });
        }

        const result = await api.product.productFindMyProducts({
          sorting: "cteaedAt: -1",
          latlng: this.user && this.user.city ? this.user.city.lat_long : '',
          isMap: true,
          ...params
        });

        if (result.status === 200) {
          const products = result.data.data.productFindMyProducts.hits;
          this.products = products;
          this.pagination = result.data.data.productFindMyProducts.pagination;

          this.$refs.map.onAddingMarker({ markers: this.products });
          const latlng = this.user && this.user.city ? this.user.city.lat_long : '';

          const location = latlng ? {
            latitude: latlng.split(',')[0],
            longitude: latlng.split(',')[1]
          }: {};

          this.$refs.map.setCurrentPositionMap({ location });
        }
        this.loaded = true;
      } catch (error) {
        this.loaded = true;
        console.log(error);
        this.$q.notify({
          type: "negative",
          message: this.$t("failed"),
          caption: this.$t("failed"),
        });
      }
      this.loaded = true;
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
