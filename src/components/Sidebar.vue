<template>
  <div >
    <h3  class=" mt-5">Rechercher</h3>
    <Search></Search>
    <Filtre></Filtre>
  </div>

</template>

<script>
import City from "@/components/City";
import Filtre from "@/components/Filtre";
import Search from "@/components/Search";
import {defineComponent} from "vue";

export default defineComponent({
  name: "Sidebar",
  components: {
    Search,
    Filtre,
    City,

  },
  setup() {
    return {

    }
  }
})
</script>

<style scoped>

</style>