class Goblin extends Enemy {


    init() {

        // Override this
        // this.body.allowGravity = false;
        this.arrowSpd = this.myConfig.hasOwnProperty('arrowSpd') ? this.myConfig.arrowSpd : 150;
        this.flipX = this.myConfig.hasOwnProperty('flipX') ? this.myConfig.flipX : false;
        this.numShots = this.myConfig.hasOwnProperty('numShots') ? this.myConfig.numShots : 1;
        this.damageOnImpact = false;

        this.defaultAcc = 0;
        this.body.velocity.x=0;

        this.anmIdle = 'goblinAttack';
        this.anmWalk = 'goblinAttack';
        this.anmRun = 'goblinAttack'
        this.anmHit = 'goblinAttack';
        this.anmAttack = 'goblinAttack';
        this.anmDie = 'goblinAttack';



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
        if(this.anims.currentFrame.index==6 && this.myState!=STATE_EN_DIE){
            if(this.shotCounter>0){
                this.shoot();
                this.shotCounter--;
            }

        }else{
            this.shotCounter = this.numShots;
        }
    }

    shoot(){
//        let angle = this.flipX ? 225 : -45;
        let angle = this.flipX ? 180 : 0;
//        let arrow = new Arrow(this.myScene,this.x,this.y,angle,{'img':'arrow','initSpeed':this.arrowSpd});
        let bullet = new Bullet(this.myScene,this.x,this.y,angle,{anm:'fireball','initSpeed':this.arrowSpd,scale:.75});

    }

    startMovement(){
        // if(this.body.touching.down && !this.walkStarted){
        //     this.walkStarted=true;
        //     this.body.acceleration.x = this.defaultAcc;
        //     this.myState = STATE_EN_MOVE;
        // }
    }

}