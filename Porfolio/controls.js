
// Variables
const audio = document.querySelector('#player');
const rangeCurrentTime = document.querySelector('.currentTime');
const rangeVolume = document.querySelector('.volume');
const buttonPlay = document.querySelector('.play');


var play = false;
var click = true;

// Funciones
// play & pause
const fnPlay = () => {
    buttonPlay.addEventListener("click", () => {
        if (play) {
            audio.pause();
            buttonPlay.textContent = '►'; //alt + 16
            play = false;
        } else {
            if ((Math.floor(100 * audio.currentTime / audio.duration)) != rangeCurrentTime.value) {
                audio.currentTime = audio.duration * rangeCurrentTime.value / 100;
            }
            audio.play()
            buttonPlay.textContent = '▬';
            play = true;
        };
    })
};
// time bar
const fnCurrentTime = () => {
    if (play) {
        rangeCurrentTime.addEventListener('mousedown', () => {
            click = false;
        });
        if (click)
        rangeCurrentTime.value = 100 * audio.currentTime / audio.duration;
        rangeCurrentTime.addEventListener('mouseup', () => {
            if ((Math.floor(100 * audio.currentTime / audio.duration)) != rangeCurrentTime.value) {
                audio.currentTime = audio.duration * rangeCurrentTime.value / 100;
            }
            click = true;
        })
    } else {
        rangeCurrentTime.addEventListener('mouseup', () => {
            if ((Math.floor(100 * audio.currentTime / audio.duration)) != rangeCurrentTime.value) {
                audio.currentTime = audio.duration * rangeCurrentTime.value / 100;
            }
        })
    };
}
// Vol.
const fnVolume = () => {
    audio.volume = (rangeVolume.value/100)**2;
}


// Timers

const timerPlayPause = setInterval(fnPlay(), 100);
const timerCurrentTime = setInterval(() => {fnCurrentTime();}, 100);
const timerVolume = setInterval(() => {fnVolume();}, 100);



// Inicializadores

timerPlayPause();
timerCurrentTime();
timerVolume();