/* jshint esversion: 8 */

// For each key, there is an event listening waiting to a click to call a function
function handleClick(key) {
    playNote(key);
    
    // User playing notes
    // If user played the correct note/key...
    if (key === lastNote) {

        // There are more notes to play
        if (notes.length !== 0) {
            // So wait 1 second and plays it
            setTimeout(() => {
                playNotes();
            }, 1000);
        }
        // There are no more notes, show success message to the user
        else {
            alert("Song complete. Well done!");
        }
    } 
}

const keys = document.querySelectorAll('.key'); // Array like object

// For each key, there is an event listening waiting to a click to call a function
keys.forEach(key => {
    key.addEventListener('click', event => handleClick(key));
});

// Plays note sound and give that key a hightlight color
function playNote(key) {
    // Play sound
    const noteAudio = document.getElementById(key.dataset.note);
    noteAudio.currentTime = 0;
    noteAudio.play();

    // Change color
    colorNote(key, noteAudio);
}

// Create colorNote function to add class active to key when clicked so it's color changes i.e blue
function colorNote (key, noteAudio, className = 'active') {
    // Give the key a class to color it
    key.classList.add(className);

    // If a sound was played, wait for that sound to remove the color
    if (noteAudio) {
        noteAudio.addEventListener('ended', () => {
          key.classList.remove('active');
        });
    }
    // If there was not sound, just wait 1 second to remove the color
    else {
        setTimeout(() => key.classList.remove(className), 1000);
    }
}

let lastNote;

// Notes to play
const notes = [
    '1c',
    '1e',
    '1g',
    '2c',
    '2e',
    '1g',
    '1b',
    '2c',
    '2e',
    '1c',
    '1e',
    '1g',
    '2c',
    '2e',
    '1g',
    '1b',
    '2c',
    '2e',
];

function playNotes () {
    // Get selected note and it's corresponding HTML key div
    const selectedNote = notes.shift();
    const key = document.querySelector(`.key[data-note="${selectedNote}"]`);
    
    // Remember which is the note that the user has to play next
    lastNote = key;

    // Highlight note i.e red indicating to user to click it
    colorNote(key, null, 'highlight');
}

 // Click event listener added to start button
document.querySelector('#start').addEventListener('click', function () {
    // Remove button 
    this.remove();

    // Start playing notes
    playNotes();
});

//Refresh button to reload page //

function reloadpage() {
    location.reload();
  }

// Modal event listeners //
	
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
