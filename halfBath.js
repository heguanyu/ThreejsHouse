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
    gBuilding.wallUtil.addWallWithWindow(scene, roomWidth,roomHeight,dockX,-houseInfo.length/2, {
        left: 50,
        right: 50,
        top: 60,
        bottom: 140
    });

    //door wall
    gBuilding.wallUtil.addWallWithWindow(scene,roomWidth,roomHeight,dockX,roomLength-houseInfo.length/2, doorPaddings);


    gBuilding.wallUtil.addPlaneRotateByEdge(
        scene,
        doorWidth,
        doorHeight,
        new THREE.Vector3(dockX-doorPaddings.right-doorWidth, doorHeight/2, -houseInfo.length/2 + roomLength),
        new THREE.Vector3(-doorWidth/2, 0, 0),
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
}