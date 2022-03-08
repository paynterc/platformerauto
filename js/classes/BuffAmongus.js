class BuffAmongus extends MiniBoss {
    mySetScale(){
            this.setScale(1);
            this.myScale = 1;
    }

    init() {

        // Override this
        // this.body.allowGravity = false;
        this.defaultAcc = 5;
        this.defaultVelocityY = 45;
        this.body.velocity.y = this.defaultVelocityY ;
        this.scaleX = this.myScale;
        this.scaleY = this.myScale;
        this.maxHp = 50;
        this.hp = this.maxHp;


        this.myAttackFrequency = 500;
        this.myAttackTimer = this.myAttackFrequency;
        // maybe use this for multishots
        this.nextShoot = 0;
        this.myDelay = 4000;
        this.preAttackTime = 60;
        this.preAttackTimer = this.preAttackTime;

        this.anmDefault = 'buffAmgWalk';
        this.anmIdle = 'buffAmgWalk';
        this.anmWalk = 'buffAmgWalk';
        this.anmRun = 'buffAmgWalk'
        this.anmHit = 'buffAmgWalk';
        this.anmAttack = 'buffAmgPunch';
        this.anmDie = 'buffAmgDie';

        // get it to sit right on the floor. I have an empty border around the sprite
		this.body.setSize(40, 78);

        this.myScene.events.emit('bossHealthUpdate',1);
        this.myScene.events.emit('bossArrives');


        this.myState = STATE_EN_INTRO;
        this.x+=UNITSIZE * 4;
        this.body.acceleration.x = 0;
        this.body.velocity.x = 0;
        this.play('buffAmgIntro');
        this.myScene.playState = PLAYSTATE_CUTSCENE;
        this.myScene.cameras.main.stopFollow();
        this.myScene.cameras.main.startFollow(this);
        this.introTimer = 200;
    }

    startMovement(){
        if(this.myState!=STATE_EN_INTRO){
                if(this.body.touching.down && !this.walkStarted){
                    this.walkStarted=true;
                    this.body.acceleration.x = this.defaultAcc;
                    this.myState = STATE_EN_MOVE;
                }
        }
    }



    intro(time,delta){
            this.introTimer--;
            if(this.introTimer<=0){
                this.myState = STATE_EN_MOVE;
                this.myScene.cameras.main.stopFollow();
                this.myScene.cameras.main.startFollow(this.myScene.player);
                this.myScene.playState = PLAYSTATE_MINIBOSS;
                this.play(this.anmWalk);
                this.startMovement();
            }

    }

    attack(time,delta){
        this.myState = STATE_EN_ATTACK;

        // do some flashing first. As long as state is STATE_EN_ATTACK, this code should keep running.
        if(this.preAttackTimer>0){
            this.preAttackTimer --;
            if( (this.preAttackTimer>40 && this.preAttackTimer <= 50)
              || (this.preAttackTimer>20 && this.preAttackTimer <= 30)
              || (this.preAttackTimer <= 10)
              ){
                this.setTint("0x000000");
            }else{
                this.setTint("0xffffff");
            }
            return false;
        }
        this.preAttackTimer = this.preAttackTime;
        this.setTint("0xffffff");
        // flashing is over, do the attack
//        let angle = this.flipX ? 180 : 0;
//        new Bullet(this.myScene,this.x,this.y,0,{anm:'fireball','initSpeed':100});
//        new Bullet(this.myScene,this.x,this.y,90,{anm:'fireball','initSpeed':100});//down
//        new Bullet(this.myScene,this.x,this.y,180,{anm:'fireball','initSpeed':100});
        new Bullet(this.myScene,this.x,this.y,270,{anm:'fireball','initSpeed':100});
        this.walk();
    }



    onCorpseDestroy = function(){

        this.myScene.dropHatLoot('hornHelmet',this.x,this.y);

    }

}