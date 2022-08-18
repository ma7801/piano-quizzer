<template>
  <base-layout>
  <template #body>
  <div class="buttons">
    <ion-button size="large" router-link="/ChordQuiz">Quiz</ion-button>
    <ion-button size="large" router-link="/ChordQuiz/Practice">Practice</ion-button>
    <ion-button size="large" router-link="/ChordQuizSettings">Settings</ion-button>
    <ion-button v-if="devMode" @click="deleteLocalStorage">Delete Storage</ion-button>
    <ion-button v-if="devMode" @click="showTheSettings">Show Settings from Storage</ion-button>
    <div v-if="devMode && showSettings"> {{ settingsJSON }} </div>
  </div>
  </template>
  </base-layout>
</template>

<script>
import BaseLayout from '../components/BaseLayout.vue';
import { IonButton } from '@ionic/vue';
import { dev } from '../main.js';
import { getChordTypesArray } from '../musicData.js';
import { createDefaultSettings } from '../musicData.js';
import { ChordQuizSettings }  from './ChordQuizSettings.vue'

export default {
  components: { BaseLayout, IonButton },

  data () {
    return {
      devMode: dev,
      showSettings: false,
      settingsJSON: null
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
.buttons {
  text-align: center;
}
ion-button {
  width: 80%;
}
</style>