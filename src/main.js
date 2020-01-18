import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import "vue-resize/dist/vue-resize.css";
import VueResize from "vue-resize";
Vue.use(VueResize);
Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
