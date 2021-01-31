import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect:'/productlist',
    children:[
      {
        path: "productlist",
        name: "ProductList",
        component: () => import(/* webpackChunkName: "product list" */ "../views/ProductList.vue"),
      },
      {
        path: "/cart",
        name: "Cart",
        component: () => import(/* webpackChunkName: "cart" */ "../views/Cart.vue"),
      },
      {
        path: "/profile",
        name: "Profile",
        component: () =>
          import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
      }
    ]
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
