import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

if ( WEBGL.isWebGLAvailable() ) {

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
    const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.set( 0, 0, 500 );

    const geometry = new THREE.SphereGeometry( 80, 32, 16 ); 
    const mapUrl = "../textures/earth.gif";   // The file used as texture
    const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
    const map = textureLoader.load( mapUrl, ( loaded ) => { renderer.render( scene, camera );}
    );

    const material = new THREE.MeshPhongMaterial( { map: map } );
    const sphere = new THREE.Mesh( geometry, material ); 
    
    
    const light = new THREE.PointLight(0xffffff,5,10000,0);
    light.position.set( 1000, 0, 200);
    scene.add( sphere, light);
    renderer.render( scene, camera );
    

}