<template>
  <base-layout page-title="Piano Quizzer" back-link="/">
  <ion-list>
    <ion-item router-link="/ChordQuizMenu"><ion-img src="../img/baseline_piano_black_24dp.png"></ion-img><ion-label>Chord Quiz</ion-label></ion-item>
    <ion-item><ion-img src="../img/baseline_music_note_black_24dp.png"></ion-img><ion-label>Scale Quiz</ion-label></ion-item>
  </ion-list>

  </base-layout>
</template>

<script>

import { IonLabel, IonList, IonItem, IonImg } from '@ionic/vue';

export default {
  name: 'MainMenu',
  components: { IonLabel, IonList, IonItem, IonImg }
};
</script>
