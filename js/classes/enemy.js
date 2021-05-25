class Enemy extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, faction=1, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'emyIdle');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.myScene = scene;

        // Stats
        this.pathReactTime = 120;
        this.defaultAcc = 25;//run speed
        this.maxVelocity = 50;
        this.hp = 10;
        this.myAttackFrequency = 100;


        // Presets
        this.myAttackTimer = this.myAttackFrequency;
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
        this.play(this.anmIdle);
        scene.enemies.add(this);

        this.init();
    }

    init() {
        // Override this
    }

    update(){
        if(this.body.touching.down && !this.walkStarted){
            this.walkStarted=true;
            this.body.acceleration.x = this.defaultAcc;
            this.myState = STATE_EN_MOVE;
        }
        switch (this.myState) {
            case STATE_EN_IDLE:
                this.idle();
                break;
            case STATE_EN_MOVE:
                this.walk();
                break;
            case STATE_EN_HIT:
                this.hit();
                break;
            case STATE_EN_ATTACK:
                this.attack();
                break;
            case STATE_EN_DIE:
                this.die();
                break;
            default:
                this.idle();
                break;
        }

        if(this.y > H){
            this.destroy();
        }
    }

    idle(){
        this.myState = STATE_EN_IDLE;
        if(this.anims.currentAnim.key != this.anmIdle){
            this.play(this.anmIdle);
        }
        if(this.body.velocity.x != 0 ){
            this.myState = STATE_EN_MOVE;
        }
    }

    walk(){
        this.myState = STATE_EN_MOVE;
        if(this.anims.currentAnim.key != this.anmWalk){
            this.play(this.anmWalk);
        }
        if(this.body.touching.right){
            this.body.acceleration.x = this.defaultAcc * -1;
        }else if(this.body.touching.left){
            this.body.acceleration.x = this.defaultAcc;
        }else{
            //do nothing
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

    die(){
        this.myState = STATE_EN_DIE;
        this.body.velocity.x = 0;
        this.body.velocity.y = -75;
        if(this.anims.currentAnim.key != this.anmDie){
            this.play(this.anmDie);
        }
        if(this.anims.currentFrame.index === this.anims.getTotalFrames() -1 ){
            this.destroy();
        }
    }
}