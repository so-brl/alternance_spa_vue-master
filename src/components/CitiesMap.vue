

<template>

  <div>
    <h1>Carte des villes</h1>
    <div id='map'></div>
  </div>
</template>

<script lang="js">
//import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted } from "vue";
import axios from "axios";
export default {
  name: 'CitiesMap',
  // data() {
  //   return {
  //     cities: []
  //   }
  // },
  setup() {
    onMounted(() => {

      mapboxgl.accessToken =
          "pk.eyJ1Ijoic29uaWFjbiIsImEiOiJja2w5aHB0amIwOW9nMm9vb2JkODBoOWpkIn0.OzS_BnyJucJStUhfvnaFcA";
      const map = new mapboxgl.Map({
        container: "map",
        style: "https://maps.hotentic.com/styles/isere/style.json",
        center: [6.0925617, 45.8910906],
        zoom: 10,
      });
      map.on('load', () => {

        let cities = [];
        function  loadCities(citiesData,cities) {
          for (const {name, coord: {lat, lon}, weather: [{description: weather, icon: icon}], main: {temp: temperature}, dt: updatedAt} of citiesData) {
            cities.push({name, lat, lon, weather, icon, temperature, updatedAt: new Date(updatedAt * 1000)});
          }
        }

         axios.get('https://api.openweathermap.org/data/2.5/find?lat=45.900002&lon=6.11667&cnt=20&cluster=yes&lang=fr&units=metric&APPID=37519b0d570c3091dd24f193f4bee0cd')
            .then((resp) => loadCities(resp.data.list,cities));
        for (let city in cities) {
          console.log(`${city}: ${cities[city]}`);
        }
       // const mapboxgl = require('mapbox-gl/dist/mapbox-gl');
       //
       //
       //  for (let city in cities) {
       //    console.log(`${city}: ${ cities[city]}`);
       //      let el = document.createElement('img');
       //      el.src = `https://cdn.pixabay.com/photo/2012/04/26/19/04/map-42871_960_720.png`;
       //      el.classList.add('marker');
       //      el.title = `${city.name} - ${city.temperature}°C`;
       //      new mapboxgl.Marker(el)
       //          .setLngLat([city.lon, city.lat])
       //          .addTo(map);
       //    }
        });

    });
    return {};
  },
};
</script>

<style>
#map {
  height: 100vh;
}
</style>