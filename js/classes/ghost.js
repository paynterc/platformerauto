class Ghost extends EnemyFly {


    init() {
        this.setScale(2);
        // Override this
        this.defaultAcc = 5;
        this.defaultVelocityY = 45;
        this.body.velocity.y = this.defaultVelocityY ;

        this.anmIdle = 'ottoGhost';
        this.anmWalk = 'ottoGhost';
        this.anmRun = 'ottoGhost'
        this.anmHit = 'ottoGhost';
        this.anmAttack = 'ottoGhost';
        this.anmDie = null;
        this.play(this.anmWalk);

        this.coins=20;

        this.nextShoot = 0;
        this.myDelay = 5000;
    }

    myPreUpdate(){
        if(this.anims.currentFrame.index>12){
            this.body.checkCollision.none=true;
        }else{
            this.body.checkCollision.none=false;
        }
    }

    shoot(){

    }

}