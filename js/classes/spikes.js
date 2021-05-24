class Spikes extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, faction=1, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'spikes');
        scene.add.existing(this);

        this.myScene = scene;
    }

    update(time,delta){

    }



    init(){
        //overwrite me
    }
}