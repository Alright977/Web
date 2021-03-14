import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Solution from '@/views/solution.vue'
import Product from '@/views/product.vue'
import Center from '@/views/center.vue'
import Recruitment from '@/views/recruitMent.vue'
import About from '@/views/about.vue'
import Error from '@/views/error.vue'
import Detail from '@/views/detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/solution/:id?',
    name: 'Solution',
    component: Solution,
  },
  {
    path: '/product/:id?',
    name: 'Product',
    component: Product,
  },
  {
    path: '/center',
    name: 'Center',
    component: Center,
  },
  {
    path: '/detail/:id?',
    name: 'detail',
    component: Detail,
  },
  {
    path: '/recruitMent',
    name: 'RecruitMent',
    component: Recruitment,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },

  {
    path: '*',
    component: Error,
  },
]

const router = new VueRouter({
  routes,
})

export default router
