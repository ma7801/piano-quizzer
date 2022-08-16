<template>
<div>
<ul class="set">
  <li v-for="note in notes" :class="[note.name, note.color, {pressed: note.isPressed}]" :key="note.index"></li>
</ul>
<div class="noteNames"> </div>
</div>
</template>


<script>

const keyboardKeys = ['F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E']

export default {
  props: ['pressedKeys'],
  data() {
    return {
      notes: [],
    }
  },
  watch: {
    pressedKeys() {
    
      // Loop through keyboard notes, skip first note of F (chord with leftmost F note will start on second octave)
      var curNoteInChord = 0;
      var intervalToNextNote = 0;
      for(var curKey = 1; curKey < this.notes.length; curKey++) {

        // If we've reached the end of the chord (pressedKeys)
        if (curNoteInChord >= this.pressedKeys.length) {
          // Clear any remaining pressed keys from previous chord
          for (var key = curKey; key < this.notes.length; key++) {
            this.notes[key].isPressed = false;
          }

          // Stop looping, we've pressed all keys in the chord
          break;
        }

        // If the key is in the chord (pressedKeys), set isPressed to true, otherwise set it to false
        if (this.notes[curKey].name === this.pressedKeys[curNoteInChord]) {
          this.notes[curKey].isPressed = true;
          curNoteInChord++;
        }
        else {
          this.notes[curKey].isPressed = false;
        }
        
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

/* Narrow Phones */
@media only screen and (max-width: 370px) {

  ul {
    height:7em;
    width:15.2em;
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
    width:1em;
    z-index:1;
    border-left:1px solid #bbb;
    border-bottom:1px solid #bbb;
    border-radius:0 0 2px 2px;
    box-shadow:-1px 0 0 rgba(255,255,255,0.8) inset,0 0 5px #ccc inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#eee 0%,#fff 100%)
  }

  .white.pressed {
    border-top:1px solid #777;
    border-left:1px solid #999;
    border-bottom:1px solid #999;
    box-shadow:2px 0 3px rgba(0,0,0,0.1) inset,-5px 5px 20px rgba(0,0,0,0.2) inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#3880ff 0%,#5260ff 100%)
  }



  .black {
    height:3.6em;
    width:0.6em;
    margin:0 0 0 -0.25em;
    left: -0.1em;
    z-index:2;
    border:1px solid #000;
    border-radius:0 0 1px 1px;
    box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -5px 2px 3px rgba(0,0,0,0.6) inset,0 2px 4px rgba(0,0,0,0.5);
    background:linear-gradient(45deg,#222 0%,#555 100%)
  }


  .black.pressed {
    box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -1px 1px 1px rgba(0,0,0,0.6) inset,0 1px 1px rgba(0,0,0,0.5);
    background:linear-gradient(to bottom,#3880ff 0%,#5260ff 100%)
  }



  .A, .D, .G, .B, .E {
    margin: 0 0 0 -0.45em;
  }

  .Gb, .Db {
    left: -0.25em;
  }

  .Bb, .Eb {
    left: -0.01em;
  }



  ul li:first-child {
    border-radius:5px 0 5px 5px
  }

  ul li:last-child {
    border-radius:0 5px 5px 5px
  }

}

/* Phones */
@media only screen and (min-width: 370px) and (max-width: 500px) {

ul {
    height:9em;
    width:22.3em;
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
    height:8.4em;
    width:1.4em;
    z-index:1;
    border-left:1px solid #bbb;
    border-bottom:1px solid #bbb;
    border-radius:0 0 2px 2px;
    box-shadow:-1px 0 0 rgba(255,255,255,0.8) inset,0 0 5px #ccc inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#eee 0%,#fff 100%)
  }

  .white.pressed {
    border-top:1px solid #777;
    border-left:1px solid #999;
    border-bottom:1px solid #999;
    box-shadow:2px 0 3px rgba(0,0,0,0.1) inset,-5px 5px 20px rgba(0,0,0,0.2) inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#3880ff 0%,#5260ff 100%)
  }



  .black {
    height:5em;
    width:0.8em;
    margin:0 0 0 -0.25em;
    left: -0.1em;
    z-index:2;
    border:1px solid #000;
    border-radius:0 0 1px 1px;
    box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -5px 2px 3px rgba(0,0,0,0.6) inset,0 2px 4px rgba(0,0,0,0.5);
    background:linear-gradient(45deg,#222 0%,#555 100%)
  }


  .black.pressed {
    box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -1px 1px 1px rgba(0,0,0,0.6) inset,0 1px 1px rgba(0,0,0,0.5);
    background:linear-gradient(to bottom,#3880ff 0%,#5260ff 100%)
  }



  .A, .D, .G, .B, .E {
    margin: 0 0 0 -0.5em;
  }

  .Gb, .Db {
    left: -0.25em;
  }

  .Bb, .Eb {
    left: -0.01em;
  }



  ul li:first-child {
    border-radius:5px 0 5px 5px
  }

  ul li:last-child {
    border-radius:0 5px 5px 5px
  }

}

/* Larger phones */
@media only screen and (min-width: 500px) and (max-width: 768px) {

  ul {
    height:11em;
    width:30.4em;
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
    height:10em;
    width:2em;
    z-index:1;
    border-left:1px solid #bbb;
    border-bottom:1px solid #bbb;
    border-radius:0 0 5px 5px;
    box-shadow:-1px 0 0 rgba(255,255,255,0.8) inset,0 0 5px #ccc inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#eee 0%,#fff 100%)
  }

  .white.pressed {
    border-top:1px solid #777;
    border-left:1px solid #999;
    border-bottom:1px solid #999;
    box-shadow:2px 0 3px rgba(0,0,0,0.1) inset,-5px 5px 20px rgba(0,0,0,0.2) inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#3880ff 0%,#5260ff 100%)
  }

  .black {
    height:6em;
    width:1.2em;
    margin:0 0 0 -1em;
    left: 0.4em;
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
    margin: 0 0 0 -0.25em;
  }

  .Gb, .Db {
    left: 0.2em;
  }

  .Bb, .Eb {
    left: 0.6em;
  }

  ul li:first-child {
    border-radius:5px 0 5px 5px
  }

  ul li:last-child {
    border-radius:0 5px 5px 5px
  }

}

/* Tablets in portrait */
@media only screen and (min-width: 768px) and (max-width: 1000px) {

  ul {
    height:20em;
    width:47em;
    margin:5em auto;
    padding:3em 0 0 2.4em;
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
    height:18em;
    width:3em;
    z-index:1;
    /*left: -1.7em;*/
    border-left:1px solid #bbb;
    border-bottom:1px solid #bbb;
    border-radius:0 0 5px 5px;
    box-shadow:-1px 0 0 rgba(255,255,255,0.8) inset,0 0 5px #ccc inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#eee 0%,#fff 100%)
  }

  .white.pressed {
    border-top:1px solid #777;
    border-left:1px solid #999;
    border-bottom:1px solid #999;
    box-shadow:2px 0 3px rgba(0,0,0,0.1) inset,-5px 5px 20px rgba(0,0,0,0.2) inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#3880ff 0%,#5260ff 100%)
  }

  .black {
    height:11em;
    width:1.7em;
    margin:0 0 0 -1em;
    left: 0.2em;
    z-index:2;
    border:1px solid #000;
    border-radius:0 0 3px 3px;
    box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -5px 2px 3px rgba(0,0,0,0.6) inset,0 2px 4px rgba(0,0,0,0.5);
    background:linear-gradient(45deg,#222 0%,#555 100%)
  }

  .black.pressed {
    box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -2px 2px 3px rgba(0,0,0,0.6) inset,0 1px 2px rgba(0,0,0,0.5);
    background:linear-gradient(to bottom,#3880ff 0%,#5260ff 100%)
  }

 .A, .D, .G, .B, .E  {
    margin: 0 0 0 -0.7em;
  }

  .Gb, .Db {
    left: -0.1em;
  }

  .Bb, .Eb {
    left: 0.4em;
  }

  ul li:first-child {
    border-radius:5px 0 5px 5px;
  }

  ul li:last-child {
    border-radius:0 5px 5px 5px
  }

}

/* Desktop and tablet in landscape */
@media only screen and (min-width: 1000px) {

  ul {
    height:24em;
    width:55.3em;
    margin:2em auto;
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
    height:22em;
    width:3.5em;
    z-index:1;
    border-left:1px solid #bbb;
    border-bottom:1px solid #bbb;
    border-radius:0 0 5px 5px;
    box-shadow:-1px 0 0 rgba(255,255,255,0.8) inset,0 0 5px #ccc inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#eee 0%,#fff 100%)
  }

 .white.pressed {
    border-top:1px solid #777;
    border-left:1px solid #999;
    border-bottom:1px solid #999;
    box-shadow:2px 0 3px rgba(0,0,0,0.1) inset,-5px 5px 20px rgba(0,0,0,0.2) inset,0 0 3px rgba(0,0,0,0.2);
    background:linear-gradient(to bottom,#3880ff 0%,#5260ff 100%)
  }

  .black {
    height:13.5em;
    width:2em;
    margin:0 0 0 -1em;
    z-index:2;
    border:1px solid #000;
    border-radius:0 0 3px 3px;
    box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -5px 2px 3px rgba(0,0,0,0.6) inset,0 2px 4px rgba(0,0,0,0.5);
    background:linear-gradient(45deg,#222 0%,#555 100%)
  }

  .black.pressed {
    box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -2px 2px 3px rgba(0,0,0,0.6) inset,0 1px 2px rgba(0,0,0,0.5);
    background:linear-gradient(to bottom,#3880ff 0%,#5260ff 100%)
  }

 .A, .D, .G, .B, .E  {
    margin: 0 0 0 -1em;
  }

 .Gb, .Db {
    left: -0.3em;
  }

  .Bb, .Eb {
    left: 0.3em;
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