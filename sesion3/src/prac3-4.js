import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
const clock = new THREE.Clock( );

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
    const controls = new FirstPersonControls( camera, renderer.domElement );
    controls.movementSpeed = 70;
    controls.lookSpeed = 0.05;
    controls.noFly = false;
    controls.lookVertical = false;

    //Luz
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xf0f0f0, 0.6 );
    hemiLight.position.set( 0, 500, 0 );
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0.5, 100);
    scene.add( hemiLight, directionalLight );
    const helper = new THREE.GridHelper( 800, 40, 0x444444, 0x444444 );
    helper.position.y = 0.1;
    
    scene.add(helper);

    const geometry1 = new THREE.BoxGeometry( 100, 100, 100 );
    const textureLoader1 = new THREE.TextureLoader( );  // The object used to load textures
    const material1 = new THREE.MeshPhongMaterial(
    { map: textureLoader1.load( "./textures/brick.jpg" ) } );

    const box = new THREE.Mesh(geometry1, material1);
    scene.add(box);

    renderer.render( scene, camera );
    animate();

    function animate() {

        const delta = clock.getDelta( ); // Elapsed time in seconds
        
        // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
        const rotation = ( delta * Math.PI * 2 ) / 24;

        // Render the scene
        renderer.render( scene, camera );
        
        // Request the browser to execute the animation-rendering loop
        requestAnimationFrame( animate );
    };