<template>
  <div>
    <h1>Liste des villes</h1>
<!--    <h2> Nous somme le  {{ new Date(getDate).toLocaleDateString()}} </h2>-->
    <City v-for="city of loadedData" :key="city.id" :name="city.name" :weather="city.weather"
          :temperature="city.temperature" :updated-at="city.updatedAt"></City>
  </div>
</template>

<script lang="ts">
import City from "./City.vue";
import {defineComponent} from 'vue';
import {useStore} from "vuex";

export default defineComponent({
  name: 'CitiesList',
  components: {
    City
  },
  setup() {
    const store = useStore();
    return {
     loadedData: store.state.weather
    };
  }

});


</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
