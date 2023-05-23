import { createApp } from "vue";
import App from "./App.vue";
// configuration du router
import router from "./router/index.js";

const app = createApp(App);
// indiquer que l'applu utilise le router
app.use(router);
app.mount("#app");
