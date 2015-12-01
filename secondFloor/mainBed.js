/**
 * Created by Guanyu on 11/30/2015.
 */

function prepareMainBed() {
    var roomAltitude = 260;

    var roomWidth = 467;
    var roomHeight = 250;
    var roomDepth = 378;
    allObjects.mainBed = {
        width: roomWidth,
        height: roomHeight,
        depth: roomDepth,
        lightGroup: []
    }

    var dockX = houseInfo.width/2 - allObjects.mainBath.width;
    // backwall, has window
    gBuilding.wallUtil.addFrontBackWall(scene, roomWidth, roomHeight, dockX - roomWidth/2, roomAltitude + roomHeight/2, -houseInfo.length/2 - 33 + roomDepth, gBuilding.commonMaterials.getWallTexture(roomWidth, roomHeight));

    var wall1Width = 72 + 98 + 100;
    var wall2Width = roomWidth - wall1Width;
    gBuilding.wallUtil.addWallWithWindow1(scene, wall1Width,roomHeight,new THREE.Vector3(dockX- wall2Width - wall1Width/2,roomAltitude + roomHeight/2, -(houseInfo.length)/2 - 33), new THREE.Vector3(0,0,0),{
        left: 77,
        right: 100,
        top: 30,
        bottom: 90
    });

    gBuilding.wallUtil.addWallWithWindow1(scene, wall2Width,roomHeight,new THREE.Vector3(dockX- wall2Width/2,roomAltitude + roomHeight/2, -(houseInfo.length)/2 - 33), new THREE.Vector3(0,0,0),{
        left: 99,
        right: 13,
        top: 30,
        bottom: 90
    });


    gBuilding.wallUtil.addWallWithWindow1(scene, roomDepth,roomHeight,new THREE.Vector3(dockX,roomAltitude + roomHeight/2, -houseInfo.length/2 + roomDepth/2 - 33), new THREE.Vector3(0,-Math.PI/2,0),{
        left: 24,
        right: 265,
        top: 50,
        bottom: 0
    });
    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, roomDepth, dockX-roomWidth/2, roomAltitude + roomHeight, -houseInfo.length/2 -33 + roomDepth/2, gBuilding.commonMaterials.getCeilingTexture(roomWidth, roomDepth));
    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, roomDepth, dockX-roomWidth/2, roomAltitude, -houseInfo.length/2 -33 + roomDepth/2, gBuilding.commonMaterials.getCarpetTexture(roomWidth, roomDepth));

    //doorway
    gBuilding.wallUtil.addWallWithWindow1(scene, roomDepth,roomHeight,new THREE.Vector3(dockX - roomWidth,roomAltitude + roomHeight/2, -houseInfo.length/2 + roomDepth/2 - 33), new THREE.Vector3(0,Math.PI/2,0),{
        left: 24,
        right: 263,
        top: 50,
        bottom: 0
    });

    //closet
    var closetWidth = 72;
    var closetDepth = 258;
    gBuilding.wallUtil.addWallWithWindow1(scene, closetDepth,roomHeight,new THREE.Vector3(dockX - roomWidth + closetWidth,roomAltitude + roomHeight/2, -houseInfo.length/2 + closetDepth/2 - 33), new THREE.Vector3(0,Math.PI/2,0),{
        left: 15,
        right: 25,
        top: 60,
        bottom: 0
    });

    gBuilding.wallUtil.addFrontBackWall(scene, closetWidth, roomHeight, dockX - roomWidth + closetWidth/2, roomAltitude + roomHeight/2, -houseInfo.length/2 - 33 + closetDepth - 3, gBuilding.commonMaterials.getWallTexture(closetWidth, roomHeight));

}
