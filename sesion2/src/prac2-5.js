import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

if ( WEBGL.isWebGLAvailable() ) {

    window.addEventListener( 'resize', ( ) => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix( );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.render( scene, camera );
    }, false );
    
    const SIZE_EARTH = 80;

    // WebGL is available
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );
    //Cámara
    const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.set( 0, 0, 500 );
    //Luz
    const light = new THREE.PointLight(0xFFFFFF,5,0,0);
    light.position.set( 1000, 0, 400);

    // Tierra
    const geometry = new THREE.SphereGeometry( SIZE_EARTH, 32, 16 ); 
    const mapUrl = "../textures/earth.gif";   // The file used as texture
    const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
    const map = textureLoader.load( mapUrl, ( loaded ) => { renderer.render( scene, camera );});
    const material = new THREE.MeshPhongMaterial( { map: map } );
    const sphere = new THREE.Mesh( geometry, material ); 

    // Atmósfera
    const geometryAt = new THREE.SphereGeometry( SIZE_EARTH+1, 32, 16 ); 
    const mapUrlAt = "../textures/atmosphere.gif";   // The file used as texture
    const textureLoaderAt = new THREE.TextureLoader( );  // The object used to load textures
    const mapAt = textureLoaderAt.load( mapUrlAt, ( loaded ) => { renderer.render( scene, camera );});
    const materialAt = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: mapAt, transparent: true } );    
    const sphereAt = new THREE.Mesh( geometryAt, materialAt ); 
    
    // Luna
    const geometryMo = new THREE.SphereGeometry( 0.27*SIZE_EARTH, 32, 16 ); 
    const mapUrlMo = "../textures/moon.gif";   // The file used as texture
    const textureLoaderMo = new THREE.TextureLoader( );  // The object used to load textures
    const mapMo = textureLoaderMo.load( mapUrlMo, ( loaded ) => { renderer.render( scene, camera );});
    const materialMo = new THREE.MeshLambertMaterial( { map: mapMo, color: 0x888888 } );
    const moon = new THREE.Mesh( geometryMo, materialMo );

    const distance = 384400;
    moon.position.set( Math.sqrt( distance / 2 ), 0, -Math.sqrt( distance / 2 ) );

    // Rotate the Moon to face visible side to the Earth (tidal locking)
    moon.rotation.y = Math.PI;
    
    // Moon should rotate around the Earth: an Object3D is needed
    const moonGroup = new THREE.Object3D( );
    moonGroup.add( moon );
    
    // The Moon orbit is a bit tilted
    moonGroup.rotation.x = 0.089;    
    
    // 3D
    const object = new THREE.Object3D();
    object.add( sphere );
    object.add( sphereAt );
    object.rotateZ(0.36)

    scene.add( object,moonGroup, light);
    renderer.render( scene, camera );
    

}