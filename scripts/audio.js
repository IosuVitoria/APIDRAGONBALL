let sound = new Audio('./assets/music.mp3');

const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');

playBtn.addEventListener('click', ()=>{
    sound.play();
});

pauseBtn.addEventListener('click', ()=>{
    sound.pause();
});