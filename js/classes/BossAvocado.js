class BossAvocado extends Enemy {
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

        this.anmDefault = 'avocadoWalk';
        this.anmIdle = 'avocadoWalk';
        this.anmWalk = 'avocadoWalk';
        this.anmRun = 'avocadoWalk'
        this.anmHit = 'avocadoWalk';
        this.anmAttack = 'avocadoWalk';
        this.anmDie = 'avocadoWalk';
        this.play(this.anmWalk);

        // get it to sit right on the floor. I have an empty border around the sprite
		this.body.setSize(96, 96)
		this.body.setOffset(0,4)
        this.myScene.events.emit('bossHealthUpdate',1);
        this.myScene.events.emit('bossArrives');

        this.myState = STATE_EN_INTRO;
        this.x+=UNITSIZE * 4;
        this.body.acceleration.x = 0;
        this.body.velocity.x = 0;
        this.play('avocadoSpawn');
        this.myScene.playState = PLAYSTATE_CUTSCENE;
        this.myScene.cameras.main.stopFollow();
        this.myScene.cameras.main.startFollow(this);
        this.introTimer = 150;

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

    startMovement(){
        if(this.myState!=STATE_EN_INTRO){
                if(this.body.touching.down && !this.walkStarted){
                    this.walkStarted=true;
                    this.body.acceleration.x = this.defaultAcc;
                    this.myState = STATE_EN_MOVE;
                }
        }
    }

    hit(player){
        this.myPreHit(player);
        if(player.y <= this.y-UNITSIZE){
            this.myScene.shakeIt();
//             player.body.velocity.y = ACCELERATION *-1;


            this.hp-=1;
            this.myScene.events.emit('bossHealthUpdate',this.hp/this.maxHp);
            this.myScene.soundDropFall.play();

            if(this.hp<1){
                this.kill();

                for(let i=0;i<this.coins;i++){
                    new Coin(this.myScene,this.x,this.y);
                }
            }


        }else if(player.y >= this.y-UNITSIZE/4 && this.damageOnImpact){
            this.myScene.playerLoseLife();
        }
    }

    myPreUpdate(time,delta){

        if(this.myState != STATE_EN_ATTACK){
            this.myAttackTimer --;
            if(this.myAttackTimer<1){
                this.myAttackTimer = this.myAttackFrequency;

                this.attack(time,delta);
            }
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
        let angle = this.flipX ? 180 : 0;
        new Bullet(this.myScene,this.x,this.y,0,{anm:'fireball','initSpeed':100,img:'fireball'});
        new Bullet(this.myScene,this.x,this.y,90,{anm:'fireball','initSpeed':100,img:'fireball'});
        new Bullet(this.myScene,this.x,this.y,180,{anm:'fireball','initSpeed':100,img:'fireball'});
        new Bullet(this.myScene,this.x,this.y,270,{anm:'fireball','initSpeed':100,img:'fireball'});
        this.walk();
    }

    onCorpseDestroy = function(){
//                curHat = 'blobCrown';
//                this.myScene.gotHat(curHat);
//                this.myScene.soundCoinPickup.play();
//                this.myScene.spawnHat();
//                new HatLoot(this,this.x,this.y,{'hatKey':'blobCrown','img':'blobCrown'});
                this.myScene.dropHatLoot('avocadoHat',this.x,this.y);
    }

}