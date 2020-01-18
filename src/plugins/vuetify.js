import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);
import Theme from "../scss/variables/theme-light.scss";
console.log("style", Theme);
export default new Vuetify({
  options: {
    customProperties: true
  },
  theme: {
    themes: {
      light: {
        primary: "#56CBF9",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  }
});
