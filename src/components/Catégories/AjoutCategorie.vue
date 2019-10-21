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
                      <b-upload v-model="image" @input="saveImageUrl">
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
import { db } from '@/plugins/firebase'
export default {
  data () {
    return {
      isComponentModalActive: false,
      image: null,
      newCategorie: '',
      categorieImageUrl: null
    }
  },
   methods: {
      //Cette fonction permet de recupere l'url de l'image ajoute
   //et de la sauvegarder dans une variable
   saveImageUrl (e) {
     const imge = e;
     const reader = new FileReader();
     reader.readAsDataURL(imge);
     reader.onload = e =>{
       this.categorieImageUrl = e.target.result;
     };},
   //fonction permettant d'ajoute une categorie sur firebase
    addCategorie () {
      if(this.newCategorie.length){
        const id = db.ref('categories').push({categorie: this.newCategorie, image: this.categorieImageUrl}).key
        dataRef.child(id).update({id: id})
        this.newCategorie = ''
        this.$buefy.toast.open({
          message: 'Categorie enregistre',
          type: 'is-success',
          position: 'is-bottom'
        })
      } else {
        this.$buefy.toast.open({
          message: 'Champ vide',
          type: 'is-danger',
          position: 'is-bottom'
        })
      }
    
   }
 }
}
</script>
