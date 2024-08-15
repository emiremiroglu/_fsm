import { createRouter, createWebHistory } from "vue-router";

import session from './lib/session';

import SignIn from "@/views/sign-in.vue";

import ConversionTrackers from "@/views/conversion_trackers.vue";
import Create from "@/views/create.vue";
import Edit from "@/views/edit.vue";

import NotFound from "@/views/404.vue";

const Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // PUBLIC ROUTES
    { name: "sign-in", path: "/sign-in", component: SignIn },
    
    // AUTH REQUIRED
    { name: "trackers", path: "/conversion_trackers/", component: ConversionTrackers, meta: { auth: true } },
    { name: "create", path: "/conversion_trackers/create", component: Create, meta: { auth: true } },
    { name: "edit", path: "/conversion_trackers/edit/:tid", component: Edit, meta: { auth: true } },

    // NOT FOUND
    { name: "not-found", path: "/:pathMatch(.*)*", component: NotFound }
  ]
})

Router.beforeEach((to, from, next) => {
  let token = session('token')
  if(!token && to.meta.auth) {
    Router.push({ path: '/sign-in' })
  } else {
    next()
  }
})

export default Router