const keys = document.querySelectorAll('.key');

// For each key, there is an event listening waiting to a click to call a function

keys.forEach(key => {
    key.addEventListener('click', () => handleClick(key));
});

// For each key, there is an event listening waiting to a click to call a function
  
function handleClick(key) {
    playNote(key);
    
    // 
    if (key === lastNote) {
        console.log('Great!');

        if (notes.length !== 0) {
            setTimeout(() => {
                playNotes();
            }, 1000);
        }
    } else {
        console.log('Failed');
    }
}

function playNote(key) {
    const noteAudio = document.getElementById(key.dataset.note);
    noteAudio.currentTime = 0;
    noteAudio.play();
    colorNote(key, noteAudio);
}

// Create colorNote function to add class active to key when clicked so it's color changes i.e blue

function colorNote (key, noteAudio, className = 'active') {
    key.classList.add(className);

    if (noteAudio) {
        noteAudio.addEventListener('ended', () => {
          key.classList.remove('active');
        });
    } else {
        setTimeout(() => key.classList.remove(className), 1000);
    }
}

let lastNote;

// Notes to play
const notes = [
    '1C',
    '1E',
    '1G',
    '2C',
    '2E',
    '1G',
    '1B',
    '2C',
    '2E',
    '1C',
    '1E',
    '1G',
    '2C',
    '2E',
    '1G',
    '1B',
    '2C',
    '2E',
];

function playNotes () {
    // Get selected note and it's corresponding HTML key div
    const selectedNote = notes.shift();
    const key = document.querySelector(`.key[data-note="${selectedNote}"]`);
    
    lastNote = key;

    // Highlight note i.e red indicating to user to click it
    colorNote(key, null, 'highlight');
}

document.querySelector('#start').addEventListener('click', function () {
    this.remove();
    playNotes();
});
