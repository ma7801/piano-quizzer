<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Chord Quiz</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Chord Quiz</ion-title>
        </ion-toolbar>
      </ion-header>
      <ChordQuizOptions></ChordQuizOptions>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import  ChordQuizOptions  from '@/components/ChordQuiz/Options.vue'

export default  defineComponent({
  name: 'ChordQuiz',
  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonPage,
    ChordQuizOptions }
});
</script>
