class Hat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'topHat');
        scene.add.existing(this);
        this.myScene = scene;
		
		this.xoffSet = config.hasOwnProperty('xoff') ? config.xoff : 0;
		this.yoffSet = config.hasOwnProperty('yoff') ? config.yoff : -30;
		this.x = this.scene.player.x + this.xoffSet;
		this.y = this.scene.player.y + this.yoffSet;
		this.depth = 10000;

		if(config.hasOwnProperty('anm')){
			if(config.anm){
				this.play(config.anm);
			}
		}
    
        this.init();

    }

    update(time,delta){
		this.x = this.myScene.player.x + this.xoffSet;
		this.y = this.myScene.player.y + this.yoffSet;
    }

    init(){
    }
    
    myDestroy(){
    	this.destroy();
    }
}