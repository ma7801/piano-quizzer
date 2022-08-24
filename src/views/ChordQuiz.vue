<template>
  <base-layout :page-title="isPractice ? 'Practice' : 'Chord Quiz'" backLink="/ChordQuizMenu" hasExitButton='true'>
    <template #body>
      
        <h1 v-show="!showFullChordName" class="chord-abbr" @click="showFullChordName = !showFullChordName"> {{ curChord.chordAbbreviation }} </h1>
        <h1 v-show="showFullChordName" class="chord-full" @click="showFullChordName = !showFullChordName"> {{ curChord.chordDisplayName}} </h1>
        <h2 v-if="options.inversions"> 
          <span v-if="quizStarted">(</span> 
          {{ curChord.inversionDisplayName }} 
          <span v-if="quizStarted">)</span>
        </h2>
      
        <PianoKeys :pressedKeys="curChord.notes" :showPressedKeys="showAnswer" :playChord="true"></PianoKeys>
        
        <div v-show="showAnswer && options.showNotes" class="notes-area">Notes:<br /> <span v-for="note in curChord.notes" :key="note">{{ note }}  </span></div>
    </template>
    <template #footer>
        <ion-progress-bar  v-if="!isPractice" style="transition: none;" :value="progressPercent"></ion-progress-bar>
        <!-- Practice HTML -->
        <ion-button v-if="isPractice && !showAnswer" expand="block" size="large" @click="showAnswer = true">Show Answer</ion-button>
        <ion-button v-if="isPractice && showAnswer"  expand="block" size="large" @click="nextChordPractice">Next Chord >></ion-button>

        <!-- Quiz HTML -->
        <ion-note v-if="!isPractice" color="secondary" class="note-right">{{chordNum}} / {{options.numberOfChords}}</ion-note>
        <ion-button v-if="!quizEnded && !isPractice" expand="block" size="large" @click="nextChord" :disabled="chordNum >= options.numberOfChords">
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
      options: {},
      timerElapsed: false,
      curChord: {},
      timer: null,
      chordNum: 0,
      elapsedTime: 0,
      quizEnded: false,
      quizStarted: false,
      skipOrNextText: 'Skip',
      chordTypes: [],
      showAnswer: false,
      autoAdvanceTimer: null,
      autoAdvanceElapsedTime: 0,
      isFirstChord: true,
      getReadyTime: 3,
      isPractice: false,
      showFullChordName: false
    }
  },
  methods: {
    nextChord() {

      // If this is the first chord, show "Get Ready..." message instead of a chord
      if (this.isFirstChord) {
        this.curChord.chordAbbreviation = "Get Ready...";
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

        // Reset chord to display to abbreviation
        this.showFullChordName = false;

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

          //console.log('timer tick');

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
                //console.log('autoAdvance tick');

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
    },
    nextChordPractice() {
      // Reset variables
      this.showAnswer = false;
      this.quizStarted = true;
      this.showFullChordName = false;

      // Get the chord!
      this.curChord = getRandomChord(this.chordTypes, this.options.inversions);
    }


  },

  computed: {
    autoAdvanceCountdownTimer() {
      return Math.ceil(parseInt(this.options.secondsPerAnswer) - this.autoAdvanceElapsedTime/1000);
    },
    progressPercent() {

      // If the get ready message is showing
      if(this.isFirstChord) {
        return this.elapsedTime/(this.getReadyTime * 1000)
      }

      // Otherwise the quiz is going
      else {
        return this.elapsedTime/(this.options.secondsPerChord * 1000)
      }
      
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

    // If this is practice
    if(this.$route.params.isPractice === 'Practice') {
      this.isPractice = true;
      this.skipOrNextText = 'Next';
      this.nextChordPractice();
    }
    // Else it's a quiz
    else {
      this.nextChord();
    }
    
    
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

ion-button {
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  text-transform: none;
  font-size: 150%;
}

h1.chord-abbr {
  font-size: 400%;
  height: 1.5em;
}

h1.chord-full {
  height: 1.5em;
  padding: auto;
}

</style>