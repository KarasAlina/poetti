import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Taplink from "../views/Taplink.vue";
import ComingSoon from "../views/ComingSoon.vue";

Vue.use(VueRouter);

const titlePrefix = "Poetti - Мастер вкуса";
const store = require("../store");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: titlePrefix,
    },
  },
  {
    path: "/taplink",
    name: "Taplink",
    component: Taplink,
    // redirect: '/',
    meta: {
      title: titlePrefix,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/account/Profile.vue"),
    meta: {
      title: titlePrefix,
    },
  },
  {
    path: "/coming-soon",
    name: "ComingSoon",
    component: ComingSoon,
    meta: {
      title: titlePrefix + "Акция начнется 1 октября 2021 г.",
    },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: Home },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: "smooth",
        offset: {
          y: 0,
        },
      };
    }
    return { x: 0, y: 0 }; // Go to the top of the page if no hash
  },
});

export default router;
