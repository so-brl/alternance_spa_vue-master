import {createStore} from 'vuex'
import axios from "axios";




const store = createStore({
    state: {
        cities: [{}],
        date:Date,
    },
    mutations: {
        setCities: (state, cities) => (state.cities = cities),
        setDate: (state, date) => (state.date = date)
    },
    actions: {
        async fetchCities({commit}) {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                .then((resp) => {

                    let cities = [];
                    let alldatas = resp.data.list;
                      for (const {name, weather: [{description: weather}], main: {temp: temperature}, dt: updatedAt
                      } of alldatas) {
                        cities.push({name, weather, temperature, updatedAt: new Date(updatedAt * 1000)
                        });
                      }

                      return cities;
                });
            setTimeout(() => {
                let date = new Date();

                commit('setCities', response)
                commit('setDate',    date.toLocaleDateString('fr'))
            }, 1000)

        },

    },
    getters: {
        fetchCities: state => state.cities,
        getDate : state => state.date
    },
    modules: {}
})

export default store;


