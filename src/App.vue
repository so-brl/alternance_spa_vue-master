<template>
  <div id="app">
    <header id="app_header" class="nav-view">
      <div>
        <router-link to="/villes">Liste</router-link>
        <router-link to="/carte">Carte</router-link>
      </div>
    </header>
    <router-view></router-view>
  </div>

</template>

<script lang="ts">
//import { Options, Vue } from 'vue-class-component';

import {useStore} from "vuex";
import {defineComponent, onMounted} from "vue";


export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    store.commit('initStore');
    onMounted(()=>{
      store.subscribe((mutation,state) => {
     localStorage.setItem('store',JSON.stringify(state));
      })
      store.dispatch('fetchWeather');
    })
  },
})

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #262626;
}

#app_header {
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: flex-end;
  background-color: black;
  padding-right: 20px;
  flex-direction: row;
}

#app_header img {
  height: 80px;
  padding: 20px;
}

#app_header a {
  color: white;
  text-transform: uppercase;
  padding: 20px;
  text-decoration: none;
}

#map {
  width: 100%;
  height: 500px;
}

#map .marker {
  width: 50px;
  height: auto;
  cursor: pointer;
}
</style>
<style lang="scss">
$color: red;
p{
  collapse: $color;
}
</style>
