class BossDoor extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, config={}) {
	    super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'minidoor');
	    this.setOrigin(0,0);
        scene.add.existing(this);
        scene.bossDoors.add(this);
        this.myScene = scene;
        //this.setDepth(10000);
        this.opened = false;


	}

	update(time,delta){


	}

}