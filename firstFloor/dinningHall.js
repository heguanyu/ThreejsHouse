/**
 * Created by Guanyu on 11/22/2015.
 */

function prepareDiningHall() {
    var roomWidth = 300;
    var roomHeight = 250;
    var roomDepth = 347;
    allObjects.dinningHall = {
        width: roomWidth,
        height: roomHeight,
        depth: roomDepth,
        lightGroup: []
    }

    var dockX = houseInfo.width/2;
    // backwall, has window

    gBuilding.wallUtil.addWallWithWindow1(scene, roomWidth,roomHeight,new THREE.Vector3((houseInfo.width - roomWidth)/2, roomHeight/2, -houseInfo.length/2), new THREE.Vector3(0,0,0), {
        left: 60,
        right: 90,
        top: 60,
        bottom: 80
    });

    gBuilding.wallUtil.addLeftRightWall(scene, roomDepth, roomHeight, dockX, roomHeight/2, -houseInfo.length/2 + roomDepth/2,gBuilding.commonMaterials.getWallTexture(roomDepth, roomHeight));//right
    gBuilding.wallUtil.addLeftRightWall(scene, 164, roomHeight, dockX - roomWidth, roomHeight/2, -houseInfo.length/2 + 164/2,gBuilding.commonMaterials.getWallTexture(164, roomHeight, {
        x: (roomDepth-164)/roomDepth, y: 0, w: 164/roomDepth, h: 1
    }));//left to back
    var degbugwall = gBuilding.wallUtil.addLeftRightWall(scene, 87, roomHeight, dockX - roomWidth, roomHeight/2, -houseInfo.length/2 + 164 + 96 + 87 / 2,gBuilding.commonMaterials.getWallTexture(87, roomHeight,{
        x: 0, y: 0, w: 87/roomDepth, h: 1
    }));//left to stair

    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, 345, dockX-roomWidth/2, roomHeight, -houseInfo.length/2 + 345/2, gBuilding.commonMaterials.getCeilingTexture(roomWidth, 345));
    var lightXs = [330, 230];
    var lightZs = [-290, -170, -50];
    for(var i = 0;i < lightXs.length; i++) {
        for (var j = 0; j < lightZs.length; j++){
            addPointLight(new THREE.Vector3(lightXs[i], roomHeight - 2, lightZs[j]), 3, 0xffffff, 0.1, 1000, allObjects.dinningHall.lightGroup);
        }
    }
    var spotLight = new THREE.SpotLight( 0xffffff, 1.0, 100, Math.PI/5, 1 );
    spotLight.position.set( 280, roomHeight-10, -170 );
    spotLight.target.position.set( 280, roomHeight-100, -170 );
    spotLight.target.updateMatrixWorld();
    spotLight.castShadow = true;
    spotLight.shadowDarkness = 0.2;
    spotLight.shadowCameraFar = roomHeight;
    spotLight.shadowCameraFov = 360 / 5;
    scene.add( spotLight );
    var spotlightShadowHelper = new THREE.CameraHelper( spotLight.shadow.camera );
    scene.add( spotlightShadowHelper );

    var loader = new THREE.ObjectLoader();

    // load a resource
    loader.load(
        'meshes/table_chairs.json',
        function ( object ) {
            object.scale.set(100,100,100);
            object.position.set(277, 10, -142);
            object.rotation.set(0, Math.PI/2, 0);
            scene.add( object );  
        }
    );

}
