class Portal extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, config={}) {
	    super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'willowPortal');
	    this.setOrigin(0,0);

        scene.add.existing(this);
        scene.portals.add(this);
        this.myScene = scene;
// 		this.body.setOffset(64,128);

        this.twin=null;
        this.coolDownTime=200;
        this.coolDownTimer=0;
        if(config.hasOwnProperty('onExit')){
            this.onExit = config.onExit;
        }
        
	}

	setTwin(obj){
        this.twin = obj;
	}
	
	update(time,delta){
	
		if(this.coolDownTimer>0){
			this.alpha = this.coolDownTimer/this.coolDownTime;
			this.coolDownTimer--;
		}else{
			this.alpha = 1;
		}
		
	}

	onExit(){

	}

}