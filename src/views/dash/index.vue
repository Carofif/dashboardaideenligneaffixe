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
            to: '/profile',
            label: 'Profile',
            icon: 'account-circle'
          },
          {
            to: '/tablecategorie',
            label: 'Catégories',
            icon: 'shape-outline'
          },
          {
            to: '/tablearticle',
            label: 'Articles',
            icon: 'newspaper-variant-multiple-outline'
          }
        ]
      ]
    }
  },
  created () {
    this.$store.commit('user', {
      name: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email,
      avatar: firebase.auth().currentUser.photoURL
    })
   console.log(firebase.auth().currentUser)
  }
}
</script>
