import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import Customers from "@/views/Customers.vue";
import Stock from "@/views/Stock.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Stock
  },
  {
    path: "/stock",
    name: "stock",
    component: Stock
  },
  { path: "/customers", name: "customers", component: Customers }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
