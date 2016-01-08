/**
 * Created by Guanyu on 11/30/2015.
 */

function prepareReadingRoom() {
    var roomAltitude = 260;

    //closet
    var closetWidth = 72;
    var roomWidth = 318 + closetWidth;
    var roomHeight = 250;
    var roomDepth = 260;


    var closetDepth = roomDepth;

    allObjects.readingRoom = {
        width: roomWidth,
        height: roomHeight,
        depth: roomDepth,
        lightGroup: []
    }

    var dockX = -houseInfo.width/2 + allObjects.secondBath.width + roomWidth;
    var dockZ = houseInfo.length/2 - roomDepth;
    // door
    gBuilding.wallUtil.addWallWithWindow1(scene, roomWidth,roomHeight,new THREE.Vector3(dockX- roomWidth/2,roomAltitude + roomHeight/2, dockZ), new THREE.Vector3(0,0,0),{
        left: 24,
        right: 263,
        top: 40,
        bottom: 0
    });
    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, roomDepth, dockX-roomWidth/2, roomAltitude, dockZ + roomDepth/2, gBuilding.commonMaterials.getWoodFloorTileTexture(roomWidth, roomDepth));
    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, roomDepth, dockX-roomWidth/2, roomAltitude + roomHeight, dockZ + roomDepth/2, gBuilding.commonMaterials.getCeilingTexture(roomWidth, roomDepth));

    gBuilding.wallUtil.addWall(scene, roomDepth, roomHeight, new THREE.Vector3(dockX, roomAltitude + roomHeight/2, dockZ + roomDepth/2), new THREE.Vector3(0,Math.PI/2,0),gBuilding.commonMaterials.getWallTexture(roomDepth, roomHeight));
    gBuilding.wallUtil.addWallWithWindow1(scene, closetDepth,roomHeight,new THREE.Vector3(dockX - closetWidth,roomAltitude + roomHeight/2, dockZ + closetDepth/2 ), new THREE.Vector3(0,Math.PI/2,0),{
        left: 15,
        right: 25,
        top: 60,
        bottom: 0
    });
    gBuilding.wallUtil.addWallWithWindow1(scene, roomWidth,roomHeight,new THREE.Vector3(dockX- roomWidth/2,roomAltitude + roomHeight/2, dockZ + roomDepth), new THREE.Vector3(0,Math.PI,0),{
        left: 130 + closetWidth,
        right: 33,
        top: 40,
        bottom: 90
    });
}
