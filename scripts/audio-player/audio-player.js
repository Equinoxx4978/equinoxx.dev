// Audio player script for the music player
// Sourced from Martysh
// https://512b.dev/msh/

let trackListElement = document.getElementById("track-list");
const nowPlayingElement = document.getElementById("now-playing");
const playerElement = document.getElementById("player");
const togglePlayingButton = document.getElementById("toggle-playing-button");
const playerTimeElement = document.getElementById("player-time");
const volumeSlider = document.getElementById("volume-slider");

let tracks = [];
let nowPlayingIndex = null;

playerElement.volume = 0.5;

function addTrack(trackName) {
    let element = document.createElement("a");
    element.classList.add("track-item");
    element.textContent = (tracks.length + 1) + ". " + trackName;

    let trackIndex = tracks.length;
    element.onclick = function () {
        playTrack(trackIndex);
    };

    trackListElement.append(element);

    tracks.push({element: element, name: trackName, url: `music/${trackName}.mp3`});
}

function playTrack(index) {
    tracks.forEach(function (track) {
        track.element.classList.remove("selected-track");
    });

    const track = tracks[index];
    track.element.classList.add("selected-track");

    nowPlayingElement.textContent = track.name;

    playerElement.src = track.url;
    playerElement.load();
    playerElement.play();

    nowPlayingIndex = index;

    console.log("playing track " + index + " - " + track.name)
}

function stop() {
    nowPlayingElement.textContent = "nothing playing! :(";

    tracks.forEach(function (track) {
        track.element.classList.remove("selected-track");
    });

    playerElement.pause();
    playerElement.src = "";
    playerElement.currentTime = 0;
}

function togglePlaying() {
    if (!playerElement.paused) {
        playerElement.pause();
        togglePlayingButton.textContent = "▶";
    } else {
        playerElement.play();
        togglePlayingButton.textContent = "⏸";
    }
}

function previous() {
    if (nowPlayingIndex === 0) {
        playTrack(tracks.length - 1);
    } else {
        playTrack(nowPlayingIndex - 1);
    }
}

function next() {
    if (nowPlayingIndex === tracks.length - 1) {
        playTrack(0);
    } else {
        playTrack(nowPlayingIndex + 1);
    }
}

function volumeUp() {
    if (playerElement.volume + 0.05 > 1) {
        playerElement.volume = 1;
        volumeSlider.value = 1;
    } else {
        playerElement.volume = playerElement.volume + 0.05;
        volumeSlider.value = playerElement.volume;
    }
}



function volumeDown() {
    if (playerElement.volume - 0.05 < 0) {
        playerElement.volume = 0;
        volumeSlider.value = 0;
    } else {
        playerElement.volume = playerElement.volume - 0.05;
        volumeSlider.value = playerElement.volume;
    }
}

playerElement.addEventListener("ended", function () {
    if (nowPlayingIndex === tracks.length - 1) {
        stop();
    } else {
        playTrack(nowPlayingIndex + 1);
    }
});

playerElement.addEventListener("timeupdate", function () {
    playerTimeElement.innerText = new Date(playerElement.currentTime * 1000).toISOString().substring(14, 19) + 
        " / " + new Date(playerElement.duration * 1000).toISOString().substring(14, 19);

});

playerElement.addEventListener("play", function () {
    togglePlayingButton.textContent = "⏸";
});

volumeSlider.addEventListener("input", function () {
    playerElement.volume = volumeSlider.value;
});

addTrack("Hven - iridESCEnT");
addTrack("Exyl - How")

stop();