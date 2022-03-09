import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: () => import('../views/HomePage/HomePage.vue')
  },
  {
    name: "LikedPage",
    path: "/likes",
    component: () => import('../views/LikedMovies/LikedMovies.vue')
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

export default router;