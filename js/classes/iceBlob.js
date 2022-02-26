class IceBlob extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, faction=1, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'icyBlob');
        scene.add.existing(this);

        this.myScene = scene;
        this.play('icyBlobIdle');
    }

    update(time,delta){

    }



    init(){
        //overwrite me
    }
}