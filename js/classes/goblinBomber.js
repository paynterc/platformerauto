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
        this.myAttackTimer--;
        if(this.myAttackTimer<1){
            this.myAttackTimer = this.myAttackFrequency;
            this.attack();
        }
    }

    mySetScale(){
            this.setScale(1);
            this.myScale = 1;
    }

    attack(){
        if( Phaser.Math.Distance.Between(this.x, this.y, this.myScene.player.x, this.myScene.player.y) < 128 ){
            this.play(this.anmAttack);
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