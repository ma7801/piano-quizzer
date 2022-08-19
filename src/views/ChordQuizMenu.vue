<template>
  <base-layout pageTitle="Chord Quiz">
  <template #body>
  <div>
    <ion-button size="large" router-link="/ChordQuiz">Quiz</ion-button>
    <ion-button size="large" router-link="/ChordQuiz/Practice">Practice</ion-button>
    <ion-button size="large" router-link="/ChordQuizSettings">Settings</ion-button>
    <ion-button v-if="devMode" @click="deleteLocalStorage">Delete Storage</ion-button>
    <ion-button v-if="devMode" @click="showTheSettings">Show Settings from Storage</ion-button>
    <ion-button v-if="devMode" @click="playANote">Play a Note</ion-button>
    <div v-if="devMode && showSettings"> {{ settingsJSON }} </div>
    
  </div>
  </template>
  </base-layout>
</template>

<script>
import BaseLayout from '../components/BaseLayout.vue';
import { IonButton } from '@ionic/vue';
import { dev } from '../main.js';
import { createDefaultSettings } from '../musicData.js';

export default {
  components: { BaseLayout, IonButton },

  data () {
    return {
      devMode: dev,
      showSettings: false,
      settingsJSON: null,
      F: null
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
  font-size: 200%;
}

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

</style>