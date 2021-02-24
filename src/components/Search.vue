<template>
  <div>
    <h1>Rechercher la météo par ville</h1>
    <form>
      <input type="text" v-model="searchQuery">
      <button @click="onButtonClicked($event)">Ajouter</button>
    </form>
    <ul v-if="searchQuery || haveResult">
      <p>Liste de villes ajoutées :</p>
      <li v-for="city in searchCities" :key="city">
        {{city}},
      </li>
    </ul>

    <form>
      <button @click="showcity()">Rechercher</button>
    </form>
    <div v-if="showResult || haveResult" >
      <City v-for="result in results" :key="result.name" :name="result.name" :weather="result.weather[0].description"
            :temperature="result.main.temp" :updated-at="result.updatedAt"></City>

    </div>


  </div>
</template>

<script>
import City from "@/components/City";
import {computed, defineComponent, onMounted,ref} from "vue";

import {useStore} from "vuex";

export default defineComponent({
  name: 'Search',
  components: {
    City
  },

  setup() {
    let haveResult = false;
    let  dataList = [];
    let searchQuery = ref()
    const store = useStore();
let showResult = false;
    onMounted(() => {
    })
    return {

      results: computed(() => store.state.results),
      searchCities :computed(() => store.state.searchCities),
      haveResult,
      showResult,
      searchQuery,
      onButtonClicked() {

        let data = searchQuery.value
        dataList.push(data)
        store.dispatch("listCitySearch",dataList);

      },
      showcity(){
         this.haveResult =true
        this.showResult = true;
        store.dispatch("fetchlistSearch",dataList);
      }
    };
  },
})
</script>

<style scoped>

</style>