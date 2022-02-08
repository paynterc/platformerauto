class EvilEyeball extends Enemy {


    init() {

        // Override this
        // this.body.allowGravity = false;
        this.defaultAcc = 5;
        this.defaultVelocityY = 45;
        this.body.velocity.y = this.defaultVelocityY ;

        this.anmIdle = 'evilEyeball';
        this.anmWalk = 'evilEyeball';
        this.anmRun = 'evilEyeball'
        this.anmHit = 'evilEyeball';
        this.anmAttack = 'evilEyeball';
        this.anmDie = 'evilEyeball';
        this.play(this.anmWalk);


        this.nextShoot = 0;
        this.myDelay = 4000;
    }

}