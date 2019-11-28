<template>
  <card-component title="Changer Mot de passe" icon="lock">
    <section class="section is-main-section">
      <b-field horizontal label="Mot de passe actuel"
      :type="password_current.type"
      :message="password_current.msg">
        <b-input name="password_current" type="password" v-model="password_current.value" @blur="validPassword(password_current)"  required/>
      </b-field>
      <hr>
      <b-field horizontal label="Nouveau mot de passe"
      :type="newPassword.type"
      :message="newPassword.msg">
        <b-input name="password" type="password" v-model="newPassword.value" @blur="validPassword(newPassword)" required />
      </b-field>
      <b-field horizontal label="Confirmer mot de passe"
         :type="password_confirmation.type"
         :message="password_confirmation.msg">
        <b-input name="password_confirmation"
        type="password" v-model="password_confirmation.value" @blur="validPassword(password_confirmation)" required/>
      </b-field>
      <hr>
      <b-field horizontal>
        <b-button :loading="loadingSave" class="is-info ml" @click="changePass()">Modifier le mot de passe</b-button>
      </b-field>
    </section>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import firebase from 'firebase'
import 'firebase/auth'

export default {
  name: 'PasswordUpdateForm',
  components: {
    CardComponent
  },
  data () {
    return {
      loadingSave: false,
      password_current: {
        value: '',
        msg: 'Champs obligatoires. Votre mot de passe actuel',
        type: ''
      },
      newPassword: {
        value: '',
        msg: 'Champs obligatoires. Nouveau mot de passe',
        type: ''
      },
      password_confirmation: {
        value: '',
        msg: 'Champs obligatoires. Nouveau mot de passe une fois de plus',
        type: ''
      }
    }
  },
  methods: {
    async changePass () {
      try {
        this.loadingSave = true
        const currentUser = firebase.auth().currentUser
        const credential = firebase.auth.EmailAuthProvider.credential(
          currentUser.email,
          this.password_current.value
        )
        await currentUser.reauthenticateWithCredential(credential)
        await currentUser.updatePassword(this.newPassword.value)
        console.log("C'est bon")
      } catch (error) {
        console.log("Ce n'est pas bon", error)
      }
    },
    validPassword (pass) {
      const re = /^(?=.*[A-Z])(?=.*[a-z])([\w]{8,15})$/i
      if (re.test(pass.value)) {
        pass.type = 'is-success'
        pass.msg = ''
        return true
      }
      pass.type = 'is-danger'
      pass.msg = 'Au moins une lettre majuscule, une lettre miniscule et au moins 8 caracteres'
      return false
    },
    validPassword_confirmation () {
      if (this.password_confirmation.value === this.newPassword.value && this.password_confirmation.value.length) {
        this.password_confirmation.type = 'is-success'
        this.password_confirmation.msg = ''
        return true
      }
      this.password_confirmation.type = 'is-danger'
      this.password_confirmation.msg = 'Entrez une value correcte'
      return false
    }

  }
}
</script>
