class BobTheBlob extends Enemy {


    init() {

        // Override this
        // this.body.allowGravity = false;
        this.defaultAcc = 5;
        this.defaultVelocityY = 45;
        this.body.velocity.y = this.defaultVelocityY ;

        this.anmIdle = 'bobTheBlobWalk';
        this.anmWalk = 'bobTheBlobWalk';
        this.anmRun = 'bobTheBlobWalk'
        this.anmHit = 'bobTheBlobWalk';
        this.anmAttack = 'bobTheBlobWalk';
        this.anmDie = 'bobTheBlobDie';
        this.play(this.anmWalk);


        this.nextShoot = 0;
        this.myDelay = 4000;
    }

}