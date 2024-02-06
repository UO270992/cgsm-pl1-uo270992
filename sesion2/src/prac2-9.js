import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

const clock = new THREE.Clock( );
const SIZE_EARTH = 150;
const textSun = '../textures/sun.gif';
const textNoise = '../textures/cloud.gif';
const textMoon = '../textures/moon.gif';
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
    camera.position.set( 1500, 0, 2000 );
    //Luz
    const light = new THREE.PointLight(0xFFFFFF,10,0,0);
    light.position.set( 2800, 0, 1500);
    scene.add(light);


    /*****************************************CÓDIGO**************************************** */
    // Shader which needs to be global
    const NOISEMAP = textNoise;
    const SUNMAP = textSun;
    const sunTexture = new THREE.TextureLoader( );
    const uniforms = {
        "fogDensity": { value: 0 },
        "fogColor": { value: new THREE.Vector3( 0, 0, 0 ) },
        "time": { value: 1.0 },
        "uvScale": { value: new THREE.Vector2( 3.0, 1.0 ) },
        "texture1": { value: sunTexture.load( NOISEMAP ) },
        "texture2": { value: sunTexture.load( SUNMAP ) }
    };
    const sun = createSun(); 
    sun.position.set( 2800, 0, 1500);
    scene.add(sun);

    // Tierra
    const earth = createEarth(); 
    scene.add(earth);

    // Atmósfera
    const atmosphere = createAtmosphere();
    scene.add(atmosphere);
    
    // Satellite
    const iss = insertSatellite();
    

    // Luna
    const moon = createMoon();

    const distance = 384400;
    moon.position.set( Math.sqrt( distance / 2 ), 0, -Math.sqrt( distance / 2 ) );

    // Rotate the Moon to face visible side to the Earth (tidal locking)
    moon.rotation.y = Math.PI;
    
    // Moon should rotate around the Earth: an Object3D is needed
    const moonGroup = new THREE.Object3D( );
    moonGroup.add( moon );
    moonGroup.add(earth);
    // The Moon orbit is a bit tilted
    moonGroup.rotation.x = 0.089;    
    scene.add(moonGroup);
    
    // 3D
    const earthWithAtmosphere = new THREE.Object3D();
    earthWithAtmosphere.add( earth );
    earthWithAtmosphere.add( atmosphere );
    earthWithAtmosphere.rotateZ(0.36);
    scene.add(earthWithAtmosphere);

    renderer.render( scene, camera );
    animate();


function createSun(){
    uniforms[ "texture1" ].value.wrapS = uniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
    uniforms[ "texture2" ].value.wrapS = uniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;
    const vertexShader = require( '../shaders/vertex.glsl' );
    const fragmentShader = require( '../shaders/fragments.glsl' );

    const shaderMaterial = new THREE.ShaderMaterial( {
        uniforms,
        vertexShader,
        fragmentShader
    } );

    // Sun
    const geometry = new THREE.SphereGeometry( SIZE_EARTH*5, SIZE_EARTH*5, SIZE_EARTH*5 ); 
    return new THREE.Mesh( geometry, shaderMaterial );
}
function createMoon(){
    const geometry = new THREE.SphereGeometry( 0.27*SIZE_EARTH, 0.27*SIZE_EARTH, 0.27*SIZE_EARTH ); 
    const mapUrl = textMoon;   // The file used as texture
    const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
    const map = textureLoader.load( mapUrl, ( loaded ) => { renderer.render( scene, camera );});
    const material = new THREE.MeshLambertMaterial( { map: map, color: 0x888888 } );
    return new THREE.Mesh( geometry, material );
}

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

function insertSatellite(){
    // Añadir modelo
    const modelUrl = "../models/iss/models/iss.dae";
    let iss;

    const loadingManager = new THREE.LoadingManager( ( ) => {
        scene.add( iss );
        iss.position.set( 200 , 0, -200 );
        renderer.render( scene, camera );
        console.log( 'Model loaded' );
    } );

    const loader = new ColladaLoader( loadingManager );
    loader.load( modelUrl, ( collada ) => {

        iss = collada.scene;
        iss.scale.x = iss.scale.y = iss.scale.z = 0.3;
        iss.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
        iss.updateMatrix( );

    } );
    

    return iss;
}
function animate() {

    const delta = clock.getDelta( ); // Elapsed time in seconds
    
    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
    const rotation = ( delta * Math.PI * 2 ) / 24;
        
    earth.rotation.y += rotation;
    atmosphere.rotation.y += rotation * 0.95;
    moonGroup.rotation.y += rotation/28; 
    moon.rotation.y += rotation/28;
    
    sun.rotation.y += rotation/5;
    uniforms[ "time" ].value += 0.2 * delta;

    // Render the scene
    renderer.render( scene, camera );
    
    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};

