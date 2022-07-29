
// Variables
const audio = document.querySelector('#player');
const rangeCurrentTime = document.querySelector('.currentTime');
const rangeVolume = document.querySelector('.volume');
const labelDuration = document.querySelector('.duration');
const labelTime = document.querySelector('.time');
const timeTrack = document.querySelector('.time-pista');
const buttonPlay = document.querySelector('.play');

var play = false;
var click = true;

// Funciones
// play & pause
const fnConvertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    if (seconds < 10) {
        return `${minutes}:0${seconds}`;
    } else {
        return `${minutes}:${seconds}`;
    }
}
const fnDuration = () => {
    labelDuration.textContent = `${fnConvertTime(audio.duration)}`;
}
const fnTime = () => {
    labelTime.textContent = `${fnConvertTime(audio.currentTime)}`;
}
const fnPlay = () => {
    buttonPlay.addEventListener("click", () => {
        if (play) {
            audio.pause();
            buttonPlay.textContent = '►'; //alt + 16
            rangeCurrentTime.value = Math.floor(100 * audio.currentTime / audio.duration);
            play = false;
        } else {
            if ((Math.floor(100 * audio.currentTime / audio.duration)) != rangeCurrentTime.value) {
                audio.currentTime = audio.duration * rangeCurrentTime.value / 100;
            }
            audio.play();
            buttonPlay.textContent = '||';
            play = true;
        };
    })
};
document.addEventListener('touchstart', (e) => {
    if(e.path[0].className == "list-song"){
        audio.src = e.path[0].value;
    }
});
// time bar
const fnCurrentTime = () => {
    if (play) {
        rangeCurrentTime.addEventListener('mousedown', () => {
            click = false;
        });
        rangeCurrentTime.style.backgroundSize = `${100 * audio.currentTime / audio.duration}%`;
        rangeCurrentTime.addEventListener('mouseup', () => {
            if ((Math.floor(100 * audio.currentTime / audio.duration)) != Math.floor(rangeCurrentTime.style.backgroundSize)) {
                audio.currentTime = audio.duration * rangeCurrentTime.value / 100;
                rangeCurrentTime.style.backgroundSize = `${100 * audio.currentTime / audio.duration}%`;
            }
            audio.play();
            play = true
            click = true;
        })
    } else if (!play) {
        rangeCurrentTime.addEventListener('mouseup', () => {
            if ((Math.floor(100 * audio.currentTime / audio.duration)) != rangeCurrentTime.value) {
                audio.currentTime = audio.duration * rangeCurrentTime.value / 100;
            };
            buttonPlay.textContent = '||';
        })
    };
}
// Vol.
const fnVolume = () => {
    audio.volume = (rangeVolume.value / 100) ** 2;
}


// Timers
const timerDuration = setInterval(() => { fnDuration() }, 100);
const timerActualTime = setInterval(() => { fnTime() }, 100);
const timerPlayPause = setInterval(fnPlay(), 100);
const timerCurrentTime = setInterval(() => { fnCurrentTime(); }, 100);
const timerVolume = setInterval(() => { fnVolume(); }, 100);



// Inicializadores

fnDuration();
timerPlayPause();
timerCurrentTime();
timerVolume();