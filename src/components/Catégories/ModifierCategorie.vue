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
                      <b-upload @input="imageAdd">
                        <a class="button is-info">
                          <b-icon icon="upload"></b-icon>
                          <span>Cliquer pour ajouter l'image de la catégorie</span>
                        </a>
                      </b-upload>
                    </b-field>

                    <b-field label="Catégorie">
                      <b-input v-model="newCat.libelle"></b-input>
                    </b-field>
                  </section>
                  <footer class="modal-card-foot">
                    <button class="button" type="button" @click="annuler">Fermer</button>
                    <button class="button is-info" @click="modifierCat" >Valider</button>
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
     newCat: {},
      modif: {}
    }
  },
  methods: {
    annuler () {
     
      this.$emit('cancel')
    },
    confirmer () {
      this.$emit('confirmer')
    },
    imageAdd (e) {
      const imge = e;
      const reader = new FileReader();
      reader.readAsDataURL(imge);
      reader.onload = e =>{
          this.newCat.image = e.target.result;
      }
    },
    modifierCat () {
      if(this.modif.libelle.length )
       {
         this.modif=this.newCat
           db.ref('categories').child(this.modif.id).update({libelle: this.modif.libelle, image: this.modif.image }) ;   

             this.$buefy.toast.open({
            message: 'Modification de Categorie confirmé',
            type: 'is-success',
            position: 'is-bottom'

           });
           
       }
       else
       {
         this.$buefy.toast.open({
            message: 'veuillez renseigner le nom de la categorie ou selectionner une image',
            type: 'is-danger',
            position: 'is-bottom'

           })
       }
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
    this.newCat={
      libelle : this.modif.libelle,
      imgcat : this.modif.image
    }
      
     
    }
  }
}
</script>
