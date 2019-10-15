<template>
  <b-modal :active.sync="isModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirmer l'action</p>
      </header>
      <section class="modal-card-body">
        <p>Cela supprimera définitivement<b>{{ trashObjectName }}</b></p>
        <p>L'action ne peut pas être annulée.</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="annuler">Annuler</button>
        <button class="button is-danger" @click="confirmer">Supprimer</button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalBox',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    trashObjectName: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isModalActive: false
    }
  },
  methods: {
    annuler () {
      this.$emit('annuler')
    },
    confirmer () {
      this.$emit('confirmer')
    }
  },
  watch: {
    isActive (newValue) {
      this.isModalActive = newValue
    },
    isModalActive (newValue) {
      if (!newValue) {
        this.annuler()
      }
    }
  }
}
</script>
