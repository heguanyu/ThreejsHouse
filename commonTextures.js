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
}