<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <section class="section is-main-section">
      <div class="">
        <header class="card-header">
          <div class="level w-100">
              <div class="level-left">
                  <div class="level-item">
                      <b-icon icon="shape-outline"></b-icon>
                      <p><strong>Table Catégorie</strong></p>
                  </div>
              </div>
              <div class="level-right">
                  <div class="level-item">
                    <ajout-categorie></ajout-categorie>
                  </div>
              </div>
          </div>
        </header>
            <modal-box
              :is-active="isModalActive"
              :trash-object-name="trashObjectName"
              :trash-object-article="trashObjectArticle"
              @confirm="trashConfirm" @annuler="trashCancel"/>
            <modifier-categorie
              :is-active="isComponentModalActive"
              :val-modif="valModification"
              @cancel="trashmodalmodifclose"/>
            <b-table
              :checked-rows.sync="checkedRows"
              :paginated="paginated"
              :per-page="perPage"
              default-sort="name"
              :data="getCategories">

              <template slot-scope="props">
                  <b-table-column class="has-no-head-mobile is-image-cell">
                  <div class="image">
                      <img :src="props.row.image" class="image is-96x96">
                  </div>
                  </b-table-column>
                  <b-table-column label="Nom de la Catégorie" field="libelle" sortable>
                  {{ props.row.libelle }}
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
                      <p>Récupération des données...&hellip;</p>
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
    </section>
  </div>

</template>

<script>
import TitleBar from '@/components/TitleBar'
import ModalBox from '@/components/ModalBox'
import AjoutCategorie from '@/components/Catégories/AjoutCategorie'
import ModifierCategorie from '@/components/Catégories/ModifierCategorie'
import { mapGetters } from 'vuex'
export default {
  name: 'TableCategorie',
  components: { TitleBar, ModalBox, AjoutCategorie, ModifierCategorie },
  data () {
    return {
      isComponentModalActive: false,
      isModalActive: false,
      trashObject: null,
      categories: [],
      articles: [],
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
        'Table Catégorie'
      ]
    },
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject
      } else {
        return {}
      }
    },
    trashObjectArticle () {
      if (this.trashObject) {
        return this.getArticles.filter(art => art.idCat === this.trashObject.id)
      } else {
        return []
      }
    }
  },
  methods: {
    trashModal (data) {
      this.trashObject = data
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
