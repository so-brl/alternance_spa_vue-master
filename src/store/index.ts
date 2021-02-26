import {createStore, useStore} from 'vuex'
import axios from "axios";

// export interface State {
//     weather: Array<Object>,
// }

const store = createStore({
    state: {
        weather: [],
        dataList:[],
        temp: [],
        results: [],
        searchCities: [],
        zoom: 12,
        latittude: 45.900002,
        longitude: 6.11667,
        iconSize: [41, 41],
        date: Date || String || Number,
    },
    mutations: {
        initStore(state) {
            if (localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store') || '{}'))
                );
            }
        },
        getWeather(state, payload) {
            let isAlreadyInData: any[] = [];
            for (const {
                name,
                coord: {lat, lon},
                weather: [{description: weather, icon: icon}],
                main: {temp: temperature},
                dt: updatedAt
            } of payload) {
                if(isAlreadyInData.indexOf(name)==-1){
                    // @ts-ignore
                    state.weather.push({name, lat, lon, weather, icon, temperature, updatedAt: new Date(updatedAt * 1000)});
                    isAlreadyInData.push(name);
                }
            }
            console.log(isAlreadyInData)
        },
        getWeatherList(state, payload) {
            console.log('payload',payload)
            let isAlreadyInData: any[] = [];
            for (const {
                name,
                coord: {lat, lon},
                weather: [{description: weather, icon: icon}],
                main: {temp: temperature},
                dt: updatedAt
            } of payload) {
                if(isAlreadyInData.indexOf(name)==-1){
                    // @ts-ignore
                    state.results.push({name, lat, lon, weather, icon, temperature, updatedAt: new Date(updatedAt * 1000)});
                    isAlreadyInData.push(name);
                }
            }
            console.log('ici',isAlreadyInData)
        },
        getTemp(state, payload) {
            let tempData: any[] = [];
            for (const {main: {temp: temperature}} of payload) {

                if (tempData.indexOf(temperature)==-1) {
                    tempData.push(temperature)
                    // @ts-ignore
                    state.temp.push(tempData);
                }
            }
        },
        setDate: (state, date) => (state.date = date),
        fetchlistSearch: (state, results) => (state.results = results),
        listCitySearch: (state, searchCities) => (state.searchCities = searchCities),
    },
    actions: {
        async fetchWeather({commit, dispatch, state}) {
            let lastUpd: any = state.date.valueOf();
            let now = Date.now().valueOf();
            let countToRefresh = now - lastUpd;
            if (countToRefresh < 300000) {
                console.log('Utilisation des données stokées');
            } else {
                await axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                    .then((resp) => {
                        console.log('Appel à l\'API');
                        commit('getWeather', resp.data.list);
                        commit('getTemp', resp.data.list);
                        let apiDate = new Date().valueOf();
                        commit('setDate', apiDate);
                        setTimeout(() => {
                            dispatch("fetchWeather")
                        }, 300000)
                    });
            }
        },
        listCitySearch({commit}, data) {
            let searchCities = data;
            commit('listCitySearch', searchCities);
        },
        async getWeatherList({commit},  searchList) {
            let results: any[];

            results = [];
            for (let i = 0; i <  searchList.length; i++) {
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchList[i]}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`
                await axios.get(url)
                    .then((resp) => {
                        let result = resp.data;
                        console.log('ici',result)
                        results.push(result);

                    });
            }
            commit('getWeatherList', results);
        },

    },
    getters:{
        getResult : state => `${state.results} `
    }
})

export default store;


