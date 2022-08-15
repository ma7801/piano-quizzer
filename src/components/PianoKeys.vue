<template>
<div>
<ul class="set">
  <li v-for="note in notes" :class="[note.name, note.color, {pressed: note.isPressed}]" :key="note.index"></li>
</ul>
</div>
</template>


<script>

const keyboardKeys = ['F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E']

export default {
  props: ['pressedKeys', 'formula', 'elapsed'],
  data() {
    return {
      notes: [],
      //curNoteInChord: 0,
      //firstNoteIndex: 0
    }
  },
  watch: {
    pressedKeys() {
      if(this.formula) {
        console.log(this.pressedKeys);
        console.log(this.formula);
        /* MARK THE PRESSED KEYS HERE!!!
        May not even need the formula anymore and the crazy algorithm I made in musicData.js ****/
      }
    },
  },
  mounted() {

    // Create an object with data about the keyboard keys used for rendering it and indicating pressed keys
    for (var num = 0; num < keyboardKeys.length; num++) {
      if (num < 12) {
        this.notes.push({
          'name': keyboardKeys[num], 
          color: keyboardKeys[num].length === 1 ? "white" : "black", 
          octave: 1, 
          'isPressed': false });
      }
      else {
        this.notes.push({
          'name': keyboardKeys[num], 
          color: keyboardKeys[num].length === 1 ? "white" : "black", 
          octave: 2, 
          'isPressed': false })
      }
    
    }

  },

  methods: {

/*    isPressed(note, index) {
      return false;

      var itIsPressed = false;

      // If pressedKeys prop hasn't been loaded yet, just return false for now
      if (!this.pressedKeys) {
        return false;
      }


      /*if(this.curNoteInChord === 0) {
        if (this.pressedKeys[0] === note.name) {
          this.firstNoteIndex = index;
          this.curNoteInChord++;
          return true;
        }
      }*/
/*
      if(this.curNoteInChord === 0  && this.pressedKeys[0] === note.name) {
        this.firstNoteIndex = index;
        this.curNoteInChord++;
        itIsPressed = true;
      }
      else if(this.formula.includes(index - this.firstNoteIndex)) {
        itIsPressed = true;
      }
      else {
        itIsPressed = false;
      }

      //If this is the last run through of the notes array in the v-for, reset the variables
      if (index === this.notes.length - 1) {
        this.curNoteInChord = 0;
        this.firstNoteIndex = 0;
      }

      return itIsPressed;

    }*/
  },
  computed: {
    timerElapsed() {
      
      console.log(this.elapsed);
      return this.elapsed;
    }
  }

};
</script>

<style scoped>
/*
* {
  box-sizing:border-box
}
*/

/*
body {
  margin:0;
  background:#222
}
*/

