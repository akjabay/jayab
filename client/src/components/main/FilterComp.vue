<template>
  <div>
    <div class="row">
      <select-comp
        :class="onlySelect ? 'col-md-12 col-sm-12 col-xs-12' : 'col-md-6 col-sm-6 col-xs-6'"
        :items="categories"
        :item="filter.category"
        v-on:on-select-item="onSelectCategory"
      ></select-comp>
      <div class="col-md-6 col-sm-6 col-xs-6" v-if="!onlySelect">
        <city-comp
          :items="provinces"
          :item="filter.city"
          v-on:on-select-item="onSelectCity"
        ></city-comp>

      </div>
      <div class="col-12 col-md-12 col-sm-12 col-xs-12">

        <div v-if="!onlySelect" class="row q-mx-md">
          <div class="col-md-12 col-sm-12 col-xs-12 q-px-sm">
            <q-separator class="q-my-xs" />
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12 q-px-sm">
            <div class="row justify-center">
              <div class="col-md-6 col-sm-6 col-xs-6">
                <q-input
                  outlined
                  square
                  dense
                  class="q-my-xs q-pa-none"
                  type="number"
                  min="0"
                  @change="onChangeFilter"
                  v-model="filter.price.min"
                  :rules="[]"
                  :label="$t('min') + ' ' + $t('inputPrice') + ' ' + $t('total')"
                ></q-input>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-6">
                <q-input
                  outlined
                  square
                  dense
                  class="q-my-xs q-pa-none"
                  type="number"
                  min="0"
                  @change="onChangeFilter"
                  v-model="filter.price.max"
                  :rules="[]"
                  :label="$t('max') + ' ' + $t('inputPrice') + ' ' + $t('total')"
                ></q-input>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12 q-px-sm">
            <div class="row justify-center">
              <div class="col-md-6 col-sm-6 col-xs-6">
                <q-input
                  outlined
                  square
                  dense
                  class="q-my-xs q-pa-none"
                  type="number"
                  min="0"
                  @change="onChangeFilter"
                  v-model="filter.pricePerMeter.min"
                  :rules="[]"
                  :label="$t('min') + ' ' + $t('inputPricePerMeter')"
                ></q-input>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-6">
                <q-input
                  outlined
                  square
                  dense
                  class="q-my-xs q-pa-none"
                  type="number"
                  min="0"
                  @change="onChangeFilter"
                  v-model="filter.pricePerMeter.max"
                  :rules="[]"
                  :label="$t('max') + ' ' + $t('inputPricePerMeter')"
                ></q-input>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12 q-px-sm">
            <q-separator class="q-my-xs" />
            <div class="text-normal">{{ $t('inputRooms') }}</div>
            <q-slider
              v-model="filter.rooms"
              class="ad-font-color"
              @change="onChangeFilter"
              label-always
              :min="0"
              :max="5"
              :step="1"
            />
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12 q-px-sm">
            <q-separator class="q-my-xs" />
            <div class="text-normal">{{ $t('totalArea') }}</div>
            <q-range
              v-model="filter.area"
              class="ad-font-color"
              @change="onChangeFilter"
              label-always
              :min="10"
              :max="2000"
              :step="5"
            />
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12 q-px-sm">
            <q-separator class="q-my-xs" />
            <div class="text-normal">{{ $t('inputAreaOfBuilding') }}</div>
            <q-range
              v-model="filter.areaOfBuilding"
              class="ad-font-color"
              @change="onChangeFilter"
              label-always
              :min="10"
              :max="2000"
              :step="5"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref } from "vue";
  import SelectComp from '/src/components/main/SelectComp.vue';
  import CityComp from '/src/components/main/CityComp.vue';
  import api from "/src/api/index";
  
  export default defineComponent({
    name: "FilterComp",
    props: {
      onlySelect: Boolean,
      fetchedCategory: Object,
      filterOptions: Object
    },
    components: {
      SelectComp,
      CityComp,
    },
    setup() {
      return {
        categories: ref([]),
        provinces: ref([]),
        cities: ref([]),
        filter: ref({
          rooms: 0,
          area: {
            min: 10,
            max: 500
          },
          pricePerMeter: {
            min: '',
            max: ''
          },
          areaOfBuilding: {
            min: 10,
            max: 500
          },
          city: {},
          category: {},
          price: {
            min: '',
            max: ''
          },
        }),
        rules: ref({})
      };
    },
    // watch: {
    //   'filter.price.min': function(newValue) {
    //     const result = newValue.replace(/\D/g, "")
    //       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //     this.$nextTick(() => this.filter.price.min = result);
    //   }
    // },
    methods: {
      onSelectCity (v) {
        this.filter.city = v;
        this.$emit('on-change-filter', this.filter)
      },
      onSelectCategory (v) {
        this.filter.category = v;
        this.$emit('on-change-filter', this.filter)
      },
      onChangeFilter () {
        this.$emit('on-change-filter', this.filter)
      },
      async fetchData() {
        try {
          const result = await api.main.categoryFindAll();
          if (result.status === 200) {
            const scategories = result.data.data.categoryFindAll;
            this.categories = scategories;
          }

          const _result = await api.main.getProvinces();
          if (_result.status === 200) {
            const provinces = _result.data.data;
            this.provinces = provinces;
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
      resetState () {
        this.filter = {
          rooms: 0,
          area: {
            min: 10,
            max: 500
          },
          pricePerMeter: {
            min: '',
            max: ''
          },
          areaOfBuilding: {
            min: 10,
            max: 500
          },
          city: {},
          category: {},
          price: {
            min: '',
            max: ''
          },
        }
      },
      initializeState () {
        const filterOptions = this.filterOptions ? this.filterOptions : {};
        Object.keys(filterOptions).forEach((key) => {
          this.filter[key] = filterOptions[key];
        })
        const category = filterOptions.category ? filterOptions.category : this.fetchedCategory;

        if (category && category.id) {
          this.onSelectCategory(category);
        }

        if (filterOptions.city && filterOptions.city.id) {
          this.onSelectCity(filterOptions.city)
        }
      }
    },
    mounted() {
      this.fetchData();
      this.initializeState();

      this.rules = {
        required: (v) => !!v || this.$t("required"),
        min3: (v) => v.length >= 3 || this.$t("min3Character"),
        min8: (v) => v.length >= 8 || this.$t("min8Character"),
        is10: (v) => v.length == 10 || this.$t("is10Character"),
        email: (v, rules) => rules.email(v) || this.$t("havetoBeValidEmail"),
      };
    },
  });
  </script>
  
  <style scoped>
  /* .q-field--square .q-field__control {
    border-radius: 50px !important;
  } */
  </style>