<template>
     <b-modal :active.sync="isComponentModalActive" has-modal-card trap-focus>
              <div class="modal-card">
                  <header class="modal-card-head">
                      <p class="modal-card-title">Modifier un Article</p>
                   </header>
                  <section class="modal-card-body">
                     <b-field label="Catégorie">
                          <b-select placeholder="Selectionner la catégorie" v-model ="newArt.idCat" >
                              <option
                                v-for="categorie in categories"
                                :value="categorie.id"
                                :key="categorie.id">
                                {{ categorie.libelle }}
                              </option>
                          </b-select>
                      </b-field>
                        <b-field label="Titre de l'article">
                            <b-input v-model="newArt.titre"></b-input>
                        </b-field>
                        <b-field label="Contenue de l'article">
                            <vue-editor v-model="newArt.content"/>
                        </b-field>
                  </section>
                  <footer class="modal-card-foot">
                    <button class="button" type="button" @click="annuler">Fermer</button>
                    <button class="button is-info" @click="modifierArt">Valider</button>
                  </footer>
              </div>
        </b-modal>
</template>

<script>
import { db } from '@/plugins/firebase'
import { VueEditor } from 'vue2-editor'
export default {
  props: ['isActive', 'valModif'],
  data () {
    return {
      isComponentModalActive: false,
      modif: {},
      newArt: {},
      categories: []
    }
  },
  components: {
    VueEditor
  },
  methods: {
    getCategorie () {
      db.ref('categories/').on('value', (snap) => {
        if (snap.val()) {
          this.categories = Object.values(snap.val())
        } else {
          this.categories = []
        }
      })
    },
    annuler () {
      this.$emit('cancel')
    },
    confirmer () {
      this.$emit('confirmer')
    },
    modifierArt () {
      if (this.modif.titre.length && this.modif.content.length) {
        this.modif.content = this.newArt.content
        this.modif.titre = this.newArt.titre
        this.modif.idCat = this.newArt.idCat
        db.ref('articles').child(this.modif.id).update({ content: this.modif.content, idCat: this.modif.idCat, titre: this.modif.titre })
        this.$buefy.toast.open({
          message: 'Modification confirmé',
          type: 'is-success',
          position: 'is-bottom'
        })
      } else {
        this.$buefy.toast.open({
          message: 'veuillez renseigner tous les champs',
          type: 'is-danger',
          position: 'is-bottom'
        })
      }
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
    },
    valModif (val) {
      this.modif = val
      this.newArt = {
        idCat: val.idCat,
        id: val.id,
        titre: val.titre,
        content: val.content
      }
   }
  },
  mounted () {
    this.getCategorie()
  },
  destroyed () {
    db.ref('categories/').off()
  }
}
</script>
