class Boss extends Phaser.GameObjects.Container {

    constructor(scene, x, y, config = {}) {


        super(scene, x, y,[]);
        this.myScene = scene;
        this.defaultAcc = 30;
        this.legTimePatrol=700;
        this.legTimePause=1500;
        this.legTimerPatrol = this.legTimePatrol;
        this.legTimerPause = this.legTimePause;
        this.patrolDuration = 7000;
        this.patrolTimer = this.patrolDuration;

        this.jumpDuration = 1000;
        this.jumpTimer = this.jumpDuration;


        this.maxHealth=100;
        this.health=100;
        this.healthW=32*8;

        this.pauseDuration = 6;// Measure this in leg lifts, not seconds. Pause for 6 leg lifts.
        this.pauseTimer = this.pauseDuration;
        this.legPauseY = 144;
        this.xDir = 1;// 1 or -1

        this.localTime=0;
        this.localDelta=0;

        this.statesEnum = {"patrol":1, "pause":2, "jumping":3}
        Object.freeze(this.statesEnum);
        this.myState = this.statesEnum.patrol;

        this.leg1 = scene.physics.add.image(128, 192,'crableg').setDepth(-100).setSize(8, 64);
        this.leg1.body.setAllowGravity(false).setImmovable(true);
        this.add(this.leg1);

        this.leg2 = scene.physics.add.image(256, 192,'crableg').setDepth(-100).setSize(8, 64);
        this.leg2.body.setAllowGravity(false).setImmovable(true);
        this.add(this.leg2);

        this.leg3 = scene.physics.add.image(192, 160,'crableg').setDepth(-100).setSize(8, 64);
        this.leg3.body.setAllowGravity(false).setImmovable(true);
        this.add(this.leg3);

        this.leg4 = scene.physics.add.image(320, 160,'crableg').setDepth(-100).setSize(8, 64);
        this.leg4.body.setAllowGravity(false).setImmovable(true);
        this.add(this.leg4);


        let body=scene.add.sprite(224,0, 'bossCrabWalk');
        this.add(body);
        body.play('bossCrabWalk');


        let bodyZone = scene.add.zone(224, 96).setSize(224, 128);
        scene.physics.world.enable(bodyZone);
        bodyZone.body.setAllowGravity(false).setImmovable(true);
        this.add(bodyZone);

        let clawZone1 = scene.add.zone(64, -64).setSize(96, 64);
        scene.physics.world.enable(clawZone1);
        clawZone1.body.setAllowGravity(false).setImmovable(true);
        this.add(clawZone1);

        let clawZone2 = scene.add.zone(384, -64).setSize(96, 64);
        scene.physics.world.enable(clawZone2);
        clawZone2.body.setAllowGravity(false).setImmovable(true);
        this.add(clawZone2);

        let heartZone = scene.add.zone(224, 156).setSize(32, 32);
        scene.physics.world.enable(heartZone);
        heartZone.body.setAllowGravity(false).setImmovable(true);
        this.add(heartZone);



        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.body.setSize(448, 224);// Set hit box
        this.body
        scene.physics.add.collider(this, scene.platforms);
        scene.physics.add.collider(bodyZone, scene.player);
        scene.physics.add.collider(clawZone1, scene.player);
        scene.physics.add.collider(clawZone2, scene.player);
        scene.physics.add.collider(this.leg1, scene.player);
        scene.physics.add.collider(this.leg2, scene.player);
        scene.physics.add.collider(this.leg3, scene.player);
        scene.physics.add.collider(this.leg4, scene.player);
        scene.physics.add.collider(heartZone, scene.player,this.hitHeart,false,this);


        this.healthBar = scene.add.image(scene.chunkX + 32000 + (W/2), 64,'redSquare').setDepth(-100).setScale(6, 1);


        this.init();


    }

    update(time,delta){
        this.localTime=time;
        this.localDelta=delta;
        switch(this.myState) {
            case this.statesEnum.patrol:
                this.backForth();
                break;
            case this.statesEnum.pause:
                this.pause();
                break;
            case this.statesEnum.jumping:
                this.jumping();
                break;
            default:
            // code block
        }


    }

    hitHeart(zone,player){
        this.health -=1;
        this.healthBar.setScale(6 * (this.health/this.maxHealth),1);
    }



    backForth(){

        this.legTimerPatrol-=this.localDelta;

        if(this.legTimerPatrol<1){

            this.legTimerPatrol = this.legTimePatrol;
            this.leg1.y= this.leg1.y>160 ? 160 : 192;
            this.leg2.y= this.leg2.y>160 ? 160 : 192;

            this.leg3.y= this.leg1.y>160 ? 160 : 192;
            this.leg4.y= this.leg2.y>160 ? 160 : 192;

        }

        if(this.body.touching.right){
            this.xDir = -1;
            this.body.velocity.x = this.defaultAcc * this.xDir;
        }else if(this.body.touching.left){
            this.xDir = 1;
            this.body.velocity.x = this.defaultAcc * this.xDir;
        }else{
            // nothing
        }

        this.patrolTimer-=this.localDelta;
        if(this.patrolTimer<1){
            this.patrolTimer = this.patrolDuration;
            this.leg1.y = this.legPauseY;
            this.leg2.y = this.legPauseY;

            this.myState=this.statesEnum.pause;
        }

    }

    pause(){

        this.body.velocity.x = 0;
        this.legTimerPause-=this.localDelta;

        if(this.legTimerPause<1){
            this.legTimerPause = this.legTimePause;
            this.leg1.y= this.leg1.y>this.legPauseY ? this.legPauseY : 192;
            this.leg2.y= this.leg2.y>this.legPauseY ? this.legPauseY : 192;

            this.leg3.y= this.leg1.y>this.legPauseY ? this.legPauseY : 192;
            this.leg4.y= this.leg2.y>this.legPauseY ? this.legPauseY : 192;

            this.pauseTimer -=1;
            if(this.pauseTimer<1){
                this.pauseTimer = this.pauseDuration;
                this.body.velocity.x = this.defaultAcc * this.xDir;
                this.myState=this.statesEnum.jumping;
                this.jump();
            }

        }

    }

    jumping(){
        this.jumpTimer -= this.localDelta;

        if(this.body.touching.down && this.jumpTimer<1){
            this.leg3.y = 160;
            this.leg4.y = 160;
            this.leg1.y = 192;
            this.leg2.y = 192;
            this.body.velocity.x = this.defaultAcc * this.xDir;
            this.jumpTimer = this.jumpDuration;
            this.myState = this.statesEnum.patrol;
        }
    }

    jump(){
        this.leg1.y = 192;
        this.leg2.y = 192;
        this.leg3.y = 192;
        this.leg4.y = 192;
        this.body.velocity.x = 0;
        this.body.velocity.y = -1000;
    }

    init(){
        this.body.velocity.x = this.defaultAcc * this.xDir;
    }
}