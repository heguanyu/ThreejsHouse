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
    gBuilding.wallUtil.addLeftRightWall(scene, roomDepth, roomHeight, -houseInfo.width/2, roomHeight/2, houseInfo.length/2 - roomDepth/2, gBuilding.commonMaterials.getWallTexture(roomDepth, roomHeight));

    gBuilding.wallUtil.addPlaneRotateByCenter(
        scene,
        doorWidth,
        doorHeight,
        5,
        new THREE.Vector3(-houseInfo.width/2 + wall1Width + doorWidth / 2 / 1.414, doorHeight/2, houseInfo.length/2 - doorWidth / 2 / 1.414),
        new THREE.Vector3(0,Math.PI * 1 /4, 0), {
            dir: '/images/door.jpg',
            repeatX: 1,
            repeatY: 1
        }
    ); //bottom

    var w1 = 235; // from left to end of stair
    var d1 = 235; // depth
    gBuilding.wallUtil.addFloorCeiling(scene, w1, roomDepth-d1, -houseInfo.width/2 + w1/2, roomHeight, houseInfo.length/2 - roomDepth + (roomDepth-d1)/2, gBuilding.commonMaterials.getCeilingTexture(w1, roomDepth-d1));
    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, d1, -houseInfo.width/2 + roomWidth/2, roomHeight, houseInfo.length/2 - d1/2, gBuilding.commonMaterials.getCeilingTexture(roomWidth, d1));

}


function prepareStairs() {
    var stairLow = 116;
    var stairWidth = 166;
    var stairDepth = 111;

    gBuilding.wallUtil.addLeftRightWall(scene, stairDepth, stairLow, -houseInfo.width/2 + 232 + stairWidth, stairLow/2, 55, gBuilding.commonMaterials.getWallTexture(stairDepth, stairLow));

    var shape = new THREE.Shape();
    // startpoint
    shape.moveTo(0, 250);
    shape.lineTo(177,250);
    shape.lineTo(177, 128);
    shape.lineTo(310, 15);
    shape.lineTo(310,0);
    shape.lineTo(166,0);
    shape.lineTo(166,116);
    shape.lineTo(0,250);

    var extrudeSettings = { amount: 20, bevelEnabled: true, bevelSegments: 0, steps: 2, bevelSize: 2, bevelThickness: 0 };
    var stairMarginGeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    var stairMarginMesh = new THREE.Mesh( stairMarginGeometry, gBuilding.commonMaterials.getWallTexture(1,1).material );
    stairMarginMesh.position.set(-205,0,92);
    scene.add(stairMarginMesh);

    //
    var stairNum = 15;
    var totalWidth = 300;
    var totalHeight = 250;

    var singleStairWidth = totalWidth / stairNum;
    var singleStairHeight = totalHeight / stairNum;

    shape = new THREE.Shape();
    var curX = totalWidth;
    var curY = 0;
    shape.moveTo(curX, curY);
    for(var i = 0; i < stairNum; i++) {
        curY += singleStairHeight;
        shape.lineTo(curX, curY);
        curX -= singleStairWidth;
        shape.lineTo(curX, curY);
    }
    shape.lineTo(totalWidth, 0);

    var stairGeometry = new THREE.ExtrudeGeometry( shape, { amount: 110, bevelEnabled: true, bevelSegments: 0, steps: 2, bevelSize: 2, bevelThickness: 0 } );
    var stairMesh = new THREE.Mesh( stairGeometry, gBuilding.commonMaterials.getWallTexture(1,1).material );
    stairMesh.position.set(-205,0,-3);
    scene.add(stairMesh);
}
