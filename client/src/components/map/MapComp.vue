<template>
  <div class="map-box">
    <div id="map"></div>
    <map-add-point-comp
      v-if="!liteMode"
      ref="pointAddDialog"
      v-on:on-submit-point="onSubmitPoint"
    ></map-add-point-comp>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw/dist/leaflet.draw.js";
import MapAddPointComp from "/src/components/map/MapAddPointComp.vue";

export default defineComponent({
  name: "MapComp",
  components: {
    MapAddPointComp,
  },
  props: {
    currentLocation: Object,
    zoom: {
      type: Number,
      default: 9,
    },
    mapWidth: {
      type: String,
      default: "80vh",
    },
    liteMode: {
      type: Boolean,
      default: false,
    },
    singleMode: {
      type: Boolean,
      default: false,
    },
    isAdding: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      map: ref({}),
      markers: ref([]),
      addDialog: ref(false),
      zoomLevel: ref(9),
    };
  },
  methods: {
    onClickToMap(ev) {
      if (this.isAdding) {
        this.$refs.pointAddDialog.onShaw({ ev });
      }
    },
    onClickToMarker(ev) {
      const marker = this.markers.find(
        (m) => m.latlng === `${ev.latlng.lat},${ev.latlng.lng}`
      );
      if (!this.singleMode && this.liteMode) {
        if (marker) {
          this.$router.push("/products/" + marker.pid);
        }
      } else {
        if (this.isAdding) {
          this.$refs.pointAddDialog.onSetInfo({ marker });
        }
      }
    },
    onSubmitPoint({ updatedMarker, newMarker }) {
      if (updatedMarker) {
        const updatingMarker = updatedMarker;
        updatingMarker.images = updatedMarker.images.map((imgUrl) => {
          return { url: imgUrl };
        });
        const updatingIdx = this.markers.findIndex(
          (m) => m.pid === updatedMarker.pid
        );
        this.markers[updatingIdx] = updatingMarker;
        this.setMarkerOnMap({ marker: updatingMarker });
      }
      if (newMarker) {
        const addingMarker = newMarker;
        if (newMarker.images && newMarker.images.length > 0) {
          addingMarker.images = newMarker.images.map((imgUrl) => {
            return { url: imgUrl };
          });
        }
        this.markers.push(addingMarker);
        this.setMarkerOnMap({ marker: addingMarker });
      }
    },
    onAddingMarker({ markers = [] }) {
      const _this = this;
      if (this.map && this.map.eachLayer) {
        this.map.eachLayer((layer) => {
          if (layer._latlng) {
            layer.remove();
          }
        });
        markers.forEach((m) => {
          _this.setMarkerOnMap({ marker: m });
        });
        this.markers = markers;
      }
    },
    setMarkerOnMap({ marker }) {
      if (marker && marker.latlng) {
        const _this = this;
        const latlng = marker.latlng.split(",");
        L.marker(latlng)
          .bindTooltip(`${marker.area}متر`, {
            permanent: true,
          })
          .bindPopup(`${marker.name} ${marker.area}متر`)
          .addTo(this.map)
          .on("click", function (ev) {
            _this.onClickToMarker(ev);
          });
      }
    },
    setCurrentPositionMap({ location = "" } = []) {
      const currentLocation = location ? location : this.currentLocation;
      const current = [
        currentLocation && currentLocation.latitude
          ? currentLocation.latitude
          : "35.7219",
        currentLocation && currentLocation.longitude
          ? currentLocation.longitude
          : "51.3347",
      ];
      if (current[0]) {
        const position = current;
        this.map.setView(position, this.zoomLevel);
      }
    },
    drawOnMap(args = []) {
      const { latlngs = [], color = "red" } = args;
      // create a red polyline from an array of LatLng points

      const polyline = L.polyline(latlngs, { color }).addTo(this.map);

      // zoom the map to the polyline
      this.map.fitBounds(polyline.getBounds());
    },
    setComp: function () {
      const _this = this;

      const map = L.map("map");

      const osm = L.tileLayer(
        "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
        }
      ).addTo(map);
      const gm = L.tileLayer(
        "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
        {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        }
      );

      const baseMaps = {
        OpenStreetMap: osm,
        GMap: gm,
      };

      const overlays = {
        //add any overlays here
      };

      L.control
        .layers(baseMaps, overlays, { position: "bottomleft" })
        .addTo(map);

      if (!this.liteMode) {
        map.on("click", function (ev) {
          _this.onClickToMap(ev);
        });
      }

      // detect zoom
      map.on("zoomend", function (ev) {
        _this.zoomLevel = ev.target._zoom;
      });

      map.on("moveend", function (e) {
        const bounds = map.getBounds();
        const center = [
          (bounds._northEast.lat + bounds._southWest.lat) / 2,
          (bounds._northEast.lng + bounds._southWest.lng) / 2,
        ];
        const maxDistance = +bounds._northEast
          .distanceTo(bounds._southWest)
          .toFixed(0);
        _this.$emit("on-change-view", { maxDistance, center });
      });

      this.map = map;

      this.setCurrentPositionMap();
    },
  },
  mounted() {
    this.zoomLevel = this.zoom;
    this.setComp();
  },
});
</script>

<style>
.map-box {
  height: v-bind(mapWidth);
}
#map {
  position: inherit;
  height: v-bind(mapWidth);
}
</style>
