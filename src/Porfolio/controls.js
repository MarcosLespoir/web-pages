const audio = document.getElementById('player');
const currentTime = document.getElementById('currentTime');

const setCurrent = () => {
    audio.volume=0
}

setCurrent();

setInterval(() =>{
    currentTime.value = Math.floor( 100*audio.currentTime/audio.duration);
}, 100);