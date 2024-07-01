import HomePage from "./pages/Homepage.vue";

import {
  createRouter,
  createWebHashHistory
} from "vue-router";

import Showpage from "./pages/Showpage.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/page/:type",
    name: "Showpage",
    component: Showpage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

export default router;
