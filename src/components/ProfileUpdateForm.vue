<template>
  <card-component title="Editer le profil" icon="account-circle">
    <form @submit="submit">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="form.photo">
        </p>
      </figure>
      <b-field class="file" horizontal label="Avatar">
        <b-upload @input="imageAdd">
        <a class="button is-info">
        <b-icon icon="upload"></b-icon>
        <span>Cliquer pour ajouter une photo</span>
        </a>
        </b-upload>     
      </b-field>
      <hr>
      <b-field horizontal label="Nom" message="Champs obligatoires. Votre nom">
        <b-input v-model="form.name" name="name" required/>
      </b-field>
      <b-field horizontal="" label="E-mail" message="Champs obligatoires. Votre e-mail">
        <b-input v-model="form.email" name="email" type="email" required/>
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
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import firebase from 'firebase'

export default {
  name: 'ProfileUpdateForm',
  components: {
    CardComponent
  },
  data () {
    return {
      isFileUploaded: false,
      isLoading: false,
      form: {
        name: null,
        email: null,
        photo: null
      }
    }
  },
  computed: {
    ...mapState([
      'userName',
      'userEmail',
      'userAvatar'
    ])
  },
  mounted () {
    this.form.name = this.userName
    this.form.email = this.userEmail
    this.form.photo = this.userAvatar
  },
  methods: {
    submit () {
    this.$user = firebase.auth().currentUser;
    this.$authRef = firebase.auth();
    this.$authRef.onAuthStateChanged( () => {
        if (this.$user) {
            this.$user.updateProfile({
             displayName: this.form.name,
             email: this.form.email,
             photoURL: this.form.photo
              }).then(function() {
             
              }).catch(function(error) {
               // An error happened.
});
        } else {
            console.log('not login');
        }
    });
        console.log(this.form)
        this.$store.commit('user', this.form)
        this.$buefy.snackbar.open({
          message: 'Mise à jour',
          queue: false
        })
    },
     imageAdd (e) {
      const imge = e
      const reader = new FileReader()
      reader.readAsDataURL(imge)
      reader.onload = e => {
        this.form.photo = e.target.result
        console.log(this.form.photo)
      }
    }
  },
  watch: {
    userName (newValue) {
      this.form.name = newValue
    },
    userEmail (newValue) {
      this.form.email = newValue
    },
    photo (newValue) {
      this.form.photo = newValue
    }
  }
}
</script>
