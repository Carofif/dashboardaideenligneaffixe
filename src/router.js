import Vue from 'vue'
import Router from 'vue-router'
import Dash from './views/dash/index.vue'
import Home from './views/dash/Home.vue'
import Connexion from './views/Connexion.vue'

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
      redirect: 'dash/home',
      children: [
        {
          path: '/dash/home',
          name: 'home',
          component: Home
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue')
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
      path: '/connexion',
      name: 'Connexion',
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

export default router
