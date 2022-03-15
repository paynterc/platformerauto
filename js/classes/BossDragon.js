class BossDragon extends Enemy {
    mySetScale(){

            this.setScale(2);
            this.myScale = 2;
    }

    init() {

        // Override this
        // this.body.allowGravity = false;
        this.defaultAcc = 5;
        this.defaultVelocityY = 45;
        this.body.velocity.y = this.defaultVelocityY ;

        this.maxHp = 50;
        this.hp = this.maxHp;
        this.coins = 50;

        this.myAttackFrequency = 500;
        this.myAttackTimer = this.myAttackFrequency;
        // maybe use this for multishots
        this.maxShots = 10;
        this.shotCounter = 0;

        this.shotDelay = 30;
        this.nextShoot = 0;

        this.preAttackTime = 60;
        this.preAttackTimer = this.preAttackTime;

    	this.body.setSize(48, 48)
        this.body.setOffset(24,12)
        this.anmIdle = 'forestDragonWalk';
        this.anmWalk = 'forestDragonWalk';
        this.anmRun = 'forestDragonWalk'
        this.anmHit = 'forestDragonWalk';
        this.anmAttack = 'forestDragonFire';
        this.anmDie = 'forestDragonWalk';
        this.play(this.anmWalk);

        // get it to sit right on the floor. I have an empty border around the sprite
        this.myScene.events.emit('bossHealthUpdate',1);
        this.myScene.events.emit('bossArrives');

        this.myState = STATE_EN_INTRO;
        this.myScene.playState = PLAYSTATE_CUTSCENE;
        this.myScene.cameras.main.stopFollow();
        this.myScene.cameras.main.startFollow(this);
        this.introTimer = 100;

    }

    intro(time,delta){
            this.introTimer--;
            if(this.introTimer<=0){
                this.myState = STATE_EN_MOVE;
                this.myScene.cameras.main.stopFollow();
                this.myScene.cameras.main.startFollow(this.myScene.player);
                this.myScene.playState = PLAYSTATE_MINIBOSS;
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
            this.hp-=1;
            this.myScene.events.emit('bossHealthUpdate',this.hp/this.maxHp);

            if(this.hp<1){
                this.kill();
                this.myScene.soundDropFall.play();
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

                this.attack();
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
        }else{
            if(this.anmAttack && this.anims.currentAnim && this.anims.currentAnim.key != this.anmAttack){
                this.play(this.anmAttack);
            }
            this.setTint("0xffffff");

            if(this.shotCounter>=this.maxShots){
                    // at end of volley
                    this.shotCounter=0;
                    this.preAttackTimer = this.preAttackTime;
                    this.nextShoot=0;
                    this.preAttackTimer =  this.preAttackTime;
                    this.walk();// gets us out of attack mode
            }else{
                    // fire a bullet
                    if(this.nextShoot<=0){
                        this.shotCounter++;
                        this.nextShoot = this.shotDelay;
                        let angle = this.flipX ? 180 : 0;
                        let xoff = this.flipX ? -48 : 48;
                        new Bullet(this.myScene,this.x+xoff,this.y-8,angle,{anm:'fireball','initSpeed':100});

                        let sploder = new Bullet(this.myScene,this.x,this.y,0,{'anm':'kapow','initSpeed':0,'destroyAfterAnim':true,'img':'kapow'});
                        sploder.setDepth(-100);

                    }else{
                        this.nextShoot--;
                    }
            }


        }


    }

    onCorpseDestroy = function(){
                this.myScene.dropHatLoot('cakeHat',this.x,this.y);

//                    new HatLoot(this,this.x,this.y,{'hatKey':'topHat','img':'topHat'});
//                curHat = 'topHat';
//                this.myScene.gotHat(curHat);
//                this.myScene.soundCoinPickup.play();
//                this.myScene.spawnHat();
    }

}