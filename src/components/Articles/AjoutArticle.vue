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
                    <button class="button" type="button">Fermer</button>
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

export default {
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
          this.$emit('catList', this.categories)
        } else {
          this.categories = []
        }
      })
    },
    addArticle() {
      const id = db.ref('articles').push({titre: this.titreArticle, content: this.content, idCat: this.catSelect, date: moment().format('lll')}).key;
      db.ref('articles').child(id).update({id: id})
      this.content = '';
      this.titreArticle = '';
      this.catSelect = '';
      this.$buefy.toast.open({
        message: 'Article enregistre',
        type: 'is-success',
        position: 'is-bottom'
      })
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
