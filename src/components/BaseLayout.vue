<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button :default-href="backLink"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }} </ion-title>
        <ion-buttons v-if="hasExitButton === 'true'" slot="end">
          <ion-back-button class="quit" icon="" text="Quit" :default-href="backLink"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot name="body" />
    </ion-content>
    <ion-footer>
      <slot name="footer" />
    </ion-footer>
  </ion-page>
</template>

<script>

import { IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonHeader, IonContent, IonFooter } from '@ionic/vue';

export default {
  props: ['pageTitle', 'backLink', 'hasExitButton'],
  components: { IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonHeader, IonContent, IonFooter },
};
</script>


<style scoped>
ion-title {
  margin: 0 -1.7em 0 -1.7em;
}
ion-back-button.quit {
  background-color: var(--ion-color-tertiary);
  color: var(--ion-color-tertiary-contrast);
  border-radius: var(--border-radius);
}

ion-footer {
  text-align: right;
}
</style>
