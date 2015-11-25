/**
 * Created by Guanyu on 11/22/2015.
 */

var gBuilding = gBuilding || {};
var wallMaterial;
gBuilding.wallUtil = {
    addWallWithWindow1: function(scene, wallWidth, wallHeight,centerTranslation, centerRotation, windowPaddings) {
        var wall = new THREE.Object3D();
        var windowWidth = wallWidth - windowPaddings.left - windowPaddings.right;
        gBuilding.wallUtil.addWall(wall,windowPaddings.left, wallHeight,new THREE.Vector3(-(wallWidth - windowPaddings.left)/2,0,0), new THREE.Vector3(0,0,0) ,gBuilding.wallUtil.getWallTexture(windowPaddings.left, wallHeight,{
            x: 0, y: 0, w: windowPaddings.left/wallWidth, h: 1
        })); //left
        gBuilding.wallUtil.addWall(wall,windowPaddings.right, wallHeight,new THREE.Vector3((wallWidth - windowPaddings.right)/2,0,0), new THREE.Vector3(0,0,0),gBuilding.wallUtil.getWallTexture(windowPaddings.right, wallHeight, {
            x: 1-windowPaddings.right/wallWidth, y: 0, w: windowPaddings.right/wallWidth, h: 1
        })); //right
        gBuilding.wallUtil.addWall(wall,windowWidth, windowPaddings.top,new THREE.Vector3(wallWidth/2 - windowPaddings.right - windowWidth/2,(wallHeight-windowPaddings.top)/2,0), new THREE.Vector3(0,0,0),gBuilding.wallUtil.getWallTexture(windowWidth, windowPaddings.top, {
            x: windowPaddings.left/wallWidth, y: 1-windowPaddings.top/wallHeight, w: windowWidth/wallWidth, h: windowPaddings.top/wallHeight
        })); //top
        gBuilding.wallUtil.addWall(wall,windowWidth, windowPaddings.bottom, new THREE.Vector3(wallWidth/2 - windowPaddings.right - windowWidth/2,-(wallHeight-windowPaddings.bottom)/2,0), new THREE.Vector3(0,0,0),gBuilding.wallUtil.getWallTexture(windowWidth, windowPaddings.bottom,{
            x: windowPaddings.left/wallWidth, y: 0, w: windowWidth/wallWidth, h: windowPaddings.bottom/wallHeight
        })); //bottom
        wall.rotation.set(centerRotation.x, centerRotation.y, centerRotation.z);
        wall.position.set(centerTranslation.x, centerTranslation.y, centerTranslation.z);
        scene.add(wall);
        return wall;
    },

    addWall: function(parent, width, height, centerTranslation, centerRotation, textureInfo) {
        if (!width || !height) {
            return null;
        }
        var material;
        textureInfo = textureInfo || {};
        if (textureInfo.material) {
            material = textureInfo.material;
        }
        else if (textureInfo.dir) {
            var textureLoader = new THREE.TextureLoader();
            var texture = textureLoader.load(textureInfo.dir);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(
                textureInfo.repeatX || 1,
                textureInfo.repeatY || 1
            );
            material = new THREE.MeshPhongMaterial( { map: texture, side: THREE.FrontSide, specular: 0x030303 });
        }
        else {
            material = new THREE.MeshPhongMaterial( {color: textureInfo.color || 0xF7EED6, side: THREE.FrontSide, specular: 0x030303 });
        }


        var offset = 8;
        var planeGeometry = new THREE.BoxGeometry(1,1,1);
        if (textureInfo.uvMapping) {
            var uvs = planeGeometry.faceVertexUvs[0];
            var x = textureInfo.uvMapping.x || 0;
            var y = textureInfo.uvMapping.y || 0;
            var w = textureInfo.uvMapping.w || 1;
            var h = textureInfo.uvMapping.h || 1;
            uvs[ 0+offset ][ 0 ].set( x, y + h);
            uvs[ 0+offset ][ 1 ].set( x, y );
            uvs[ 0+offset ][ 2 ].set( x + w, y + h );
            uvs[ 1+offset ][ 0 ].set( x, y );
            uvs[ 1+offset ][ 1 ].set( x + w, y );
            uvs[ 1+offset ][ 2 ].set( x + w, y + h );
        }

        var plane = new THREE.Mesh(planeGeometry, material);
        plane.scale.set(width+0.2, height+0.2, 0.3);
        plane.rotation.set(centerRotation.x, centerRotation.y, centerRotation.z);
        plane.position.set(centerTranslation.x, centerTranslation.y, centerTranslation.z);
        plane.castShadow = textureInfo.castShadow;
        plane.receiveShadow = textureInfo.receiveShadow;
        if (parent) {
            parent.add( plane );
        }
        return plane;
    },








    addWallWithWindow: function(scene, wallWidth, wallHeight,offsetX , offsetZ, windowPaddings ) {
        var windowWidth = wallWidth - windowPaddings.left - windowPaddings.right;
        gBuilding.wallUtil.addFrontBackWall(scene,windowPaddings.left, wallHeight, offsetX-(wallWidth - windowPaddings.left/2), wallHeight/2, offsetZ,gBuilding.wallUtil.getWallTexture(windowPaddings.left, wallHeight,{
            x: 0, y: 0, w: windowPaddings.left/wallWidth, h: 1
        })); //left
        gBuilding.wallUtil.addFrontBackWall(scene,windowPaddings.right, wallHeight, offsetX-windowPaddings.right/2, wallHeight/2, offsetZ,gBuilding.wallUtil.getWallTexture(windowPaddings.right, wallHeight, {
            x: 1-windowPaddings.right/wallWidth, y: 0, w: windowPaddings.right/wallWidth, h: 1
        })); //right
        gBuilding.wallUtil.addFrontBackWall(scene,windowWidth, windowPaddings.top, offsetX-windowPaddings.right-windowWidth/2, wallHeight-windowPaddings.top/2, offsetZ,gBuilding.wallUtil.getWallTexture(windowWidth, windowPaddings.top, {
            x: windowPaddings.left/wallWidth, y: 1-windowPaddings.top/wallHeight, w: windowWidth/wallWidth, h: windowPaddings.top/wallHeight
        })); //top
        gBuilding.wallUtil.addFrontBackWall(scene,windowWidth, windowPaddings.bottom, offsetX-windowPaddings.right-windowWidth/2, windowPaddings.bottom/2, offsetZ,gBuilding.wallUtil.getWallTexture(windowWidth, windowPaddings.bottom,{
            x: windowPaddings.left/wallWidth, y: 0, w: windowWidth/wallWidth, h: windowPaddings.bottom/wallHeight
        })); //bottom
    },
    getWallTexture: function(width, height, uvMapping) {
        if (!wallMaterial) {
            var textureLoader = new THREE.TextureLoader();
            var texture = textureLoader.load('images/paintedwall.jpg');
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(
                Math.max(Math.floor(width/500), 1),
                Math.max(Math.floor(height/500), 1)
            );
            wallMaterial = new THREE.MeshPhongMaterial( { map: texture, side: THREE.FrontSide, specular: 0x030303 });
        }
        return {
            material: wallMaterial,
            uvMapping: uvMapping,
            castShadow: true,
            receiveShadow: false
        }
    },

    addFrontBackWall: function(scene,width, height, posx,posy, posz,textureInfo) {
        return gBuilding.wallUtil.addPlane(scene,width, height, new THREE.Vector3(posx, posy, posz), new THREE.Vector3(0,0,0), _.extend({castShadow: true, receiveShadow: false}, textureInfo || {}));
    },
    addLeftRightWall: function(scene,width, height, posx,posy, posz ,textureInfo) {
        return gBuilding.wallUtil.addPlane(scene,width, height,  new THREE.Vector3(posx, posy, posz), new THREE.Vector3(0, Math.PI/2, 0), _.extend({castShadow: true, receiveShadow: false}, textureInfo || {}));
    },
    addFloorCeiling: function(scene,width, length,  posx, posy, posz,textureInfo) {
        return gBuilding.wallUtil.addPlane(scene,width, length,  new THREE.Vector3(posx, posy, posz), new THREE.Vector3(Math.PI/2, 0, 0), textureInfo);
    },
    addPlane: function(scene,width, height, position, rotation, textureInfo) {
        return gBuilding.wallUtil.addPlaneRotateByEdge(scene,width, height, position, new THREE.Vector3(0,0,0), rotation, textureInfo);
    },
    addPlaneRotateByEdge: function(parent, width, height, position, translation, rotation, textureInfo) {
        if (!width || !height) {
            return null;
        }
        // FLOOR
        var material;
        textureInfo = textureInfo || {};
        if (textureInfo.material) {
            material = textureInfo.material;
        }
        else if (textureInfo.dir) {
            var textureLoader = new THREE.TextureLoader();
            var texture = textureLoader.load(textureInfo.dir);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(
                textureInfo.repeatX || 1,
                textureInfo.repeatY || 1
            );
            material = new THREE.MeshPhongMaterial( { map: texture, side: THREE.FrontSide, specular: 0x030303 });
        }
        else {
            material = new THREE.MeshPhongMaterial( {color: textureInfo.color || 0xF7EED6, side: THREE.FrontSide, specular: 0x030303 });
        }

        var planeGeometry = new THREE.BoxGeometry(width+0.2, height+0.2, 0.3);
        var offset1 = 8;
        var offset2 = 10;
        if (textureInfo.uvMapping) {
            var uvs = planeGeometry.faceVertexUvs[0];
            var x = textureInfo.uvMapping.x || 0;
            var y = textureInfo.uvMapping.y || 0;
            var w = textureInfo.uvMapping.w || 1;
            var h = textureInfo.uvMapping.h || 1;
            uvs[ 0+offset1 ][ 0 ].set( x, y + h);
            uvs[ 0+offset1 ][ 1 ].set( x, y );
            uvs[ 0+offset1 ][ 2 ].set( x + w, y + h );
            uvs[ 1+offset1 ][ 0 ].set( x, y );
            uvs[ 1+offset1 ][ 1 ].set( x + w, y );
            uvs[ 1+offset1 ][ 2 ].set( x + w, y + h );

            uvs[ 0+offset2 ][ 0 ].set( x, y+h);
            uvs[ 0+offset2 ][ 1 ].set( x, y );
            uvs[ 0+offset2 ][ 2 ].set( x+w, y+h );
            uvs[ 1+offset2 ][ 0 ].set( x, y );
            uvs[ 1+offset2 ][ 1 ].set( x+w, y );
            uvs[ 1+offset2 ][ 2 ].set( x+w, y+h );
        }
        var plane = new THREE.Mesh(planeGeometry, material);
        var dummy = new THREE.Object3D();
        plane.castShadow = textureInfo.castShadow;
        plane.receiveShadow = textureInfo.receiveShadow;
        plane.applyMatrix( new THREE.Matrix4().makeTranslation( translation.x, translation.y, translation.z ) );
        dummy.add( plane );
        dummy.rotation.set(rotation.x, rotation.y, rotation.z);
        dummy.position.set(position.x-0.1, position.y-0.1, position.z-0.15);
        if (parent) {
            parent.add( dummy );
        }
        return dummy;
    }
}
