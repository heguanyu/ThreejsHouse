/**
 * Created by Guanyu on 11/30/2015.
 */

function prepareMainBath() {
    var roomAltitude = 260;

    var roomWidth = 150;
    var roomHeight = 250;
    var roomDepth = 378;
    allObjects.mainBath = {
        width: roomWidth,
        height: roomHeight,
        depth: roomDepth,
        lightGroup: []
    }

    var dockX = houseInfo.width/2;
    // backwall, has window
    gBuilding.wallUtil.addFrontBackWall(scene, roomWidth, roomHeight, dockX - roomWidth/2, roomAltitude + roomHeight/2, -houseInfo.length/2 - 33, gBuilding.commonMaterials.getWallTexture(roomWidth, roomHeight));
    gBuilding.wallUtil.addFrontBackWall(scene, roomWidth, roomHeight, dockX - roomWidth/2, roomAltitude + roomHeight/2, -houseInfo.length/2 - 33 + roomDepth, gBuilding.commonMaterials.getWallTexture(roomWidth, roomHeight));
    gBuilding.wallUtil.addWallWithWindow1(scene, roomDepth,roomHeight,new THREE.Vector3(dockX - roomWidth,roomAltitude + roomHeight/2, -houseInfo.length/2 + roomDepth/2 - 33), new THREE.Vector3(0,Math.PI/2,0),{
        left: 265,
        right: 24,
        top: 50,
        bottom: 0
    });

    gBuilding.wallUtil.addWallWithWindow1(scene, roomDepth,roomHeight,new THREE.Vector3(dockX,roomAltitude + roomHeight/2, -(houseInfo.length)/2 + roomDepth/2 - 33), new THREE.Vector3(0,-Math.PI/2,0),{
        left: 200,
        right: 90,
        top: 30,
        bottom: 120
    });

    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, roomDepth, dockX-roomWidth/2, roomAltitude + roomHeight, -houseInfo.length/2 -33 + roomDepth/2, gBuilding.commonMaterials.getCeilingTexture(roomWidth, roomDepth));
    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, roomDepth, dockX-roomWidth/2, roomAltitude, -houseInfo.length/2 -33 + roomDepth/2, gBuilding.commonMaterials.getBathFloorTileTexture(roomWidth, roomDepth));
}
