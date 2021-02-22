import {createRouter, createWebHashHistory} from 'vue-router';
import CitiesList from "@/components/CitiesList.vue";
import CitiesMap from "../components/CitiesMap.vue";
import City from "@/components/City.vue";
import EasterEgg from "@/components/EasterEgg.vue";


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/villes',
            name: 'CitiesList',
            component: CitiesList
        },
        {
            path: '/carte',
            name: 'CitiesMap',
            component: CitiesMap
        },
        {
            path: '/ville',
            name: 'City',
            component: City
        },
        {
            path: '/onenagros',
            name: 'EasterEgg',
            component: EasterEgg
        }]
});

export default router;