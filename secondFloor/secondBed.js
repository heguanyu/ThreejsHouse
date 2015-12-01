/**
 * Created by Guanyu on 11/30/2015.
 */

function prepareSecondBed() {
    var roomAltitude = 260;

    var roomWidth = 284;
    var roomHeight = 250;
    var roomDepth = 344;
    allObjects.secondBed = {
        width: roomWidth,
        height: roomHeight,
        depth: roomDepth,
        lightGroup: []
    }

    var dockX = houseInfo.width/2 - allObjects.mainBed.width - allObjects.mainBath.width;
    // backwall, has window
    gBuilding.wallUtil.addWallWithWindow1(scene, roomWidth,roomHeight,new THREE.Vector3(dockX- roomWidth/2,roomAltitude + roomHeight/2, -(houseInfo.length)/2), new THREE.Vector3(0,0,0),{
        left: 77,
        right: 100,
        top: 30,
        bottom: 90
    });

    gBuilding.wallUtil.addWall(scene, roomDepth, roomHeight, new THREE.Vector3(dockX-roomWidth, roomAltitude + roomHeight/2, -houseInfo.length/2 + roomDepth/2), new THREE.Vector3(0,Math.PI/2,0), gBuilding.commonMaterials.getWallTexture(roomDepth, roomHeight));
    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, roomDepth, dockX-roomWidth/2, roomAltitude + roomHeight, -houseInfo.length/2 + roomDepth/2, gBuilding.commonMaterials.getCeilingTexture(roomWidth, roomDepth));
    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, roomDepth, dockX-roomWidth/2, roomAltitude, -houseInfo.length/2 + roomDepth/2, gBuilding.commonMaterials.getBathFloorTileTexture(roomWidth, roomDepth));

    //closet
    var closetDepth = 100;
    var closetWidth = 144;
    gBuilding.wallUtil.addWall(scene, closetWidth, roomHeight, new THREE.Vector3(dockX-roomWidth + closetWidth/2, roomAltitude + roomHeight/2, -houseInfo.length/2 + roomDepth), new THREE.Vector3(0,0,0), gBuilding.commonMaterials.getWallTexture(closetWidth, roomHeight));
    gBuilding.wallUtil.addWall(scene, closetDepth, roomHeight, new THREE.Vector3(dockX-roomWidth + closetWidth, roomAltitude + roomHeight/2, -houseInfo.length/2 + roomDepth - closetDepth/2), new THREE.Vector3(0,Math.PI/2,0), gBuilding.commonMaterials.getWallTexture(closetDepth, roomHeight));
}
