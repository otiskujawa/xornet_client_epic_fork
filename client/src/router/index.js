import { createRouter, createWebHistory } from 'vue-router'
import auth from '@/router/middleware/auth.js';

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
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/home/Login.vue'),
    meta: {
      title: 'Xornet | Login',
      guest: true,
    }
  },
  // Xornet Signup
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '@/views/home/Signup.vue'),
    meta: {
      title: 'Xornet | Signup',
      guest: true,
    }
  },
  // Xornet Dashboard
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'),
    meta: {
      title: 'Xornet | Dashboard',
      requiresAuth: true,
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
      {
        path: 'profile/',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/dashboard/Profile.vue'),
        meta: {
          title: 'Xornet | Profile'
        },
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Frontend redirecting
router.beforeEach(auth);

export default router