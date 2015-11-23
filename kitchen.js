/**
 * Created by Guanyu on 11/22/2015.
 */

function prepareKitchen() {
    var roomWidth = 247;
    var roomHeight = 250;
    var roomDepth = 347;
    allObjects.kitchen = {
        width: roomWidth,
        height: roomHeight,
        depth: roomDepth,
        lightGroup: []
    }

    var dockX = houseInfo.width/2 - allObjects.dinningHall.width - allObjects.halfBath.width - 0.1;
    // backwall, has window
    gBuilding.wallUtil.addWallWithWindow(scene, roomWidth,roomHeight,dockX, -houseInfo.length/2, {
        left: 80,
        right: 60,
        top: 30,
        bottom: 120
    });

    gBuilding.wallUtil.addFloorCeiling(scene, roomWidth, 345, dockX-roomWidth/2, roomHeight, -houseInfo.length/2 + 345/2, {
        dir: 'images/popcorn.jpg',
        repeatX: 7,
        repeatY: 7
    });
    buildNorthPlatform(dockX - roomWidth, -houseInfo.length/2 + 0.1);
    gBuilding.wallUtil.addFrontBackWall(scene,roomWidth,roomHeight,dockX-roomWidth/2,roomHeight/2,-houseInfo.depth / 2 + roomDepth, gBuilding.wallUtil.getWallTexture(roomWidth,roomHeight));
    var lightXs = [ -210, -100];
    var lightZs = [-290, -170, -50]
    for(var i = 0;i < lightXs.length; i++) {
        for (var j = 0; j < lightZs.length; j++){
            addPointLight(new THREE.Vector3(lightXs[i], roomHeight - 2, lightZs[j]), 3, 0xffffff, 0.2, 500, allObjects.kitchen.lightGroup);
        }
    }

}

function buildNorthPlatform(leftDock, topDock) {
    var thickness = 8;
    var platform1 = {
        width: 247,
        depth: 66,
        height: 100
    };
    var platform2 = {
        width: 65,
        depth: 90,
        height: 100
    };
    var sinkPaddings = {
        left: 90,
        right: 100,
        top: 5,
        bottom: 12
    };
    var sink = {
        width: platform1.width - sinkPaddings.left - sinkPaddings.right,
        depth: platform1.depth - sinkPaddings.top - sinkPaddings.bottom
    }
    var closetMargin = 5;
    var boards = [
        {
            left: leftDock,
            top: topDock,
            width: sinkPaddings.left,
            depth: platform1.depth
        },
        {
            left: leftDock + (platform1.width - sinkPaddings.right),
            top: topDock,
            width: sinkPaddings.right,
            depth: platform1.depth
        },
        {
            left: leftDock + sinkPaddings.left,
            top: topDock,
            width: sink.width,
            depth: sinkPaddings.top
        },
        {
            left: leftDock + sinkPaddings.left,
            top: topDock + sink.depth + sinkPaddings.top,
            width: sink.width,
            depth: sinkPaddings.bottom
        },
        {
            left: leftDock + platform1.width - platform2.width,
            top: topDock + platform1.depth,
            width: platform2.width,
            depth: platform2.depth
        }
    ];


    for(var i = 0; i < boards.length; i++) {
        var board = boards[i];
        var geometry = new THREE.BoxGeometry( board.width, thickness, board.depth);

        var textureCube = THREE.ImageUtils.loadTexture("images/marble.jpg" );
        var marbleMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: textureCube, specular: 0xffffff } );

        var cube = new THREE.Mesh( geometry, marbleMaterial );
        cube.position.set(board.left + board.width / 2, platform1.height, board.top + board.depth/2 );
        scene.add( cube );
    }

    gBuilding.wallUtil.addLeftRightWall(scene,platform1.depth - closetMargin, platform1.height, leftDock + closetMargin, platform1.height/2 , topDock + (platform1.depth - closetMargin)/2, {
        dir: "images/wood-side.jpg",
        repeatX: 1,
        repeatY: 1
    });
    gBuilding.wallUtil.addFrontBackWall(scene,platform1.width - platform2.width, platform1.height, leftDock + closetMargin + (platform1.width - platform2.width)/2, platform1.height/2 , topDock + platform1.depth - closetMargin, {
        dir: "images/cupboard_dishwasher.png",
        repeatX: 1,
        repeatY: 1
    });
    gBuilding.wallUtil.addLeftRightWall(scene,platform2.depth, platform2.height, leftDock + closetMargin + platform1.width - platform2.width, platform2.height/2 , topDock + platform1.depth - closetMargin + (platform2.depth)/2, {
        dir: "images/cupboard_side.png",
        repeatX: 1,
        repeatY: 1
    });
    gBuilding.wallUtil.addFrontBackWall(scene,platform2.width - closetMargin, platform2.height, leftDock + closetMargin + (platform1.width - platform2.width) + (platform2.width - closetMargin)/2, platform2.height/2 , topDock + platform1.depth + platform2.depth - closetMargin,{
        dir: "images/wood-side.jpg",
        repeatX: 1,
        repeatY: 1
    });
}