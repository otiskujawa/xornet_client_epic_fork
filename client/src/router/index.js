import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // Xornet Home Page
  {
    path: '/:info?',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue'),
    meta: {
      title: 'Xornet | Home'
    }
  },
  // Xornet Dashboard
  {
    path: '/dashboard/:machine?',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard.vue'),
    meta: {
      title: 'Xornet | Dashboard'
    }
  },
  // Xornet Login
  {
    path: '/login/:machine?',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login.vue'),
    meta: {
      title: 'Xornet | Login'
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
