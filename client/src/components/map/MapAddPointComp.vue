<template>
  <div>
    <q-dialog
      v-model="dialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
      :style="{ direction: $t('direction') === 'rtl' ? 'rtl' : 'ltr' }"
    >
      <q-card
        class="ad-font-color"
        style="width: 600px"
      >
        <q-card-section>
          <sub-title-comp :title="info.pid ? $t('updateProduct'): $t('addProduct')"></sub-title-comp>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pt-none scroll" style="max-height: 60vh">
          <div class="q-py-sm q-mx-sm">
            <div class="text-center">
              <filter-comp
                v-on:on-change-filter="onChangeFilter"
                :fetchedCategory="info.category"
                :onlySelect="true"
              ></filter-comp>

              <q-input
                required
                outlined
                class="q-mt-sm text-right"
                v-model="info.name"
                :rules="[rules.required]"
                :label="$t('productTitle')"
                :style="{ direction: $t('direction') }"
              ></q-input>
              <q-input
                required
                outlined
                class="q-mt-sm text-right"
                v-model="info.address"
                :rules="[rules.required]"
                :label="$t('inputAddress')"
                :style="{ direction: $t('direction') }"
              ></q-input>
              <div class="row">
                <q-input
                  required
                  outlined
                  class="col-md-6 col-sm-6 col-xs-6 q-px-xs q-mt-sm text-right"
                  v-model="info.area"
                  type="number"
                  :rules="[rules.required]"
                  :label="$t('inputArea')"
                  :style="{ direction: $t('direction') }"
                ></q-input>
                <q-input
                  outlined
                  class="col-md-6 col-sm-6 col-xs-6 q-px-xs q-mt-sm text-right"
                  v-model="info.areaOfBuilding"
                  type="number"
                  :rules="[]"
                  :label="$t('inputAreaOfBuilding')"
                  :style="{ direction: $t('direction') }"
                ></q-input>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12 text-right q-my-md">
                <div class="text-normal">{{ $t('inputRooms') }}</div>
                <q-slider
                  v-model="info.rooms"
                  class="ad-font-color"
                  label-always
                  :min="0"
                  :max="5"
                  :step="1"
                />
              </div>
              <q-input
                required
                filled
                autogrow
                class="q-mt-sm text-right"
                v-model="info.ownerInfo"
                :rules="[rules.required]"
                :label="$t('inputOwnerInfo')"
                :style="{ direction: $t('direction') }"
              ></q-input>
              <div>
                <sub-title-comp :title="$t('price')"></sub-title-comp>
                <q-input
                  required
                  outlined
                  class="q-mt-sm text-right"
                  v-model="info.price"
                  type="number"
                  :rules="[]"
                  :label="$t('inputPrice')"
                  :style="{ direction: $t('direction') }"
                ></q-input>
                <q-input
                  outlined
                  class="q-mt-sm text-right"
                  v-model="info.pricePerMeter"
                  type="number"
                  :rules="[]"
                  :label="$t('inputPricePerMeter')"
                  :style="{ direction: $t('direction') }"
                ></q-input>
              </div>
              <q-input
                filled
                class="q-mt-md text-right"
                type="textarea"
                v-model="info.details"
                :rules="[]"
                :label="$t('inputDatails')"
                :style="{ direction: $t('direction') }"
              ></q-input>

            </div>
          </div>

          <sub-title-comp :title="$t('image')"></sub-title-comp>

          <div class="q-py-sm q-mx-sm">
            <div class="row text-center justify-center">
              <image-uploader-comp
                v-for="img in imageBoxs"
                :key="img"
                :fetchedImage="img"
                :boxLength="imageBoxs.length"
                v-on:image-inputs="imageInput"
                v-on:remove-image-input="removeImageInput"
                v-on:delete-image-box="
                  (val) => (imageBoxs = imageBoxs.filter((idx) => idx != val))
                "
                :imageIdx="img"
              >
              </image-uploader-comp>
              <q-card
                flat
                outlined
                style="width: 100px"
                class="q-ma-xs q-py-md q-px-sm text-center"
              >
                <div class="row text-center">
                  <q-btn
                    flat
                    class="text-center"
                    @click="
                      imageBoxs.push(`${Math.floor(Math.random() * 1000000)}`)
                    "
                  >
                    <q-icon name="mdi-plus"></q-icon>
                  </q-btn>
                </div>
              </q-card>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions
          :align="$t('direction') === 'rtl' ? 'right' : 'left'"
          class="bg-white text-teal"
        >
          <q-btn color="red" flat :label="$t('cancel')" v-close-popup />
          <q-space />
          <q-btn color="primary" :label="$t('submit')" @click="onSubmit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import FilterComp from "/src/components/main/FilterComp.vue";
