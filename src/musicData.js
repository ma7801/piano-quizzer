export const chordTypes = {
    //"type": [key 1 chromatic distance from root, key 2 chromatic distance from root, ...]
    "major": {
        "displayName": "Major",
        "formula": [0, 4, 7]
    },
    "minor": {
        "displayName": "Minor",
        "formula": [0, 3, 7]
    },
    "dim": {
        "displayName": "Diminished",
        "formula": [0, 3, 6],
    },
    //"aug": [0, 4, 8],
    "domSeventh": {
        "displayName": "Dominant 7th",
        "formula": [0, 4, 7, 10]
    },
    "majorSeventh": {
        "displayName": "Major 7th",
        "formula": [0, 4, 7, 11]
    }
    //"minorSeventh": [0, 3, 7, 10]
    /* will add more later */

};

export const roots = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];



// For use in display names of inversions
const ordinals = ['root', '1st', '2nd', '3rd']

export function getRandomChord(chordTypes, inversionsAllowed) {
    // First get a random root note
    var root = roots[Math.floor(Math.random() * roots.length)];

    // Produce a chords array reduce from the one above that only has specified chordTypes in it
    var allowedChordTypes = [];
    for (var chord in chords) {
        if(chordTypes.includes(chord)) {
            allowedChordTypes.push(chord);
        }
    }

    // Get a random chord type from the allowedChordTypes
    var chordType = allowedChordTypes[(Math.floor(Math.random() * allowedChordTypes.length))];
    var inversion = 0;

    // If inversions are allowed, get a random inversion number (otherwise it will stay as 0 indicate a root chord)
    if (inversionsAllowed) {
        // We need to see how many notes are in the chord
        var numNotes = chords[chordType].formula.length;
        
        // Generate random inversion number
        var inversion = Math.floor(Math.random() * numNotes);  

    }

    // Get the notes for this chord
    var chordNotes = chordToNotes(root, chordType, inversion);

    return {
        chordDisplayName: root + " " + chords[chordType].displayName,
        notes: chordNotes.notes,
        formula: chordNotes.formula,
        inversionDisplayName: ordinals[inversion] + (inversion !== 0 ? ' inversion' : '')
    }
}

function chordToNotes(root, chordType, inversion) {
    // Input: root note, the type of chord as a string ('major', 'minor', etc.), and the inversion number (0 indicates root chord)
    // Output: array of strings of the notes in order played left to right (e.g. ['C', 'E', 'G']), AND the relative chord 'formula' based on the inversion number

    var chordNotes = [];  // Array of note strings that will be returned
    //var chordModifiedFormula = [];  // Array of numbers indicating the 'formula' for creating the chord, including the inversion

    // Get the formula to create the type of chord indicated
    // var chordFormula = chords[chordType].formula;
    // Bug fix for line above: need to DEEP COPY:
    var chordFormula = JSON.parse(JSON.stringify(chords[chordType].formula));
  
    // Get the index of the root note in the roots array
    var rootIndex = roots.indexOf(root);

     // Loop iterations will be the number of notes in the chord per the formula
    for (var noteNum = 0; noteNum < chordFormula.length; noteNum++) {
       
        // Determine index of next note
        var noteIndex = rootIndex + chordFormula[noteNum];

        // If noteIndex is beyond the length of roots array, wrap around
        if (noteIndex >= roots.length) {
            chordNotes[noteNum] = roots[noteIndex - roots.length];
        }
        else {
            chordNotes[noteNum] = roots[noteIndex];
        }
    }

    if (inversion !== 0) {
        // If the chord is an inversion, we need to rotate the chordNotes array
        for (var numShifts = 0; numShifts < inversion; numShifts++) {
            // Shift the notes to the left
            chordNotes.push(chordNotes.shift());
            chordFormula.push(chordFormula.shift());

        }

        /* Algorithm to create a chord formula for the inversion 
        1. for each note below the root subtract 12 from its current interval (since it's basically shift below the root one octave)
        2. Do nothing to the intervals for the root and notes above it
        3. Find the absolute value of the leftmost interval it and add it to each of the intervals 
        */

        // Variable for root location in new chord note array
        var rootLocation = chordNotes.indexOf(root);

        for (var curInterval = 0; curInterval < chordFormula.length; curInterval++) {
            // For all intervals below the root, subtract 12 from them
            if (curInterval < rootLocation) {
                chordFormula[curInterval] = chordFormula[curInterval] - 12;
            }        
        }

        // Add abs(leftmost interval) to all intervals in array
        var offset = Math.abs(chordFormula[0]);
        for (var curInterval = 0; curInterval < chordFormula.length; curInterval++) {
            chordFormula[curInterval] += offset;
        }
    }

    return {
        notes: chordNotes,
        formula: chordFormula
    }

}


/*
export function getInversion(inversionNum) {
    /* Generates inversion for a chord with a given inversion number 
}*/

