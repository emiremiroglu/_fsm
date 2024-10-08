import { createRouter, createWebHistory } from "vue-router";

import session from './lib/session';

import SignIn from "@/views/sign-in.vue";

import Dashboard from "@/views/dashboard.vue";
import ConversionTrackers from "@/views/conversion_trackers/index.vue";
import ConversionTrackersEditor from "@/views/conversion_trackers/editor.vue";
import Workspaces from "@/views/workspaces.vue";
import Screenshots from "@/views/screenshots.vue";
import DCO from "@/views/dco/index.vue";
import DCOEditor from "@/views/dco/editor.vue";

import NotFound from "@/views/404.vue";

const Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // PUBLIC ROUTES
    { name: "sign-in", path: "/sign-in", component: SignIn },
    
    // AUTH REQUIRED
    { name: "dashboard", path: "/", component: Dashboard, meta: { auth: true } },
    
    { name: "conversion-trackers", path: "/conversion-trackers/", component: ConversionTrackers, meta: { auth: true } },
    { name: "conversion-trackers-editor", path: "/conversion-trackers/editor", component: ConversionTrackersEditor, meta: { auth: true } },
    
    { name: "dco", path: "/dco/", component: DCO, meta: { auth: true } },
    { name: "dco-editor", path: "/dco/editor", component: DCOEditor, meta: { auth: true } },

    { name: "workspaces", path: "/workspaces/", component: Workspaces, meta: { auth: true } },
    { name: "screenshots", path: "/screenshots/", component: Screenshots, meta: { auth: true } },

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