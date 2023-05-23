import { createRouter, createWebHistory } from "vue-router";
import Films from "../components/Films.vue";
import DetailFilm from "../components/DetailFilm.vue";

// configuration du router avec 2 routes
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "films",
      component: Films
    },
    {
      // la route détail a un parametre qui est l'id du film
      path: "/detail/:idFilm",
      name: "detail",
      component: DetailFilm,
      props: true // pour indiquer que le param doit passeer par les props
    }
  ]
});

export default router;
