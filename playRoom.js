/**
 * Created by Guanyu on 11/22/2015.
 */

function preparePlayRoom() {
    var roomWidth = 568.5;
    var roomHeight = 250;
    var roomDepth = 346;
    allObjects.playRoom = {
        width: roomWidth,
        height: roomHeight,
        depth: roomDepth,
        lightGroup: []
    }

    var dockX = -houseInfo.width/2 + roomWidth;
    // backwall, has window
    var windowPaddings = {
        left: 149.5,
        right: 118,
        top: 40,
        bottom: 80
    }
    var doorPaddings = {
        left: 24.5,
        right: 0,
        top: 40,
        bottom: 0
    }
    var windowWidth = 177;
    var doorWidth = 99.5;
    var doorHeight = roomHeight - doorPaddings.top;
    var wall1Width = windowPaddings.left+windowWidth+windowPaddings.right;
    var wall2Width = doorPaddings.left+doorWidth+doorPaddings.right;
    gBuilding.wallUtil.addWallWithWindow1(scene, wall1Width,roomHeight, new THREE.Vector3((-houseInfo.width + wall1Width)/2, roomHeight/2, houseInfo.length/2), new THREE.Vector3(Math.PI, 0, Math.PI), windowPaddings);
    gBuilding.wallUtil.addWallWithWindow1(scene, wall2Width,roomHeight, new THREE.Vector3((-houseInfo.width + wall2Width)/2 + wall1Width, roomHeight/2, houseInfo.length/2), new THREE.Vector3(Math.PI, 0, Math.PI), doorPaddings);
    gBuilding.wallUtil.addLeftRightWall(scene, roomDepth, roomHeight, -houseInfo.width/2, roomHeight/2, houseInfo.length/2 - roomDepth/2, gBuilding.wallUtil.getWallTexture(roomDepth, roomHeight));

    gBuilding.wallUtil.addPlaneRotateByEdge(
        scene,
        doorWidth,
        doorHeight,
        new THREE.Vector3(-houseInfo.width/2 + wall1Width, doorHeight/2, houseInfo.length/2),
        new THREE.Vector3(doorWidth/2, 0, 0),
        new THREE.Vector3(0,Math.PI * 1 /4, 0), {
            dir: '/images/door.jpg',
            repeatX: 1,
            repeatY: 1
        }
    ); //bottom

    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, roomDepth, -houseInfo.width/2 + roomWidth/2, roomHeight, houseInfo.length/2 - roomDepth/2, {
        dir: 'images/popcorn.jpg',
        repeatX: 7,
        repeatY: 7
    });

}
