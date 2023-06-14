<template>
  <q-card
    flat
    class="q-ma-sm ad-fixed-card ad-box-bordered"
    :class="product && product.status === 'deleted' ? 'bg-red-1' : ''"
  >
    <!-- <user-small-comp class="col-6" :user="product.userId"></user-small-comp> -->
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
      src="no-image.svg"
    />

    <q-card-section class="">
      <a
        @click="$router.push('/products/' + product.pid)"
        class="text-pointer"
      >
      <span class="ad-box-t text-bold">
        {{ product.name }}
      </span>
      <span class="ad-low-opacity">
        ({{ product.area }} {{ $t('meter') }})
      </span>
      </a>
      <!-- <date-comp :date="product.createdAt"></date-comp> -->
      <category-comp class="q-my-none" :category="product.categoryId"></category-comp>

      <div
        class="col-5"
        v-if="product.price"
        :class="$t('direction') == 'rtl' ? 'text-left' : 'text-right'"
      >
        <div class="">
          <span class="text-bold">
            {{
              product.price.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </span>
          <span class="q-px-xs ad-low-opacity">
            {{ $t('toman') }}
          </span>
        </div>
      </div>
      <div
        class="col-5"
        v-if="product.pricePerMeter"
        :class="$t('direction') == 'rtl' ? 'text-left' : 'text-right'"
      >
        <div class="">
          <span class="ad-low-opacity">
            {{ $t('perMeter') + ' ' }}
          </span>
          <span class="text-bold">
            {{
              product.pricePerMeter.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </span>
          <span class="q-px-xs ad-low-opacity">
            {{ $t('toman') }}
          </span>
        </div>
      </div>

      <div class="q-mt-sm ad-low-opacity">
        {{ product.address }}
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
// import UserSmallComp from "/src/components/user/UserSmallComp.vue";
import CategoryComp from "/src/components/main/CategoryComp.vue";
// import DateComp from "/src/components/main/DateComp.vue";
// import ActionsComp from "/src/components/main/ActionsComp.vue";

export default defineComponent({
  name: "ProductCard",
  props: {
    product: Object,
  },
  components: {
    // UserSmallComp
    CategoryComp,
    // DateComp,
    // ActionsComp,
  },
});
</script>

<style>

</style>
