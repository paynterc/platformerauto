class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, angle, config = {}) {

        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'fireball');
        this.setScale(config.hasOwnProperty('scale') ? config.scale : 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.myScene = scene;


        if(config.hasOwnProperty('anm')){
            this.play(config.anm);
        }
		//this.body.setSize(128,128);
		if(config.hasOwnProperty('bdyW') && config.hasOwnProperty('bdyH')){
			this.body.setSize(config.bdyW,config.bdyH)
		}
		let gravity = config.hasOwnProperty('gravity') ? config.gravity : GRAVITY;
		this.body.setGravityY(GRAVITY);
        this.allowGrav = config.hasOwnProperty('allowGrav') ? config.allowGrav : false;
        this.initSpeed = config.hasOwnProperty('initSpeed') ? config.initSpeed : 128;
        this.accelerate = config.hasOwnProperty('accelerate') ? config.accelerate : false;
        this.destroyAfterAnim = config.hasOwnProperty('destroyAfterAnim') ? config.destroyAfterAnim : false;
        this.destroyOnHit = config.hasOwnProperty('destroyOnHit') ? config.destroyOnHit : true;
        this.lifeSpan = config.hasOwnProperty('lifeSpan') ? config.lifeSpan : 600;
        let myGroup = config.hasOwnProperty('myGroup') ? config.myGroup : scene.bullets;


        this.body.setAllowGravity(this.allowGrav);
        this.angle = angle;
        this.rotation = angle * (Math.PI/180);
        const vec = new Phaser.Math.Vector2();
        vec.setToPolar(this.rotation, this.initSpeed);// 500 is the bullet speed
        if(this.accelerate){
            this.body.acceleration = vec;
        }else{
            this.body.velocity = vec;
        }

        this.init();
        this.setDepth(100000);
        myGroup.add(this);

    }


    init(){

    }

    update(time,delta){
			

            if( this.destroyAfterAnim && this.anims.currentAnim ){
            	if(this.anims.currentFrame.index === this.anims.getTotalFrames()){
            		this.destroy();
            	}   
            }else{
				this.lifeSpan--;
				if(this.lifeSpan<1){
					this.destroy();
				}
            }
            

    }
}