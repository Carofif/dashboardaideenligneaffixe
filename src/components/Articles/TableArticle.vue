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
                {{ props.row.nomcat }}
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
import HeroBar from '@/components/HeroBar'
import { db } from '@/plugins/firebase'
import AjoutArticle from '@/components/Articles/AjoutArticle'
import ModifierArticle from '@/components/Articles/ModifierArticle'
import SupprArticle from '@/components/Articles/SupprArticle'
import { mapGetters } from 'vuex'

export default {
  name: 'TableArticle',
  components: { HeroBar, TitleBar, AjoutArticle, ModifierArticle, SupprArticle },
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
      isLoading: true,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      valModification: {}
    }
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
  }
}
</script>

<style>
.w-100 {
  width: 100%;
}
</style>
