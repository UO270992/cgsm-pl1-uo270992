import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';

const clock = new THREE.Clock( );

if ( WEBGL.isWebGLAvailable() ) {

    window.addEventListener( 'resize', ( ) => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix( );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.render( scene, camera );
    }, false );
    
    const SIZE_EARTH = 150;

    // WebGL is available
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );

    //Cámara
    const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.set( 0, 0, 3000 );
    
    //Luz
    const light = new THREE.PointLight(0xFFFFFF,10,0,0);
    light.position.set( 2800, 0, 1500);
    scene.add(light);

    // Añadir modelo
    const modelUrl = "../models/models/iss.dae";
    let iss;

    const loadingManager = new THREE.LoadingManager( ( ) => {
        scene.add( iss );
        console.log( 'Model loaded' );
    } );

    const loader = new ColladaLoader( loadingManager );
    loader.load( modelUrl, ( collada ) => {

        iss = collada.scene;
        iss.scale.x = iss.scale.y = iss.scale.z = 0.3;
        iss.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
        iss.updateMatrix( );
    } );

    renderer.render( scene, camera );
}

