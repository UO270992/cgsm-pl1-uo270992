import dashjs from "dashjs";

const url = "http://localhost:60080/sintelFinal.mpd";
const player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector("#player"), url, true);