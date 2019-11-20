<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Ajout d'un utilisateur
      <router-link slot="right" to="/" class="button">
        Tableau de bord
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
        <div class="card-content">
          <section class="modal-card-body">
            <b-field class="file">
              <b-upload @input="imageAdd">
                <a class="button is-info">
                  <b-icon icon="upload"></b-icon>
                  <span>avatar</span>
                </a>
              </b-upload>
            </b-field>
            <b-field label="Nom et Prénoms">
              <b-input v-model="name"></b-input>
            </b-field>
            <b-field label="Email">
              <b-input v-model="email"></b-input>
            </b-field>
            <b-field label="Mot de passe">
              <b-input type="password" v-model="password"/>
            </b-field>
            <b-field label="Confirmer mot de passe">
              <b-input type="password" v-model="password_confirmation"/>
            </b-field>
          </section>
          <div class="card-footer pt">
            <button class="button" type="button">Fermer</button>
            <button class="button is-info ml">Valider</button>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
export default {
  name: 'AjoutUser',
  components: { HeroBar, TitleBar },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      photoUrl: ''
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Ajout utilisateur'
      ]
    }
  },
  methods: {
    imageAdd (e) {
      const imge = e
      const reader = new FileReader()
      reader.readAsDataURL(imge)
      reader.onload = e => {
        this.photoUrl = e.target.result
      }
    }
  },
  watch: {},
  mounted () {},
  destroyed () {}
}
</script>

<style>
.w-100 {
  width: 100%;
}
.pt {
  padding-top: 10px;
  margin-top: 10px;
}
.ml {
  margin-left: 30px;
}
</style>
