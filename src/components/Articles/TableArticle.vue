<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <section class="section is-main-section">
        <div class="card">
            <header class="card-header">
              <div class="level w-100">
                  <div class="level-left">
                      <div class="level-item">
                         <b-icon icon="shape-outline"></b-icon>
                         <p><strong>Table Article</strong></p>
                      </div>
                  </div>
                  <div class="level-right">
                      <div class="level-item">
                        <ajout-article @catList="getCategorie"></ajout-article>
                      </div>
                  </div>
              </div>
            </header>
            <div class="card-content">
                 <div>
            <suppr-article :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
                    @annuler="trashCancel"/>
            <modifier-article :is-active="isComponentModalActive" :val-modif="valModification"
                    @cancel="trashmodalmodifclose"/>
            <b-table
            :checked-rows.sync="checkedRows"
            :checkable="checkable"
            :paginated="paginated"
            :per-page="perPage"
            :striped="true"
            :hoverable="true"
            default-sort="name"
            :data="getArticles">

            <template slot-scope="props">
                <b-table-column label="Nom de la Article" field="titre" sortable>
                {{ props.row.titre }}
                </b-table-column>
                <b-table-column label="Date création" field="dateCréation" sortable>
                {{ props.row.date }}
                </b-table-column>
                <b-table-column label="Type Catégorie" field="typeCategorie" sortable>
                {{ getTitleCat(props.row.idCat) }}
                </b-table-column>
                <b-table-column label="Actions" custom-key="actions" class="is-actions-cell">
                <div class="buttons">
                    <button class="button is-small is-info" type="button" @click="trashModalModif(props.row)">
                    <b-icon icon="account-edit" size="is-small"/>
                    </button>
                    <button class="button is-small is-danger" type="button" @click="trashModal(props.row)">
                    <b-icon icon="trash-can" size="is-small"/>
                    </button>
                </div>
                </b-table-column>
            </template>

            <section class="section" slot="empty">
                <div class="content has-text-grey has-text-centered">
                <template v-if="isLoading">
                    <p>
                    <b-icon icon="dots-horizontal" size="is-large"/>
                    </p>
                    <p>Récupération des données...</p>
                </template>
                <template v-else>
                    <p>
                    <b-icon icon="emoticon-sad" size="is-large"/>
                    </p>
                    <p>Rien n'est là&hellip;</p>
                </template>
                </div>
            </section>
            </b-table>
        </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import { db } from '@/plugins/firebase'
import AjoutArticle from '@/components/Articles/AjoutArticle'
import ModifierArticle from '@/components/Articles/ModifierArticle'
import SupprArticle from '@/components/Articles/SupprArticle'
import { mapGetters } from 'vuex'
export default {
  name: 'TableArticle',
  components: { TitleBar, AjoutArticle, ModifierArticle, SupprArticle },
  props: {
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isComponentModalActive: false,
      trashObjectModif: null,
      isModalActive: false,
      trashObject: null,
      articles: [],
      isLoading: true,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      valModification: {},
      categories: []
    }
  },
  firebase: {
    categories: db.ref('categories')
  },
  computed: {
    ...mapGetters([
      'getCategories',
      'getArticles'
    ]),
    titleStack () {
      return [
        'Admin',
        'Table Article'
      ]
    },
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject
      } else {
        return {}
      }
    }
  },
  methods: {
    getCategorie (id) {
      return this.categories ? ' ' : this.categories.find(cat => cat.id === id).libelle
    },
    getTitleCat (idCat) {
      return this.getCategories.length ? ' ' : this.getCategories.find(cat => cat.idCat === idCat).libelle
    },

    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    },
    trashModalModif (data) {
      this.valModification = data
      this.isComponentModalActive = true
    },
    trashmodalmodifclose () {
      this.isComponentModalActive = false
    }
  },
  watch: {
    articles (newValue) {
      this.isLoading = false
      this.getArticles = newValue
      this.$compteur = 0
      while (this.$compteur <= this.getArticles.length - 1) {
        db.ref('categories/' + this.getArticles[this.$compteur].idCat).once('value', (snap) => {
          if (snap.val()) {
            this.$categories = snap.val()
          } else {
            this.$categories = {}
          }
        })
        this.getArticles[this.$compteur] = {
          content: this.getArticles[this.$compteur].content,
          date: this.getArticles[this.$compteur].date,
          id: this.getArticles[this.$compteur].id,
          idCat: this.getArticles[this.$compteur].idCat,
          titre: this.getArticles[this.$compteur].titre,
          nomcat: this.$categories.libelle
        }
        this.$compteur++
      }
    },
    getCategories (newValueCat) {
      console.log(newValueCat)
    }
  }
}
</script>

<style>
.w-100 {
  width: 100%;
}
</style>
