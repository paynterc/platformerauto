/**
 * Set the animation repeat: 0 so it does not loop. Force the play in the update section.
 */
class Platform extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, faction=1, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'bigpurple');
        this.setOrigin(0);

        scene.add.existing(this);
        scene.physics.add.existing(this,true);
        
        this.body.enable = false;
        this.myScene = scene;

        this.myState = STATE_PLATFORM_PHASE;
        this.solidTime=300;
        this.solidTimer=this.solidTime;
        this.play('crownPhase');
        
    }

    update(time,delta){

        if(this.myState == STATE_PLATFORM_SOLID){
            this.solidTimer --;
            if(this.solidTimer<1){
                this.body.enable = false;
                this.solidTimer=this.solidTime;
                this.play('crownPhase');
                this.myState = STATE_PLATFORM_PHASE;
            }
        }else{

            if( this.anims.currentFrame.index === this.anims.getTotalFrames()  ){
                this.myState = STATE_PLATFORM_SOLID;
                this.body.enable = true;
                this.solidTimer=this.solidTime;
            }

        }

    }



    init(){
        //overwrite me
    }
}