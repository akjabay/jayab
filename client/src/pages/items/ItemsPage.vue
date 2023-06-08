<template>
  <q-page>
    <div class="row justify-center q-my-sm">
      <div class="col-md-2 col-sm-2 col-xs-2"></div>
      <div class="col-md-8 col-sm-8 col-xs-8 text-center">
        <q-btn-group push class="">
          <q-btn :outline="view === 'list'" :class="view === 'list' ? 'ad-font-color' : ''" @click="onClickToView('list')" :label="$t('list')" icon="list" />
          <q-btn :outline="view === 'map'" :class="view === 'map' ? 'ad-font-color' : ''" @click="onClickToView('map')" :label="$t('map')" icon="map" />
        </q-btn-group>
      </div>
      <div class="col-md-2 col-sm-2 col-xs-2" :class="$t('direction') === 'rtl' ? 'text-left' : 'text-right'">
        <q-btn @click="filtering = !filtering" outline class="ad-font-color q-mx-xs" no-caps>
          <q-icon class="" size="1.5em" v-if="filtering" name="fas fa-caret-up" />
          <q-icon class="" size="1.5em" v-else name="fa fa-filter" />
        </q-btn>
      </div>
    </div>
    
    <div v-if="filtering">
      <filter-comp ref="filterComp" v-on:on-change-filter="onChangeFilter" :filterOptions="filterOptions"></filter-comp>
      <div class="row">
        <q-space></q-space>
        <q-btn @click="onResetFilter" outline class="q-ma-xs ad-font-color" :label="$t('clean')" no-caps></q-btn>
        <q-btn @click="fetchData" class="q-ma-xs ad-primary-btn" :label="$t('search')" no-caps>
          <q-icon class="q-pr-md" name="fa fa-magnifying-glass"/>
        </q-btn>
      </div>
    </div>

    <list-page v-if="view === 'list'" ref="listComp" :filterOptions="filterOptions" ></list-page>
    <map-page v-else-if="view === 'map'" ref="mapComp" :filterOptions="filterOptions" ></map-page>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import ListPage from "/src/pages/items/ListPage.vue";
import MapPage from "/src/pages/items/MapPage.vue";
import FilterComp from "/src/components/main/FilterComp.vue";


export default defineComponent({
  name: "ItemsPage",
  setup () {
    return {
      filtering: ref(false),
      view: ref('list'),
      filterOptions: ref({}),
    }
  },
  components: {
    ListPage,
    MapPage,
    FilterComp
  },
  methods: {
    onResetFilter () {
      this.filterOptions = {};
      this.$refs.filterComp.resetState();
    },
    onChangeFilter (filter) {
      this.filterOptions = filter;
    },
    onClickToView (next) {
      if (this.view !== next) {
        this.view = this.view === 'list' ? 'map' : 'list';
        this.$router.replace('/items/' + this.view);
        this.$nextTick(function () {
          this.fetchData();
        })
      }
    },
    fetchData () {
      if (this.view === 'list') {
        this.$refs.listComp.fetchData();
      } else if (this.view === 'map') {
        this.$refs.mapComp.fetchData();
      }
    }
  },
  computed: {
  },
  mounted () {
    const view = this.$route.params.view;
    ['list', 'map'].includes(view) ? this.view = view : '';
    const filterItems = this.$route.query.filterOptions;
    if (filterItems) {
      const parsedVals = JSON.parse(filterItems);
      Object.keys(parsedVals).forEach((key) => {
        this.filterOptions[key] = parsedVals[key];
      });
    }
    this.fetchData();
  }
});
</script>
