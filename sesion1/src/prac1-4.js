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
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.set( 0, 0, 300 );

    const geometry1 = new THREE.BoxGeometry( 80, 80, 80 ); 
    const material1 = new THREE.MeshBasicMaterial( {color: "red"} ); 
    const cube = new THREE.Mesh( geometry1, material1 ); 
    cube.translateX(-180)
    cube.rotation.set( Math.PI / 5, Math.PI / 5, 0 );

    const geometry3 = new THREE.SphereGeometry( 80, 32, 16 ); 
    const material3 = new THREE.MeshBasicMaterial( { color: "green" } ); 
    const sphere = new THREE.Mesh( geometry3, material3 ); 
    sphere.rotation.set( Math.PI / 5, Math.PI / 5, 0 );

    const geometry2 = new THREE.CylinderGeometry( 80, 80, 200, 32 ); 
    const material2 = new THREE.MeshBasicMaterial( {color: "blue"} ); 
    const cylinder = new THREE.Mesh( geometry2, material2 ); 
    cylinder.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
    cylinder.translateX(500)
    cylinder.translateY(-220)
    
    scene.add( sphere, cylinder, cube );
    renderer.render( scene, camera );
    

}