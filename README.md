## Alternance - Projet Vue.js v3

_En préambule, pensez à créer un fork de ce projet dans votre espace personnel sur Github. Clonez ensuite ce fork dans votre espace de travail local._
_Assurez-vous également que Node.js et NPM sont installés et à jour sur votre poste de travail._

### Reprise du projet "Météo"

Ce dépôt contient une base de code équivalente à celle réalisée lors du module SPA 1ère partie. Il va vous servir de socle pour la suite du projet en Vue.js.
Commencez par installer les dépendances du projet avec NPM. Créez ensuite à la racine du projet un fichier `.env.development` qui contient les champs suivants :

```
VUE_APP_DEFAULT_LATITUDE=
VUE_APP_DEFAULT_LONGITUDE=
VUE_APP_OW_APP_ID=
```

Compléter le fichier en y intégrant la latitude et la longitude de votre choix, ainsi que la clé APP_ID qui vous permettra d'appeler l'API OpenWeatherMap.
Vérifiez ensuite que le projet démarre bien et que vous pouvez consulter les différentes vues.


# MIGRATION :

1-Installer le cli :
```
npm install -g @vue/cli
```

2-Mêttre à jour Vue :
```
npm install vue@next 
```

3-Mêttre à jour tous les plugins(dependances) :
```
Vue upgrade
```

4-Mêttre à jour le routeur :
```
npm install vue-router@next
```

5- Supprimer l'ancien compilateur de template
```
npm remove vue-template-compiler
```
6- Installer le nouveau compilateur 
```
npm install --save-dev @vue/compiler-sfc
```
-------------- 
Dans main.js : 

Remplacer :
```
import Vue from 'vue'
```
par :
```
import {createApp} from 'vue'
```

Commenter :
```
import {router} from './router';
```
Remplacer : 

```
Vue.config.productionTip = false;
```
par:

```
const app = createApp(App);
```
Remplacer:

```
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
```
par:

```
app.mount('#app');
```

Lancer un : 
````

npm run serve
````

Comme l'import du router est commenter on ne voit que le bandeau et le logo du header , c'est normal .

Décommenter l'import du router. 

Aller dans src/router/index.js : 

Supprimer le code et le remplacer par :
````
import {createRouter, createWebHashHistory} from 'vue-router'
import CitiesList from "../components/CitiesList";
import CitiesMap from "../components/CitiesMap";
import City from "../components/City";
import EasterEgg from "../components/EasterEgg";



const routes = [
  { path: '/villes', component: CitiesList },
  { path: '/carte', component: CitiesMap },
  { path: '/ville', component: City },
  { path: '/onenagros', component: EasterEgg}
];

const router = createRouter({
  history:createWebHashHistory(),
  routes
});

export default router;
````


Aller dans src/router/main.js :
````
import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";

createApp(App).use(router).mount('#app');
````
# Typescript : 

````
vue add typescript
````