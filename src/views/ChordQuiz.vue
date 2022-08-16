<template>
  <base-layout page-title="Chord Quiz" backLink="/ChordQuizMenu">
  <ion-button @click="nextChord">{{ skipOrNextText }} Chord >></ion-button>
  <ion-button @click="stopQuiz" >Stop Quiz</ion-button>
  <h1> {{ curChord.chordDisplayName }} </h1>
  <h2> {{ curChord.inversionDisplayName }}</h2>
  <ion-progress-bar v-show="chordTimerOn" :value="elapsedTime/(options.secondsPerChord * 1000)"></ion-progress-bar>
  <PianoKeys v-show="!chordTimerOn" :pressedKeys="curChord.notes" :formula="curChord.formula" :elapsed="!chordTimerOn"></PianoKeys>
 <ion-button v-if="quizEnded" @click="stopQuiz">Return to Menu</ion-button>
  </base-layout>
</template>

<script>
import { IonButton, IonProgressBar } from '@ionic/vue';
import { getRandomChord } from '../musicData.js';
import  PianoKeys  from '../components/PianoKeys.vue';


export default  {
  name: 'ChordQuiz',
  components: { 
    IonButton, IonProgressBar, PianoKeys
  },
  data () {
    return {
      //optionsString: this.$route.params,
      options: {},
      timerElapsed: false,
      curChord: {},
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
      if (this.elapsedTime > 0) { 
        console.log('timer exists');
        clearInterval(this.timer);
      }
      this.elapsedTime = 0;

      this.curChord = getRandomChord(this.options.chordsChosen, this.options.inversions);
      
      this.chordNum++;
      this.skipOrNextText = 'Skip';
      this.chordTimerOn = true;

      this.timer = setInterval(() => {
        this.elapsedTime += 10;
        //console.log('tick');

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
  mounted() {
    // Retrieve settings:
    console.log(window.localStorage.getItem('chordQuizSettings'));
    this.options = JSON.parse(window.localStorage.getItem('chordQuizSettings'));

    this.nextChord();
    

  }

};
</script>


<style scoped>

ion-progress-bar {
  margin: 0px;
}
</style>