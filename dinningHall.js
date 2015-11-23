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
    gBuilding.wallUtil.addWallWithWindow(scene, roomWidth,roomHeight,dockX, -houseInfo.length/2, {
        left: 60,
        right: 90,
        top: 60,
        bottom: 80
    });

    gBuilding.wallUtil.addLeftRightWall(scene, roomDepth, roomHeight, dockX, roomHeight/2, -houseInfo.length/2 + roomDepth/2,gBuilding.wallUtil.getWallTexture(roomDepth, roomHeight));//right
    gBuilding.wallUtil.addLeftRightWall(scene, 164, roomHeight, dockX - roomWidth, roomHeight/2, -houseInfo.length/2 + 164/2,gBuilding.wallUtil.getWallTexture(164, roomHeight, {
        x: (roomDepth-164)/roomDepth, y: 0, w: 164/roomDepth, h: 1
    }));//left to back
    gBuilding.wallUtil.addLeftRightWall(scene, 87, roomHeight, dockX - roomWidth, roomHeight/2, -houseInfo.length/2 + 164 + 96 + 87 / 2,gBuilding.wallUtil.getWallTexture(87, roomHeight,{
        x: 0, y: 0, w: 87/roomDepth, h: 1
    }));//left to stair

    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, 345, dockX-roomWidth/2, roomHeight, -houseInfo.length/2 + 345/2, {
        dir: 'images/popcorn.jpg',
        repeatX: 7,
        repeatY: 7
    });
    var lightXs = [330, 230];
    var lightZs = [-290, -170, -50]
    for(var i = 0;i < lightXs.length; i++) {
        for (var j = 0; j < lightZs.length; j++){
            addPointLight(new THREE.Vector3(lightXs[i], roomHeight - 2, lightZs[j]), 3, 0xffffff, 0.2, 500, allObjects.dinningHall.lightGroup);
        }
    }
}
