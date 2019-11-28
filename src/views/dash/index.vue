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
import { mapGetters , mapActions } from 'vuex'
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
      show: false
    }
  },
  computed: {
     ...mapGetters([
      'getCategories',
      'getArticles'
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
  methods:
  {
    ...mapActions([
      'updateCategories',
      'updateArticles'
    ]),
     getArticle () {
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
