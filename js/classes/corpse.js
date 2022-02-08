class Corpse extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'emyIdle');
        scene.add.existing(this);
        scene.corpses.add(this);
        this.setDepth(1000);
	}


	update(time,delta){
        if(this.anims.currentFrame && this.anims.currentFrame.index === this.anims.getTotalFrames()  ){
            this.onDestroy();
            this.destroy();
        }
	}

	onDestroy(){

	}

}