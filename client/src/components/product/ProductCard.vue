<template>
  <q-card flat class="q-ma-sm ad-fixed-card ad-box-bordered">
    <q-img
      v-if="product && product.images.length > 0"
      class="text-pointer"
      @click="$router.push('/products/' + product.pid)"
      style="width: 236px; max-height: 177px;"
      :src="$api.getImageUrl($q.screen, product.images[0].url)"
    />
    <q-img
      v-else
      class="text-pointer"
      @click="$router.push('/products/' + product.pid)"
      style="width: 236px; max-height: 177px;"
      src="/src/assets/images/no-image.svg"
    />

    <q-card-section class="">
      <a
        @click="$router.push('/products/' + product.pid)"
        class="ad-box-t text-bold text-pointer"
      >
        {{ product.name }}
      </a>
      <!-- <date-comp :date="product.createdAt"></date-comp> -->
      <!-- <category-comp :category="product.categoryId"></category-comp> -->

      <div
        class="col-5"
        v-if="product.price"
        :class="$t('direction') == 'rtl' ? 'text-left' : 'text-right'"
      >
        <div class="ad-box-date">
          {{
            product.price.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}
          ت
        </div>
      </div>
      <div
        class="col-5"
        v-if="product.pricePerMeter"
        :class="$t('direction') == 'rtl' ? 'text-left' : 'text-right'"
      >
        <div class="ad-box-date">
          {{
            $t('perMeter') + ' ' +
            product.pricePerMeter.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}
          ت
        </div>
      </div>
    </q-card-section>

    <!-- <q-separator /> -->
    <!-- <q-card-actions>
      <div class="col-7">
        <actions-comp v-if="product" :item="product"></actions-comp>
      </div>
      <div
        class="col-5"
        :class="$t('direction') == 'rtl' ? 'text-left' : 'text-right'"
      >
        <q-btn @click="$router.push('/products/' + product.pid)" flat no-caps>
          <div class="ad-box-date">
            {{ $t("open") }}
          </div>
        </q-btn>
      </div>
    </q-card-actions> -->
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
// import CategoryComp from "/src/components/main/CategoryComp.vue";
// import DateComp from "/src/components/main/DateComp.vue";
// import ActionsComp from "/src/components/main/ActionsComp.vue";

export default defineComponent({
  name: "ProductCard",
  props: {
    product: Object,
  },
  components: {
    // CategoryComp,
    // DateComp,
    // ActionsComp,
  },
});
</script>

<style>
.ad-product-card-title {
  font-size: 18px;
  color: #00548c;
}
</style>
