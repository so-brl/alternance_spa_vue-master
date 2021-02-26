import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router"
import store from '@/store'

import './../node_modules/jquery/dist/jquery.min.js';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';

import '@/assets/bootstrap.css';
import '@/assets/styles.css';

createApp(App).use(store).use(router).mount('#app');

