<template>

  <div style="height: 100vh; width: 100vw;">
    <l-map
        v-model="zoom"
        :zoom="zoom"
        :center="[$store.state.latittude, $store.state.longitude]"
    >
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>

      <l-marker v-for="city in loadedData" :lat-lng="[city.lat, city.lon]" :key="city.name">
        <l-icon :icon-url="`https://openweathermap.org/img/wn/${city.icon}.png`" :icon-size="iconSize"/>
      </l-marker>

    </l-map>
  </div>
</template>


<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import {computed, defineComponent} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  name: 'CitiesMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },

  setup() {
    const store = useStore();

    return {
      loadedData: store.state.weather,
      zoom: computed(() => store.state.zoom),
      iconSize: computed(() => store.state.iconSize),
    };
  },

});
</script>