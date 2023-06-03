let musicName = document.querySelector('.music-name');
let artistName = document.querySelector('.artist-name');
let musicOf = document.querySelector('.music-of');

let playPauseBtn = document.querySelector('.playPause');

let currentTime = document.querySelector('.current-time');
let durationTime = document.querySelector('.duration-time');
let slider = document.querySelector('.slider');
let music = document.createElement('audio');

let musicIndex = 0;
let isPlaying = false;
let updateTimer;

const playList = [ 
    {
        name : 'A Prophecy',
        artist : 'Asking Alexandria',
        music : 'audio/audio1.mp3'
    },
    {
        name : 'DROWN',
        artist : 'Bring Me The Horizon',
        music : 'audio/audio2.mp3'
    }
];

loadTrack(musicIndex);

function loadTrack(musicIndex) {
    clearInterval(updateTimer);
    reset();

    music.src = playList[musicIndex].music;
    music.load();

    musicName.textContent = playList[musicIndex].name;
    artistName.textContent = playList[musicIndex].artist;
    musicOf.textContent = "Music " +(musicIndex + 1) + " Of " + playList.length

    updateTimer = setInterval(setUpdate, 1000);
    
    music.addEventListener('ended', nextTrack);

    
}

function playPause() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    music.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-4x"></i>';
}

function pauseTrack() {
    music.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-4x"></i>';
}

function nextTrack() {
    if(musicIndex < playList.length -1 ){
        musicIndex += 1;
    } else {
        musicIndex = 0;
    };

    loadTrack(musicIndex);
    playTrack();

}

function prevTrack() {
    if(musicIndex > 0){
        musicIndex -= 1;
    } else {
        musicIndex = playList.length -1;
    }

    loadTrack(musicIndex);
    playTrack();
}

function slideTo() {
    let slideto = music.duration * (slider.value / 100);
    music.currentTime = slideto;
}

function setUpdate() {
    let slidePosition = 0;
    if(!isNaN(music.duration)) {
        slidePosition = music.currentTime * (100 / music.duration);
        slider.value = slidePosition;

        let currentMinutes = Math.floor(music.currentTime / 60);
        let currentSeconds = Math.floor(music.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(music.duration /60);
        let durationSeconds = Math.floor(music.duration - durationMinutes * 60);

        if(currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes
        };

        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        };

        if(durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }
        if(durationSeconds < 10 ) {
            durationSeconds = "0" + durationSeconds;
        }

        currentTime.textContent = currentMinutes + ":" + currentSeconds;
        durationTime.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function reset() {
    currentTime.textContent = "00:00";
    durationTime.textContent = "00:00";
}