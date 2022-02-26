class BossDoor extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, config={}) {
	    super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'minidoor');
	    this.setOrigin(0,0);
        scene.add.existing(this);
        scene.bossDoors.add(this);
        this.myScene = scene;
        //this.setDepth(10000);
        // states: closed,, opening, open, used,

        this.state = 'closed';
	    this.pulsing=false;
        this.pulsePauseTime=1000;
        this.pulsePauseTimer=0;

	}

	update(time,delta){

        if(this.state=='closed'){
                if(this.pulsePauseTimer>0){
                    this.pulsePauseTimer-=delta;
                    if(this.pulsePauseTimer<=0){
                        this.pulsePauseTimer=0;
                        this.pulsing=false;
                    }
                }else{
                        if(this.pulsing && this.anims.currentFrame.index === this.anims.getTotalFrames()){
                            this.pulsePauseTimer = this.pulsePauseTime;
                        }
                }
        }else if(this.state=='opening'){
            if(this.anims.currentFrame.index === this.anims.getTotalFrames()){
                this.state = 'open';
            }
        }



	}

}