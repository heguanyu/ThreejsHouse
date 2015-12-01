/*
 * Created by Guanyu on 11/21/2015.
 */

// MAIN

// standard global variables
var DEBUGMODE = true;
var container, scene, camera, renderer, controls, stats;
var debugText;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
// custom global variables
var cube;
var allObjects = {};
var debugTool = {};
var houseInfo = {
    width: 875,
    length: 693
}
init();
animate();

// FUNCTIONS 		
function init()
{
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 90, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 10000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    resetCamera();
    // RENDERER
    if ( Detector.webgl )
        renderer = new THREE.WebGLRenderer( {antialias:true} );
    else
        renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    //SHADOW MAP
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.debug = true;

    container = document.getElementById( '_myCanvas' );
    container.appendChild( renderer.domElement );
    debugText = document.getElementById( '_debugText' );
    // EVENTS
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

    // CONTROLS
    // MUST REMOVE THIS LINE!!!
    // controls = ...

    // STATS
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild( stats.domElement );

    // LIGHT
    var ambientLight = new THREE.AmbientLight( 0x808080 ); // soft white light
    scene.add( ambientLight );

    var sunLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    sunLight.position.set( 600, 1000, -1000 );
    sunLight.castShadow = true;
    sunLight.shadowDarkness = 0.5;
    scene.add( sunLight );


    //addPointLight(new THREE.Vector3(0,150,0), 0, 0xffffff, 0.1, 4000);
    var textureLoader = new THREE.TextureLoader();
    var tileFloorTexture = textureLoader.load("images/jade.jpg");
    tileFloorTexture.wrapS = tileFloorTexture.wrapT = THREE.RepeatWrapping;
    tileFloorTexture.repeat.set(
        40 || 1,
        30 || 1
    );
    var tileFloorMaterial = new THREE.MeshPhongMaterial( { map: tileFloorTexture, side: THREE.FrontSide, specular: 0x030303 });

    var floor1 = gBuilding.wallUtil.addFloorCeiling(scene, houseInfo.width * 2, houseInfo.length * 2, 0, 0, 0, {
        material: tileFloorMaterial,
        castShadow: false,
        receiveShadow: true
    });
    floor1.rotation.set(Math.PI/2,0,Math.PI/4);
    // SKYBOX/FOG
    var skyBoxGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
    var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
    var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
     scene.add(skyBox);
    //scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

    ////////////
    // CUSTOM //
    ////////////
    prepareFirstFloor();
}

function prepareFirstFloor() {
    prepareDiningHall();
    prepareHalfBath();
    prepareKitchen();
    prepareWestHall();
    preparePlayRoom();
    prepareStairs();
    prepareEastHall();
}
function addPointLight(pos, radius, color, intense, decay, lightGroup) {
    // LIGHT
    var light = new THREE.PointLight(color, intense, decay);
    light.add( new THREE.Mesh( new THREE.SphereGeometry( radius || 0.00000001, 16, 8 ), new THREE.MeshBasicMaterial( { color: color } ) ) );
    light = new THREE.Mesh( new THREE.SphereGeometry( radius || 0.00000001, 16, 8 ), new THREE.MeshBasicMaterial( { color: color } ) );
    light.position.set(pos.x, pos.y, pos.z);
    light.originIntense = intense;
    scene.add(light);

    if (lightGroup) {
        lightGroup.push(light);
    }
}

function resetCamera() {
    if (DEBUGMODE) {
        camera.position.set(493.68798982071854,150,33.3706083989199);
        camera.rotation.set(-3.141592653589793,1.2422721820825926,-3.141592653589793);
    }
    else {
        camera.position.set(0,150,700);
        camera.rotation.set(0,0,0);
    }
}
function animate()
{
    requestAnimationFrame( animate );
    update();
    render();
}
function update()
{
    var delta = clock.getDelta(); // seconds.
    var moveDistance = 500 * delta; // 200 pixels per second
    var rotateAngle = Math.PI / 2 * delta * 1.5;   // pi/2 radians (90 degrees) per second

    // local transformations

    // move forwards/backwards/left/right
    if ( keyboard.pressed("W") ) {
        camera.translateZ( -moveDistance );
    }

    if ( keyboard.pressed("S") ) {
        camera.translateZ(  moveDistance );
    }

    if ( keyboard.pressed("Q") ) {
        camera.translateX( -moveDistance );
    }

    if ( keyboard.pressed("E") ) {
        camera.translateX(  moveDistance );
    }

    if ( keyboard.pressed("R") ) {
        camera.translateY(  moveDistance );
    }
    if ( keyboard.pressed("F") ) {
        camera.translateY( -moveDistance );
    }
    debugTool.debugText = "Position: (" + camera.position.x + "," + camera.position.y + "," + camera.position.z + ")" + "Rotation: (" + camera.rotation.x + "," + camera.rotation.y + "," + camera.rotation.z + ")";
    if (DEBUGMODE) {
        debugText.innerHTML = debugTool.debugText || "";
    }
    if (debugTool && debugTool.bindObject) {
        var objMoveDistance = 20 * delta; // 200 pixels per second
        // move forwards/backwards/left/right
        if ( keyboard.pressed("I") ) {
            debugTool.bindObject.translateZ( -objMoveDistance );
        }

        if ( keyboard.pressed("K") ) {
            debugTool.bindObject.translateZ(  objMoveDistance );
        }

        if ( keyboard.pressed("J") ) {
            debugTool.bindObject.translateX( -objMoveDistance );
        }

        if ( keyboard.pressed("L") ) {
            debugTool.bindObject.translateX(  objMoveDistance );
        }

        if ( keyboard.pressed("P") ) {
            debugTool.bindObject.translateY(  objMoveDistance );
        }
        if ( keyboard.pressed(";") ) {
            debugTool.bindObject.translateY( -objMoveDistance );
        }
        if (keyboard.pressed("G")) {
            console.log(debugTool.bindObject.position);
        }
    }

    // rotate left/right/up/down
    var rotation_matrix = new THREE.Matrix4().identity();
    if ( keyboard.pressed("A") ) {
        camera.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
    }
    if ( keyboard.pressed("D") ) {
        camera.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
    }

    if ( keyboard.pressed("Z") )
    {
        resetCamera();
    }
    stats.update();
}

function render()
{
    renderer.render( scene, camera );
}