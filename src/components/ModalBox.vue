<template>
  <b-modal :active.sync="isModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirmer l'action</p>
      </header>
      <section class="modal-card-body">
        <p>Cela supprimera définitivement <b>{{ trashObjectName.libelle }}</b></p>
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
      default: {}
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
         if(this.trashObjectName.libelle )
       {
           db.ref('categories').child(this.trashObjectName.id).remove() ;   

             this.$buefy.toast.open({
            message: 'Modification de Categorie confirmée',
            type: 'is-success',
            position: 'is-bottom'

           });
           
       }
      this.$emit('confirm')
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
    },
    trashObjectName (newValue) {
      this.trashObjectName = newValue
      
    }
  }
}
</script>
