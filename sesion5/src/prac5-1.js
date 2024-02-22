import dashjs from "dashjs";

const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => init(), false);
    function init() {
        var overlay = document.getElementById('overlay');
        overlay.remove();
 
        // Do stuff
        const video = document.getElementById('player');
        video.play();
    }

const url = "http://localhost:60080/sintelFinal.mpd";
const player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector("#player"), url, true);