import dashjs from "dashjs";

const url = "http://localhost:8080/manifests/sintelFinal.mpd";
const player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector("#player"), url, false);