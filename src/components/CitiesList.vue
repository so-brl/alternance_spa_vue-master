<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <div class="container-fluid  bg-dark row wrapper align-content-start">
    <div class="col-3  sidebar text-grey">
      <Sidebar></Sidebar>
    </div>
    <div class="col-9 bg-dark text-grey">
      <div v-if="loadedData.length===0" class="  d-flex justify-content-center row  ">
        <City class="col-3 cityCard" v-for="city of weatherData" :key="city.id" :name="city.name"
              :weather="city.weather"
              :temperature="city.temperature" :icon="city.icon" :updated-at="city.updatedAt"></City>
      </div>
      <div v-if="loadedData.length > 0" class="  d-flex justify-content-center row  ">
        <City class="col-3 cityCard" v-for="city of loadedData" :key="city.id" :name="city.name"
              :weather="city.weather"
              :temperature="city.temperature" :icon="city.icon" :updated-at="city.updatedAt"></City>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Sidebar from "./Sidebar.vue";
import City from "./City.vue";
import {defineComponent} from 'vue';
import {useStore} from "vuex";


export default defineComponent({
  name: 'CitiesList',
  components: {
    Sidebar,
    City,
  },

  data() {
    return {
      weatherData: useStore().state.weather,
      loadedData: useStore().state.results,
    }

  },
  setup() {

    return {

    };
  }


});


</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
