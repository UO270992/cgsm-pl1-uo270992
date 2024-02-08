import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
const clock = new THREE.Clock( );
let material;

if ( !WEBGL.isWebGLAvailable() ) {

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
    camera.position.set( 0, 0, 500 );
    //Luz
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
    ambientLight.position.set(0, 0, -50);
    const light = new THREE.PointLight(0xFFFFFF,5,0,0);
    light.position.set(200, 50, 100);
    scene.add(light, ambientLight);

    const geometry = new THREE.BoxGeometry( 100, 100, 100 );
    const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
    material = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( "./textures/brick.jpg" ),
        bumpMap: textureLoader.load( "./textures/brick-map.jpg" )
    } );
    material.bumpScale=2;
    
    const box = new THREE.Mesh(geometry, material);
    box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );

    scene.add(box);
    renderer.render( scene, camera );
    animate();

    function animate() {

        const delta = clock.getDelta( ); // Elapsed time in seconds
        
        // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
        const rotation = ( delta * Math.PI * 2 ) / 24;
    
        box.rotation.y += rotation;

        // Render the scene
        renderer.render( scene, camera );
        
        // Request the browser to execute the animation-rendering loop
        requestAnimationFrame( animate );
    };