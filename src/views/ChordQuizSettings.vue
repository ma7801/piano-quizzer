<template>
  <base-layout page-title="Settings" backLink="/ChordQuizMenu">
    <template #body>
      <ion-button expand="block" size="large" @click="save">Save</ion-button>
      <p class="error" v-if="errors.length">
        <strong>Please correct the following:</strong>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </p>
      
      <ion-list-header>Chord Types:</ion-list-header>
      <ion-list>
        <ion-item  v-for="ct in options.chordTypesChosen" :key="ct.chordType">
          <ion-label>{{ ct.displayName }} </ion-label>
          <ion-toggle :value="ct.chordType"  :checked="ct.isChosen" v-model="ct.isChosen"></ion-toggle>
        </ion-item>
      </ion-list>
      <ion-item-divider></ion-item-divider>
      <ion-list>
        <ion-item>
          <ion-label>Inversions</ion-label><ion-toggle v-model="options.inversions"></ion-toggle>
        </ion-item>
      </ion-list>
      <ion-list>
        <ion-list-header>
          Practice Options:
        </ion-list-header>
        <ion-item>
          <ion-label>Show chords in order</ion-label>
          <ion-toggle v-model="options.practiceChordsInOrder"></ion-toggle>
        </ion-item>
        <div v-show="options.practiceChordsInOrder">
          <ion-item>
            <ion-label>&nbsp;&nbsp;&nbsp;Root order:</ion-label>
            <ion-select v-model="options.orderOfChords">
              <ion-select-option value="fifths">by Fifths</ion-select-option>
              <ion-select-option value="fourths">by Fourths</ion-select-option>
              <ion-select-option value="chromatic">Chromatic</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label>&nbsp;&nbsp;&nbsp;Starting Key</ion-label>
            <!-- show order of roots based in different orders based on which order is chosen in "root order"-->
            <ion-select v-if="options.orderOfChords === 'chromatic'" :value="options.startingKey" v-model="options.startingKey">
              <ion-select-option  v-for="note in notesChromatic" :key="note">{{ note }}</ion-select-option>
            </ion-select>
            <ion-select v-if="options.orderOfChords !== 'chromatic'" :value="options.startingKey" v-model="options.startingKey">
              <ion-select-option  v-for="note in notesCircleOfFifths" :key="note">{{ note }}</ion-select-option>
            </ion-select>
          </ion-item>
        </div>
      </ion-list>
      <ion-list>
        <ion-list-header>
          Quiz Options:
        </ion-list-header>
        <ion-item>
          <ion-label>Seconds to show chord:</ion-label>
          <ion-select :value="options.secondsPerChord" v-model="options.secondsPerChord">
            <ion-select-option v-for="n in 20" :key="n" >
               {{ n }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Auto advance after each chord</ion-label><ion-toggle v-model="options.autoAdvance"></ion-toggle>
        </ion-item>
        <ion-item v-show="options.autoAdvance">
          <ion-label>&nbsp;&nbsp;&nbsp;Seconds to show answer:</ion-label>
          <ion-select :value="options.secondsPerAnswer" v-model="options.secondsPerAnswer">
            <ion-select-option v-for="n in 20" :key="n" >
              {{ n }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Number of chords in quiz:</ion-label>
          <ion-select :value="options.numberOfChords" v-model="options.numberOfChords">
            <!-- show options from 5 to 100-->
            <div v-for="n in 100" :key="n">
              <ion-select-option v-if="n >= 5">
                {{ n }}
              </ion-select-option>
            </div>
          </ion-select>
        </ion-item>
      </ion-list>
    </template>
  </base-layout>
      
</template>

<script>
import { IonLabel, IonList, IonListHeader,IonItemDivider, IonItem, IonButton, IonToggle, IonSelect, IonSelectOption } from '@ionic/vue'
import { chords } from '../musicData.js';
import { roots } from '../musicData.js';
import { circleOfFifths } from '../musicData.js';


export default {
  name: 'ChordQuizSettings',
  components: {
    IonLabel, IonList, IonListHeader,IonItemDivider, IonItem, IonButton, IonToggle, IonSelect, IonSelectOption

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
        numberOfChords: '',
        orderOfChords: '',
        startingKey: '',
        practiceChordsInOrder: false,
      },
      optionsString: '',
      errors: [],
      notesChromatic: roots,
      notesCircleOfFifths: circleOfFifths
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


      // See if at least one of the chord types is selected (i.e. see if all chord.isChosen's are false)
      if(this.options.chordTypesChosen.every((chord) => {return chord.isChosen === false;})) {
        this.errors.push("You must select at least one type of chord.");
        isError = true;
      }

      // Check inputs
      temp = parseFloat(this.options.secondsPerChord);
      if(!Number.isInteger(temp) || temp < 1 || isNaN(this.options.secondsPerChord)) {
        this.errors.push("Seconds per chord must be a positive whole number.");
        isError = true;
      }

      temp = parseFloat(this.options.secondsPerAnswer)
      if(!Number.isInteger(temp) || temp < 1 || isNaN(this.options.secondsPerAnswer)) {
        this.errors.push("Seconds per answer must be a positive whole number.");
        isError = true;
      }

      temp = parseFloat(this.options.numberOfChords)
      if(!Number.isInteger(temp) || temp < 1 || isNaN(this.options.numberOfChords)) {
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
    console.log(this.options);

    // Retrieve currently chosen options if they exist in localStorage
    if (window.localStorage.getItem('chordQuizSettings')) {
      this.options = JSON.parse(window.localStorage.getItem('chordQuizSettings'));
    }

  }
};
</script>

<style scoped>
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
