<template>
  <b-modal :active.sync="isModalActive" has-modal-card trap-focus>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirmer l'action</p>
      </header>
      <section class="modal-card-body">
        <p>Cela supprimera définitivement <b>{{ trashObjectName.libelle }}</b></p>
        <p v-if="trashObjectArticle.length" >Cette catégorie contient des articles. <br/>
          Si vous supprimez cette catégorie , tous ses articles contenues seront aussi Supprimer
        </p>
        <p>L'action ne peut pas être annulée.</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="annuler">Fermer</button>
        <button class="button is-danger" @click="confirmer">Supprimer</button>
      </footer>
    </div>
  </b-modal>
</template>

<script>

import { db } from '@/plugins/firebase'

export default {
  name: 'ModalBox',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    trashObjectName: {
      type: Object,
      default: function () { return {} }
    },
    trashObjectArticle: {
      type: Array,
      default: function () { return [] }
    }
  },
  data () {
    return {
      isModalActive: false
    }
  },
  methods: {
    annuler () {
      this.$emit('cancel')
      this.isModalActive = false
    },
    confirmer () {
      if (this.trashObjectName.libelle) {
        this.$compteur = 0
        while (this.$compteur <= this.trashObjectArticle.length - 1) {
          db.ref('articles').child(this.trashObjectArticle[this.$compteur].id).remove()
          this.$compteur++
        }
        db.ref('categories').child(this.trashObjectName.id).remove()
        this.$buefy.toast.open({
          message: 'Modification de Categorie confirmée',
          type: 'is-success',
          position: 'is-bottom'
        })
      }
      this.$emit('confirm')
    }
  },
  destroyed () {
    db.ref('categories').off()
    db.ref('Article').off()
  },
  watch: {
    isActive (newValue) {
      this.isModalActive = newValue
    },
    isModalActive (newValue) {
      if (!newValue) {
        this.annuler()
      }
    },
    trashObjectName (newValue) {
      this.trashObjectName = newValue
    },
    trashObjectArticle (newValue) {
      this.trashObjectArticle = newValue
    }
  }
}
</script>
