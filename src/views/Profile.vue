<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <section class="section is-main-section">
      <tiles>
        <profile-update-form class="tile is-child"/>
        <card-component title="Profil" icon="account" class="tile is-child">
          <user-avatar class="image has-max-width is-aligned-center"/>
          <hr>
          <b-field label="Nom">
            <b-input :value="userName" custom-class="is-static" readonly/>
          </b-field>
          <hr>
          <b-field label="E-mail">
            <b-input :value="userEmail" custom-class="is-static" readonly/>
          </b-field>
        </card-component>
      </tiles>
      <password-update-form/>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import ProfileUpdateForm from '@/components/ProfileUpdateForm'
import PasswordUpdateForm from '@/components/PasswordUpdateForm'
import Tiles from '@/components/Tiles'
import UserAvatar from '@/components/UserAvatar'
export default {
  name: 'Profil',
  components: { UserAvatar, Tiles, PasswordUpdateForm, ProfileUpdateForm, TitleBar, CardComponent },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Profil'
      ]
    },
    ...mapState([
      'userName',
      'userEmail',
      'userAvatar'
    ])
  }
}
</script>
