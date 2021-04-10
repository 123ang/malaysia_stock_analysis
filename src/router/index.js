import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store' 
import Home from '@/views/Home'
import ProfitCalculator from '@/views/ProfitCalculator'
import SearchStock from '@/views/SearchStock'
import TodayStock from '@/views/TodayStock'
import Watchlist from '@/views/Watchlist'
import Login from '@/views/Login'
import AccurateCalculator from '@/views/AccurateCalculator'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/my-watchlist',
    name: 'Watchlist',
    component: Watchlist,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/more-accurate-calculator',
    name: 'AccurateCalculator',
    component: AccurateCalculator,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/today-stock',
    name: 'TodayStock',
    component: TodayStock,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/search-stock',
    name: 'SearchStock',
    component: SearchStock,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profit-calculator',
    name: 'ProfitCalculator',
    component: ProfitCalculator,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,

  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.isLoggedIn) {
      next({ name: 'Login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router
