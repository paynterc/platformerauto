class Enemy extends Phaser.GameObjects.Sprite {

    // CALLOUT: New enemies need to have a config {'img':someImage}, especially if they are bigger than 32x32
    constructor(scene, x, y, faction=1, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'emyIdle');
        this.myScene = scene;
        this.myConfig = config;

        this.mySetScale();


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
		

        
        // Stats
        this.pathReactTime = 120;
        this.defaultAcc = config.hasOwnProperty('defaultAcc') ? config.defaultAcc : 25;
        this.maxVelocity = config.hasOwnProperty('maxVelocity') ? config.maxVelocity : 50;
        this.killAfterTime = config.hasOwnProperty('killAfterTime') ? config.killAfterTime : 0;

        this.hp = config.hasOwnProperty('hp') ? config.hp : 1;
        this.canKillMe = config.hasOwnProperty('canKillMe') ? config.canKillMe : true;
        this.myAttackFrequency = 100;
        this.myBumpFrequency = config.hasOwnProperty('bumpFrequency') ? config.bumpFrequency : 3;
        this.canHitPlayer = true;// Let enemy not hit player initially. Set a timer to make it active.
        this.canHitPlayerTimer = 100;
        this.damageOnImpact = config.hasOwnProperty('damageOnImpact') ? config.damageOnImpact : true;

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

        this.coins = config.hasOwnProperty('coins') ? config.coins : 1;

        this.depth = 100;
        // this.anmIdle = config.hasOwnProperty('anmIdle') ? config.anmIdle : 'emyIdle';
        // this.anmWalk = config.hasOwnProperty('anmWalk') ? config.anmWalk : 'emyWalk';
        // this.anmRun = config.hasOwnProperty('anmRun') ? config.anmRun : 'emyRun';
        // this.anmHit = config.hasOwnProperty('anmHit') ? config.anmHit : 'emyHit';
        // this.anmAttack = config.hasOwnProperty('anmAttack') ? config.anmAttack : 'emyAttack';
        // this.anmDie = config.hasOwnProperty('anmDie') ? config.anmDie : 'emyDie';
        this.anmDefault = config.hasOwnProperty('anmDefault') ? config.anmDefault : null;
        this.anmIdle = config.hasOwnProperty('anmIdle') ? config.anmIdle : this.anmDefault;
        this.anmWalk = config.hasOwnProperty('anmWalk') ? config.anmWalk : this.anmDefault;
        this.anmRun = config.hasOwnProperty('anmRun') ? config.anmRun : this.anmDefault;
        this.anmHit = config.hasOwnProperty('anmHit') ? config.anmHit : this.anmDefault;
        this.anmAttack = config.hasOwnProperty('anmAttack') ? config.anmAttack : this.anmDefault;
        this.anmDie = config.hasOwnProperty('anmDie') ? config.anmDie : this.anmDefault;
        if(config.hasOwnProperty('onDestroy')){
            this.onDestroy = config.onDestroy;
        }

        this.onCorpseDestroy = config.hasOwnProperty('onCorpseDestroy') ? config.onCorpseDestroy : null;


        if(this.anmIdle) this.play(this.anmIdle);
        scene.enemies.add(this);
        this.body.pushable = false;

        this.init();
    }

    mySetScale(){
            this.setScale(this.myConfig.hasOwnProperty('scale') ? this.myConfig.scale : 1);
            this.myScale = this.myConfig.hasOwnProperty('scale') ? this.myConfig.scale : 1;
    }

    init() {
        // Override this
    }

    update(time,delta){
        this.myPreUpdate(time,delta);
        if(this.killAfterTime>0 && this.myState!=STATE_EN_DIE){
            this.killAfterTime -=1;
            if(this.killAfterTime<=0){
                this.die();
            }
        }

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
            case STATE_EN_INTRO:
                this.intro(time,delta);
                break;
            default:
                this.idle(time,delta);
                break;
        }

        if(this.y > H*500 || this.y< H*-500){
            this.destroy();
        }
        this.myPostUpdate(time,delta);
    }

    intro(time,delta){
    }

    myPreUpdate(time,delta){

    }

    myPostUpdate(time,delta){

    }

    startMovement(){
        if(this.body && this.body.touching.down && !this.walkStarted){
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

    preWalk(){

    }

    walk(time,delta){

        this.myState = STATE_EN_MOVE;
        this.preWalk(time,delta);
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
        for(let i=0;i<this.coins;i++){
            new Coin(this.myScene,this.x,this.y);
        }
        if(this.myState != STATE_EN_DIE){
            this.myState = STATE_EN_DIE;
        }
    }

    // I was hit
    hit(player){
        this.myPreHit(player);
        if(player.y <= this.y-UNITSIZE){
            if(!this.canKillMe){
                return false;
            }
            //this.myScene.shakeIt();
//             player.body.velocity.y = ACCELERATION *-1;


            this.hp-=1;
            if(this.hp<1){
                this.kill();
                this.myScene.soundDropFall.play();

                this.myScene.emitter3.emitParticleAt(this.x, this.y, 10);

            }


        }else if(player.y >= this.y-UNITSIZE/4 && this.damageOnImpact){
            this.myScene.playerLoseLife();
        }
    }

    myPreHit(player){

    }

    die(){
        this.myState = STATE_EN_DIE;

        if(this.anmDie){
            // create a corpse object that you won't collide with
            let corpse = new Corpse(this.myScene,this.x,this.y,{'scale':this.myScale});
            if(this.onCorpseDestroy){
                corpse.onDestroy = this.onCorpseDestroy;
            }
            corpse.play(this.anmDie);
            this.onDestroy();
            this.destroy();
//            this.body.velocity.x = 0;
//            if(this.anmDie && this.anims.currentAnim && this.anims.currentAnim.key != this.anmDie){
//                this.play(this.anmDie);
//            }
//            if(this.anims.currentFrame && this.anims.currentFrame.index === this.anims.getTotalFrames()  ){
//                this.onDestroy();
//                this.destroy();
//            }
        }else{
            this.onDestroy();
            this.destroy();
        }

    }

    onDestroy(){

    }

}