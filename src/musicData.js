export const chords = {
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

    console.log(inversionsAllowed);
    // If inversions are allowed, get a random inversion number (otherwise it will stay as 0 indicate a root chord)
    if (inversionsAllowed) {
        // We need to see how many notes are in the chord
        var numNotes = chords[chordType].formula.length;
        
        // Generate random inversion number
        var inversion = Math.floor(Math.random() * numNotes);  

    }

    console.log(inversion);
    // Get the notes for this chord
    var notes = chordToNotes(root, chordType, inversion);


    return {
        chordDisplayName: root + " " + chords[chordType].displayName,
        chordNotes: notes,
        inversionDisplayName: ordinals[inversion] + ' inversion'
    }
}

function chordToNotes(root, chordType, inversion) {
    // Input: root note, the type of chord as a string ('major', 'minor', etc.), and the inversion number (0 indicates root chord)
    // Output: array of strings of the notes in order played left to right (e.g. ['C', 'E', 'G'])

    var chordNotes = [];  // Array of note strings that will be returned

    // Get the formula to create the type of chord indicated
    var chordFormula = chords[chordType].formula;

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

    // If the chord is an inversion, we need to rotate the chordNotes array
    for (var numShifts = 0; numShifts < inversion; numShifts++) {
        chordNotes.push(chordNotes.shift());
    }

    return chordNotes;

}

/*
export function getInversion(inversionNum) {
    /* Generates inversion for a chord with a given inversion number 
}*/

