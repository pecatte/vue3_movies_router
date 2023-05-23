
<script setup>
import { ref } from "vue";
import AffichListFilms from "./AffichListFilms.vue";
import FormTexte from "./FormTexte";

// le state de ce composant
// --> ici le mot cle de recherche de films
const motcle = ref("");

// le handler qui sert à récupérer
//   le texte saisi dans le formulaire
//  et à le stocker dans le state
function handlerSaisie(texte) {
  motcle.value = texte;
}
</script>

<template>
  <h1>Films</h1>
  <!-- le formulaire emet l'event quand la saisie est validée -->
  <FormTexte @eventsaisie="handlerSaisie"></FormTexte>
  <!-- le mot cle saisi est passé en parametre au composant
       qui effecturera la recherche et l'affichage des résultats
  -->
  <AffichListFilms :pcritere="motcle"></AffichListFilms>
</template>