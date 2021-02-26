<template>

  <div  class="form-group search-card">
    <h5 class="text-left mt-5">Temperature <small>(supérieur à) </small>:</h5>
  <form id="v-model-select" >
    <select class="selectCustom col-3" v-model="filter">

      <option v-for="temp of filterData[filterData.length-1]" :key="temp" :value="temp" v-html="temp"></option>
    </select>
    <button class="mt-3 btn btn-success btn-lg" @click="tempFilter()">Filtrer</button>
  </form>
<!--  <span>Température séléctionnée : {{ filter }} °C</span>-->
  </div>
</template>

<script>
import { defineComponent} from "vue";
import Sidebar from "@/components/Sidebar";
import City from "@/components/City";
import {useStore} from "vuex";


export default defineComponent({
  name: 'Filtre',
  components: {
    Sidebar,
    City,
  },

  data() {
    return{
      weatherData : useStore().state.weather,
       loadedData: useStore().state.results,
      filterData : useStore().state.temp,
    }

  },
  computed: {
    // getFilter : function (): any {
    //   console.log('ici');
    //   return this.tempFilter
    // }
  },
  methods: {
    //

    getTemp: function ()  {
      let tempData = [];
      console.log(this.loadedData)
      for (const {main: {temp: temperature}} of this.loadedData) {

        if (tempData.indexOf(temperature)==-1) {
          tempData.push(temperature)

        }
      }
      console.log(tempData)
     return  tempData;
    },



  },
  setup() {
    // const store = useStore();
    // temp: computed(() => store.state.temp)
    //
    // store.dispatch("getTemp", data.filter);
    // const getCityTempData = computed(() => {
    //   let tempData = [];
    //   console.log('ici')
    //   console.log(props.loadedData)
      // for (const {main: {temp: temperature}} of props.loadedData) {
      //
      //   if (tempData.indexOf(temperature)==-1) {
      //     tempData.push(temperature)
      //
      //   }
      // }
//       return tempData;
//     });
//     const store = useStore();
//
//
//     let tempChoice = false;
    //let filter = 0;
//  let tempData;
//
//
// let filterData = this.getTemp();

    const store = useStore();
    return {
      tempFilter(){
        let datas = this.weatherData;
        console.log('this.filter',this.filter)
        let searchList = [];
        for (let data of datas){
          if (data.temperature > this.filter){
            searchList.push(data)
          }
        }
        store.dispatch("getWeatherList", searchList);
        //return searchList;
      },
      // getCityTempData,
      // tempData,
      //filter
      // tempChoice,
      // filterData,




    };
  }


});
</script>

<style scoped>

</style>