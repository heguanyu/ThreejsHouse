/**
 * Created by Guanyu on 11/22/2015.
 */

function prepareWestHall() {
    var roomWidth = 148;
    var roomHeight = 250;
    var roomDepth = 347;
    allObjects.westHall = {
        width: roomWidth,
        height: roomHeight,
        depth: roomDepth,
        lightGroup: []
    }

    var dockX = -houseInfo.width/2 + roomWidth;
    // backwall, has window
    /*gBuilding.wallUtil.addWallWithWindow1(scene, roomWidth,roomHeight,new THREE.Vector3(dockX - roomWidth/2,roomHeight/2, -houseInfo.length/2), new THREE.Vector3(0,0,0),{
        left: 20,
        right: 10,
        top: 20,
        bottom: 0
    });*/

    gBuilding.wallUtil.addWallWithWindow1(scene, roomDepth,roomHeight,new THREE.Vector3(-houseInfo.width/2,roomHeight/2, -houseInfo.length/2 + roomDepth/2), new THREE.Vector3(0,Math.PI/2,0),{
        left: 25,
        right: 232,
        top: 60,
        bottom: 0
    });

    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, roomDepth, dockX-roomWidth/2, roomHeight, -houseInfo.length/2 + roomDepth/2, {
        dir: 'images/popcorn.jpg',
        repeatX: 7,
        repeatY: 7
    });
}
