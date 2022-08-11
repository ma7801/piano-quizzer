<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button :default-href="backLink"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }} </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <slot />
    </ion-content>
  </ion-page>
</template>

<script>

import { IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonHeader, IonContent } from '@ionic/vue';

export default {
  props: ['pageTitle', 'backLink'],
  components: { IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonHeader, IonContent }
};
</script>
