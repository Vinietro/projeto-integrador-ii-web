import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("@/views/Home"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/HomeGlobal")
        },
        {
          path: "ingredient/:ingredient",
          name: "home-ingredient",
          component: () => import("@/views/HomeIngredient")
        }
      ]
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/Login")
    },
    {
      name: "register",
      path: "/register",
      component: () => import("@/views/Register")
    },
    {
      name: "settings",
      path: "/settings",
      component: () => import("@/views/Settings")
    },
    {
      name: "product",
      path: "/products/:slug",
      component: () => import("@/views/Product"),
      props: true
    },
    {
      name: "product-edit",
      path: "/editor/:slug?",
      props: true,
      component: () => import("@/views/ProductEdit")
    }
  ]
});
