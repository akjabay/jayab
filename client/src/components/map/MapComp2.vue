<template>
  <div style="height:600px; width:800px">
    <p>vue-leaflet SSR Demo</p>
    <l-map :useGlobalLeaflet="false">
      <l-geo-json :geojson="geojson" :options="geojsonOptions" />
    </l-map>
  </div>
</template>

<script>
// DON'T load Leaflet components here!
// Its CSS is needed though, if not imported elsewhere in your application.
import { defineComponent, ref } from "vue";

import "leaflet/dist/leaflet.css"
import { LMap, LGeoJson } from "@vue-leaflet/vue-leaflet";

export default defineComponent({
  components: {
    LMap,
    LGeoJson,
  },
  setup: () => {
    return {
      geojson: ref({
        type: "FeatureCollection",
        features: [
          // ...
        ],
      }),
      geojsonOptions: ref({
        // Options that don't rely on Leaflet methods.
      }),
    };
  },
  methods: {
    onAddingMarker({ markers = [] }) {
      // const _this = this;
      // this.map.eachLayer((layer) => {
      //   if (layer._latlng) {
      //     layer.remove();
      //   }
      // });
      // markers.forEach((m) => {
      //   _this.setMarkerOnMap({ marker: m });
      // })
      // this.markers = markers;
    },
    setCurrentPositionMap({ location = "" } = []) {
      // const currentLocation = location ? location : this.currentLocation;
      // const current = [
      //   currentLocation && currentLocation.latitude
      //     ? currentLocation.latitude
      //     : '35.7219',
      //   currentLocation && currentLocation.longitude
      //     ? currentLocation.longitude
      //     : '51.3347',
      // ];
      // if (current[0]) {
      //   const position = current;
      //   this.map.setView(position, this.zoomLevel);
      // }
    },
  },
  async beforeMount() {
    // HERE is where to load Leaflet components!
    const { circleMarker } = await import("leaflet/dist/leaflet-src.esm");

    // And now the Leaflet circleMarker function can be used by the options:
    this.geojsonOptions.pointToLayer = (feature, latLng) =>
      circleMarker(latLng, { radius: 8 });
    this.mapIsReady = true;
  },
});
</script>