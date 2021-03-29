import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import PlayPage from '../views/PlayPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'The Name Game'
    }
  },
  {
    path: '/play',
    name: 'Play',
    component: PlayPage,
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
    component: () => import(/* webpackChunkName: "score" */ '../views/ScorePage.vue')
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