import ImageUploaderComp from "/src/components/main/ImageUploaderComp.vue";
import SubTitleComp from "/src/components/main/SubTitleComp.vue";
import api from "/src/api/index";

export default defineComponent({
  name: "MapAddPointComp",
  components: {
    FilterComp,
    ImageUploaderComp,
    SubTitleComp
  },
  props: {},
  setup() {
    return {
      dialog: ref(false),
      info: ref({
        pid: "",
        latlng: "",
        name: "",
        address: "",
        area: "",
        pricePerMeter: "",
        areaOfBuilding: "",
        rooms: 0,
        details: "",
        ownerInfo: "",
        category: {},
        price: undefined,
      }),
      filterOptions: ref({}),
      rules: ref({}),
      imageBoxs: ref([]),
      images: ref([]),
    };
  },
  methods: {
    imageInput(filename) {
      this.images.push(filename);
    },
    removeImageInput(filename) {
        const index = this.images.findIndex((e) => {
            return e != filename;
        });
        if (index > -1) {
            this.images.splice(index, 1);
        }
    },
    onSetInfo(args = []) {
      const { marker } = args;
      Object.keys(marker).forEach((key) => {
        this.info[key] = marker[key];
      })
      this.info.category = marker.categoryId && marker.categoryId.id ? marker.categoryId : marker.category;
      if (marker.images && marker.images.length > 0) {
        this.info.imageUrls = marker.images.map((img) => img.url);
        this.imageBoxs = this.info.imageUrls;
        this.images = this.info.imageUrls;
      }
      this.dialog = true;
    },
    onShaw(args = []) {
      const { ev = {} } = args;
      const { latlng = {} } = ev;
      this.info = {
        pid: "",
        latlng: "",
        name: "",
        address: "",
        area: "",
        pricePerMeter: "",
        areaOfBuilding: "",
        rooms: 0,
        details: "",
        ownerInfo: "",
        category: {},
        price: undefined,
      };
      this.imageBoxs = [];
      this.images = []
      this.info.latlng = latlng.lat + ',' + latlng.lng;
      this.dialog = true;
    },
    onChangeFilter(filter) {
      this.filterOptions = filter;
    },
    async onSubmit() {
      try {
        this.info.imageUrls = this.images;
        this.info.category = this.filterOptions.category;
        this.info.categoryId = this.filterOptions.category.id;
        if (this.info.pid) {
          const result = await api.product.productUpdate({
            imageUrls: this.info.imageUrls,
            ...this.info
          });
  
          if (result.status === 200) {
            this.$emit('on-submit-point', { updatedMarker: this.info });
            this.$q.notify({
              type: "positive",
              message: this.$t("success"),
              caption: this.$t("success"),
            });
            this.dialog = false;
          }
        } else {
          const result = await api.product.productCreate({
            imageUrls: this.info.imageUrls,
            ...this.info
          });
  
          if (result.status === 200) {
            this.$emit('on-submit-point', { newMarker: this.info });
            this.$q.notify({
              type: "positive",
              message: this.$t("success"),
              caption: this.$t("success"),
            });
            this.dialog = false;
          }
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
    this.rules = {
      required: (v) => !!v || this.$t("required"),
      min3: (v) => v.length >= 3 || this.$t("min3Character"),
      min8: (v) => v.length >= 8 || this.$t("min8Character"),
      email: (v, rules) => rules.email(v) || this.$t("havetoBeValidEmail"),
    };
  },
});
</script>

<style></style>
