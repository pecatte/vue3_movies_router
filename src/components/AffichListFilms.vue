<template>
  <h3>Liste des films</h3>
  <ul>
    <!-- pour chaque film, le titre et l'affiche -->
    <li v-for="film in listeFilms" :key="film.id">
      {{ film.title }}
      <br />
      <!-- ici on doit utiliser le router pour changer de route
          quand on clique sur l'affiche 
          afin de passer au composant "detailFilm"
      -->
      <!-- aller vers la route nommée 'detail" 
          en passant en param l'id du film
      -->
      <router-link :to="{ name: 'detail', params: { idFilm: film.id } }">
        <img
          v-if="film.poster_path"
          class="image"
          :src="'https://image.tmdb.org/t/p/w500/' + film.poster_path"
        />
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { reactive, onMounted, defineProps, watch } from "vue";
// le composant attend en param d'entrée (via les props)
//   est critère de recherche
const props = defineProps(["pcritere"]);
// --  la clé et l'url pour faire une recherche
const apiKey = "af1e1c8f8ad6efb5b326eabaffa38b8a";
const url =
  "https://api.themoviedb.org/3/search/movie?api_key=" +
  apiKey +
  "&language=fr-FR&page=1&query=";
// --  le state du composant est défini
//   ici par la liste des films résultants de la recherche
const listeFilms = reactive([]);

// -- req AJAX sur l'API pour faire la recherche
function searchFilms() {
  const fetchOptions = { method: "get" };
  // on ajoute le critèrer à la fin de l'url
  fetch(url + props.pcritere, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      //console.log(dataJSON);
      // -- la liste des films est dans la
      //   propriété "results" qui est un tableau
      let datasFilms = dataJSON.results;
      // vider la liste avant chaque nvlle recherche
      listeFilms.splice(0, listeFilms.length);
      // puis stocker chaque film dans le state
      datasFilms.forEach((v) => listeFilms.push(v));
    })
    .catch((error) => console.log(error));
}
onMounted(() => {
  // --> pas adapté ici car il faut refaire
  //   la req AJAX pour chaque nouvelle recherche
  // searchFilms();
});
// -- il faut donc ici positionner un observateur
// qui déclenchera une nvelle req AJAX à chaque fois
// les props changent (donc le critere)
watch(props, (newcritere) => {
  console.log(newcritere);
  searchFilms();
});
</script>

<style>
.image {
  width: 100px;
  height: 100px;
}
</style>