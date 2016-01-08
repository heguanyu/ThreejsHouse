/**
 * Created by Guanyu on 12/2/2015.
 */

function prepareFirstFloorMisc() {
    allObjects.firstFloorMisc = {};

    // add sofa

    var loader = new THREE.ObjectLoader();

    // load chair and table
    loader.load(
        'meshes/table_chairs.json',
        function ( object ) {
            object.scale.set(100,100,100);
            object.position.set(277, 10, -142);
            object.rotation.set(0, Math.PI/2, 0);
            scene.add( object );
        }
    );

    //load sofa
    loader.load(
        'meshes/somesofa.json',
        function ( object ) {
            var scale = 8.8;
            object.scale.set(scale,scale,scale);
            object.position.set(-177, 20, 286);
            object.rotation.set(0, 0, 0);
            scene.add( object );
        }
    );
}
