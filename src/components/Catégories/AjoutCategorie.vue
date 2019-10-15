<template>
    <div>
      <a  @click="isComponentModalActive = true"><b-icon icon="plus-circle-outline" size="is-large"></b-icon></a>
        <b-modal :active.sync="isComponentModalActive" has-modal-card trap-focus>
              <div class="modal-card">
                  <header class="modal-card-head">
                      <p class="modal-card-title">Création d'une catégorie</p>
                   </header>
                  <section class="modal-card-body">
                    <b-field class="file">
                      <b-upload v-model="image">
                        <a class="button is-info">
                          <b-icon icon="upload"></b-icon>
                          <span>Cliquer pour ajouter l'image de la catégorie</span>
                        </a>
                      </b-upload>
                      <span class="file-name" v-if="image">
                        {{image.name}}
                      </span>
                    </b-field>

                    <b-field label="Catégorie">
                      <b-input v-model="newCategorie"></b-input>
                    </b-field>
                  </section>
                  <footer class="modal-card-foot">
                    <button class="button" type="button">Fermer</button>
                    <button class="button is-info">Valider</button>
                  </footer>
              </div>
        </b-modal>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isComponentModalActive: false,
      image: null,
      newCategorie: ''
    }
  }
}
</script>
