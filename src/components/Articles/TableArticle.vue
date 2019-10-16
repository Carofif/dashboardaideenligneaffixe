<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Table Article
      <router-link slot="right" to="/" class="button">
        Tableau de bord
      </router-link>
    </hero-bar>
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
                        <ajout-article></ajout-article>
                      </div>
                  </div>
              </div>
            </header>
            <div class="card-content">
                 <div>
            <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
                    @cancel="trashCancel"/>
            <modifier-article :is-active="isComponentModalActive" :val-modif="valModification"/>
            <b-table
            :checked-rows.sync="checkedRows"
            :checkable="checkable"
            :loading="isLoading"
            :paginated="paginated"
            :per-page="perPage"
            :striped="true"
            :hoverable="true"
            default-sort="name"
            :data="articles">

            <template slot-scope="props">
                <b-table-column label="Nom de la Article" field="titre" sortable>
                {{ props.row.titre }}
                </b-table-column>
                <b-table-column label="Date création" field="dateCréation" sortable>
                {{ props.row.date }}
                </b-table-column>
                <b-table-column label="Type Catégorie" field="typeCategorie" sortable>
                {{ props.row.idCat }}
                </b-table-column>
                <b-table-column label="Actions" custom-key="actions" class="is-actions-cell">
                <div class="buttons">
                    <button class="button is-small is-info" type="button" @click="trashModalModif(props.row)">
                    <b-icon icon="account-edit" size="is-small"/>
                    </button>
                    <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)">
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
import HeroBar from '@/components/HeroBar'
import ModalBox from '@/components/ModalBox'
import { db } from '@/plugins/firebase'
import AjoutArticle from '@/components/Articles/AjoutArticle'
import ModifierArticle from '@/components/Articles/ModifierArticle'
export default {
  name: 'Table Article',
  components: { HeroBar, TitleBar, ModalBox, AjoutArticle, ModifierArticle },
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
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      valModification: {}
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Table Article'
      ]
    },
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    },
    trashObjectNameModif () {
      if (this.trashObjectModif) {
        return this.trashObjectModif.name
      }

      return null
    }
  },
  methods: {
    getArticles () {
      db.ref('articles').on('value', (snap) => {
        if (snap.val()) {
          this.articles = Object.values(snap.val())
        } else {
          this.articles = []
        }
      })
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
    }
  },
  mounted () {
    this.getArticles()
  },
  destroyed () {
    db.ref('articles/').off()
  }
}
</script>

<style>
.w-100 {
  width: 100%;
}
</style>
