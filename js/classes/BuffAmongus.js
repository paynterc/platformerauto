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
        this.curAttack=0;
        this.numAttacks=8;
        this.attackCounter=0;
        this.oneBullet=false;
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
        this.setTint("0xffffff");
        // flashing is over, do the attack

        //new Bullet(this.myScene,this.x,this.y,270,{anm:'fireball','initSpeed':100});
        //this.walk();
        if(this.attackCounter>=this.numAttacks){
            this.attackCounter=0;
            this.curAttack=0;
            this.walk();
            this.preAttackTimer = this.preAttackTime;

            return false;
        }

        if(this.curAttack==0){
            this.attackCounter=0;
            this.curAttack=1;
            this.play('buffAmgAttack1');
        }else if(this.curAttack==1){
            // overhead attack
            if(this.anims.currentFrame.index==6){
                if(!this.oneBullet){
                    this.oneBullet=true;
                    this.boomAttack(this.x,this.y-64);
                }

            }else if(this.anims.currentFrame.index==7){
                this.oneBullet=false;
                this.attackCounter++;
                this.curAttack=2;
                this.play('buffAmgPunch');
            }
        }else if(this.curAttack==2){
            // punch
            if(this.anims.currentFrame.index==3){
                if(!this.oneBullet){
                    this.oneBullet=true;
                    let xoff = this.flipX ? -32 : 32;
                    this.boomAttack(this.x+xoff,this.y);
                }
            }else if(this.anims.currentFrame.index==4){
                this.oneBullet=false;
                this.attackCounter++;
                this.curAttack=1;
                this.play('buffAmgAttack1');
            }
        }

    }

    boomAttack(x,y){
        let bullet = new Bullet(this.myScene,x,y,0,{'anm':'kapow','initSpeed':0,'destroyAfterAnim':true,'img':'kapow'});
        bullet.setDepth(-100);
        this.myScene.soundFireExplode.play();
    }

    onCorpseDestroy = function(){

        this.myScene.dropHatLoot('hornHelmet',this.x,this.y);
        this.myScene.gotHat('hornHelmet');
    }

}