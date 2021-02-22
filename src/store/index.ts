import {createStore} from 'vuex'
import axios from "axios";
// import {accessToken} from "mapbox-gl";


const store = createStore({
    state: {
        cities: [],
        zoom:12,
        latittude: 45.900002,
        longitude: 6.11667,
        iconSize: [41,41],
        date: Date,
    },
    mutations: {
        setCities: (state, cities) => (state.cities = cities),
        setDate: (state, date) => (state.date = date),
    },
    actions: {
        async fetchCities({commit,dispatch}) {
           await axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                .then((resp) => {
                    let cities = [];
                    let alldatas = resp.data.list;
                    for (const {
                        name,
                        weather: [{description: weather}],
                        weather: [{icon: icon}],
                        coord: {lat:lat, lon:lon},
                        main: {temp: temperature},
                        dt: updatedAt
                    } of alldatas) {
                        cities.push({
                            name,
                            weather,
                            icon,
                            temperature,
                            lat,
                            lon,
                            updatedAt: new Date(updatedAt * 1000)
                        });
                    }
                    console.log(cities);
                    commit('setCities', cities);
                    let dateOfGet = new Date().toLocaleDateString();
                    commit('setDate', dateOfGet);
                    setTimeout(() => {
                        dispatch("fetchCities")
                    }, 1000)
                    return cities;

                });

        },

    },
    getters: {
        fetchCities: state => state.cities,

    }
    ,
    modules: {}
})

export default store;


