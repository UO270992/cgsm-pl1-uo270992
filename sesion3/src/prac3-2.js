import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
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
    camera.position.set( 0, 0, 350 );
    //Luz
    const light = new THREE.PointLight(0xFFFFFF,3,0,0);
    light.position.set( 0, 0, 300);
    scene.add(light);
    

    /*****************************************CÓDIGO**************************************** */
    const video = document.getElementById( 'video' );

    const image = document.createElement( 'canvas' );
    image.width = 480;  // Video width
    image.height = 204; // Video height
    const imageContext = image.getContext( '2d' );
    imageContext.fillStyle = '#000000';
    imageContext.fillRect( 0, 0, image.width - 1, image.height - 1 );
    const texture = new THREE.Texture( image );
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    const wall = new THREE.Mesh( new THREE.PlaneGeometry( image.width, image.height, 4, 4 ), material );

    scene.add(wall);
    renderer.render( scene, camera );
    animate();

    function animate() {
        const delta = clock.getDelta( ); // Elapsed time in seconds
        const rotation = ( delta * Math.PI * 2 )/24;

        if ( video.readyState === video.HAVE_ENOUGH_DATA ) {
            imageContext.drawImage( video, 0, 0 );
            if ( texture ) texture.needsUpdate = true;
        }
        renderer.render( scene, camera );

        wall.rotation.y += rotation;
        // Request the browser to execute the animation-rendering loop
        requestAnimationFrame( animate );
    };