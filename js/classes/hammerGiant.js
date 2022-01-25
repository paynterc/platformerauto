class HammerGiant extends Enemy {


    init() {
        this.body.setSize(32,64);

        // Override this
        this.defaultAcc = 5;
        this.hp=8;
        this.anmIdle = 'rockHammerWalk';
        this.anmWalk = 'rockHammerWalk';
        this.anmRun = 'rockHammerWalk';
        this.anmHit = 'rockHammerWalk';
        this.anmAttack = 'rockHammerAttack';
        this.anmDie = 'rockHammerWalk';
        this.play('rockHammerWalk');


        this.nextShoot = 0;
        this.myDelay = 3000;
        this.hitSoundDelay=100;


        this.myBumpFrequency = 200;
        this.myBumpTimer=this.myBumpFrequency;
        this.myState = STATE_EN_MOVE;

    }



    walk(time,delta){
        this.myState = STATE_EN_MOVE;
        if(this.anmWalk && this.anims.currentAnim && this.anims.currentAnim.key != this.anmWalk){
            this.play(this.anmWalk);
        }
        if(this.myBumpTimer<1){
            this.myBumpTimer = this.myBumpFrequency;
            if(this.body.touching.right){
                this.body.acceleration.x = this.defaultAcc * -1;
            }else if(this.body.touching.left){
                this.body.acceleration.x = this.defaultAcc;
            }else{
                //do nothing
            }
        }

        this.flipX = this.body.velocity.x < 0;
        if(this.body.velocity.x === 0 ){
            this.myState = STATE_EN_IDLE;
        }

        if(this.nextShoot===0){
            this.nextShoot = time;
        }
        if(time>this.nextShoot){
            this.nextShoot+=this.myDelay;
            this.myState = STATE_EN_ATTACK;
        }

    }

    attack(){
        this.myState = STATE_EN_ATTACK;
        this.body.velocity.x === 0
        if(this.anmAttack && this.anims.currentAnim && this.anims.currentAnim.key != this.anmAttack){
            this.play(this.anmAttack);
        }
        if(this.anims.currentFrame && this.anims.currentFrame.index === this.anims.getTotalFrames() -1 ){
        	let xx = this.flipX ? 30 : -30;
            new Bullet(this.myScene,this.x+xx,this.y-40,0,{img:'rockFire', anm:'rockFire', initSpeed:0, destroyOnHit:false, scale:2, lifeSpan:30, bdyW:11,bdyH:108});
//             this.myScene.soundFireExplode.play();
            this.myState = STATE_EN_MOVE;
            
        }
    }

    hit(player){
        if(this.hitSoundDelay<1){
            this.hitSoundDelay=100;

            
            if(player.y <= this.y){
            	this.myScene.soundDropFall.play();
            	new Coin(this.myScene,this.x,this.y);

				this.myScene.shakeIt();


				this.hp-=1;
				if(this.hp<1){
					this.kill();
					this.myScene.soundDropFall.play();
					for(let i=0;i<3;i++){
						new Coin(this.myScene,this.x,this.y);
					}
				}


			}
            

        }


        if(player.y >= this.y){
            this.myScene.playerLoseLife();
        }

    }

    myPreUpdate(){
        if(this.hitSoundDelay>0){
            this.hitSoundDelay--;
        }

    }

}