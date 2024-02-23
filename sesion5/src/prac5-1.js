import dashjs from "dashjs";

const url = "./manifests/sintelFinal.mpd";
const player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector("#player"), url, false);