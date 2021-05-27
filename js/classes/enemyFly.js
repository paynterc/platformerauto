class EnemyFly extends Enemy {


    init() {

        // Override this
        // this.body.allowGravity = false;
        this.defaultAcc = 5;
        this.defaultVelocityY = 45;
        this.body.velocity.y = this.defaultVelocityY ;
        // inity + (a * sin(2 * PI * f * t + phase));
        // let a = 16;//amplitude
        // let PI = 3.14;
        // let f = 2;//frequency
        // let t = time;//time, some chaning parameter
        // let accMod = (a * sin(2 * PI * f * t + phase))

        this.anmIdle = 'emyYellowFly';
        this.anmWalk = 'emyYellowFly';
        this.anmRun = 'emyYellowFly';
        this.anmHit = 'emyYellowFly';
        this.anmAttack = 'emyYellowFly';
        this.anmDie = 'emyYellowDie';

        this.nextShoot = 0;
        this.myDelay = 5000;
    }

    startMovement(){
        if(!this.walkStarted){
            this.walkStarted=true;
            this.body.acceleration.x = this.defaultAcc *-1;
            this.myState = STATE_EN_MOVE;
        }
    }

    walk(time,delta){
        this.myState = STATE_EN_MOVE;
        if(this.y<0){
            this.y=UNITSIZE;
        }

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

        if(this.myScene.flyTween){
            this.body.velocity.y = (this.defaultVelocityY *-1) + this.myScene.flyTween.getValue();
        }

        if(this.nextShoot===0){
            this.nextShoot = time;
        }
        if(time>this.nextShoot){
            this.nextShoot+=this.myDelay;
            this.shoot();
        }

    }


    shoot(){
        let egg = this.myScene.physics.add.sprite(this.x,this.y,'egg');
        this.myScene.splatbullets.add(egg);
    }
}