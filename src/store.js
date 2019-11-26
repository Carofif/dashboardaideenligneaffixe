import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: null,
    userEmail: null,
    userAvatar: null,

    isNavBarVisible: true,

    isFooterBarVisible: true,

    isAsideVisible: true,
    isAsideMobileExpanded: false,

    categories: [],
    articles: []
  },
  mutations: {
    basic (state, payload) {
      state[payload.key] = payload.value
    },

    user (state, payload) {
      if (payload.name) {
        state.userName = payload.name
      }
      if (payload.email) {
        state.userEmail = payload.email
      }
      if (payload.avatar) {
        state.userAvatar = payload.avatar
      }
    },

    asideMobileStateToggle (state, payload = null) {
      const htmlClassName = 'has-aside-mobile-expanded'

      let isShow

      if (payload !== null) {
        isShow = payload
      } else {
        isShow = !state.isAsideMobileExpanded
      }

      if (isShow) {
        document.documentElement.classList.add(htmlClassName)
      } else {
        document.documentElement.classList.remove(htmlClassName)
      }

      state.isAsideMobileExpanded = isShow
    },
    SET_CATEGORIES: (state, data) => {
      state.categories = data
    },
    SET_ARTICLES: (state, data) => {
      state.articles = data
    }
  },
  getters: {
    getCategories: state => {
      return state.categories
    },
    getArticles: state => {
      return state.articles
    }
  },
  actions: {
    updateCategories: (context, data) => {
      context.commit('SET_CATEGORIES', data)
    },
    updateArticles: (context, data) => {
      context.commit('SET_ARTICLES', data)
    }
  }
})
