<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <section class="section is-main-section">
      <tiles>
        <card-component title="Profil" icon="account" class="tile is-child">
          <div class="level">
            <div class="level-left">
              <user-avatar class="image has-max-width is-aligned-left"/>
              <div class="level-item ml">
                <b-field label="Nom" position="is-right">
                  <b-input :value="userName" custom-class="is-static" readonly/>
                </b-field>
              </div>
              <hr/>
              <div class="level-item ml">
                <b-field label="E-mail" position="is-right">
                  <b-input :value="userEmail" custom-class="is-static" readonly/>
                </b-field>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item"><ProfileUpdateForm></ProfileUpdateForm></div>
              <div class="level-item"><PasswordUpdateForm></PasswordUpdateForm></div>
            </div>
          </div>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import Tiles from '@/components/Tiles'
import UserAvatar from '@/components/UserAvatar'
import PasswordUpdateForm from '@/components/PasswordUpdateForm'
import ProfileUpdateForm from '@/components/ProfileUpdateForm'

export default {
  name: 'Profil',
  components: { UserAvatar, Tiles, TitleBar, CardComponent, ProfileUpdateForm, PasswordUpdateForm },
  computed: {
    titleStack () {
      return ['Admin', 'Profil']
    },
    ...mapState(['userName', 'userEmail', 'userAvatar'])
  }
}
</script>
