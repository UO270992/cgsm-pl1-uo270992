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

    const geometryAt = new THREE.SphereGeometry( 81, 32, 16 ); 
    const mapUrlAt = "../textures/atmosphere.gif";   // The file used as texture
    const textureLoaderAt = new THREE.TextureLoader( );  // The object used to load textures
    const mapAt = textureLoaderAt.load( mapUrlAt, ( loaded ) => { renderer.render( scene, camera );}
    );
    const materialAt = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: mapAt, transparent: true } );    
    const sphereAt = new THREE.Mesh( geometryAt, materialAt ); 

    const object = new THREE.Object3D();
    object.add( sphere );
    object.add( sphereAt );
    object.rotateZ(0.36)
    const light = new THREE.PointLight(0xFFFFFF,5,10000,0);
    light.position.set( 1000, 0, 400);
    scene.add( object, light);
    renderer.render( scene, camera );
    

}