import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import bootstrap from 'bootstrap';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { VueSpinnersPlugin } from 'vue3-spinners';

createApp(App).use(store).use(router).use(bootstrap).use(ToastPlugin).use(VueSweetalert2).use(VueSpinnersPlugin).mount('#app')

