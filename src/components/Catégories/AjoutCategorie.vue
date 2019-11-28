<template>
    <div>
      <a  @click="isComponentModalActive = true"><b-icon icon="plus-circle-outline" size="is-large"></b-icon></a>
        <b-modal :active.sync="isComponentModalActive" has-modal-card trap-focus>
              <div class="modal-card">
                  <header class="modal-card-head">
                      <p class="modal-card-title">Création d'une catégorie</p>
                   </header>
                  <section class="modal-card-body">
                    <b-field class="file">
                      <b-upload v-model="image" @input="saveImageUrl">
                        <a class="button is-info">
                          <b-icon icon="upload"></b-icon>
                          <span>Cliquer pour ajouter l'image de la catégorie</span>
                        </a>
                      </b-upload>
                      <span class="file-name" v-if="image">
                        {{image.name}}
                      </span>
                    </b-field>

                    <b-field label="Catégorie">
                      <b-input v-model="newCategorie"></b-input>
                    </b-field>
                  </section>
                  <footer class="modal-card-foot">
                    <button class="button" type="button" @click="annuler">Fermer</button>
                    <button class="button is-info" @click="addCategorie">Valider</button>
                  </footer>
              </div>
        </b-modal>
    </div>
</template>

<script>
import { db } from '@/plugins/firebase'
export default {
  props: [ 'isActive' ],
  data () {
    return {
      isComponentModalActive: false,
      image: null,
      newCategorie: '',
      categorieImageUrl: null
    }
  },
  methods: {
    saveImageUrl (e) {
      const imge = e
      const reader = new FileReader()
      reader.readAsDataURL(imge)
      reader.onload = e => {
        this.categorieImageUrl = e.target.result
      }
    },
    addCategorie () {
      if (this.newCategorie.length) {
        const id = db.ref('categories').push({ libelle: this.newCategorie, image: this.categorieImageUrl }).key
        db.ref('categories').child(id).update({ id: id })
        this.newCategorie = ''
        this.$buefy.toast.open({
          message: 'Categorie enregistre',
          type: 'is-success',
          position: 'is-bottom'
        })
      } else {
        this.$buefy.toast.open({
          message: 'Champ vide',
          type: 'is-danger',
          position: 'is-bottom'
        })
      }
    },
    annuler () {
      this.$emit('cancel')
      this.isComponentModalActive = false
    }
  },
  watch: {
    isActive (newValue) {
      this.isComponentModalActive = newValue
    },
    isComponentModalActive (newValue) {
      if (!newValue) {
        this.annuler()
      }
    }
  }
}
</script>
