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
    camera.position.set( 0, 0, 4000 );

    const geometry = new THREE.BufferGeometry();
    const inner = 400;
    const outer = 500;

    const vertices = new Float32Array( [
        
        // Internal vertices
        -inner, inner, 0,
        inner, inner, 0,
        inner, -inner, 0,
        -inner, -inner, 0,

        // External vertices
        -outer, outer, 0,
        outer, outer, 0,
        outer, -outer, 0,
        -outer, -outer, 0,

        // roof vertices
        outer, outer, 0,
        -outer, outer, 0,
        0, 800, 0
/*
        // door
        -100, -400, 0,
        100, -400, 0,
        100, -200, 0,
        -100, -200, 0*/
    ] );

    // Faces (indices of vertices)
    const indices = [
        5, 4, 0,
        0, 1, 5,
        6, 5, 1,
        1, 2, 6,
        7, 6, 2,
        2, 3, 7,
        4, 7, 3,
        3, 0, 4,
        8, 10, 9,

    ];

    geometry.setIndex( indices );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const house = new THREE.Mesh( geometry, material );
    
    scene.add( house);
    renderer.render( scene, camera );
    

}