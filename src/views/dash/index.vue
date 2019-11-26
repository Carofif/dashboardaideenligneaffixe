<template>
  <div>
    <nav-bar/>
    <aside-menu :menu="menu"/>
    <router-view/>
    <footer-bar/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'
import firebase from 'firebase'
import { mapActions } from 'vuex'
import { db } from '@/plugins/firebase'
export default {
  name: 'home',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  data () {
    return {
      show: false,
      categories: [],
      articles: []
    }
  },
  computed: {
    menu () {
      return [
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: 'Tableau de bord'
          }
        ],
        '',
        [
          {
            to: '/tablecategorie',
            label: 'Catégories',
            icon: 'shape-outline'
          },
          {
            to: '/tablearticle',
            label: 'Articles',
            icon: 'newspaper-variant-multiple-outline'
          },
          {
            to: '/profile',
            label: 'Profile',
            icon: 'account-circle'
          },
          {
            to: '/register',
            label: 'Register',
            icon: 'account-plus-outline'
          }
        ]
      ]
    }
  },
  methods: {
    ...mapActions([
      'updateCategories',
      'updateArticles'
    ]),
    getCategorie () {
      db.ref('categories/').on('value', (snap) => {
        if (snap.val()) {
          this.updateCategories(Object.values(snap.val()))
        } else {
          this.updateCategories([])
        }
      })
    },
    getArticle () {
      db.ref('articles/').on('value', (snap) => {
        if (snap.val()) {
          this.updateArticles(Object.values(snap.val()))
        } else {
          this.updateArticles([])
        }
      })
    }
  },
  mounted () {
    this.getCategorie()
    this.getArticle()
  },
  destroyed () {
    db.ref('categories/').off()
    db.ref('articles/').off()
  },
  created () {
    this.$store.commit('user', {
      name: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email,
      avatar: firebase.auth().currentUser.photoURL
    })
  }
}
</script>
