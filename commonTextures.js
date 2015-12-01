/**
 * Created by Guanyu on 11/25/2015.
 */

var gBuilding = gBuilding || {};
gBuilding.commonMaterials = {
    wallMaterial: null,
    ceilingMaterial: null,
    getWallTexture: function(width, height, uvMapping) {
        if (!this.wallMaterial) {
            var textureLoader = new THREE.TextureLoader();
            var texture = textureLoader.load('images/paintedwall.jpg');
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(
                Math.max(Math.floor(width/500), 1),
                Math.max(Math.floor(height/500), 1)
            );
            this.wallMaterial = new THREE.MeshPhongMaterial( { map: texture, side: THREE.FrontSide, specular: 0x030303 });
        }
        return {
            material: this.wallMaterial,
            uvMapping: uvMapping,
            castShadow: true,
            receiveShadow: false
        }
    },
    getCeilingTexture: function(width, height, uvMapping) {
        if (!this.ceilingMaterial) {
            var textureLoader = new THREE.TextureLoader();
            var texture = textureLoader.load('images/popcorn.jpg');
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(
                Math.max(Math.floor(width/50), 1),
                Math.max(Math.floor(height/50), 1)
            );
            this.ceilingMaterial = new THREE.MeshLambertMaterial( { map: texture, side: THREE.FrontSide, specular: 0x030303 });
        }
        return {
            material: this.ceilingMaterial,
            uvMapping: uvMapping,
            castShadow: true,
            receiveShadow: false
        }
    },

    getBathFloorTileTexture: function(width, depth, uvMapping) {
        if (!this.bathFloorTileMaterial) {
            var textureLoader = new THREE.TextureLoader();
            var texture = textureLoader.load('images/brazil_arena.jpg');
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(
                Math.max(Math.floor(width/50), 1),
                Math.max(Math.floor(depth/50), 1)
            );
            this.bathFloorTileMaterial = new THREE.MeshPhongMaterial( { map: texture, side: THREE.FrontSide, specular: 0x050505 });
        }
        return {
            material: this.bathFloorTileMaterial,
            uvMapping: uvMapping,
            castShadow: true,
            receiveShadow: false
        }

    },

    getCarpetTexture: function(width, depth, uvMapping) {
        if (!this.carpetMaterial) {
            var textureLoader = new THREE.TextureLoader();
            var texture = textureLoader.load('images/carpet.jpg');
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(
                Math.max(Math.floor(width/50), 1),
                Math.max(Math.floor(depth/50), 1)
            );
            this.carpetMaterial = new THREE.MeshLambertMaterial( { map: texture, side: THREE.FrontSide, specular: 0x050505 });
        }
        return {
            material: this.carpetMaterial,
            uvMapping: uvMapping,
            castShadow: true,
            receiveShadow: false
        }
    }
}