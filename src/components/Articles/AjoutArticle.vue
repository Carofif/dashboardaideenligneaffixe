<template>
    <div>
      <a  @click="isComponentModalActive = true"><b-icon icon="plus-circle-outline" size="is-large"></b-icon></a>
        <b-modal :active.sync="isComponentModalActive" has-modal-card trap-focus>
              <div class="modal-card">
                  <header class="modal-card-head">
                      <p class="modal-card-title">Création d'un article</p>
                   </header>
                  <section class="modal-card-body">
                      <b-field label="Catégorie">
                          <b-select placeholder="Selectionner la catégorie" v-model="catSelect">
                              <option
                                v-for="categorie in categories"
                                :value="categorie.id"
                                :key="categorie.id">
                                {{ categorie.libelle }}
                              </option>
                          </b-select>
                      </b-field>
                        <b-field label="Titre de l'article">
                            <b-input v-model="titreArticle"></b-input>
                        </b-field>
                        <b-field label="Contenue de l'article">
                            <vue-editor v-model="content"/>
                        </b-field>
                  </section>
                  <footer class="modal-card-foot">
                    <button class="button" type="button" @click="annuler">Fermer</button>
                    <button class="button is-info" @click="addArticle">Valider</button>
                  </footer>
              </div>
        </b-modal>
    </div>
</template>

<script>
import { db } from '@/plugins/firebase'
import { VueEditor } from 'vue2-editor'
import moment from 'moment'

moment.locale('fr')

export default {
  props: [ 'isActive' ],
  data () {
    return {
      isComponentModalActive: false,
      content: '',
      titreArticle: '',
      catSelect: '',
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
    addArticle () {
      if (this.titreArticle.length && this.content.length && this.catSelect) {
        const idAct = db.ref().child('articles').push().key
        db.ref('articles/' + idAct).set({
          titre: this.titreArticle,
          id: idAct,
          content: this.content,
          idCat: this.catSelect,
          date: moment().format('YYYYMMDDHHmm')
        })
        this.titreArticle = ''
        this.content = ''
        this.$buefy.toast.open({
          message: 'Article enregistrée',
          type: 'is-success',
          position: 'is-bottom'
        })
      } else {
        this.$buefy.toast.open({
          message: 'Aucune donnée saisie',
          type: 'is-danger',
          position: 'is-bottom'
        })
      }
    },
    annuler () {
      this.$emit('cancel')
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
