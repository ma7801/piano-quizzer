<template>
  <base-layout page-title="Settings" backLink="/ChordQuizMenu">
    <template #body>
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
          <ion-label>{{ ct.displayName }} </ion-label>
          <ion-checkbox :value="ct.chordType"  :checked="ct.isChosen" v-model="ct.isChosen"></ion-checkbox>
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
          <ion-label>Number of chords in quiz:</ion-label><ion-input :value="options.numberOfChords" v-model="options.numberOfChords" />
        </ion-item>
      </ion-list>
    </template>
  </base-layout>
      
</template>

<script>
import { IonInput, IonCheckbox, IonLabel, IonList, IonListHeader,IonItemDivider, IonItem, IonButton } from '@ionic/vue'
import { chords } from '../musicData.js';


export default {
  name: 'ChordQuizSettings',
  components: {
    IonInput, IonCheckbox, IonLabel, IonList, IonListHeader,IonItemDivider, IonItem, IonButton

  },
  emits: ['start'],
  data () {
    return {
      //chordTypes: {},
      options: {
        chordTypesChosen: [],
        inversions: false,
        secondsPerChord: '',
        autoAdvance: false,
        secondsPerAnswer: '',
        numberOfChords: ''
      },
      optionsString: '',
      errors: [],
    }
  },
  methods: {
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
      if(this.options.chordTypesChosen.length === 0 ) {
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
        this.errors.push("Number of chords in quiz must be a positive whole number.");
        isError = true;
      }
      return isError;
    },

    createChordTypesChosen() {
      // Create the chordTypes data (with values from musicData.js and default false values for 'isChosen')
      for (var chord in chords) {
        this.options.chordTypesChosen.push({
          displayName: chords[chord].displayName,
          chordType: chord,
          isChosen: false
        });
      }
    }
  },
  created() {
    // Create the this.chordTypesChosen object
    this.createChordTypesChosen();
  },
  mounted() {
    // Retrieve currently chosen options if they exist in localStorage
    if (window.localStorage.getItem('chordQuizSettings')) {
      this.options = JSON.parse(window.localStorage.getItem('chordQuizSettings'));
    }

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
