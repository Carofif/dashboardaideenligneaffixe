<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <section class="section is-main-section">
      <tiles>
        <card-component title="Profil" icon="account" class="tile is-child">
          <div class="level-left">
            <user-avatar class="image has-max-width is-aligned-left"/>
          </div>
          <hr>
          <div class="level-item">
            <b-field label="Nom" position="is-right">
              <b-input :value="userName" custom-class="is-static" readonly/>
            </b-field>
            <hr>
            <b-field label="E-mail" position="is-right">
              <b-input :value="userEmail" custom-class="is-static" readonly/>
            </b-field>
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
export default {
  name: 'Profil',
  components: { UserAvatar, Tiles, TitleBar, CardComponent },
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
