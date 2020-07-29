import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        alias: "/stories",
        name: "stories",
        component: () => import("./components/StoriesList")
      },
      {
        path: "/stories/:id",
        name: "story-details",
        component: () => import("./components/Story")
      },
      {
        path: "/add",
        name: "add",
        component: () => import("./components/AddStory")
      }
    ]
  });