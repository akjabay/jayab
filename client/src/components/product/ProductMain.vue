<template>
  <div class="q-ma-sm q-pa-sm q-ma-sm">
    
    <div class="row">
      <div class="col-12 col-md-5 col-sm-5 col-xs-12 q-pa-xs">
        
        <div class="row">
          <user-small-comp class="col-6" :user="product.userId"></user-small-comp>
          <div class="col-6" v-if="product.userId && user && user.id">
            <div v-if="product.userId.id === user.id">
              <div class="q-px-md">
                  <span class="">{{ $t('publicMode') }}</span>
                  <q-toggle v-model="isPublic" @click="onToggle" icon="dark_mode" />
              </div>
            </div>
          </div>

        </div>
        <hr class="line-style-two" />

        <div class="ad-product-card-title text-bold">{{ product.name }}</div>
        
        <category-comp :category="product.categoryId"></category-comp>

        <div class="q-my-sm">
          {{ product.address }}
        </div>
        <div v-if="product.userId && isUserLoggedIn && (user.id == product.userId.id || user.is_superuser == 1)" class="q-my-sm">
          {{ $t('owner') + ': ' + product.ownerInfo }}
        </div>
        <div class="q-my-sm">
          {{ $t('area') + ': ' + product.area }}
        </div>
        <div v-if="product.price" class="ad-box q-my-sm">
          {{
            product.price.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}
          ت
        </div>
        <div v-if="product.pricePerMeter" class="ad-box q-my-sm">
          {{
            $t('perMeter') + ' ' +
            product.pricePerMeter.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}
          ت
        </div>

        <div class="row justify-center q-my-sm" v-if="product.userId && product.userId.phone">

           <q-btn @click="onShowPhone" size="lg" class="ad-font-color" outline rounded>
            <span>{{ showingPhone }} </span>
             <a v-if="showingPhone" class="" :href="`tel:${product.userId.phone}`">
              <span class="q-px-lg q-py-xs q-mr-lg bg-green" style="border-radius: 25pc; color: white;">
                <q-icon size="sm" class="q-px-sm" name="fa fa-phone" />
              </span>
            </a>
            <span v-else>{{ $t('showPhone') }}</span>
           </q-btn>

        </div>
      </div>
      <div v-if="product.images && product.images.length > 0" class="col-12 col-md-7 col-sm-7 col-xs-12 q-pa-xs">
        <q-carousel
          class="q-my-sm"
          v-model="slide"
          :arrows="product.images && product.images.length > 1"
          :navigation="product.images && product.images.length > 1"
          infinite
          control-color="primary"
          control-type="outline"
          style=""
        >
          <q-carousel-slide
            v-for="(imageObj, i) in product.images"
            :key="i"
            :name="i"
            :img-src="$api.getImageUrl($q.screen, imageObj.url, undefined, undefined, true)"
          >
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>

    <map-comp ref="map" :liteMode="true" :signleMode="true" :zoom="15" mapWidth="50vh"></map-comp>

    <div class="row q-my-sm">
      <date-comp :date="product.createdAt"></date-comp>
      <q-space />
      <actions-comp v-if="product" :item="product"></actions-comp>
    </div>

    <q-separator />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import CategoryComp from "/src/components/main/CategoryComp.vue";
import DateComp from "/src/components/main/DateComp.vue";
import ActionsComp from "/src/components/main/ActionsComp.vue";
import UserSmallComp from "/src/components/user/UserSmallComp.vue";
import MapComp from "/src/components/map/MapComp.vue";
import { useAuthStore } from "src/stores/auth";
import { mapState } from "pinia";
import api from "/src/api/index";


export default defineComponent({
  name: "ProductMain",
  props: {
    product: Object,
  },
  components: {
    CategoryComp,
    DateComp,
    ActionsComp,
    MapComp,
    UserSmallComp,
  },
  setup() {
    return {
      showingPhone: ref(''),
      slide: ref(0),
      isPublic: ref(false),
    };
  },
  methods: {
    onShowPhone () {
      if (!this.showingPhone) {
        this.showingPhone = this.product.userId.phone;
      }
    },
    onToggle: async function () {
      try {
        const result = await api.product.productUpdate({
          pid: this.product.pid,
          isPublic: this.isPublic,
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
    fetchData: function () {
      if (this.product && this.product.latlng) {
        const latlng = this.product.latlng;
        const location = latlng ? {
          latitude: latlng.split(',')[0],
          longitude: latlng.split(',')[1]
        }: {};
        this.$refs.map.setCurrentPositionMap({ location });
        this.$refs.map.onAddingMarker({ markers: [this.product] });
        this.isPublic = this.product.isPublic;
      } else {
        setTimeout(() => {
          this.fetchData();
        }, 100)
      }
    }
  },
  computed: {
    ...mapState(useAuthStore, ["isUserLoggedIn", "user"]),
  },
  mounted () {
    this.fetchData();
  }
});
</script>

<style>
.ad-product-card-title {
  font-size: 18px;
  color: #00548c;
  margin: 2rem 0.25rem;
}
</style>
