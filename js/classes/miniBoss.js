class MiniBoss extends Enemy {
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
        this.coins = Phaser.Math.Between(50,100);

        this.myAttackFrequency = 500;
        this.myAttackTimer = this.myAttackFrequency;

        // maybe use this for multishots
        this.nextShoot = 0;
        this.myDelay = 4000;
        this.preAttackTime = 60;
        this.preAttackTimer = this.preAttackTime;

        this.anmDefault = 'blobKingIdle';
        this.anmIdle = 'blobKingIdle';
        this.anmWalk = 'blobKingWalk';
        this.anmRun = 'blobKingWalk'
        this.anmHit = 'blobKingIdle';
        this.anmAttack = 'blobKingIdle';
        this.anmDie = 'blobKingDie';
        this.play(this.anmWalk);

        // get it to sit right on the floor. I have an empty border around the sprite
		this.body.setSize(this.width - this.scaleX, this.height - this.scaleY);

        this.myScene.events.emit('bossHealthUpdate',1);
        this.myScene.events.emit('bossArrives');



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

    preWalk(time,delta){


        this.myAttackTimer --;
        if(this.myAttackTimer<1){
            this.myAttackTimer = this.myAttackFrequency;
            this.attack(time,delta);
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
        new Bullet(this.myScene,this.x,this.y,0,{anm:'fireball','initSpeed':100});
        new Bullet(this.myScene,this.x,this.y,90,{anm:'fireball','initSpeed':100});
        new Bullet(this.myScene,this.x,this.y,180,{anm:'fireball','initSpeed':100});
        new Bullet(this.myScene,this.x,this.y,270,{anm:'fireball','initSpeed':100});
        this.walk();
    }



}