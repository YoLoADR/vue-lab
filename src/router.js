import Vue from "vue";
import Router from "vue-router";
import { authGuard } from "./auth/authGuard";
import Home from "./views/Home";
import Profile from "./views/Profile.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/profile",
        name: "profile",
        component: Profile,
        beforeEnter: authGuard
      },
      {
        path: "/stories",
        alias: "/stories",
        name: "stories",
        component: () => import("./components/StoriesList"),
        beforeEnter: authGuard
      },
      {
        path: "/stories/:id",
        name: "story-details",
        component: () => import("./components/Story"),
        beforeEnter: authGuard
      },
      {
        path: "/add",
        name: "add",
        component: () => import("./components/AddStory")
      }
    ]
  });