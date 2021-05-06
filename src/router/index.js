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
import add_record from '@/views/add_record'
import show_record from '@/views/show_record'
import stock_trade_record from '@/views/stock_trade_record'
import index from '@/views/Index'
import update_stock_record from '@/views/update_stock_record'
import stock_detail from '@/views/stock_detail'
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
    path: '/stock-detail',
    name: 'stock_detail',
    component: stock_detail,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/stock-trade-record',
    name: 'stock_trade_record',
    component: stock_trade_record,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-record',
    name: 'add_record',
    component: add_record,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/show-record',
    name: 'show_record',
    component: show_record,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/update-record',
    name: 'update_stock_record',
    component: update_stock_record,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/index',
    name: 'index',
    component: index,
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
