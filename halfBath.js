/**
 * Created by Guanyu on 11/22/2015.
 */

function prepareHalfBath() {
    var roomWidth = 180;
    var roomHeight = 250;
    var roomLength = 164;
    allObjects.halfBath = {
        width: roomWidth,
        lightGroup: []
    }
    // backwall, 4 pieces

    var dockX = houseInfo.width/2 - (allObjects.dinningHall && allObjects.dinningHall.width || 300);
    var doorPaddings = {
        left: 25,
        right: 65,
        top: 60,
        bottom: 0
    };
    var doorWidth = roomWidth - doorPaddings.left - doorPaddings.right;
    var doorHeight = roomHeight - doorPaddings.top;

    //back wall
    gBuilding.wallUtil.addWallWithWindow1(scene, roomWidth,roomHeight,new THREE.Vector3(dockX - roomWidth/2,roomHeight/2, -houseInfo.length/2), new THREE.Vector3(0,0,0),{
        left: 50,
        right: 50,
        top: 60,
        bottom: 140
    });

    //door wall
    gBuilding.wallUtil.addWallWithWindow1(scene,roomWidth,roomHeight,new THREE.Vector3(dockX - roomWidth/2,roomHeight/2,roomLength-houseInfo.length/2), new THREE.Vector3(0,0,0), doorPaddings);


    gBuilding.wallUtil.addPlaneRotateByCenter(
        scene,
        doorWidth,
        doorHeight,
        5,
        new THREE.Vector3(dockX-doorPaddings.right-doorWidth + doorWidth / 1.414 /2, doorHeight/2, -houseInfo.length/2 + roomLength - doorWidth / 1.414 /2),
        new THREE.Vector3(0,Math.PI * 5 /4, 0), {
        dir: '/images/door.jpg',
        repeatX: 1,
        repeatY: 1
    }); //bottom

    gBuilding.wallUtil.addLeftRightWall(scene, roomLength, roomHeight, dockX - roomWidth, roomHeight/2, -houseInfo.length/2 + roomLength/2,gBuilding.wallUtil.getWallTexture(roomLength,roomHeight));//left to back
    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, roomLength, dockX-roomWidth/2, roomHeight, -houseInfo.length/2 + roomLength/2);
    var lightXs = [dockX - roomWidth / 2];
    var lightZs = [-houseInfo.length / 2 + roomLength/2]
    for(var i = 0;i < lightXs.length; i++) {
        for (var j = 0; j < lightZs.length; j++){
            addPointLight(new THREE.Vector3(lightXs[i], roomHeight - 2, lightZs[j]), 3, 0xffffff, 0.3, 500, allObjects.halfBath.lightGroup);
        }
    }

    var spotLight = new THREE.SpotLight( 0xffffff, 0.5, 2000, Math.PI/2.1, 1 );
    spotLight.position.set( lightXs[0], roomHeight-10, lightZs[0] );
    spotLight.target.position.set( lightXs[0], roomHeight-100, lightZs[0] );
    spotLight.target.updateMatrixWorld();
    spotLight.castShadow = true;
    //scene.add( spotLight );
}