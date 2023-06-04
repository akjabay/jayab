import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/index'
import _axios from "./api/request";
import './plugins/base'
import * as jalaliMoment from 'vue-jalali-moment'
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";

Vue.config.productionTip = false

Vue.use(jalaliMoment);

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App),
    mounted () {
      this.$store.dispatch("auth/tryAutoLogin");
      if (!this.$store.state.auth.baseURL) {
          this.$store.dispatch(
              "auth/setBaseUrl",
              _axios.defaults.baseURL
          );
      }
    }
}).$mount('#app')
