class Enemy extends Phaser.GameObjects.Sprite {

    // CALLOUT: New enemies need to have a config {'img':someImage}, especially if they are bigger than 32x32
    constructor(scene, x, y, faction=1, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'emyIdle');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.myScene = scene;

        // Stats
        this.pathReactTime = 120;
        this.defaultAcc = 25;//run speed
        this.maxVelocity = 50;
        this.hp = 1;
        this.myAttackFrequency = 100;
        this.myBumpFrequency = 0;

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



        this.depth = 100;
            this.anmIdle = config.hasOwnProperty('anmIdle') ? config.anmIdle : 'emyIdle';
        this.anmWalk = config.hasOwnProperty('anmWalk') ? config.anmWalk : 'emyWalk';
        this.anmRun = config.hasOwnProperty('anmRun') ? config.anmRun : 'emyRun';
        this.anmHit = config.hasOwnProperty('anmHit') ? config.anmHit : 'emyHit';
        this.anmAttack = config.hasOwnProperty('anmAttack') ? config.anmAttack : 'emyAttack';
        this.anmDie = config.hasOwnProperty('anmDie') ? config.anmDie : 'emyDie';
        if(this.anmIdle) this.play(this.anmIdle);
        scene.enemies.add(this);

        this.init();
    }

    init() {
        // Override this
    }

    update(time,delta){
        this.myPreUpdate();
        this.myBumpTimer--;
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

        if(this.y > H || this.y< H*-1){
            this.destroy();
        }
        this.myPostUpdate();
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
        if(this.anmIdle && this.anims.currentAnim.key != this.anmIdle){
            this.play(this.anmIdle);
        }
        if(this.body.velocity.x != 0 ){
            this.myState = STATE_EN_MOVE;
        }
    }

    walk(){
        this.myState = STATE_EN_MOVE;
        if(this.anmWalk && this.anims.currentAnim.key != this.anmWalk){
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

        if(player.y <= this.y-UNITSIZE){
            this.myScene.shakeIt();
            player.body.velocity.y = ACCELERATION *-1;


            this.hp-=1;
            if(this.hp<1){
                this.kill();
                this.myScene.soundDropFall.play();
                for(let i=0;i<3;i++){
                    new Coin(this.myScene,this.x,this.y);
                }
            }


        }else if(player.y >= this.y-UNITSIZE/4){
            this.myScene.playerLoseLife();
        }
    }

    die(){
        this.myState = STATE_EN_DIE;

        if(this.anmDie){
            this.body.velocity.x = 0;
            this.body.velocity.y = -75;
            if(this.anims.currentAnim.key != this.anmDie){
                this.play(this.anmDie);
            }
            if(this.anims.currentFrame.index === this.anims.getTotalFrames() -1 ){
                this.destroy();
            }
        }else{
            this.destroy();
        }

    }

}