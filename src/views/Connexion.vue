<template>
  <div class="page">
    <section class="hero is-fullheight bg-page">
      <div class="hero-head">
        <nav class="navbar is-paddingless bg-nav-page">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item has-text-white">
                <b>Tableau de Bord </b>  Aide en ligne Affixe
              </a>
            </div>
          </div>
        </nav>
      </div>

      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-5">
              <div class="box card">

                <div class="card-header">
                  <h3 class="is-size-3 mb-10 has-text-weight-bold">Connexion</h3>
                </div>

                <section class="my-20">

                  <b-field
                    label="Email"
                    :type="email.type"
                    :message="email.msg">
                    <b-input
                      type="email"
                      v-model="email.value">
                    </b-input>
                  </b-field>

                  <b-field
                    label="Mot de passe"
                    :type="password.type"
                    :message="password.msg">
                    <b-input
                      type="password"
                      v-model="password.value">
                    </b-input>
                  </b-field>

                </section>

                <div class="card-footer">
                  <div class="mt-10">
                    <b-button :loading="loading" type="is-link" @click="login">Connexion</b-button>
                  </div>
                </div>
                <div class="field mt-10">
                  <b-checkbox v-model="checkboxCustom"
                    type="is-info"
                    true-value="Rester connecté"
                    false-value="Ne pas rester connecté">
                    {{ checkboxCustom }}
                  </b-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-foot">
          <footer-bar/>
      </div>
    </section>
  </div>
</template>

<script>
import { auth } from '@/plugins/firebase'
import FooterBar from '@/components/FooterBar'

export default {
  components: {
    FooterBar
  },
  data () {
    return {
      email: {
        value: '',
        type: '',
        msg: ''
      },
      password: {
        value: '',
        type: '',
        msg: ''
      },
      loading: false,
      checkboxCustom: 'Rester connecté'
    }
  },
  methods: {
    validEmail () {
      if (this.email.value) {
        this.email.type = ''
        this.email.msg = ''
        return true
      }
      this.email.type = 'is-danger'
      this.email.msg = 'Veuillez remplir ce champs'
      return false
    },
    validPassword () {
      if (this.password.value.length > 8) {
        this.password.type = ''
        this.password.msg = ''
        return true
      }
      this.password.type = 'is-danger'
      this.password.msg = 'Entrez au moins 8 caractères'
      return false
    },
    async login () {
      try {
        if (this.validEmail && this.validPassword) {
          this.loading = true
          await auth.signInWithEmailAndPassword(this.email.value, this.password.value)
          this.loading = false
          this.$router.replace('dash')
        }
      } catch (error) {
        this.$buefy.toast.open({
          duration: 5000,
          message: "Une erreur s'est produite, veuillez renseigner l'email et le mot de passe encore une fois",
          position: 'is-bottom',
          type: 'is-danger'
        })
        this.loading = false
      }
    }
  }
}
</script>

<style>
.my-20 {
  margin-top: 20px;
  margin-bottom: 20px;
}
.mt-10 {
    margin-top: 10px;
}
.page {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.bg-page {
  background-position: 100% 100%;
  background-size: 800px;
  background-repeat: no-repeat;
}
.bg-nav-page {
  background-color: rgba(32, 122, 184, 1) !important
}
</style>
