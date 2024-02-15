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

    document.body.addEventListener( 'mousemove', ( event ) => {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }, false );

    // WebGL is available
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );

    //Cámara
    const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.set( 0, 0, 300 );
    const listener = new THREE.AudioListener();
    camera.add( listener );


    //Luz
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 0.5, 100);
    scene.add(directionalLight);
    
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xf0f0f0, 0.6 );
    hemiLight.position.set( 0, 500, 0 );
    scene.add( hemiLight);

    // Grid
    const helper = new THREE.GridHelper( 800, 40, 0x444444, 0x444444 );
    helper.position.y = 0.1;
    helper.name = "GRID!";
    scene.add(helper);


    // Create the mesh with the material array as parameter
    const geometry1 = new THREE.BoxGeometry( 50, 50, 50 );
    const geometry2 = new THREE.BoxGeometry( 50, 50, 50 );
    const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
    const specialFaceMaterial = new THREE.MeshPhongMaterial(
        {
            map: textureLoader.load( "./textures/cube_boom.jpg" ),
            bumpMap: textureLoader.load( "./textures/topo_boom.jpg" )
        } );
    const regularFaceMaterial = new THREE.MeshPhongMaterial(
        {
            map: textureLoader.load( "./textures/brick.jpg" ),
            bumpMap: textureLoader.load( "./textures/brick-map.jpg" )
        } );
    specialFaceMaterial.bumpScale=2;
    regularFaceMaterial.bumpScale=2;
    // A box has 6 faces
    const materials = [
        specialFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
    ];

    const box1 = new THREE.Mesh(geometry1, materials);
    const box2 = new THREE.Mesh(geometry2, materials);
    scene.add(box1, box2);
    box1.position.set(-100,25.1,0);
    box1.name = "Left Box!";
    box2.position.set(100,25.1,0);
    box2.name = "Right Box!";
    box2.rotateY(Math.PI);

    // Add audio to one box
    const audioLoader = new THREE.AudioLoader();
    const soundCat = new THREE.PositionalAudio( listener );
    audioLoader.load( "./audio/dog.ogg", ( buffer ) => {
        soundCat.setBuffer( buffer );
        soundCat.setRefDistance( 20 );
        soundCat.setLoop( true );
        soundCat.setRolloffFactor( 1 );
        soundCat.play(); // Modern browsers do not allow sound to start without user interaction
    });
    const soundDog = new THREE.PositionalAudio( listener );
    audioLoader.load( "./audio/cat.ogg", ( buffer ) => {
        soundDog.setBuffer( buffer );
        soundDog.setRefDistance( 20 );
        soundDog.setLoop( true );
        soundDog.setRolloffFactor( 1 );
        soundDog.play(); // Modern browsers do not allow sound to start without user interaction
    });

    box1.add( soundDog );
    box2.add(soundCat);
        
    // Controles
    const controls = new FirstPersonControls( camera, renderer.domElement );
    controls.movementSpeed = 70;
    controls.lookSpeed = 0.05;
    controls.noFly = false;
    controls.lookVertical = true;
    scene.add(controls);

    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => init(), false);
    function init() {
        var overlay = document.getElementById('overlay');
        overlay.remove();
 
        // Do stuff
        soundCat.play();
        soundDog.play();
    }
    
    const rayCaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let intersectedObject = null;
    
    renderer.render( scene, camera );
    animate();

    function animate() {

        const delta = clock.getDelta();
        controls.update( delta );
        rayCaster.setFromCamera( mouse, camera );
        // Look for all the intersected objects
        const intersects = rayCaster.intersectObjects( scene.children );
        if ( intersects.length > 0 ) {

            // Sorted by Z (close to the camera)
            if ( intersectedObject != intersects[ 0 ].object ) {

                intersectedObject = intersects[ 0 ].object;
                console.log( 'New intersected object: ' + intersectedObject.name );
            }
        } else {

            intersectedObject = null;
        }
        // Render the scene
        renderer.render( scene, camera );
        
        // Request the browser to execute the animation-rendering loop
        requestAnimationFrame( animate );
    };