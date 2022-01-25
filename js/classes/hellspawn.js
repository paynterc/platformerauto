class Hellspawn extends Enemy {


    init() {

        // Override this
        // this.body.allowGravity = false;
        this.defaultAcc = 5;
        this.defaultVelocityY = 45;
        this.body.velocity.y = this.defaultVelocityY ;

        this.anmIdle = 'hellSpawnMove';
        this.anmWalk = 'hellSpawnMove';
        this.anmRun = 'hellSpawnMove'
        this.anmHit = 'hellSpawnMove';
        this.anmAttack = 'hellSpawnMove';
        this.anmDie = 'hellSpawnDie';
        this.play(this.anmWalk);


        this.nextShoot = 0;
        this.myDelay = 4000;
    }
	
	myPreUpdate(time,delta){
	    if(time>this.nextShoot){
            this.nextShoot+=this.myDelay;
            this.jump();
        }
	}


	jump(){
		this.body.velocity.y = JUMP_SPEED
	}

}