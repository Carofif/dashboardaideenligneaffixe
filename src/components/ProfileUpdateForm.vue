<template>
  <div>
    <a @click="isComponentModalActive = true">
      <b-button class="is-info">Modifier Profil</b-button>
    </a>
    <b-modal :active.sync="isComponentModalActive" has-modal-card trap-focus>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editer le profil</p>
        </header>
        <section class="modal-card-body">
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="form.photo.url" />
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
          <hr />
          <b-field horizontal label="Nom" message="Champs obligatoires. Votre nom">
            <b-input v-model="form.name" name="name" required />
          </b-field>
          <b-field horizontal label="E-mail" message="Champs obligatoires. Votre e-mail">
            <b-input v-model="form.email" name="email" type="email" required />
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="annuler">Fermer</button>
          <b-button :loading="loadingSave" class="is-info ml" @click="submit">Soumettre</b-button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase'
import 'firebase/auth'
import { storage } from '@/plugins/firebase'

export default {
  name: 'ProfileUpdateForm',
  data () {
    return {
      isFileUploaded: false,
      imageFile: null,
      loadingSave: false,
      isLoading: false,
      isComponentModalActive: false,
      form: {
        name: null,
        email: null,
        photo: {
          url: '',
          name: ''
        }
      }
    }
  },
  computed: {
    ...mapState(['userName', 'userEmail', 'userAvatar'])
  },
  mounted () {
    this.form.name = this.userName
    this.form.email = this.userEmail
    this.form.photo.url = this.userAvatar
  },
  methods: {
    async submit () {
      try {
        this.loadingSave = true
        await this.validPhotoURL()
        const authRef = firebase.auth()
        const user = firebase.auth().currentUser
        authRef.onAuthStateChanged(() => {
          if (user) {
            user
              .updateProfile({
                displayName: this.form.name,
                email: this.form.email,
                photoURL: this.form.photo.url
              })
              .then(function () {})
              .catch(function () {})
            this.$buefy.snackbar.open({
              message: 'Mise à jour',
              queue: false
            })
            this.$router.go(this.$router.currentRoute)
          } else {
            console.log('not login')
          }
        })
        this.loadingSave = false
        this.isComponentModalActive = false
      } catch (error) {}
    },
    imageAdd (e) {
      const imge = e
      this.imageFile = e
      this.form.photo.name = e.name
      const reader = new FileReader()
      reader.readAsDataURL(imge)
      reader.onload = e => {
        this.form.photo.url = e.target.result
      }
    },
    async validPhotoURL () {
      const re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      if (!re.test(this.form.photo.url)) {
        this.form.photo.url = await this.uploadAvatar()
        return true
      }
      return true
    },
    uploadAvatar () {
      return new Promise((resolve, reject) => {
        const storageRef = storage
          .ref(`${this.form.photo.name}`)
          .put(this.imageFile)
        storageRef.on(
          `state_changed`,
          snapshot => {},
          error => {
            reject(error.message)
          },
          () => {
            storageRef.snapshot.ref.getDownloadURL().then(url => {
              resolve(url)
            })
          }
        )
      })
    },
    annuler () {
      this.$emit('cancel')
      this.isComponentModalActive = false
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
