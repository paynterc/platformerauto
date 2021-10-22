class Commander extends Enemy {


    init() {

        // Override this
        this.defaultAcc = 5;
        this.hp=10;
        this.body.pushable=false;
        this.anmIdle = 'commanderWalk';
        this.anmWalk = 'commanderWalk';
        this.anmRun = 'commanderWalk';
        this.anmHit = 'commanderWalk';
        this.anmAttack = 'commanderAttack1';
        this.anmDie = 'commanderWalk';

        this.body.setSize(128,128);
        this.body.setOffset(64,128);

        this.nextShoot = 0;
        this.myDelay = 5000;
        this.hitSoundDelay=100;

        this.myBumpFrequency = 100;
        this.myBumpTimer=this.myBumpFrequency;
    }



    walk(time,delta){
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

        if(this.nextShoot===0){
            this.nextShoot = time;
        }
        if(time>this.nextShoot){
            this.nextShoot+=this.myDelay;
            this.myState = STATE_EN_ATTACK;
        }

    }

    attack(){
        this.myState = STATE_EN_ATTACK;
        this.body.velocity.x === 0
        if(this.anims.currentAnim.key != this.anmAttack){
            this.play(this.anmAttack);
        }
        if(this.anims.currentFrame.index === this.anims.getTotalFrames() -1 ){
            this.myState = STATE_EN_MOVE;
        }
    }

    hit(player){
        if(this.hitSoundDelay<1){
            this.hitSoundDelay=100;
            this.myScene.soundDropFall.play();
            for(let i=0;i<30;i++){
                new Coin(this.myScene,this.x,this.y);
            }
        }
        this.body.velocity.y = -100;
        if(player.y <= this.y-128){


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


        }else if(player.y >= this.y){
            this.myScene.playerLoseLife();
        }

    }

    myPreUpdate(){
        if(this.hitSoundDelay>0){
            this.hitSoundDelay--;
        }
    }

}