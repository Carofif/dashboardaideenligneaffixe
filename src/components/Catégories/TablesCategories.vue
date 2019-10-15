<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Tables
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
            <div class="card-content">
                 <div>
            <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
                    @cancel="trashCancel"/>
            <modifier-categorie :is-active="isComponentModalActive" :val-modif="valModification"/>
            <b-table
            :checked-rows.sync="checkedRows"
            :checkable="checkable"
            :loading="isLoading"
            :paginated="paginated"
            :per-page="perPage"
            :striped="true"
            :hoverable="true"
            default-sort="name"
            :data="categories">

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
import axios from 'axios'
import ModalBox from '@/components/ModalBox'
import { db } from '@/plugins/firebase'
import AjoutCategorie from '@/components/Catégories/AjoutCategorie'
import ModifierCategorie from '@/components/Catégories/ModifierCategorie'
export default {
  name: 'Tables',
  components: { HeroBar, TitleBar, ModalBox, AjoutCategorie, ModifierCategorie },
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
      categories: [],
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
        'Tables'
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
    getCategories () {
      db.ref('categories').on('value', (snap) => {
        if (snap.val()) {
          this.categories = Object.values(snap.val())
        } else {
            this.categories = []
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
      this.getCategories()
  },
  destroyed () {
    db.ref('categories/').off()
  }
}
</script>

<style>
.w-100 {
  width: 100%;
}
</style>
