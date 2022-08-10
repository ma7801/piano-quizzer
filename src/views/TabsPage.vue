<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="chordQuiz" href="/tabs/chordQuiz">
          <img src="../img/baseline_piano_black_24dp_small.png" />
          <ion-label>Chord Quiz</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="scaleQuiz" href="/tabs/scaleQuiz">
          <ion-icon :icon="ellipse" />
          <ion-label>Scale Quiz</ion-label>
        </ion-tab-button>
        

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
    }
  }
});
</script>
