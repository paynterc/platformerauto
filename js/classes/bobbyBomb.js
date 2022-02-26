class BobbyBomb extends Enemy {


    init() {

        // Override this
        // this.body.allowGravity = false;
        this.defaultAcc = 5;
        this.defaultVelocityY = 45;
        this.body.velocity.y = this.defaultVelocityY ;
        this.damageOnImpact = false;// no damage when you touch
        this.myAttackFrequency = 80;
        this.myAttackTimer = this.myAttackFrequency;

        this.anmIdle = 'bobbyBombWalk';
        this.anmWalk = 'bobbyBombWalk';
        this.anmRun = 'bobbyBombWalk'
        this.anmHit = 'bobbyBombWalk';
        this.anmAttack = 'bobbyBombWalk';
        this.anmDie = 'bobbyBombDie';
        this.play(this.anmWalk);


        this.preExplodeTime = 60;
    }

    myPreUpdate(time,delta){
        this.myAttackTimer--;
        if(this.myAttackTimer<1){
            this.myAttackTimer = this.myAttackFrequency;
            this.attack();
        }
    }

    attack(){
        if( Phaser.Math.Distance.Between(this.x, this.y, this.myScene.player.x, this.myScene.player.y) < 64){
            this.die();
        }
    }

    die(){

        this.myState = STATE_EN_DIE;

        // Flashing
        if(this.preExplodeTime>0){
            this.preExplodeTime--;
            if( (this.preExplodeTime>40 && this.preExplodeTime <= 50)
              || (this.preExplodeTime>20 && this.preExplodeTime <= 30)
              || (this.preExplodeTime <= 10)
              ){
                this.setTint("0xffffff");
            }else{
                this.setTint("0x000000");
            }
            return false;
        }


        if(this.anmDie){
            this.body.velocity.x = 0;
            if(this.anmDie && this.anims.currentAnim && this.anims.currentAnim.key != this.anmDie){
                this.play(this.anmDie);
            }
            if(this.anims.currentFrame && this.anims.currentFrame.index === 12){
                this.explode();
            }
            if(this.anims.currentFrame && this.anims.currentFrame.index === this.anims.getTotalFrames()  ){
                this.onDestroy();
                this.destroy();
            }
        }else{
            this.onDestroy();
            this.destroy();
        }

    }

    explode(){
        new Bullet(this.myScene,this.x,this.y,0,{'anm':'kapow','initSpeed':0,'destroyAfterAnim':true,'img':'kapow'});
        this.myScene.soundFireExplode.play();
    }

}