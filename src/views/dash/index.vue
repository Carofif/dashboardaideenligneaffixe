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
// import firebase from 'firebase'
import { mapActions, mapGetters } from 'vuex'
import { db, auth } from '@/plugins/firebase'

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
    ...mapGetters([
      'getCategories',
      'getArticles',
      'getCategorieTail',
      'getArticleTail'
    ]),
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
      console.log('qlq3')
      db.ref('categories/').on('value', (snap) => {
        if (snap.val()) {
          console.log('qlq4')
          this.updateCategories(Object.values(snap.val()))
        } else {
          this.updateCategories([])
        }
      })
    },
    getArticle () {
      console.log('qlq34')
      db.ref('articles').on('value', (snap) => {
        if (snap.val()) {
          console.log('qlq45')
          this.updateArticles(Object.values(snap.val()))
          this.$compteur = 0
          this.$categories = {}
          while (this.$compteur <= this.getArticles.length - 1) {
            db.ref('categories/' + this.getArticles[this.$compteur].idCat).once('value', (snap) => {
              if (snap.val()) {
                this.$categories = snap.val()
              } else {
                this.$categories = {}
              }
            })
            this.getArticles[this.$compteur].nomcat = this.$categories.libelle
            this.$compteur++
          }
        } else {
          this.updateArticles([])
        }
      })
    }
  },
  mounted () {
    console.log('qlq')
    this.getCategorie()
    this.getArticle()
  },
  destroyed () {
    db.ref('categories/').off()
    db.ref('articles/').off()
  },
  created () {
    this.$store.commit('user', {
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      avatar: auth.currentUser.photoURL
    })
  }
}
</script>
