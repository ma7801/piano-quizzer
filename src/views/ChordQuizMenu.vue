<template>
  <base-layout page-title="Chord Quiz" backLink="/MainMenu">
    <ion-button @click="startPlaying">Start Quiz!</ion-button>
    
    <ion-list-header>Chord Types:</ion-list-header>
    <ion-list v-for="(chord, index) in chords" :key="chord">
      <ion-item>
        <ion-label>{{ chord.displayName }}</ion-label><ion-checkbox :value="index" @click="chordOptionsChanged"></ion-checkbox>
      </ion-item>
    </ion-list>
    <ion-item-divider></ion-item-divider>
    <ion-list-header>Other options:</ion-list-header>
    <ion-list>
      <ion-item>
        <ion-label>Inversions</ion-label><ion-checkbox v-model="options.inversions"></ion-checkbox>
      </ion-item>
      <ion-item>
        <ion-label>Auto advance after each chord</ion-label><ion-checkbox v-model="options.autoAdvance"></ion-checkbox>
      </ion-item>
      <ion-item v-show="options.autoAdvance">
        <ion-input placeholder="Seconds to wait before next chord" />
      </ion-item>
    </ion-list>
  </base-layout>
      
</template>

<script>
import { IonInput, IonCheckbox, IonLabel, IonList, IonListHeader,IonItemDivider, IonItem, IonButton } from '@ionic/vue'
import { chords } from '../musicData.js';
//import { useRouter } from 'vue-router';



export default {
  name: 'ChordQuizMenu',
  components: {
    IonInput, IonCheckbox, IonLabel, IonList, IonListHeader,IonItemDivider, IonItem, IonButton

  },
  emits: ['start'],
  data () {
    return {
      chords: {},
      options: {
        chordsChosen: [],
        inversions: false,
        autoAdvance: false
      },
      optionsString: ''
    }
  },
  methods: {
    startQuiz() {
      console.log(this.options);
    },
    chordOptionsChanged(e) {
      // Update chordsChosen - can't get data binding to work with those elements - doesn't seem to work in Ionic

      if(this.options.chordsChosen.includes(e.target.value)) {
        // If the item was previously chosen (checked), remove it from chordsChosen array
        this.options.chordsChosen.splice(this.options.chordsChosen.indexOf(e.target.value), 1);
      }
      else {
        // If item was checked, add to chordsChosen array
        this.options.chordsChosen.push(e.target.value);
      }
    },
    startPlaying() {
      //Prepare to send data to quiz (as string in URL)
      this.optionsString = JSON.stringify(this.options);
   
      //Navigate to Quiz
      this.$router.push("/ChordQuiz/" + this.optionsString);

    }
  },
  mounted() {
    this.chords = chords;
  }
};
</script>

<style>

</style>
