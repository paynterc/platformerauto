class Archer extends Enemy {


    init() {

        // Override this
        // this.body.allowGravity = false;
        this.arrowSpd = this.myConfig.hasOwnProperty('arrowSpd') ? this.myConfig.arrowSpd : 500;
        this.flipX = this.myConfig.hasOwnProperty('flipX') ? this.myConfig.flipX : false;
        this.numShots = this.myConfig.hasOwnProperty('numShots') ? this.myConfig.numShots : 1;


        this.defaultAcc = 0;
        this.body.velocity.x=0;

        this.anmIdle = 'parkerArcher';
        this.anmWalk = 'parkerArcher';
        this.anmRun = 'parkerArcher'
        this.anmHit = 'parkerArcher';
        this.anmAttack = 'parkerArcher';
        this.anmDie = 'parkerArcher';



        this.play(this.anmWalk);


        this.nextShoot = 0;
        this.myDelay = 5000;
        this.shotCounter = this.numShots;
    }

    myPreUpdate(time,delta){
        // if(this.nextShoot===0){
        //     this.nextShoot = time;
        // }
        // if(time>this.nextShoot){
        //     this.nextShoot+=this.myDelay;
        //     this.shoot();
        // }
        if(this.anims.currentFrame.index==3 && this.myState!=STATE_EN_DIE){
            if(this.shotCounter>0){
                this.shoot();
                this.shotCounter--;
            }

        }else{
            this.shotCounter = this.numShots;
        }
    }

    shoot(){
        let angle = this.flipX ? 225 : -45;
        let arrow = new Arrow(this.myScene,this.x,this.y,angle,{'img':'arrow','initSpeed':this.arrowSpd});
    }

    startMovement(){
        // if(this.body.touching.down && !this.walkStarted){
        //     this.walkStarted=true;
        //     this.body.acceleration.x = this.defaultAcc;
        //     this.myState = STATE_EN_MOVE;
        // }
    }

}