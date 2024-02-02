import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

const SIZE_EARTH = 150;
const textAtmosphere = '../textures/atmosphere.gif';
const textEarth = '../textures/earth.gif';


if ( !WEBGL.isWebGLAvailable() ) {
    console.log("WEBGL is not available");
}
    window.addEventListener( 'resize', ( ) => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix( );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.render( scene, camera );
    }, false );
    // WebGL is available
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );
    //Cámara
    const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.set( 0, 0, 1000 );
    //Luz
    const light = new THREE.PointLight(0xFFFFFF,10,0,0);
    light.position.set( 2800, 0, 1500);
    scene.add(light);

    /*****************************************CÓDIGO**************************************** */
    // Shader which needs to be global


    // Tierra
    const earth = createEarth(); 
    scene.add(earth);

    // Atmósfera
    const atmosphere = createAtmosphere();
    scene.add(atmosphere);  
    
    // 3D
    const earthWithAtmosphere = new THREE.Object3D();
    earthWithAtmosphere.add( earth );
    earthWithAtmosphere.add( atmosphere );
    earthWithAtmosphere.rotateZ(0.36);
    scene.add(earthWithAtmosphere);

    renderer.render( scene, camera );


function createEarth(){
    const geometry = new THREE.SphereGeometry( SIZE_EARTH, SIZE_EARTH, SIZE_EARTH ); 
    const mapUrl = textEarth;   // The file used as texture
    const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
    const map = textureLoader.load( mapUrl, ( loaded ) => { renderer.render( scene, camera );});
    const material = new THREE.MeshPhongMaterial( { map: map } );
    return new THREE.Mesh( geometry, material );
}

function createAtmosphere(){
    const geometry = new THREE.SphereGeometry( SIZE_EARTH+1, SIZE_EARTH+1, SIZE_EARTH+1 ); 
    const mapUrl = textAtmosphere;   // The file used as texture
    const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
    const map = textureLoader.load( mapUrl, ( loaded ) => { renderer.render( scene, camera );});
    const material = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: map, transparent: true } );    
    return new THREE.Mesh( geometry, material ); 
}



