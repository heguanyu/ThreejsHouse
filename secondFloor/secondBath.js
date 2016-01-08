/**
 * Created by Guanyu on 12/02/2015.
 */

function prepareSecondBath() {
    var roomAltitude = 260;

    var roomWidth = 154;
    var roomHeight = 250;
    var roomDepth = 260;
    allObjects.secondBath = {
        width: roomWidth,
        height: roomHeight,
        depth: roomDepth,
        lightGroup: []
    }

    var dockX = -houseInfo.width/2 + roomWidth;
    var dockZ = houseInfo.length/2 - roomDepth;
    // backwall, has window
    gBuilding.wallUtil.addWallWithWindow1(scene, roomWidth,roomHeight,new THREE.Vector3(dockX- roomWidth/2,roomAltitude + roomHeight/2, dockZ), new THREE.Vector3(0,0,0),{
        left: 55,
        right: 10,
        top: 30,
        bottom: 0
    });

    gBuilding.wallUtil.addWallWithWindow1(scene, roomDepth, roomHeight, new THREE.Vector3(dockX-roomWidth, roomAltitude + roomHeight/2, dockZ + roomDepth/2), new THREE.Vector3(0,Math.PI/2,0), {
        left: 130,
        right: 60,
        top: 40,
        bottom: 110
    });
    gBuilding.wallUtil.addWall(scene, roomDepth, roomHeight, new THREE.Vector3(dockX, roomAltitude + roomHeight/2, dockZ + roomDepth/2), new THREE.Vector3(0,Math.PI/2,0), gBuilding.commonMaterials.getWallTexture(roomDepth, roomHeight));
    gBuilding.wallUtil.addWall(scene, roomWidth, roomHeight, new THREE.Vector3(dockX - roomWidth/2, roomAltitude + roomHeight/2, dockZ + roomDepth), new THREE.Vector3(0,0,0), gBuilding.commonMaterials.getWallTexture(roomDepth, roomHeight));
    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, roomDepth, dockX-roomWidth/2, roomAltitude + roomHeight, dockZ + roomDepth/2, gBuilding.commonMaterials.getCeilingTexture(roomWidth, roomDepth));
    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, roomDepth, dockX-roomWidth/2, roomAltitude, dockZ + roomDepth/2, gBuilding.commonMaterials.getBathFloorTileTexture(roomWidth, roomDepth));

}
