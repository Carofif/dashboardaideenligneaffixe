<template>
     <b-modal :active.sync="isComponentModalActive" has-modal-card trap-focus>
              <div class="modal-card">
                  <header class="modal-card-head">
                      <p class="modal-card-title">Modifier une catégorie</p>
                   </header>
                  <section class="modal-card-body">
                     <b-field label="Catégorie">
                          <b-select placeholder="Selectionner la catégorie" v-model="modif.idCat">
                              <option
                                v-for="categorie in categories"
                                :value="categorie.id"
                                :key="categorie.id">
                                {{ categorie.libelle }}
                              </option>
                          </b-select>
                      </b-field>
                        <b-field label="Titre de l'article">
                            <b-input v-model="modif.titre"></b-input>
                        </b-field>
                        <b-field label="Contenue de l'article">
                            <vue-editor v-model="modif.content"/>
                        </b-field>
                  </section>
                  <footer class="modal-card-foot">
                    <button class="button" type="button">Fermer</button>
                    <button class="button is-info">Valider</button>
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
      this.$emit('annuler')
    },
    confirmer () {
      this.$emit('confirmer')
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
