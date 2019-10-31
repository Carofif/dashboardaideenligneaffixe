<template>
  <card-component title="Changer Mot de passe" icon="lock">
    <form @submit.prevent="submit">
      <b-field horizontal label="Mot de passe actuel" message="Champs obligatoires. Votre mot de passe actuel">
        <b-input name="password_current" type="password" v-model="form.password_current" required
                 autcomplete="current-password"/>
      </b-field>
      <hr>
      <b-field horizontal label="Nouveau mot de passe" message="Champs obligatoires. Nouveau mot de passe">
        <b-input name="password" type="password" v-model="form.password" required autocomplete="new-password"/>
      </b-field>
      <b-field horizontal label="Confirmer mot de passe" message="Champs obligatoires. Nouveau mot de passe une fois de plus">
        <b-input name="password_confirmation" type="password" v-model="form.password_confirmation" required
                 autocomplete="new-password"/>
      </b-field>
      <hr>
      <b-field horizontal>
        <div class="control">
          <button type="submit" class="button is-info" :class="{'is-loading':isLoading}">
            Soumettre
          </button>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'
export default {
  name: 'PasswordUpdateForm',
  components: {
    CardComponent
  },
  data () {
    return {
      isLoading: false,
      form: {
        password_current: null,
        password: null,
        password_confirmation: null
      }
    }
  },
  methods: {
    submit () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Mise à jour',
          queue: false
        }, 500)
      })
    }
  }
}
</script>
