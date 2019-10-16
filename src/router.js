import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/forms',
      name: 'forms',
      component: () => import(/* webpackChunkName: "forms" */ './views/Forms.vue')
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
