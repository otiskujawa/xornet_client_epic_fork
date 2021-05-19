import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // Xornet Home Page
  {
    path: '/:info?',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/Home.vue'),
    meta: {
      title: 'Xornet | Home'
    }
  },
  // Xornet Login
  {
    path: '/login/:machine?',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/home/Login.vue'),
    meta: {
      title: 'Xornet | Login'
    }
  },

  // Xornet Dashboard
  {
    path: '/dashboard/:machine?',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'),
    meta: {
      title: 'Xornet | Dashboard'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// this sets the tab title to the current page dynamically
router.beforeEach(async (to, from, next) => {
  if (to.meta.title) document.title = to.meta.title;
  next();
});

export default router
