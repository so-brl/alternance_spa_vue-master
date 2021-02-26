<template>
  <div class="form-group search-card">
    <h5 class="text-left mt-5">Ville :</h5>
    <div class="d-flex flex-column">
      <form class="flex-nowrap">
        <input class="h-auto" type="text" v-model="searchQuery">
        <button class="ml-1  btn btn-success btn-sm" @click="addCity($event)">+</button>
      </form>
      <button class="btn-city mt-2" @click="supcity()" v-for="city in searchCities" :key="city">
        <div class="d-flex row">
          <div>
            {{ city }} <span class="closeIcon">X</span>
          </div>
        </div>
      </button>
      <form>
        <button class="mt-3 btn btn-success btn-lg" @click="showcity()">Rechercher</button>
      </form>
    </div>


  </div>
</template>

<script>
import City from "@/components/City";
import {computed, defineComponent, ref} from "vue";

import {useStore} from "vuex";

export default defineComponent({
  name: 'Search',
  components: {
    City
  },
  // mounted: {
  //   test: function ()  {
  //     console.log('ici')
  //   }
  // },
  setup() {
    let haveResult = false;
    let searchList = [];
    let searchQuery = ref()
    const store = useStore();
    let showResult = false;
    return {
      loadData: computed(() => store.state.results),
      searchCities: computed(() => store.state.searchCities),

      haveResult,
      showResult,
      searchQuery,

      addCity() {
        let data = searchQuery.value
        searchList.push(data)
        store.dispatch("listCitySearch", searchList)
        return searchList

      },
      showcity() {
        this.haveResult = true
        this.showResult = true;
        console.log('cliqué')
        console.log(searchList)
        store.dispatch("getWeatherList", searchList);

      }
    };
  },
})
</script>

<style scoped>

</style>