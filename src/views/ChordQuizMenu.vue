<template>
  <base-layout pageTitle="Chord Quiz">
  <template #body>

    <ion-card router-link="/ChordQuiz">
      <ion-item>
        <ion-icon size="large" :icon="school" slot="start"></ion-icon>
        <ion-card-title>Quiz</ion-card-title>
        <ion-card-content class="button" slot="end">
          Test your chord knowledge!
        </ion-card-content>
      </ion-item>
    </ion-card>

    <ion-card router-link="ChordQuiz/Practice">
      <ion-item>
        <ion-icon size="large" :icon="musicalNotes" slot="start"></ion-icon>
        <ion-card-title>Practice</ion-card-title>
        <ion-card-content class="button" slot="end">
          Practice chords without a timer.
        </ion-card-content>
      </ion-item>
    </ion-card>

    <ion-card router-link="/ChordQuizSettings">
      <ion-item>
        <ion-icon size="large" :icon="settings" slot="start"></ion-icon>
        <ion-card-title>Settings</ion-card-title>
        <ion-card-content class="button" slot="end">
          Settings for both quiz and practice.
        </ion-card-content>
      </ion-item>
    </ion-card>

    <ion-card @click="showInstructions = !showInstructions">
      <ion-item>
        <ion-icon size="large" :icon="help" slot="start"></ion-icon>
        <ion-card-title>How To</ion-card-title>
        <ion-card-content class="button" slot="end">
          How to use this app to help you learn chords.
        </ion-card-content>
      </ion-item>
    </ion-card>
    
    <ion-alert :is-open="showInstructions" header="Instructions" sub-header="Welcome to Chord Quiz!"
      message="Place your device on your sheet music holder.  In both the quiz and the practice, you'll be shown a chord name.  Try to play the chord on
      your piano/keyboard.  In the quiz, the answer will be shown after a set amount of seconds.  In practice, you can show the answer by 
      clicking the button at the bottom."
      :buttons="['OK']"
      @didDismiss="showInstructions = false">
      
    </ion-alert>

    <ion-button v-if="devMode" @click="deleteLocalStorage">Delete Storage</ion-button>
    <ion-button v-if="devMode" @click="showTheSettings">Show Settings from Storage</ion-button>
    <ion-button v-if="devMode" @click="playANote">Play a Note</ion-button>
    <div v-if="devMode && showSettings"> {{ settingsJSON }} </div>

  </template>
  <template #footer>
    <ion-title id="version" >Version {{ ver }}</ion-title>
  </template>
  </base-layout>
</template>

<script>
import BaseLayout from '../components/BaseLayout.vue';
import { IonButton, IonCard, IonCardContent, IonCardTitle, IonIcon, IonItem, IonTitle, IonAlert} from '@ionic/vue';
import { dev } from '../main.js';
import { createDefaultSettings } from '../musicData.js';
import { help, musicalNotes, settings, school } from "ionicons/icons";
import { version } from '../main.js';

export default {
  components: { BaseLayout, IonButton, IonCard,IonCardContent, IonCardTitle, IonIcon, IonItem, IonTitle, IonAlert },

  data () {
    return {
      devMode: dev,
      showSettings: false,
      settingsJSON: null,
      F: null,
      help: help,
      musicalNotes: musicalNotes,
      settings: settings,
      school: school,
      ver: version,
      showInstructions: false
    }
  },
  methods: {
    deleteLocalStorage() {
      if(this.devMode) {
        console.log(window.localStorage.clear());
        console.log(window.localStorage.getItem('chordQuizSettings'));
      }
    },
    showTheSettings() {
      this.settingsJSON = window.localStorage.getItem('chordQuizSettings');
      this.showSettings = true;
    },
    playANote() {
      this.F = new Audio(require('@/audio/key01.mp3'))
      this.F.loop = false;
      this.F.play();
    }
  },
  mounted() {
    //If no settings exist, create them (1st run or the were deleted somehow)
    if(!window.localStorage.getItem('chordQuizSettings')) {
      createDefaultSettings();
    }
  }
}
</script>

<style scoped>

ion-button {
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  text-transform: none;
  /*font-size: 200%;*/
}

ion-icon {
  outline: 1px solid var(--ion-color-medium);
  border-radius: 2px;
  width: 64px;
  height: 64px;
}

ion-card-content.button {
  width:60%;
  margin: auto 0.2em;
}

ion-card ion-icon {
  margin-right: 0.7em;
}

ion-card:first-child{
  margin-top: 6em;
}
ion-card {
  margin-top: 2em;
}

#version {
  text-align: center;
  margin: 1em auto;
}

/*
@media screen and (min-width: 768px) {
  ion-button {
    width: 52%;
  }
}

@media screen and (max-width: 768px) {
  ion-button {
    width: 95%;
  }
}
*/

</style>