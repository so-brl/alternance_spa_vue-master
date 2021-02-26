<template>
  <div>
    <h2 class="cityName">{{ name }}</h2>
    <div class="weatherItems">
<!--      {{icon}}-->

      <img class="iconWeather" v-bind:src= iconUrl()>
      <p class="temperature"> {{ temperature }}°C</p>
      <p class="ciel">{{ weather }}</p>
    </div>
      <p class="update"><em>Dernière mise à jour : <br> {{ currentDateTime()}}</em></p>


  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import moment from 'moment'
export default defineComponent({
  name: 'City',
  props: {
    name: String,
    weather: String,
    temperature: Number,
    updatedAt: [Date, String],
     icon: String,
  },
  methods: {
    currentDateTime() {
      moment.locale("fr");
      return moment(this.updatedAt).fromNow();
    },
    iconUrl(){
      let icon = this.icon;
      return 'https://openweathermap.org/img/wn/'+icon+'.png';
     // return  '/img/icon/'+icon+'.png';

    }
  }
})
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
