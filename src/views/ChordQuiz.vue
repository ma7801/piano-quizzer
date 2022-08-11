<template>
  <base-layout page-title="Chord Quiz" backLink="/ChordQuizMenu">
  <h1> Hi: {{ options }} </h1>
  <h3> {{ optionsString }} </h3>
  </base-layout>
</template>

<script>
//import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';


export default  {
  name: 'ChordQuiz',
  components: { 

  },
  data () {
    return {
      optionsString: this.$route.params,
      options: {}
    }
  },
  methods: {

  },
  ionViewWillEnter() {
    console.log('in ionViewWillEnter()');

    // Cleanup parameters (remove backslashes) and convert to an object
    this.optionsString = this.optionsString.options.replace("\\", "");
    this.options = JSON.parse(this.optionsString);
  }

};
</script>
