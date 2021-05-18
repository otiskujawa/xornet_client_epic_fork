import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/:machine?',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue'),
    meta: {
      title: 'Xornet | Home'
    }
  },
  {
    path: '/homepage/:page?',
    name: 'homepage',
    component: () => import(/* webpackChunkName: "homepage" */ '@/views/homepage.vue'),
    meta: {
      title: 'Xornet | Homepage'
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
