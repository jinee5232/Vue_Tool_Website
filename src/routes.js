import HomePage from "./pages/Homepage.vue";

import DGraphic from "./pages/DGraphic.vue";
import DCss from "./pages/DCss.vue";
import DInspiration from "./pages/DInspiration.vue";
import OtherTool from "./pages/OtherTool.vue";
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/DInspirationPage",
    name: "DInspiration",
    component: DInspiration,
  },
  {
    path: "/DGraphicPage",
    name: "DGraphic",
    component: DGraphic,
  },
  {
    path: "/DCssPage",
    name: "DCss",
    component: DCss,
  },
  {
    path: "/OtherToolPage",
    name: "OtherTool",
    component: OtherTool,
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
