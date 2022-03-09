import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import '../src/assets/styles/main.scss'
const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
