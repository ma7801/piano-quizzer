<template>
  <base-layout page-title="Chord Quiz" backLink="/MainMenu">
    <ion-button @click="startPlaying">Start Quiz!</ion-button>
    <p class="error" v-if="errors.length">
      <strong>Please correct the following in the settings:</strong>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    
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
        <ion-label>Seconds to show chord:</ion-label><ion-input :value="options.secondsPerChord"  v-model="options.secondsPerChord" />
      </ion-item>
      <ion-item>
        <ion-label>Auto advance after each chord</ion-label><ion-checkbox v-model="options.autoAdvance"></ion-checkbox>
      </ion-item>
      <ion-item v-show="options.autoAdvance">
        <ion-label>Seconds to show answer:</ion-label><ion-input :value="options.secondsPerAnswer" v-model="options.secondsPerAnswer" />
      </ion-item>
      <ion-item>
        <ion-label>Number of chords:</ion-label><ion-input :value="options.numberOfChords" v-model="options.numberOfChords" />
      </ion-item>
    </ion-list>
  </base-layout>
      
</template>

<script>
import { IonInput, IonCheckbox, IonLabel, IonList, IonListHeader,IonItemDivider, IonItem, IonButton } from '@ionic/vue'
import { chords } from '../musicData.js';


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
        secondsPerChord: '2',
        autoAdvance: false,
        secondsPerAnswer: '2',
        numberOfChords: '20'
      },
      optionsString: '',
      errors: []
    }
  },
  methods: {
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
      // Check for validation errors first
      if(this.checkErrors()) {
        return;
      }
      else {
        //Prepare to send data to quiz (as string in URL)
        this.optionsString = JSON.stringify(this.options);
    
        //Navigate to Quiz
      this.$router.push("/ChordQuiz/" + this.optionsString);
      }
    },
    checkErrors() {
      this.errors = [];

      var isError = false;
      var temp;

      // See if at least one of the chord types is selected
      if(this.options.chordsChosen.length === 0 ) {
        this.errors.push("You must select at least one type of chord.");
        isError = true;
      }

      console.log(Number.isInteger(this.options.secondsPerChord));
      console.log(this.options);

      // Check inputs
      temp = parseFloat(this.options.secondsPerChord);
      console.log(temp);
      if(!Number.isInteger(temp) || temp < 1) {
        this.errors.push("Seconds per chord must be a positive whole number.");
        isError = true;
      }

      temp = parseFloat(this.options.secondsPerAnswer)
      if(!Number.isInteger(temp) || temp < 1) {
        this.errors.push("Seconds per answer must be a positive whole number.");
        isError = true;
      }

      temp = parseFloat(this.options.numberOfChords)
      if(!Number.isInteger(temp) || temp < 1) {
        this.errors.push("Number of chords must be a positive whole number.");
        isError = true;
      }
      return isError;
    },
  },
  mounted() {
    this.chords = chords;
  }
};
</script>

<style>
.error {
  color: crimson;
}

.error ul {
  color: crimson;
  padding: 0px;
  margin: 0px;
}

.error li {
  list-style: none;
}
</style>
