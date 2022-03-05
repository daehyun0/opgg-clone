import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// stylesheets
import "@/styles/default.scss";

const app = createApp(App);
app.use(createPinia());
app.mount("#app");
