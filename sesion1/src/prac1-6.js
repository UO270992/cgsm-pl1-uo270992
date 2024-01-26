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
    camera.position.set( 0, 0, 2000 );

    const geometry1 = new THREE.BoxGeometry( 100, 100, 100 ); 
    const material1 = new THREE.MeshBasicMaterial( {color: "red"} ); 
    const cube = new THREE.Mesh( geometry1, material1 ); 
    cube.translateX(-250)
    cube.rotation.set( Math.PI / 5, Math.PI / 5, 0 );

    const geometry3 = new THREE.SphereGeometry( 80, 32, 16 ); 
    const material3 = new THREE.MeshPhongMaterial( { color: "green" } ); 
    const sphere = new THREE.Mesh( geometry3, material3 ); 
    sphere.rotation.set( Math.PI / 5, Math.PI / 5, 0 );

    const geometry2 = new THREE.CylinderGeometry( 80, 80, 200, 32 ); 
    const material2 = new THREE.MeshLambertMaterial( {color: "blue"} ); 
    const cylinder = new THREE.Mesh( geometry2, material2 ); 
    cylinder.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
    cylinder.translateX(400)
    cylinder.translateY(-200)
    

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
    const material = new THREE.MeshBasicMaterial( { color: "purple" } );
    const house = new THREE.Mesh( geometry, material );

    const light = new THREE.DirectionalLight( 0xffffff, 20 );
    light.position.set( -1000, 300, 500 );
    scene.add( sphere, cylinder, cube, house, light );
    renderer.render( scene, camera );

}