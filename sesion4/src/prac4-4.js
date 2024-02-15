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

    // Movements
    const movements = [
        new THREE.Vector3(0, 0, 1),   // Forward
        new THREE.Vector3(1, 0, 1),   // Forward-left
        new THREE.Vector3(1, 0, 0),   // Left
        new THREE.Vector3(1, 0, -1),  // Backward-left
        new THREE.Vector3(0, 0, -1),  // Backward
        new THREE.Vector3(-1, 0, -1), // Backward-right
        new THREE.Vector3(-1, 0, 0),  // Right
        new THREE.Vector3(-1, 0, 1)   // Forward-right
    ];

    // Create the mesh with the material array as parameter
    const geometry1 = new THREE.BoxGeometry( 50, 50, 50 );
    const geometry2 = new THREE.BoxGeometry( 50, 50, 50 );
    const textureLoader = new THREE.TextureLoader( );  // The object used to load textures

    const specialFaceMaterialOn = new THREE.MeshPhongMaterial(
        {
            map: textureLoader.load( "./textures/brick-ON.jpg" ),
            bumpMap: textureLoader.load( "./textures/topo_boom.jpg" )
        } );
    const specialFaceMaterialOff = new THREE.MeshPhongMaterial(
        {
            map: textureLoader.load( "./textures/brick-OFF.jpg" ),
            bumpMap: textureLoader.load( "./textures/topo_boom.jpg" )
        } );
    const regularFaceMaterial = new THREE.MeshPhongMaterial(
        {
            map: textureLoader.load( "./textures/brick.jpg" ),
            bumpMap: textureLoader.load( "./textures/brick-map.jpg" )
        } );

    specialFaceMaterialOff.bumpScale=2;
    specialFaceMaterialOn.bumpScale=2;
    regularFaceMaterial.bumpScale=2;
    // A box has 6 faces
    const materialsDog = [
        specialFaceMaterialOff,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
    ];
    const materialsMusic = [
        specialFaceMaterialOff,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
    ];

    const boxDog = new THREE.Mesh(geometry1, materialsDog);
    const boxMusic = new THREE.Mesh(geometry2, materialsMusic);
    scene.add(boxDog, boxMusic);

    boxDog.position.set(-100,25.1,0);
    boxDog.name = "Dog Box!";
    boxMusic.position.set(100,25.1,0);
    boxMusic.name = "Music Box!";
    boxMusic.rotateY(Math.PI);

    // Add audio to one box
    const audioLoader = new THREE.AudioLoader();
    const soundMusic = new THREE.PositionalAudio( listener );
    audioLoader.load( "./audio/dog.ogg", ( buffer ) => {
        soundMusic.setBuffer( buffer );
        soundMusic.setRefDistance( 20 );
        soundMusic.setLoop( true );
        soundMusic.setRolloffFactor( 1 );
    });
    const soundDog = new THREE.PositionalAudio( listener );
    audioLoader.load( "./audio/cat.ogg", ( buffer ) => {
        soundDog.setBuffer( buffer );
        soundDog.setRefDistance( 20 );
        soundDog.setLoop( true );
        soundDog.setRolloffFactor( 1 );
    });

    boxDog.add(soundDog);
    boxMusic.add(soundMusic);
        
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
        soundMusic.play();
        soundDog.play();
    }
    
    const rayCaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let intersectedObject = null;

    document.body.addEventListener( 'keydown', ( event ) => {

        // Space key code
        const spaceKeyCode = 32;
    
        // Space pressed and intersected object
        if ( event.keyCode === spaceKeyCode && intersectedObject.name) {
            if (intersectedObject.name === "Dog Box!"){
                if ( soundDog.isPlaying === true ){
                    soundDog.pause();
                    // The first face is the one with the button
                    boxDog.material[ 0 ] = specialFaceMaterialOff;
                    boxDog.material.needsUpdate = true;
                }
                else{
                    soundDog.play();
                    boxDog.material[ 0 ] = specialFaceMaterialOn;
                    boxDog.material.needsUpdate = true;
                }
            }
            if (intersectedObject.name === "Music Box!"){
                if ( soundMusic.isPlaying === true ){
                    soundMusic.pause();
                    // The first face is the one with the button
                    boxMusic.material[ 0 ] = specialFaceMaterialOff;
                    boxMusic.material.needsUpdate = true;
                }
                else{
                    soundMusic.play();
                    boxMusic.material[ 0 ] = specialFaceMaterialOn;
                    boxMusic.material.needsUpdate = true;
                }
            }

            
        }
    }, false );
    
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

        let collisions;
        const distance = 20; // Maximum distance of a collision
        for (let i=0; i<movements.length; i++){
            let direction = movements[i];
            rayCaster.set( camera.position, direction );
            collisions = rayCaster.intersectObjects( scene.children );
            if ( collisions.length > 0 && collisions[0].distance <= distance ) {
                // COLLISION
                controls.update( -delta );
            }
        }
        
        // Render the scene
        renderer.render( scene, camera );
        
        // Request the browser to execute the animation-rendering loop
        requestAnimationFrame( animate );
    };