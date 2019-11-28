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
<<<<<<< HEAD
import firebase from 'firebase'
import { mapGetters , mapActions } from 'vuex'
import { db } from '@/plugins/firebase'
=======
// import firebase from 'firebase'
import { mapActions, mapGetters } from 'vuex'
import { db, auth } from '@/plugins/firebase'
>>>>>>> c-001

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
<<<<<<< HEAD
     ...mapGetters([
      'getCategories',
      'getArticles'
=======
    ...mapGetters([
      'getCategories',
      'getArticles',
      'getCategorieTail',
      'getArticleTail'
>>>>>>> c-001
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
<<<<<<< HEAD
  methods:
  {
=======
  methods: {
>>>>>>> c-001
    ...mapActions([
      'updateCategories',
      'updateArticles'
    ]),
<<<<<<< HEAD
     getArticle () {
=======
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
>>>>>>> c-001
      db.ref('articles').on('value', (snap) => {
        if (snap.val()) {
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
<<<<<<< HEAD
    },
     getCategorie () {
      db.ref('categories/').on('value', (snap) => {
        if (snap.val()) {
          this.updateCategories(Object.values(snap.val()))
        } else {
          this.updateCategories([])
        }
      })
    }
  },
  mounted ()
  {
    this.getArticle();
    this.getCategorie();
=======
    }
  },
  mounted () {
    this.getCategorie()
    this.getArticle()
  },
  destroyed () {
    db.ref('categories/').off()
    db.ref('articles/').off()
>>>>>>> c-001
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
