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
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'),
    meta: {
      title: 'Xornet | Dashboard'
    },
    children: [ 
      {
        path: 'summary',
        name: 'summary',
        component: () => import(/* webpackChunkName: "summary" */ '@/views/dashboard/Summary.vue'),
        meta: {
          title: 'Xornet | Summary'
        },
      },
      {
        path: 'logs',
        name: 'logs',
        component: () => import(/* webpackChunkName: "logs" */ '@/views/dashboard/Logs.vue'),
        meta: {
          title: 'Xornet | Logs'
        },
      },
      {
        path: 'network',
        name: 'network',
        component: () => import(/* webpackChunkName: "network" */ '@/views/dashboard/Network.vue'),
        meta: {
          title: 'Xornet | Network'
        },
      },
      {
        path: 'machines/:machine?',
        name: 'machines',
        component: () => import(/* webpackChunkName: "machines" */ '@/views/dashboard/Machines.vue'),
        meta: {
          title: 'Xornet | Machines'
        },
      },
    ]
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