/* Most Phones */
@media only screen and (max-width: 500px) and (min-width: 360px) {

  ul {
    height:7em;
    width:21.7em;
    margin:2em auto;
    padding:1.5em 0 0 1em;
    position:relative;
    border:1px solid #160801;
    border-radius:10px;
    /*background:linear-gradient(to bottom right,rgba(0,0,0,0.3),rgba(0,0,0,0)),url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/187/vwood.png);*/
    background:linear-gradient(to top left,#111 0%,#444 100%);
    box-shadow:0 0 50px rgba(0,0,0,0.5) inset,0 1px rgba(212,152,125,0.2) inset,0 5px 15px rgba(0,0,0,0.5);
  }

  li {
    margin:0;
    padding:0;
    list-style:none;
    position:relative;
    float:left
  }

  ul .white {
    height:5.6em;
    width:1.4em;
    z-index:1;
    border-left:1px solid #bbb;
    border-bottom:1px solid #bbb;
    border-radius:0 0 2px 2px;
    box-shadow:-1px 0 0 rgba(255,255,255,0.8) inset,0 0 5px #ccc inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#eee 0%,#fff 100%)
  }

  ul .white #pressed {
    border-top:1px solid #777;
    border-left:1px solid #999;
    border-bottom:1px solid #999;
    box-shadow:2px 0 3px rgba(0,0,0,0.1) inset,-5px 5px 20px rgba(0,0,0,0.2) inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#fff 0%,#e9e9e9 100%)
  }



  .black {
    height:2.8em;
    width:0.7em;
    margin:0 0 0 -0.25em;
    left: -0.1em;
    z-index:2;
    border:1px solid #000;
    border-radius:0 0 1px 1px;
    box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -5px 2px 3px rgba(0,0,0,0.6) inset,0 2px 4px rgba(0,0,0,0.5);
    background:linear-gradient(45deg,#222 0%,#555 100%)
  }

/*
  .black:active {
    box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -2px 2px 3px rgba(0,0,0,0.6) inset,0 1px 2px rgba(0,0,0,0.5);
    background:linear-gradient(to right,#444 0%,#222 100%)
  }
*/


  .A, .D, .G, .B, .E {
    margin: 0 0 0 -0.45em;
  }



  ul li:first-child {
    border-radius:5px 0 5px 5px
  }

  ul li:last-child {
    border-radius:0 5px 5px 5px
  }

}

/* Larger phones, tablets in portrait */
@media only screen and (min-width: 501px) and (max-width: 999px) {

  ul {
    height:9.5em;
    width:31em;
    margin:5em auto;
    padding:1.7em 0 0 1.4em;
    position:relative;
    border:1px solid #160801;
    border-radius:10px;
    background:linear-gradient(to top left,#111 0%,#444 100%);
    box-shadow:0 0 50px rgba(0,0,0,0.5) inset,0 1px rgba(212,152,125,0.2) inset,0 5px 15px rgba(0,0,0,0.5);
  }

  li {
    margin:0;
    padding:0;
    list-style:none;
    position:relative;
    float:left
  }

  ul .white {
    height:8em;
    width:2em;
    z-index:1;
    border-left:1px solid #bbb;
    border-bottom:1px solid #bbb;
    border-radius:0 0 5px 5px;
    box-shadow:-1px 0 0 rgba(255,255,255,0.8) inset,0 0 5px #ccc inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#eee 0%,#fff 100%)
  }

  ul .white.pressed {
    border-top:1px solid #777;
    border-left:1px solid #999;
    border-bottom:1px solid #999;
    box-shadow:2px 0 3px rgba(0,0,0,0.1) inset,-5px 5px 20px rgba(0,0,0,0.2) inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#3880ff 0%,#5260ff 100%)
  }

  .black {
    height:4em;
    width:1em;
    margin:0 0 0 -1em;
    left: 0.5em;
    z-index:2;
    border:1px solid #000;
    border-radius:0 0 3px 3px;
    box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -5px 2px 3px rgba(0,0,0,0.6) inset,0 2px 4px rgba(0,0,0,0.5);
    background:linear-gradient(45deg,#222 0%,#555 100%)
  }

  .black.pressed {
    box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -1px 1px 1.5px rgba(0,0,0,0.6) inset,0 1px 2px rgba(0,0,0,0.5);
    background:linear-gradient(to bottom,#3880ff 0%,#5260ff 100%)
  }

 .A, .D, .G, .B, .E  {
    margin: 0 0 0 0em;
  }



  ul li:first-child {
    border-radius:5px 0 5px 5px
  }

  ul li:last-child {
    border-radius:0 5px 5px 5px
  }

}


/* Desktop and tablet in landscape */
@media only screen and (min-width: 1000px) {

  ul {
    height:18.875em;
    width:62em;
    margin:5em auto;
    padding:3em 0 0 3em;
    position:relative;
    border:1px solid #160801;
    border-radius:10px;
    /*background:linear-gradient(to bottom right,rgba(0,0,0,0.3),rgba(0,0,0,0)),url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/187/vwood.png);*/
    background:linear-gradient(to top left,#111 0%,#444 100%);
    box-shadow:0 0 50px rgba(0,0,0,0.5) inset,0 1px rgba(212,152,125,0.2) inset,0 5px 15px rgba(0,0,0,0.5);
  }

  li {
    margin:0;
    padding:0;
    list-style:none;
    position:relative;
    float:left
  }

  ul .white {
    height:16em;
    width:4em;
    z-index:1;
    border-left:1px solid #bbb;
    border-bottom:1px solid #bbb;
    border-radius:0 0 5px 5px;
    box-shadow:-1px 0 0 rgba(255,255,255,0.8) inset,0 0 5px #ccc inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#eee 0%,#fff 100%)
  }

  ul .white:active {
    border-top:1px solid #777;
    border-left:1px solid #999;
    border-bottom:1px solid #999;
    box-shadow:2px 0 3px rgba(0,0,0,0.1) inset,-5px 5px 20px rgba(0,0,0,0.2) inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#fff 0%,#e9e9e9 100%)
  }

  .black {
    height:8em;
    width:2em;
    margin:0 0 0 -1em;
    z-index:2;
    border:1px solid #000;
    border-radius:0 0 3px 3px;
    box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -5px 2px 3px rgba(0,0,0,0.6) inset,0 2px 4px rgba(0,0,0,0.5);
    background:linear-gradient(45deg,#222 0%,#555 100%)
  }

  .black:active {
    box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -2px 2px 3px rgba(0,0,0,0.6) inset,0 1px 2px rgba(0,0,0,0.5);
    background:linear-gradient(to right,#444 0%,#222 100%)
  }

 .A, .D, .G, .B, .E  {
    margin: 0 0 0 -1em;
  }



  ul li:first-child {
    border-radius:5px 0 5px 5px
  }

  ul li:last-child {
    border-radius:0 5px 5px 5px
  }

}

/*
.a,.g,.f,.d,.c {
  margin:0 0 0 -1em
}
*/
</style>