<template>
  <base-layout page-title="Chord Quiz" backLink="/ChordQuizMenu" hasExitButton='true'>
    <template #body>
      
        <h1> 
          {{ curChord.chordDisplayName }} 
          <span v-if="this.options.inversions"> 
            <span v-if="this.quizStarted">(</span> 
            {{ curChord.inversionDisplayName }} 
            <span v-if="this.quizStarted">)</span>
          </span>
        </h1>
        
        <ion-progress-bar  style="transition: none;" :value="elapsedTime/(options.secondsPerChord * 1000)"></ion-progress-bar>
        <PianoKeys :pressedKeys="curChord.notes" :showPressedKeys="showAnswer"></PianoKeys>
        <div v-show="showAnswer" class="notes-area">Notes:<br /> <span v-for="note in curChord.notes" :key="note">{{ note }}  </span></div>
    </template>
    <template #footer>
        <ion-note color="secondary" class="note-right">{{chordNum}} / {{options.numberOfChords}}</ion-note>
        <ion-button v-if="!quizEnded" expand="block" size="large" @click="nextChord" :disabled="chordNum >= options.numberOfChords">
          {{ skipOrNextText }} Chord <span v-if="autoAdvanceElapsedTime > 0">&nbsp;in {{ autoAdvanceCountdownTimer }}... </span> >>
        </ion-button>
        <ion-button v-if="quizEnded" expand="block" size="large" strong="true" @click="stopQuiz">End of Quiz - Return to Menu</ion-button>
    </template>
  </base-layout>
</template>

<script>
import { IonButton, IonProgressBar, IonNote} from '@ionic/vue';
import { getRandomChord } from '../musicData.js';
import  PianoKeys  from '../components/PianoKeys.vue';


export default  {
  name: 'ChordQuiz',
  components: { 
    IonButton, IonProgressBar, IonNote,
    PianoKeys
  },
  data () {
    return {
      //optionsString: this.$route.params,
      options: {},
      timerElapsed: false,
      curChord: {},
      timer: null,
      chordNum: 0,
      //chordTimerOn: false,
      elapsedTime: 0,
      quizEnded: false,
      quizStarted: false,
      skipOrNextText: 'Skip',
      chordTypes: [],
      showAnswer: false,
      autoAdvanceTimer: null,
      autoAdvanceElapsedTime: 0,
      isFirstChord: true,
      getReadyTime: 3
    }
  },
  methods: {
    nextChord() {

      // If this is the first chord, show "Get Ready..." message instead of a chord
      if (this.isFirstChord) {
        this.curChord.chordDisplayName = "Get Ready...";
        this.timer = setInterval(() => {
          this.elapsedTime += 10;

          // If the "get ready" timer has elapsed
          if (this.elapsedTime >= (this.getReadyTime * 1000)) {    
            // Clear the timer, reset timer-related variables
            clearInterval(this.timer);
            this.elapsedTime = 0;
            this.isFirstChord = false;
            this.nextChord();
          }
        }, 10);
      }
      else {
        // Reset the timer if it's still running
        if (this.elapsedTime > 0) { 
          clearInterval(this.timer);
          this.elapsedTime = 0;
        }

        this.quizStarted = true;

        // Reset the autoAdvanceTimer (if the next chord button was clicked while advance timer was counting down) 
        if (this.autoAdvanceTimer > 0) {
          clearInterval(this.autoAdvanceTimer);
          this.autoAdvanceElapsedTime = 0;
        }

        // Reset variables
        this.elapsedTime = 0;
        this.showAnswer = false;
        this.skipOrNextText = 'Skip';
      // this.chordTimerOn = true;

        // Get the chord!
        this.curChord = getRandomChord(this.chordTypes, this.options.inversions);
        
        // Increment chord counter
        this.chordNum++;
        
        // Start the timer for the chord to show
        this.timer = setInterval(() => {
          this.elapsedTime += 10;

          console.log('timer tick');

          // If timer is elapsed
          if (this.elapsedTime >= (this.options.secondsPerChord * 1000)) {
            
            // Clear the timer, reset timer-related variables
            clearInterval(this.timer);
            //this.chordTimerOn = false;
            this.elapsedTime = 0;
            this.skipOrNextText = 'Next';
            this.showAnswer = true;

            // If this was the last chord, end the quiz
            if (this.chordNum >= this.options.numberOfChords) {
              this.quizEnded = true;
            }

            // If autoAdvance is enabled (and the quiz is still active), start the autoAdvanceTimer
            if (this.options.autoAdvance && !this.quizEnded) {
              this.autoAdvanceTimer = setInterval(() => {
                this.autoAdvanceElapsedTime += 10;
                console.log('autoAdvance tick');

                if (this.autoAdvanceElapsedTime >= (this.options.secondsPerAnswer * 1000)) {
                  clearInterval(this.autoAdvanceTimer);
                  this.autoAdvanceElapsedTime = 0;

                  this.nextChord();
                  
                }

              }, 10);
            }
          }
        }, 10);
      }
    },
    stopQuiz () {
      clearInterval(this.timer);
      this.$router.back();
    }


  },
  computed: {
    autoAdvanceCountdownTimer() {
      return Math.ceil(parseInt(this.options.secondsPerAnswer) - this.autoAdvanceElapsedTime/1000);
    }
  },
  mounted() {

    // Retrieve settings:
    this.options = JSON.parse(window.localStorage.getItem('chordQuizSettings'));


    // Get the chord types from these options
    for (var index in this.options.chordTypesChosen) {
       if (this.options.chordTypesChosen[index].isChosen) {
        this.chordTypes.push(this.options.chordTypesChosen[index].chordType);
      }
    }

    this.nextChord();
    
  },
  ionViewDidLeave() {
    // Stop the timers
    clearInterval(this.timer);
    clearInterval(this.autoAdvanceTimer);
  }

};
</script>


<style scoped>

/* Turns the automatic progress bar animation off  so that it instantly resets to 0 and doesn't slowly transition back */
ion-progress-bar::part(progress) {
  transition-duration: 0s;
}

ion-note {
  font-size: 150%;
  right: 1px;
}

.notes-area {
  margin: 5%;
  font-size: 200%;
}

.notes-area span {
  margin: 0.5em 0.5em;
}
</style>