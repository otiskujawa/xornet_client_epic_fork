import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import api from "@/services/api.js";
import hljsVuePlugin from "@highlightjs/vue-plugin";

import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import "windi.css";

String.prototype.toCapitalized = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

let app = createApp(App);
app.use(router);
app.use(hljsVuePlugin, {
  languages: {
    javascript,
    json
  }
});
app.config.globalProperties.api = api;
app.mount("#app");
