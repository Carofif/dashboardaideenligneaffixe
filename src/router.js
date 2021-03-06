import Vue from 'vue'
import Router from 'vue-router'
import Dash from './views/dash/index.vue'
import Home from './views/dash/Home.vue'
import Connexion from './views/Connexion.vue'
// import firebase from 'firebase'
import { auth } from '@/plugins/firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'dash',
      component: Dash,
      meta: {
        requiresAuth: true
      },
      redirect: 'dash/home',
      children: [
        {
          path: '/dash/home',
          name: 'home',
          component: Home
        },
        {
          path: '/tablearticle',
          name: 'tablearticle',
          component: () => import(/* webpackChunkName: "tablearticle" */ './components/Articles/TableArticle.vue')
        },
        {
          path: '/tablecategorie',
          name: 'tablecategorie',
          component: () => import(/* webpackChunkName: "tablecategorie" */ './components/Catégories/TablesCategories.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "register" */ './components/User/Register.vue')
        }
      ]
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: Connexion
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next('Connexion')
  else if (!requiresAuth && currentUser) next('dash')
  else next()
})
export default router
