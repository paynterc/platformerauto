class Mushroom extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, faction=1, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'calliopeMushroom');
        this.setOrigin(0);
        this.setScale(2);

        scene.add.existing(this);
        scene.physics.add.existing(this,true);
        		this.body.setSize(40,80);

//         this.body.enable = false;
        this.myScene = scene;

        this.myState = STATE_PLATFORM_IDLE;
        this.solidTime=300;
        this.solidTimer=this.solidTime;

        this.idleTime=300;
        this.idleTimer=this.idleTime;
        

        this.anmIdle = 'mushroomIdle';
        this.anmBuilding = 'mushroomBuilding';

        this.play('mushroomIdle');
        
        this.myScene.specialPlatforms.add(this);

		this.init();        
    }

    init() {


    }

    update(time,delta){
    
    	if(this.myState == STATE_PLATFORM_IDLE){
    	    
    	    this.idleTimer --;
            if(this.idleTimer<1){
                this.play(this.anmBuilding);
                this.myState = STATE_PLATFORM_PHASE;
            }
    	
    	}else if(this.myState == STATE_PLATFORM_SOLID){
        
            this.solidTimer --;
            if(this.solidTimer<1){
//                 this.body.enable = false;
                this.idleTimer=this.idleTime;
                this.play(this.anmIdle);
                this.myState = STATE_PLATFORM_IDLE;
            }
            
        }else if(this.myState == STATE_PLATFORM_PHASE){

            if( this.anims.currentFrame.index === this.anims.getTotalFrames()  ){
                this.myState = STATE_PLATFORM_SOLID;
//                 this.body.enable = true;
                this.solidTimer=this.solidTime;
                this.shoot();
            }

        }

    }
    
    shoot(){

        new Bullet(this.myScene,this.x+20,this.y+40,180,{img:'MushroomBullet'});
        new Bullet(this.myScene,this.x+40,this.y,-90,{img:'MushroomBullet'});
        new Bullet(this.myScene,this.x+60,this.y+40,0,{img:'MushroomBullet'});

    }

}