<template>
  <base-layout>
  <div class="buttons">
    <ion-button size="large" router-link="/ChordQuizSettings">Settings</ion-button>
    <ion-button size="large" router-link="/ChordQuiz/Practice">Practice</ion-button>
    <ion-button size="large" router-link="/ChordQuiz">Quiz</ion-button>
  </div>
  </base-layout>
</template>

<script>
import BaseLayout from '../components/BaseLayout.vue';
import { IonButton } from '@ionic/vue';


export default {
  components: { BaseLayout, IonButton },

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