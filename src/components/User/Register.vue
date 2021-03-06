<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <section class="section is-main-section">
        <div class="card-content">
          <section class="modal-card-body">
            <b-field horizontal class="file" grouped>
              <b-upload @input="imageAdd">
                <a class="button is-info">
                  <b-icon icon="image-plus"></b-icon>
                  <span>Avatar</span>
                </a>
              </b-upload>
              <figure class="image is-64x64">
                <img :src="photoUrl.url">
              </figure>
            </b-field>
            <b-field horizontal label="Nom"
              :type="firstName.type"
              :message="firstName.msg">
              <b-input v-model="firstName.value" @blur="validFirstName"></b-input>
            </b-field>
            <b-field horizontal label="Prénoms"
              :type="lastName.type"
              :message="lastName.msg">
              <b-input v-model="lastName.value" @blur="validLastName"></b-input>
            </b-field>
            <b-field horizontal label="Email"
              :type="email.type"
              :message="email.msg">
              <b-input v-model="email.value" @blur="validEmail"></b-input>
            </b-field>
            <b-field horizontal label="Mot de passe"
              :type="password.type"
              :message="password.msg">
              <b-input type="password" v-model="password.value" @blur="validPassword"/>
            </b-field>
            <b-field horizontal label="Confirmer mot de passe"
              :type="password_confirmation.type"
              :message="password_confirmation.msg">
              <b-input type="password" v-model="password_confirmation.value" @blur="validPassword_confirmation"/>
            </b-field>
          </section>
          <div class="card-footer pt">
            <b-button type="button">Fermer</b-button>
            <b-button :loading="loadingSave" class="is-info ml" @click="add">Valider</b-button>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import api from '@/config/api'
import { storage } from '@/plugins/firebase'

export default {
  name: 'AjoutUser',
  components: { TitleBar },
  data () {
    return {
      firstName: {
        value: '',
        msg: '',
        type: ''
      },
      lastName: {
        value: '',
        msg: '',
        type: ''
      },
      email: {
        value: '',
        msg: '',
        type: ''
      },
      password: {
        value: '',
        msg: '',
        type: ''
      },
      password_confirmation: {
        value: '',
        msg: '',
        type: ''
      },
      photoUrl: {
        url: null,
        name: ''
      },
      imageFile: null,
      loadingSave: false
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
    async add () {
      try {
        this.loadingSave = true
        await this.validPhotoURL()
        if (this.valid()) {
          await api.post('/addUser', {
            email: this.email.value,
            password: this.password.value,
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            photoUrl: this.photoUrl.url
          })
        }
        this.videChamps()
        this.loadingSave = false
      } catch (error) {
        console.log(error)
      }
    },
    imageAdd (e) {
      const imge = e
      this.imageFile = e
      this.photoUrl.name = e.name
      const reader = new FileReader()
      reader.readAsDataURL(imge)
      reader.onload = e => {
        this.photoUrl.url = e.target.result
      }
    },
    validFirstName () {
      if (this.firstName.value.length >= 2) {
        this.firstName.type = 'is-success'
        this.firstName.msg = ''
        return true
      }
      this.firstName.type = 'is-danger'
      this.firstName.msg = 'Entrez une value correcte'
      return false
    },
    validLastName () {
      if (this.lastName.value.length >= 2) {
        this.lastName.type = 'is-success'
        this.lastName.msg = ''
        return true
      }
      this.lastName.type = 'is-danger'
      this.lastName.msg = 'Entrez une value correcte'
      return false
    },
    validEmail () {
      const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
      if (re.test(String(this.email.value).toLowerCase())) {
        this.email.type = 'is-success'
        this.email.msg = ''
        return true
      }
      this.email.type = 'is-danger'
      this.email.msg = 'Entrez un email correct'
      return true
    },
    validPassword () {
      const re = /^(?=.*[A-Z])(?=.*[a-z])([\w]{8,15})$/i
      if (re.test(this.password.value)) {
        this.password.type = 'is-success'
        this.password.msg = ''
        return true
      }
      this.password.type = 'is-danger'
      this.password.msg = 'Au moins une lettre majuscule, une lettre miniscule et au moins 8 caracteres'
      return false
    },
    validPassword_confirmation () {
      if (this.password_confirmation.value === this.password.value && this.password_confirmation.value.length) {
        this.password_confirmation.type = 'is-success'
        this.password_confirmation.msg = ''
        return true
      }
      this.password_confirmation.type = 'is-danger'
      this.password_confirmation.msg = 'Entrez une value correcte'
      return false
    },
    async validPhotoURL () {
      if (this.photoUrl.url === null) {
        this.photoUrl.url = 'https://api.rocketfid.com/media/default/videotron/user/'
        return true
      }
      const re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      if (!re.test(this.photoUrl.url)) {
        this.photoUrl.url = await this.uploadAvatar()
        return true
      }
      return true
    },
    uploadAvatar () {
      return new Promise((resolve, reject) => {
        const storageRef = storage.ref(`${this.photoUrl.name}`).put(this.imageFile)
        storageRef.on(`state_changed`,
          (snapshot) => {},
          (error) => {
            reject(error.message)
          },
          () => {
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              resolve(url)
            })
          }
        )
      })
    },
    valid () {
      const a = this.validFirstName()
      const b = this.validLastName()
      const c = this.validEmail()
      const d = this.validPassword()
      const e = this.validPassword_confirmation()
      return a && b && c && d && e
    },
    videChamps () {
      this.imageFile = null
      this.photoUrl.url = ''
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.password = ''
      this.password_confirmation = ''
    }
  }
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
