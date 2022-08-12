<template>
  <base-layout page-title="Chord Quiz" backLink="/ChordQuizMenu">
  <h1> {{ chord.chordDisplayName }} </h1>
  <h2 v-show="chord.inversionDisplayName !== 'root inversion'"> {{ chord.inversionDisplayName }} </h2>
  <ion-progress-bar v-show="chordTimerOn" :value="elapsedTime/(options.secondsPerChord * 1000)"></ion-progress-bar>
  <h2 v-if="!chordTimerOn">Answer: {{ chord.chordNotes }}</h2>
 
  <ion-button @click="nextChord">{{ skipOrNextText }} Chord >></ion-button>
  <ion-button @click="stopQuiz" >Stop Quiz</ion-button>
  <ion-button v-if="quizEnded" @click="stopQuiz">Return to Menu</ion-button>
  </base-layout>
</template>

<script>
import { IonButton, IonProgressBar } from '@ionic/vue';
import { getRandomChord } from '../musicData.js';


export default  {
  name: 'ChordQuiz',
  components: { 
    IonButton, IonProgressBar
  },
  data () {
    return {
      optionsString: this.$route.params,
      options: {},
      timerElapsed: false,
      chord: {},
      timer: null,
      chordNum: 0,
      chordTimerOn: false,
      elapsedTime: 0,
      quizEnded: false,
      skipOrNextText: 'Skip'
    }
  },
  methods: {
    nextChord() {
      this.chord = getRandomChord(this.options.chordsChosen, this.options.inversions);
      
      this.chordNum++;
      this.skipOrNextText = 'Skip';
      this.chordTimerOn = true;

      console.log(this.elapsedTime);
      console.log(this.options.secondsPerChord);
      this.timer = setInterval(() => {
        this.elapsedTime += 10;
        console.log('tick');

        // If timer is elapsed
        if (this.elapsedTime >= (this.options.secondsPerChord * 1000)) {
          
          
          // Clear the timer, reset timer-related variables
          clearInterval(this.timer);
          this.chordTimerOn = false;
          this.elapsedTime = 0;
          this.skipOrNextText = 'Next';

          // If this was the last chord, end the quiz
          if (this.chordNum >= this.options.numberOfChords) {
            this.quizEnded = true;
          }
        }
      }, 10);
    },
    stopQuiz () {
      clearInterval(this.timer);
      this.chordTimerOn = false;
      this.elapsedTime = 0;
      this.quizEnded = true;
      this.skipOrNextText = 'Next';
      this.$router.back();
    }


  },
  ionViewWillEnter() {
    console.log('in ionViewWillEnter()');

    // Cleanup parameters (remove backslashes) and convert to an object
    this.optionsString = this.optionsString.options.replace("\\", "");
    this.options = JSON.parse(this.optionsString);
  },
  ionViewDidEnter() {
    this.nextChord();

  }

};
</script>
