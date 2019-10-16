<template>
     <b-modal :active.sync="isComponentModalActive" has-modal-card trap-focus>
              <div class="modal-card">
                  <header class="modal-card-head">
                      <p class="modal-card-title">Modifier une catégorie</p>
                   </header>
                  <section class="modal-card-body">
                    <figure class="media-left">
                      <p class="image is-64x64">
                        <img :src="modif.image">
                      </p>
                    </figure>
                    <b-field class="file">
                      <b-upload v-model="modif.image">
                        <a class="button is-info">
                          <b-icon icon="upload"></b-icon>
                          <span>Cliquer pour ajouter l'image de la catégorie</span>
                        </a>
                      </b-upload>
                    </b-field>

                    <b-field label="Catégorie">
                      <b-input v-model="modif.libelle"></b-input>
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
export default {
  props: ['isActive', 'valModif'],
  data () {
    return {
      isComponentModalActive: false,
      modif: {}
    }
  },
  methods: {
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
  }
}
</script>
