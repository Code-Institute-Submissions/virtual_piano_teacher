const keys = document.querySelectorAll('.key')

keys.forEach(key => {
    key.addEventListener('click', () => handleClick(key))
})
  
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
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.currentTime = 0
    noteAudio.play()
    colorNote(key, noteAudio);
}

function colorNote (key, noteAudio, className = 'active') {
    key.classList.add(className)

    if (noteAudio) {
        noteAudio.addEventListener('ended', () => {
          key.classList.remove('active')
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
    '1C',
    '1E',
    '1G',
    '1B',
    '1C',
    '1E',
    '1C',
    '1E',
    '1G',
    '1C',
    '1E',
    '1G',
    '1B',
    '1C',
    '1E',
];

function playNotes () {
    // Get selected note and it's corresponding HTML key div
    const selectedNote = notes.shift();
    const key = document.querySelector(`.key[data-note="${selectedNote}"]`);
    
    lastNote = key;

    // Color note
    colorNote(key, null, 'highlight');
}

document.querySelector('#start').addEventListener('click', function () {
    this.remove();
    playNotes();
});
