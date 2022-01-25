class Enemy extends Phaser.GameObjects.Sprite {

    // CALLOUT: New enemies need to have a config {'img':someImage}, especially if they are bigger than 32x32
    constructor(scene, x, y, faction=1, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'emyIdle');
        
        this.setScale(config.hasOwnProperty('scale') ? config.scale : 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        //this.body.setSize(128,128);
		if(config.hasOwnProperty('bdyW') && config.hasOwnProperty('bdyH')){
			this.body.setSize(config.bdyW,config.bdyH)
		}
		//this.body.setOffset(64,128);
		if(config.hasOwnProperty('bdyOx') && config.hasOwnProperty('bdyOy')){
			this.body.setOffset(config.bdyOx,config.bdyOy)
		}
		
        this.myScene = scene;
        this.myConfig = config;
        
        // Stats
        this.pathReactTime = 120;
        this.defaultAcc = config.hasOwnProperty('defaultAcc') ? config.defaultAcc : 25;
        this.maxVelocity = config.hasOwnProperty('maxVelocity') ? config.maxVelocity : 50;

        this.hp = 1;
        this.myAttackFrequency = 100;
        this.myBumpFrequency = config.hasOwnProperty('bumpFrequency') ? config.bumpFrequency : 3;
        this.canHitPlayer = true;// Let enemy not hit player initially. Set a timer to make it active.
        this.canHitPlayerTimer = 100;

        // Presets
        this.myAttackTimer = this.myAttackFrequency;
        this.myBumpTimer = this.myBumpFrequency;
        this.myState = STATE_EN_IDLE;
        this.modX = 1;
        this.modY = 1;
        this.walkStarted = false;

        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(false);
        this.body.maxVelocity.setTo(this.maxVelocity, MAX_SPEED * 10); // x, y
        this.body.drag.setTo(DRAG, 0);
        //this.body.setPushable(false);
        this.body.setGravityY(GRAVITY);

        this.coins = 1;

        this.depth = 100;
        // this.anmIdle = config.hasOwnProperty('anmIdle') ? config.anmIdle : 'emyIdle';
        // this.anmWalk = config.hasOwnProperty('anmWalk') ? config.anmWalk : 'emyWalk';
        // this.anmRun = config.hasOwnProperty('anmRun') ? config.anmRun : 'emyRun';
        // this.anmHit = config.hasOwnProperty('anmHit') ? config.anmHit : 'emyHit';
        // this.anmAttack = config.hasOwnProperty('anmAttack') ? config.anmAttack : 'emyAttack';
        // this.anmDie = config.hasOwnProperty('anmDie') ? config.anmDie : 'emyDie';

        this.anmIdle = config.hasOwnProperty('anmIdle') ? config.anmIdle : null;
        this.anmWalk = config.hasOwnProperty('anmWalk') ? config.anmWalk : null;
        this.anmRun = config.hasOwnProperty('anmRun') ? config.anmRun : null;
        this.anmHit = config.hasOwnProperty('anmHit') ? config.anmHit : null;
        this.anmAttack = config.hasOwnProperty('anmAttack') ? config.anmAttack : null;
        this.anmDie = config.hasOwnProperty('anmDie') ? config.anmDie : null;


        if(this.anmIdle) this.play(this.anmIdle);
        scene.enemies.add(this);
        this.body.pushable = false;

        this.init();
    }

    init() {
        // Override this
    }

    update(time,delta){
        this.myPreUpdate(time,delta);
        this.myBumpTimer--;

//         if(this.canHitPlayerTimer>0){
//         	this.canHitPlayer=false;
//             this.canHitPlayerTimer--;
//         }else{
//             this.canHitPlayer=true;
//         }

        this.startMovement();

        switch (this.myState) {
            case STATE_EN_IDLE:
                this.idle(time,delta);
                break;
            case STATE_EN_MOVE:
                this.walk(time,delta);
                break;
            case STATE_EN_HIT:
                this.hit(time,delta);
                break;
            case STATE_EN_ATTACK:
                this.attack(time,delta);
                break;
            case STATE_EN_DIE:
                this.die(time,delta);
                break;
            default:
                this.idle(time,delta);
                break;
        }

        if(this.y > H || this.y< H*-500){
            this.destroy();
        }
        this.myPostUpdate(time,delta);
    }

    myPreUpdate(){

    }

    myPostUpdate(){

    }

    startMovement(){
        if(this.body.touching.down && !this.walkStarted){
            this.walkStarted=true;
            this.body.acceleration.x = this.defaultAcc;
            this.myState = STATE_EN_MOVE;
        }
    }

    idle(){
        this.myState = STATE_EN_IDLE;
        if(this.anims.currentAnim && this.anmIdle && this.anims.currentAnim.key != this.anmIdle){
            this.play(this.anmIdle);
        }
        if(this.body.velocity.x != 0 ){
            this.myState = STATE_EN_MOVE;
        }
    }

    walk(){
        this.myState = STATE_EN_MOVE;
        if(this.anmWalk && this.anims.currentAnim && this.anims.currentAnim.key != this.anmWalk){
            this.play(this.anmWalk);
        }
        if(this.myBumpTimer<1){
            this.myBumpTimer = this.myBumpFrequency;
            if(this.body.touching.right){
                this.body.acceleration.x = this.defaultAcc * -1;
            }else if(this.body.touching.left){
                this.body.acceleration.x = this.defaultAcc;
            }else{
                //do nothing
            }
        }


        this.flipX = this.body.velocity.x < 0;
        if(this.body.velocity.x === 0 ){
            this.myState = STATE_EN_IDLE;
        }

    }

    attack(){

    }

    kill(){

        if(this.myState != STATE_EN_DIE){
            this.myState = STATE_EN_DIE;
        }
    }

    // I was hit
    hit(player){
        this.myPreHit(player);
        if(player.y <= this.y-UNITSIZE){
            this.myScene.shakeIt();
//             player.body.velocity.y = ACCELERATION *-1;


            this.hp-=1;
            if(this.hp<1){
                this.kill();
                this.myScene.soundDropFall.play();
                for(let i=0;i<this.coins;i++){
                    new Coin(this.myScene,this.x,this.y);
                }
            }


        }else if(player.y >= this.y-UNITSIZE/4){
            this.myScene.playerLoseLife();
        }
    }

    myPreHit(player){

    }

    die(){
        this.myState = STATE_EN_DIE;

        if(this.anmDie){
            this.body.velocity.x = 0;
//             this.body.velocity.y = -75;
            if(this.anmDie && this.anims.currentAnim && this.anims.currentAnim.key != this.anmDie){
                this.play(this.anmDie);
            }
            if(this.anims.currentFrame && this.anims.currentFrame.index === this.anims.getTotalFrames()  ){
                this.destroy();
            }
        }else{
            this.destroy();
        }

    }

}