import {createRouter, createWebHashHistory} from 'vue-router';
import CitiesList from "@/components/CitiesList.vue";
import CitiesMap from "../components/CitiesMap.vue";
import City from "@/components/City.vue";
import Search from "@/components/Search.vue";
import EasterEgg from "@/components/EasterEgg.vue";


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/villes',
            component: CitiesList
        },
        {
            path: '/carte',
            component: CitiesMap
        },
        {
            path: '/ville',
            component: City
        },
        {
            path: '/search',
            component: Search
        },
        {
            path: '/onenagros',
            name: 'EasterEgg',
            component: EasterEgg
        }]
});

export default router;