import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Play from '../views/Play.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'The Name Game'
    }
  },
  {
    path: '/play',
    name: 'Play',
    component: Play,
    meta: {
      title: 'Play - The Name Game'
    }
  },
  {
    path: '/score',
    name: 'Score',
    meta: {
      title: 'Score - The Name Game'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "score" */ '../views/Score.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to) => {
  const { title } = to.meta
  document.title = title
})

export default router
