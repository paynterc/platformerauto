class Corpse extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'emyIdle');
        this.myScene = scene;
        this.myConfig = config;
        this.mySetScale();

        scene.add.existing(this);
        scene.corpses.add(this);
        this.setDepth(1000);

        if(config.hasOwnProperty('onDestroy')){
            this.onDestroy = config.onDestroy;
        }
	}


    mySetScale(){
            this.setScale(this.myConfig.hasOwnProperty('scale') ? this.myConfig.scale : 1);
            this.myScale = this.myConfig.hasOwnProperty('scale') ? this.myConfig.scale : 1;
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