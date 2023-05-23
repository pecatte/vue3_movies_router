<template>
  <h3>Detail du film {{ props.idFilm }}</h3>
  <h3>{{ film.title }}</h3>
  <img
    class="image"
    :src="'https://image.tmdb.org/t/p/w500/' + film.poster_path"
  />
  <!-- un film peut être de plusieurs genres
        d'où la necessité de faire un boucle
        sur genres qui est un tableau d'objets
  -->
  <p v-if="film.genres">{{ film.genres.map((v) => v.name) }}</p>
  <p>{{ film.overview }}</p>
</template>

<script setup>
import { defineProps, reactive, onMounted } from "vue";

// -- la props permet de récupérer l'id du film choisi
//    sa valeur est transmise par le router
let props = defineProps(["idFilm"]);

// -- l'url pour obtenir toutes les infos détaillées sur un film précis
const apiKey = "af1e1c8f8ad6efb5b326eabaffa38b8a";
const url =
  "https://api.themoviedb.org/3/movie/" +
  props.idFilm +
  "?api_key=" +
  apiKey +
  "&language=fr-FR";

// le state du composant doit contenir les infos du film
//  renvoyées par la req AJAX
const film = reactive({});

// la req AJAX
function getFilm() {
  const fetchOptions = { method: "get" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // on récupère quelques infos
      film.title = dataJSON.title;
      film.poster_path = dataJSON.poster_path;
      film.overview = dataJSON.overview;
      film.genres = dataJSON.genres;
    })
    .catch((error) => console.log(error));
}
onMounted(() => {
  // on execute la req AJAX 1 seule fois
  //   à la création du composant
  getFilm();
});
</script>