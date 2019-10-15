<template>
  <footer v-show="isFooterBarVisible" class="footer">
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            &copy; {{ year }}, Aide en ligne Affixe
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="logo">
              <a href="https://dashboard">
                <img src="../assets/logo.jpeg" alt="Aide en ligne Affixe"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

moment.locale('fr')

export default {
  name: 'FooterBar',
  computed: {
    year () {
      return moment().year()
    },
    ...mapState([
      'isFooterBarVisible'
    ])
  }
}
</script>
