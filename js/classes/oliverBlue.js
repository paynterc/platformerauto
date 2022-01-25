class OliverBlue extends Enemy {


    init() {

        // Override this
        // this.body.allowGravity = false;
        this.defaultAcc = 45;
        this.maxVelocity = 60;

        this.anmIdle = 'oliverBlueWalk';
        this.anmWalk = 'oliverBlueWalk';
        this.anmRun = 'oliverBlueWalk'
        this.anmHit = 'oliverBlueWalk';
        this.anmAttack = 'oliverBlueWalk';
        this.anmDie = 'oliverBlueDie';
        this.play(this.anmWalk);


        this.nextShoot = 0;
        this.myDelay = 5000;
    }



}