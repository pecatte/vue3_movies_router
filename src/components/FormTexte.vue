<template>
  <form @submit.prevent="$emit('eventsaisie', texte)">
    <input type="text" v-model="texte" placeholder="mot cle ?" />
    <input type="submit" value="valider" />
  </form>
</template>
<script setup>
import { ref } from "vue";
const texte = ref("");
</script>