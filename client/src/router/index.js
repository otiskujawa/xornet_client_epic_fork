import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/:info?',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue'),
    meta: {
      title: 'Xornet | Home'
    }
  },
  {
    path: '/dashboard/:machine?',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard.vue'),
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
