import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

if ( WEBGL.isWebGLAvailable() ) {
    // WebGL is available
    document.getElementById("notifier").style.color = "blue";
    console.log("WebGL is available");
}