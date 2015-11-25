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
    var topWall = gBuilding.wallUtil.addWallWithWindow(scene, roomWidth,roomHeight,dockX, -houseInfo.length/2, {
        left: 20,
        right: 10,
        top: 20,
        bottom: 0
    });

    gBuilding.wallUtil.addLeftRightWall(scene, 232, roomHeight, dockX - roomWidth, roomHeight/2, -houseInfo.length/2 + 232/2,gBuilding.wallUtil.getWallTexture(232, roomHeight, {
        x: (roomDepth-232)/roomDepth, y: 0, w: 232/roomDepth, h: 1
    }));//left to back
    gBuilding.wallUtil.addLeftRightWall(scene, 25, roomHeight, dockX - roomWidth, roomHeight/2, -houseInfo.length/2 + 232 + 90 + 25 / 2,gBuilding.wallUtil.getWallTexture(25, roomHeight,{
        x: 0, y: 0, w: 25/roomDepth, h: 1
    }));//left to stair

    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, roomDepth, dockX-roomWidth/2, roomHeight, -houseInfo.length/2 + roomDepth/2, {
        dir: 'images/popcorn.jpg',
        repeatX: 7,
        repeatY: 7
    });
}
