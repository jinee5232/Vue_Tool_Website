import HomePage from "./pages/Homepage.vue";

import DGraphic from "./pages/DGraphic.vue";
import DCss from "./pages/DCss.vue";
import DInspiration from "./pages/DInspiration.vue";
import OtherTool from "./pages/OtherTool.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/Vue_Tool_Website/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/DInspirationPage",
    name: "DInspiration",
    component: DInspiration,
  },
  {
    path: "/Vue_Tool_Website/DGraphicPage",
    name: "DGraphic",
    component: DGraphic,
  },
  {
    path: "/Vue_Tool_Website/DCssPage",
    name: "DCss",
    component: DCss,
  },
  {
    path: "/Vue_Tool_Website/OtherToolPage",
    name: "OtherTool",
    component: OtherTool,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

export default router;
