/**
 * Created by Guanyu on 11/25/2015.
 */

function prepareEastHall() {
    var roomWidth = 568.5;
    var roomHeight = 250*2;
    var roomDepth = 346;
    allObjects.eastHall = {
        width: roomWidth,
        height: roomHeight,
        depth: roomDepth,
        lightGroup: []
    }
    gBuilding.wallUtil.addLeftRightWall(scene, roomDepth, roomHeight, houseInfo.width/2, roomHeight/2, houseInfo.length/2 - roomDepth/2, gBuilding.commonMaterials.getWallTexture(roomDepth, roomHeight));
    var shape = new THREE.Shape();
    var w1 = 10, w2 = 30, w3 = 230, d1=  50, d2 = 56, thickness= 5, height = 300;
    shape.moveTo(0,0);
    shape.lineTo(w1, d1);
    shape.lineTo(w1+w2, d1+d2);
    shape.lineTo(w1+w2+w3, d1 + d2);
    shape.lineTo(w1+w2+w3+w2, d1);
    shape.lineTo(w1+w2+w3+w2+w1, 0);

    shape.lineTo(w1+w2+w3+w2+w1-thickness, 0);
    shape.lineTo(w1+w2+w3+w2, d1-thickness);
    shape.lineTo(w1+w2+w3, d1 + d2-thickness);
    shape.lineTo(w1+w2, d1+d2-thickness);
    shape.lineTo(w1, d1 - thickness);
    shape.lineTo(thickness, 0);


    var wallGeometry = new THREE.ExtrudeGeometry( shape, { amount: height, bevelEnabled: true, bevelSegments: 0, steps: 2, bevelSize: 2, bevelThickness: 0 } );
    var wallMesh = new THREE.Mesh( wallGeometry, gBuilding.commonMaterials.getWallTexture(1,1).material );
    wallMesh.rotation.set(Math.PI/2,0,0);
    wallMesh.position.set(132,height,houseInfo.length/2-2);
    scene.add(wallMesh);
}
