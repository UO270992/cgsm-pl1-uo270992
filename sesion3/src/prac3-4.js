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
    camera.position.set( 0, 0, 300 );

    //Luz
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0.5, 100);
    scene.add(directionalLight);

    const helper = new THREE.GridHelper( 800, 40, 0x444444, 0x444444 );
    helper.position.y = 0.1;
    
    scene.add(helper);


    // Create the mesh with the material array as parameter
    const geometry1 = new THREE.BoxGeometry( 50, 50, 50 );
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
    const box2 = new THREE.Mesh(geometry1, materials);
    scene.add(box1, box2);
    box1.position.set(100,25.1,0);
    box2.position.set(-100,25.1,0);
    box1.rotateY(Math.PI);


        
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xf0f0f0, 0.6 );
    hemiLight.position.set( 0, 500, 0 );
    scene.add( hemiLight);

    // Controles
    const controls = new FirstPersonControls( camera, renderer.domElement );
    controls.movementSpeed = 70;
    controls.lookSpeed = 0.05;
    controls.noFly = false;
    controls.lookVertical = true;
    scene.add(controls);
    
    renderer.render( scene, camera );
    animate();

    function animate() {

        const delta = clock.getDelta();
        controls.update( delta );
        // Render the scene
        renderer.render( scene, camera );
        
        // Request the browser to execute the animation-rendering loop
        requestAnimationFrame( animate );
    };