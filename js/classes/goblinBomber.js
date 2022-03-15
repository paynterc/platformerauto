class GoblinBomber extends Enemy {


    init() {

        // Override this
        // this.body.allowGravity = false;
        this.defaultAcc = 0;
//        this.defaultVelocityY = 45;
//        this.body.velocity.y = this.defaultVelocityY ;
        this.damageOnImpact = false;// no damage when you touch
        this.myAttackFrequency = 80;
        this.myAttackTimer = this.myAttackFrequency;

        this.numShots=5;
        this.shotCount=0;
        this.myDelay = 10;//time between shots
        this.nextShoot = this.myDelay;
        this.attacking = false;

        this.anmDefault = 'goblinBomberIdle';
        this.anmIdle = 'goblinBomberIdle';
        this.anmWalk = 'goblinBomberIdle';
        this.anmRun = 'goblinBomberIdle'
        this.anmHit = 'goblinBomberIdle';
        this.anmAttack = 'goblinBomberAttack';
        this.anmDie = 'goblinBomberDie';
        this.play(this.anmIdle);

        this.exploded = false;
        this.preExplodeTime = 60;
    }

    myPreUpdate(time,delta){

        if(this.attacking){
            this.nextShoot--;
            if(this.nextShoot<=0){
                this.nextShoot=this.myDelay;
                this.shoot();
                this.shotCount++;
                if(this.shotCount>=this.numShots){
                    this.stopAttack();
                }
            }
        }else{
            this.myAttackTimer--;
            if(this.myAttackTimer<1){
                this.myAttackTimer = this.myAttackFrequency;
                if( Phaser.Math.Distance.Between(this.x, this.y, this.myScene.player.x, this.myScene.player.y) < 128 ){
                    this.attack();
                }
            }
        }


    }

    attack(){
        this.nextShoot=0;
        this.shotCount=0;
        this.attacking=true;
    }

    stopAttack(){
        this.nextShoot=this.myDelay;
        this.shotCount=0;
        this.attacking=false;
    }

    mySetScale(){
            this.setScale(1);
            this.myScale = 1;
    }

//    attack(){
//        if( Phaser.Math.Distance.Between(this.x, this.y, this.myScene.player.x, this.myScene.player.y) < 128 ){
//            this.play(this.anmAttack);
//            this.die();
//        }
//    }

    shoot(){
        let angle = Phaser.Math.Between(250,290);
        let arrow = new Boomer(this.myScene,this.x,this.y,angle,{'img':'bombGoblin','initSpeed':600,myGroup:this.myScene.justMobs});
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


        let corpse = new Corpse(this.myScene,this.x,this.y,{'scale':this.myScale});
        if(this.onCorpseDestroy){
            corpse.onDestroy = this.onCorpseDestroy;
        }
        corpse.play(this.anmDie);
        this.explode();
        this.destroy();

    }

    explode(){
        if(this.exploded) return false;
        this.exploded = true;
        new Bullet(this.myScene,this.x,this.y,0,{'anm':'kapow','initSpeed':0,'destroyAfterAnim':true,'img':'kapow'});
        this.myScene.soundFireExplode.play();
    }

}