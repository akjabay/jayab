<template>
  <q-page>
    <div class="row justify-center q-my-xs">
      <q-btn-group push>
        <q-btn :outline="view === 'list'" :class="view === 'list' ? 'ad-font-color' : ''" @click="onClickToView" :label="$t('list')" icon="list" />
        <q-btn :outline="view === 'map'" :class="view === 'map' ? 'ad-font-color' : ''" @click="onClickToView" :label="$t('map')" icon="map" />
      </q-btn-group>
    </div>
    <list-page v-if="view === 'list'"></list-page>
    <map-page v-else-if="view === 'map'"></map-page>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import ListPage from "/src/pages/items/ListPage.vue";
import MapPage from "/src/pages/items/MapPage.vue";


export default defineComponent({
  name: "ItemsPage",
  setup () {
    return {
      view: ref('list'),
    }
  },
  components: {
    ListPage,
    MapPage,
  },
  methods: {
    onClickToView () {
      this.view = this.view === 'list' ?'map' : 'list';
      this.$router.replace('/items/' + this.view)
    }
  },
  computed: {
  },
  mounted () {
    const view = this.$route.params.view;
    ['list', 'map'].includes(view) ? this.view = view : '';
  }
});
</script>
