<template>
  <base-layout page-title="Settings" backLink="/MainMenu">
    <ion-button @click="save">Save</ion-button>
    <p class="error" v-if="errors.length">
      <strong>Please correct the following in the settings:</strong>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    
    <ion-list-header>Chord Types:</ion-list-header>
    <ion-list>
      <ion-item  v-for="ct in options.chordTypesChosen" :key="ct.chordType">
        <ion-label>{{ ct.chordType }} </ion-label>
        <ion-checkbox :value="ct.chordType"  :checked="ct.isChecked" v-model="ct.isChecked"></ion-checkbox>
      </ion-item>
    </ion-list>
    {{ options.chordTypesChosen }}
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
import { chordTypes } from '../musicData.js';


export default {
  name: 'ChordQuizSettings',
  components: {
    IonInput, IonCheckbox, IonLabel, IonList, IonListHeader,IonItemDivider, IonItem, IonButton

  },
  emits: ['start'],
  data () {
    return {
      chordTypes: {},
      options: {
        chordTypesChosen: {},
        inversions: false,
        secondsPerChord: '2',
        autoAdvance: false,
        secondsPerAnswer: '2',
        numberOfChords: '20'
      },
      optionsString: '',
      errors: [],
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
    save() {
      // Check for validation errors first
      if(this.checkErrors()) {
        return;
      }
      else {
        window.localStorage.setItem('chordQuizSettings', JSON.stringify(this.options));
        this.$router.back()
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
  created() {
    // Create the chordTypes data 
    /*for (chord in chordTypes) {
        this.chordTypes.push(
    }*/
    //this.chordTypes = chordTypes;

    this.options.chordTypesChosen = [
        {chordType: 'major', isChecked: false},
        {chordType: 'minor', isChecked: false},
        {chordType: 'dim', isChecked: false},
        {chordType: 'domSeventh', isChecked: false},
        {chordType: 'majorSeventh', isChecked: false}
    ];
    // Initialize chord types chosen
    /*for(var chord in this.chordTypes) {
      console.log(chord);
      this.options.chordTypesChosen[chord] = false;

    }*/
  },
  mounted() {


    console.log(this.options.chordTypesChosen);
    // Retrieve currently chosen options if they exist in localStorage
    /*if (window.localStorage.getItem('chordQuizSettings')) {
      this.options = JSON.parse(window.localStorage.getItem('chordQuizSettings'));
    }*/

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
