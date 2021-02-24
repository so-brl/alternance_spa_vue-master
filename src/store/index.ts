import {createStore, useStore} from 'vuex'
import axios from "axios";
// import {accessToken} from "mapbox-gl";
// export interface State {
//     weather: Array<Object>,
// }

const store = createStore({
    state: {
        weather : [],
        results: [],
        searchCities : [],
        zoom: 12,
        latittude: 45.900002,
        longitude: 6.11667,
        iconSize: [41, 41],
        date: Date || String || Number,
    },
    mutations: {
        initStore(state){
            if (localStorage.getItem('store')){
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store')|| '{}'))
                );
            }
        },
        getWeather(state,payload){
            for (const {name, coord: {lat, lon}, weather: [{description: weather, icon: icon}], main: {temp: temperature}, dt: updatedAt} of payload) {
                // @ts-ignore
                state.weather.push({name, lat, lon, weather, icon, temperature, updatedAt: new Date(updatedAt * 1000)});
            }
        },
        //setCities: (state, cities) => (state.cities = cities),
        setDate: (state, date) => (state.date = date),
        setsearchCities: (state, results) => (state.results = results),
        setlistCitySearch:(state, searchCities) => (state.searchCities = searchCities),
    },
    actions: {
        async fetchWeather({commit,dispatch, state}) {
                let lastUpd: any = state.date.valueOf();
                let now = Date.now().valueOf();
                let countToRefresh = now - lastUpd;
                if (countToRefresh < 10000) {
                    console.log('Utilisation des données stokées');
                }
             else {
                await axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                    .then((resp) => {
                        console.log('Appel à l\'API');
                        commit('getWeather', resp.data.list);
                        let apiDate = new Date().valueOf();
                        commit('setDate', apiDate);
                        setTimeout(() => {
                            dispatch("fetchWeather")
                        }, 10000)
                  });
            }
        },


        listCitySearch({commit}, data) {
            let searchCities = data;
            commit('setlistCitySearch', searchCities);
        },

        async fetchlistSearch({commit},dataList){
            let results: any[];
            results = [];
           for (let i =0 ; i <dataList.length;   i++){
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${dataList[i]}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`
                await axios.get(url)
                    .then((resp) => {
                        let result = resp.data;
                        results.push(result);
                    });
            }
            commit('setsearchCities', results);
        },
    },
})

export default store;


