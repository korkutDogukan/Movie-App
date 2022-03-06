import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: () => import('../views/HomePage/HomePage.vue')
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

export default router;