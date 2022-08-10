<template>
  
    <ion-list-header>
      <ion-label>
        Options:
      </ion-label>
    </ion-list-header>
    <ion-list>
      <ion-item>
        <ion-label>Triads</ion-label><ion-checkbox name="triads"></ion-checkbox>
      </ion-item>
      <ion-item>  
        <ion-label>Four-note Chords</ion-label><ion-checkbox name="fourNoteChords"></ion-checkbox>
      </ion-item>
      <ion-item-divider></ion-item-divider>
      <ion-item>
        <ion-label>Inversions</ion-label><ion-checkbox name="inversions"></ion-checkbox>
      </ion-item>
      <ion-item-divider></ion-item-divider>
      <ion-item>
        <ion-label>Auto advance after each chord</ion-label><ion-checkbox name="autoAdvance" v-model="autoAdvanceOn"></ion-checkbox>
      </ion-item>
      <ion-item v-show="autoAdvanceOn">
        <ion-input placeholder="Seconds to wait before next chord" />
      </ion-item>
    </ion-list>
    
      
</template>

<script>
import { IonInput, IonCheckbox, IonLabel, IonList, IonListHeader,IonItemDivider, IonItem } from '@ionic/vue'
import { defineComponent } from 'vue';



export default defineComponent({
  name: 'ChordQuizOptions',
  components: {
    IonInput, IonCheckbox, IonLabel, IonList, IonListHeader,IonItemDivider, IonItem,

  },
  props: {

  },
  data () {
    return {
      autoAdvanceOn: false
    }
  },
  methods: {

  }
});
</script>

<style>

</style>
