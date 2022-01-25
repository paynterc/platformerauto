class GameScene extends Phaser.Scene {
    constructor()
    {
        super({key: 'GameScene', active: false});
        this.GAMEOVER = false;
        this.enemyTimer = undefined;
        this.chunkW = 10;
        this.chunkH = 20;
        this.playState = PLAYSTATE_MAIN;//main or boss



    }
    
    init(data){
    // you can send data as {} when you scene.start('MyScene',{})
//     	console.log('[BOOT] init', data);

    }

    preload()
    {
        let that = this;
        
        if(spaceKey) spaceKey.destroy();
        if(upKey) upKey.destroy();
        if(downKey) downKey.destroy();
        if(leftKey) leftKey.destroy();
        if(rightKey) rightKey.destroy();
        
        
    	spaceKey = this.input.keyboard.addKey('space');  // Get key object
        activePointer = this.input.activePointer;
        upKey = this.input.keyboard.addKey('up');  // Get key object
        downKey = this.input.keyboard.addKey('down');  // Get key object
        leftKey = this.input.keyboard.addKey('left');  // Get key object
        rightKey = this.input.keyboard.addKey('right');  // Get key object

        upKey.on('down', function(event) {
            that.doubleJump();
        });
        spaceKey.on('down', function(event) {
            that.doubleJump();
        });
        rightKey.on('down', function(event) {
            that.doDash();
        });
    }

    create()
    {
        let that = this;
        this.cameras.main.setBackgroundColor(0x000000);
        this.addAnimations();


        //If world is bigger than the window
        this.worldWidth = this.physics.world.bounds.width;
        this.worldHeight = this.physics.world.bounds.height;
        this.bootScene = this.scene.get('BootScene');

        this.restart=false;
        this.reset = false;
        this.finished = false;
        this.playerDead = false;
        this.shakeCooldown = 0;
        this.floorLvl = 12;
        this.chunkX = 0;
		this.chunkCount=0;
		this.chunks=[];
		level++;
		chunksToFinish++;
		
        this.respawns = [];
        this.enemyDirection = 1;
        this.nextChunkTrigger = W/2;
		

        this.addBackground();

        this.player = this.physics.add.sprite(0+HALFUNIT, this.floorLvl * UNITSIZE - (UNITSIZE*2), 'greenDotIdle');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(false);
        this.player.body.maxVelocity.setTo(MAX_SPEED, MAX_SPEED * 5); // x, y
        this.player.body.drag.setTo(DRAG, 0);
        this.player.body.pushable = true;
        this.player.play('greenDotIdle');

        if(curHat=="alienHat"){
        	this.player.setGravityY(800);

        }else{
        	this.player.setGravityY(GRAVITY);
        }
        
		this.playerSafeTime=SAFETIME;


        this.resetX = this.player.x;
        this.resetY = this.player.y;
        this.canDoubleJump = false;
		this.dashTimer=0;
		this.dashingTimer=0;
        this.boss = undefined;

        // groups
        this.platforms = this.physics.add.staticGroup();
        this.bulletShields = this.add.group();
        this.splatBulletShields = this.add.group();
        this.emyBlockers = this.physics.add.staticGroup();
        this.emyPortals = this.physics.add.staticGroup();
        this.platformImages = this.add.group();
        this.enemies = this.add.group();
        this.shooters = this.physics.add.staticGroup();
        this.bullets = this.add.group();
        this.splatbullets = this.add.group();
        this.loot = this.add.group();
        this.spikes = this.physics.add.staticGroup();
        this.cleanup = this.add.group();
        this.specialPlatforms = this.physics.add.staticGroup();
        this.portals = this.physics.add.staticGroup();
        this.finish = this.physics.add.staticGroup();

        // colliders
        this.physics.add.collider(this.player, this.platforms, this.collidePlatform,false,this);
        this.physics.add.overlap(this.player, this.loot, this.hitLoot,false,this);
        this.physics.add.overlap(this.player, this.portals, this.hitPortal,false,this);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.splatbullets, this.platforms, this.bulletHitPlatform,false,this);
        this.physics.add.collider(this.splatbullets, this.splatBulletShields, this.bulletHitShield,false,this);
        this.physics.add.collider(this.bullets, this.bulletShields, this.bulletHitShield,false,this);
        this.physics.add.collider(this.enemies, this.emyBlockers);
        this.physics.add.overlap(this.enemies, this.emyPortals,this.tpEmy,false,this);
        this.physics.add.collider(this.loot, this.platforms);
        this.physics.add.collider(this.player, this.enemies, this.hitEnemy,false,this);
        this.physics.add.overlap(this.player, this.bullets, this.hitBullet,false,this);
        this.physics.add.overlap(this.player, this.splatbullets, this.hitBullet,false,this);
        this.physics.add.collider(this.player, this.spikes, this.hitSpike,false,this);
        this.physics.add.collider(this.player, this.specialPlatforms);
        this.physics.add.overlap(this.player, this.finish, this.finishReached,false,this);


// controls

        // let chunkMarker = this.add.image((this.chunkW - 1) *UNITSIZE-1,(this.chunkW-1)*UNITSIZE-1,'hero');
        // chunkMarker.setOrigin(0);

        this.cameras.main.startFollow(this.player);
		this.cameras.main.setDeadzone(null, H);// Pair this with a scrollY check in the update() function

		
// 		this.cameras.main.setFollowOffset(0, 0);

		//this.cameras.main.setLerp(1,0);//STOPS VERTICAL FOLLOW
		
		/**** pretty good
		this.cameras.main.setDeadzone(W/3, H/2);
		this.cameras.main.setFollowOffset(0, H/6 * -1);
		****/
		
		
        this.scene.launch('HudScene');



        this.soundCoinPickup = this.sound.add('coinPickup',{volume:.15});
        this.soundDropFall = this.sound.add('dropFall',{volume:.25});
        this.soundPlayerDie = this.sound.add('playerDie',{volume:.25});
        this.soundPortal = this.sound.add('portal',{volume:.25});
        this.soundFireExplode = this.sound.add('fireExplode',{volume:.25});

        this.flyTween = this.tweens.addCounter({
            from: 20,
            to: -20,
            duration: 1000,
            yoyo: true,
            loop:-1
        });

        for(let i=0;i<4;i++){
            let setRespawn = (i===0);
            this.makeChunk(setRespawn);
        }
        
        if(curHat){
			// Find the hat config in the hats array
			let hatConfig = hats.filter(obj => {
			  return obj.img == curHat;
			});
			
			// Instantiate the hat. Use eval to translate a string to the Class name. So, instead of new Hat(), I do new (eval("Hat"))().
			if(hatConfig.length){
				this.hat=new (eval(hatConfig[0].hatClass))(this,this.player.x,this.player.y-30,hatConfig[0]);
			}        
            
        }

//         this.enemyFly = new EnemyFly(this,this.player.x-64,this.player.y-128);
//         let spawner = new Spawner(this, this.player.x+128,this.player.y-64,1,{'img':'kahlessRainbow','anmIdle':'kahlessRainbow'});      
//         this.makePortalPair(this.player.x+128,this.player.y-64);
//         let mushroom = new Mushroom(this,this.player.x+128,this.player.y-16,1,{'img':'calliopeMushroom'});
        
//         let shield = this.physics.add.sprite(mushroom.x-148,mushroom.y+32,'hero');
//         shield.body.setAllowGravity(false);
//         shield.body.setImmovable(true);
//         this.bulletShields.add(shield);

//         new HammerGiant(this, this.player.x+128,this.player.y-128,1,{img:'rockHammerGuy',scale:2});
//         new Enemy(this, this.player.x+128,this.player.y-128,1,{img:'slimeBlob',anmIdle:'slimeBlobWalk',animWalk:'slimeBlobWalk',defaultAcc:5,maxVelocity:10,bumpFrequency:24,bdyW:16,bdyH:8,bdyOx:6,bdyOy:24});
// 		   new Archer(this,this.player.x+128,this.player.y-64);
// 		   new HammerGiant(this,this.player.x+128,this.player.y-64,1,{img:'rockHammerGuy',scale:2});
//         this.makeBossLvl1();
        
//         let F = this.add.sprite(this.player.x+128,this.player.y-64,'checkpoint').setScale(4);
//         this.finish.add(F);


    }

    addBackground(){
        // Add your background images first! Images appear in the order you added them, back to front.
        // Create a tilesprite (x, y, width, height, key)
//         this.bg0 = this.add.tileSprite(
//             0,
//             0,
//             1280,
//             640,
//             'mountains_1280'
//         ).setOrigin(0,0).setScrollFactor(0,0);

         this.bg1 = this.add.tileSprite(
             0-W/2,
             0,
             W,
             H,
             'mountains',
             0
         ).setOrigin(0,0).setScale(W/128,H/128).setScrollFactor(.75,0).setTint('0x153626');
         
//         this.bg2 = this.add.tileSprite(
//              0-this.cameras.main.width/2,
//              0,
//              this.cameras.main.width,
//              this.cameras.main.height,
//              'bg2'
//          ).setOrigin(0,0).setScale(this.cameras.main.width/128,this.cameras.main.height/128).setScrollFactor(.75,0);

    }

    addAnimations()
    {
        this.anims.create(animConfigs.fireball);
        this.anims.create(animConfigs.emyIdle);
        this.anims.create(animConfigs.emyHit);
        this.anims.create(animConfigs.emyWalk);
        this.anims.create(animConfigs.emyDie);
        this.anims.create(animConfigs.coin);
        this.anims.create(animConfigs.emyYellowFly);
        this.anims.create(animConfigs.emyYellowDie);
        this.anims.create(animConfigs.bossCrabWalk);
        this.anims.create(animConfigs.watcherIdle);
        this.anims.create(animConfigs.commanderWalk);
        this.anims.create(animConfigs.commanderAttack1);
        this.anims.create(animConfigs.gusGuyIdle);
        this.anims.create(animConfigs.crownPhase);
        this.anims.create(animConfigs.hellSpawnMove);
        this.anims.create(animConfigs.hellSpawnDie);
        this.anims.create(animConfigs.oliverBlueWalk);
        this.anims.create(animConfigs.oliverBlueDie);
        this.anims.create(animConfigs.ottoGhost);
        this.anims.create(animConfigs.parkerArcher);
        this.anims.create(animConfigs.kahlessRainbow);
        this.anims.create(animConfigs.ozzieYouDied);
        this.anims.create(animConfigs.mushroomIdle);
        this.anims.create(animConfigs.mushroomBuilding);
        this.anims.create(animConfigs.rockHammerWalk);
        this.anims.create(animConfigs.rockHammerAttack);
        this.anims.create(animConfigs.rockFire);
        this.anims.create(animConfigs.slimeBlobWalk);
        this.anims.create(animConfigs.greenDotIdle);
        this.anims.create(animConfigs.greenDotRun);
        this.anims.create(animConfigs.kahLessSquareWalk);
        this.anims.create(animConfigs.alienHat);
        this.anims.create(animConfigs.cakeHat);
        this.anims.create(animConfigs.yigaHat);

    }

    getGridAt(grid,x,y){
        if(!grid) return null;
        if(x<0 || x>=grid.length) return null;
        if(!grid[0]) return null;
        if(y<0 || y>=grid[0].length) return null
        return grid[x][y];
    }

    // xx will be the far left side. y is always 0
    /**
     * Makes a chunk of map of chunkW width starting at chunkX
     * @param setRespawn
     */
    makeChunk(setRespawn){

        this.chunks.push(this.chunkX);
        this.chunkCount++;


		if(this.chunkCount>=chunksToFinish){
			let F = this.add.sprite(this.chunkX+128,(this.floorLvl-4)*UNITSIZE,'checkpoint').setScale(4);
			this.finish.add(F);
			return true;
		}

// CHASM WITH PLATFORMS
//        if(Phaser.Math.Between(1,50)===1 && this.chunkX>0){
//
//            let modFloor = Phaser.Math.Between(0,6) - 3;
//            this.floorLvl += modFloor;
//
//            for(let i=0;i<6;i++){
//                let pltLvl = (this.floorLvl*UNITSIZE > this.cameras.main.height-64) ? this.cameras.main.height-64 : this.floorLvl*UNITSIZE;
//                let platform = new Mushroom(this,this.chunkX + (120 * i),pltLvl);
//                this.cleanup.add(platform);
//            }
//
//            this.chunkX+=(this.chunkW * 2) * UNITSIZE;
//            return true;
//
//        }

        //make a grid
        let ckGrid = [];
        for(var i=0; i<this.chunkW; i++){
            let ckRows = []
            for(var j=0;j<this.chunkH; j++){
                ckRows[j]=VOID;
            }
            ckGrid[i]=ckRows;
        }

        // add first SECTION
        // sections cannot be more than 3 wide. can be floor or void
        // first and last section must be floor
        // next section width cannot be more than remaining width
        let sectionW=Phaser.Math.Between(1,this.chunkW);
        let sectionType = PLATFORM;
        let lastSectionType = sectionType;
        let wRemaining = this.chunkW;
        let modFloor = undefined;
        let curX = 0;
        let firstFloorLvl = this.floorLvl;


        if(setRespawn){
            let px = this.chunkX + HALFUNIT;
            let py = (this.floorLvl*UNITSIZE) - HALFUNIT;
            let P = this.add.image(px,py+UNITSIZE,'checkpoint');
            P.setDepth(1);
            this.cleanup.add(P);
            this.respawns.push([px,py-UNITSIZE]);
        }

        while(wRemaining>0){

            // First column will be floor
            for(let fx=curX;fx<sectionW+curX;fx++){
                for(let fy=this.floorLvl;fy<this.chunkH;fy++){
                    ckGrid[fx][fy]=sectionType;
                }
            }

            curX = sectionW+curX;
            wRemaining-=sectionW;
            sectionW= Math.min(Phaser.Math.Between(1,wRemaining),3);
            if(lastSectionType===VOID && sectionW>1){
                sectionType=PLATFORM;
            }else{
                sectionType = Phaser.Math.Between(VOID,PLATFORM);
            }
            lastSectionType = sectionType;
            if(sectionType===PLATFORM){
                modFloor = Phaser.Math.Between(0,6) - 3;
                this.floorLvl += modFloor;
                this.floorLvl = this.floorLvl < 4 ? 4 : this.floorLvl >= this.chunkH ? this.chunkH-1 : this.floorLvl;
            }
        }

        // Last section must be floor
        for(let fy=this.floorLvl;fy<this.chunkH;fy++){
            ckGrid[this.chunkW-1][fy]=PLATFORM;
        }

        // make mini platforms
        // && ckGrid[i-1][j]!=VOID
        for(let k=0;k<2;k++){
            for(var i=1; i<this.chunkW-1; i++){
                // scan down the rows for a platform
                for(var j=0;j<this.chunkH; j++){
                    if(ckGrid[i][j]===PLATFORM){
                        // We have a platform. We could make a mini platform.
                        if( j>3 && Phaser.Math.Between(1,5)===5 ){
                            // make a mini
                            ckGrid[i][j-3]=PLATFORM;
                        }
                        break;
                    }
                }
            }
        }


        //INSTANTIATE chunk
        for(var i=0; i<this.chunkW; i++){
            for(var j=0;j<this.chunkH; j++){
                if(ckGrid[i][j]===PLATFORM){

                    if(
                        ckGrid[Math.max(i-1,0)][j] === VOID
                        || ckGrid[Math.min(i+1,this.chunkW-1)][j] === VOID
                        || ckGrid[i][Math.max(j-1,0)] === VOID
                        || ckGrid[i][Math.min(j+1,this.chunkH-1)] === VOID

                    ){
                        // instatiate floor
                        let P = this.add.sprite(this.chunkX+(i*UNITSIZE),j*UNITSIZE,'platform');
                        P.setOrigin(0);
//                         P.setTint(0xff0000);
                        this.platforms.add(P);
                        this.cleanup.add(P);

                        if( Phaser.Math.Between(1,100)===100 && !setRespawn && j!=firstFloorLvl){

                            this.makeShooter(this.chunkX+(i*UNITSIZE) + HALFUNIT, j*UNITSIZE + HALFUNIT);


                        }else if(Phaser.Math.Between(1,10)===10 && j!=firstFloorLvl && ckGrid[i][Math.max(j-1,0)] === VOID){

                            this.makeSpike( this.chunkX+(i*UNITSIZE) + HALFUNIT,j*UNITSIZE);

                        }else if(Phaser.Math.Between(1,150)===1 && j!=firstFloorLvl && ckGrid[i][Math.max(j-1,0)] === VOID){
                            
//                            this.makePortalPair(this.chunkX+(i*UNITSIZE), Math.max(j-1,0) * UNITSIZE);
                        
                        }

                        if(Phaser.Math.Between(1,20)===1 && ckGrid[i][Math.max(j-1,0)] === VOID){
                            new Coin(this,this.chunkX+(i*UNITSIZE),j*UNITSIZE- UNITSIZE,{vspd:0,hspd:0});
                        }

                        // Invisible blockers for enemies
                        if(
                            ckGrid[Math.max(i-1,0)][j] === VOID && ckGrid[i][Math.max(j-1,0)] === VOID
                            && ckGrid[Math.min(i+1,this.chunkW-1)][j] === PLATFORM
                        ){
//                             this.makeBlocker( this.chunkX+ ( (i-1)*UNITSIZE ), (j-1)*UNITSIZE );
                            this.makeBlocker( this.chunkX + i*UNITSIZE - 8 , j*UNITSIZE-8 );
                        }

                        if(
                            ckGrid[Math.min(i+1,this.chunkW-1)][j] === VOID && ckGrid[i][Math.max(j-1,0)] === VOID
                            && ckGrid[Math.max(i-1,0)][j] === PLATFORM
                        ){
//                             this.makeBlocker(this.chunkX+((i+1)*UNITSIZE),(j-1)*UNITSIZE);
                            this.makeBlocker( this.chunkX + (i+1)*UNITSIZE +1,j*UNITSIZE-8);

                        }


                        /// Spawn enemy
                        let cellAbove = Math.max(j-1,0);
                        if(ckGrid[i][cellAbove] === VOID && this.chunkX>0){
                            // chance for enemy spawn
                            let roll = Phaser.Math.Between(1,100);
                            let emy1roll = null;

                            if(roll<=5){
                                new Enemy(this, this.chunkX+(i*UNITSIZE),-128);

//                                emy1roll = Phaser.Math.Between(1,6);
//                                switch (emy1roll) {
//                                    case 1:
//                                        new Enemy(this, this.chunkX+(i*UNITSIZE),-128);
//                                        break;
//                                    case 2:
//                                        new Hellspawn(this, this.chunkX+(i*UNITSIZE),-128,1,{scale:2,bumpFrequency:24});
//                                        break;
//                                    case 3:
//                                        new OliverBlue(this, this.chunkX+(i*UNITSIZE),-128);
//                                        break;
//                                    case 4:
//                                        let arrowSpd = Phaser.Math.Between(500,800);
//                                        let flipper = Phaser.Math.Between(0,1);
//                                        new Archer(this,this.chunkX+(i*UNITSIZE),-128,1,{'img':'parkerArcher','arrowSpd':arrowSpd,'flipX':flipper});
//                                        break
//                                    case 5:
//                                        new Spawner(this, this.chunkX+(i*UNITSIZE),-128,1,{'img':'kahlessRainbow','anmIdle':'kahlessRainbow',bumpFrequency:24});
//                                        break;
//                                  	case 6:
//                                        new Enemy(this, this.chunkX+(i*UNITSIZE),-128,1,{img:'slimeBlob',anmIdle:'slimeBlobWalk',animWalk:'slimeBlobWalk',defaultAcc:5,maxVelocity:10,bumpFrequency:24,bdyW:16,bdyH:8,bdyOx:6,bdyOy:24});
//                                        break;
//                                }

                            }else if(roll>=5 && roll<=10){
                                new EnemyFly(this, this.chunkX+(i*UNITSIZE),(j-2)*UNITSIZE);


//                                emy1roll = Phaser.Math.Between(1,6);
//                                switch (emy1roll) {
//                                    case 1,2:
//                                        new GusGuy(this, this.chunkX+(i*UNITSIZE),(j-2)*UNITSIZE, 1,{'img':'gusguy'});
//                                        break;
//                                    case 3,4:
//                                        new EnemyFly(this, this.chunkX+(i*UNITSIZE),(j-2)*UNITSIZE);
//                                        break;
//                                    case 5:
//                                        new Ghost(this, this.chunkX+(i*UNITSIZE),(j-2)*UNITSIZE,1,{'img':'ottoGhost'});
//                                        break;
//                                    case 4:
//;
//                                }


                            }else if(roll==11){
//                            	if(Phaser.Math.Between(1,2)===2){
//                            		new Commander(this, this.chunkX+(i*UNITSIZE),-512,1,{'img':'commander'});
//                            	}else{
//                            		new HammerGiant(this, this.chunkX+(i*UNITSIZE),-512,1,{img:'rockHammerGuy',scale:2});
//                            	}
                            }else if(roll==12){
//								new Mushroom(this,this.chunkX+(i*UNITSIZE),Math.max(cellAbove*UNITSIZE - (Phaser.Math.Between(32,256)),0),1,{'img':'calliopeMushroom'});

                            }
                        }



                    }else{
                        // images are lighter weight, less memory.
                        this.makeBlockImage(this.chunkX+(i*UNITSIZE),j*UNITSIZE);

                    }

                }
            }
        }



        this.chunkX+=this.chunkW * UNITSIZE;

    }

    makeBossLvl1(){
        this.playState=PLAYSTATE_BOSS;

        let roomX = this.chunkX + 32000;//left
        let roomY = 0;//top
        let bossGridW = W/UNITSIZE;
        let bossGridH = H/UNITSIZE;

        this.cameras.main.setBounds(roomX, 0, W, H);

        //make a grid. fill it with blocks
        let bossGrid = [];
        for(var i=0; i<bossGridW; i++){
            let ckRows = []
            for(var j=0;j<bossGridH; j++){
                ckRows[j]=PLATFORM;
            }
            bossGrid[i]=ckRows;
        }

        //hollow out the room
        for(var i=1; i<bossGridW-1; i++){
            for(var j=1;j<bossGridH-1; j++){
                bossGrid[i][j]=VOID;
            }
        }

        //put a platform in the middle
        bossGrid[Math.floor(bossGridW/2)][4]=PLATFORM;

        // Update the respawns point to some place far to the right
        this.resetX = roomX + Math.floor(bossGridW/2) * UNITSIZE + HALFUNIT;
        this.resetY = UNITSIZE * 2;

        // Instantiate the grid
        for(var i=0; i<bossGrid.length; i++) {
            for (var j = 0; j < bossGrid[0].length; j++) {
                if(this.getGridAt(bossGrid,i,j) === PLATFORM){
                    let P = this.add.sprite(roomX+(i*UNITSIZE),j*UNITSIZE,'platform');
                    P.setOrigin(0);
                    this.platforms.add(P);
                }
            }
        }


        // Move the player to the new reset point. Build the room here
        this.player.x = this.resetX;
        this.player.y = this.resetY;

        this.boss = new Boss(this,roomX+(W/2),H/2);

    }

    makeShooter(x,y,angle=null){
        let P = new Shooter(this, x, y);

        if(angle===null){
            let chooseAngle = Phaser.Math.Between(0,3);
            if(chooseAngle===0){
                P.angle = 180;
            }else if(chooseAngle===1){
                P.angle = -90;
            }else if(chooseAngle===2){
                P.angle = 90;
            }else{
                P.angle = 0;
            }
        }else{
            P.angle = angle;
        }
        this.shooters.add(P);
        this.cleanup.add(P);

        return P;
    }

    makeSpike(x,y){
        let S = new Spikes(this, x,y);
        this.spikes.add(S);
        this.cleanup.add(S);


        return S;
    }

    makeBlocker(x,y){
        let B = this.add.sprite(x,y,'blocker');
        B.setOrigin(0);
        B.setAlpha(0);
        this.emyBlockers.add(B);
        this.cleanup.add(B);
        return B;
    }
    
    makeEmyPortal(x1,y1,x2,y2){
        let B = this.add.sprite(x1,y1,'square');
        B.setOrigin(0);
//         B.setAlpha(0);
        B.tpX = x2,
        B.tpY = y2;
        this.emyPortals.add(B);
        this.cleanup.add(B);
        return B;
    }

    makeBlockImage(x,y){
        let P = this.add.image(x,y,'platform');
        P.setOrigin(0);
        let roll = Phaser.Math.Between(1,4);
        let clr = undefined;
        switch (roll) {
            case 1:
                clr='0x230e0e';
                break;
            case 2:
                clr='0x371515';
                break;
            case 3:
                clr='0x562121';
                break;
            default:
                clr='0x863333';
                break;
        }
        P.setTint(clr);
        this.platformImages.add(P);
        this.cleanup.add(P);
    }
    
    makePortalPair(x,y){
    	let portal1 = new Portal(this,x,y);

		let y2 = y-(200*UNITSIZE);
    	let portal2 = new Portal(this,x,y2,0);
    	
    	
    	portal1.twin = portal2;
    	portal2.twin = portal1;
    	
    	
    	// make a floor under the second portal
    	let bx = x-2*UNITSIZE;
    	for(let i=0;i<5;i++){
    		this.makePlatform(bx+i*UNITSIZE,y2+5*UNITSIZE);
    		new Coin(this,16+bx+i*UNITSIZE,y2+4*UNITSIZE,{vspd:0,hspd:0});

    	}
    	
    	// second floor
    	bx = x-5*UNITSIZE;
    	for(let i=0;i<11;i++){
    		this.makePlatform(bx+i*UNITSIZE,y2+11*UNITSIZE);
    		new Coin(this,16+bx+i*UNITSIZE,y2+9*UNITSIZE,{vspd:0,hspd:0});
    	}
    	
    	
    	// third floor
    	bx = x-8*UNITSIZE;
    	for(let i=0;i<17;i++){
    		this.makePlatform(bx+i*UNITSIZE,y2+17*UNITSIZE);
    		new Coin(this,16+bx+i*UNITSIZE,y2+16*UNITSIZE,{vspd:0,hspd:0});
    	}
    	

    	
    	this.makeEmyPortal( bx, y2+16*UNITSIZE, x, y2+7*UNITSIZE );
    	this.makeEmyPortal( bx+(16*UNITSIZE), y2+16*UNITSIZE, x, y2+7*UNITSIZE );
    	
    	
//     				for(let i=0;i<6;i++){
// 						new OliverBlue(this, bx+32*i, 16+y2+7*UNITSIZE,-128,{scale:1,bumpFrequency:24});
// 					}
// 					return;
    	
    	//make some enemies
    	let roll = Phaser.Math.Between(1,100);
    	if(roll>0){
			let emy1roll = Phaser.Math.Between(1,5);
			switch (emy1roll) {
				case 1:
					this.makeShooter(bx-16, 16+y2+10*UNITSIZE, 0);
					break;
				case 2:
					new Hellspawn(this, bx+32, 16+y2+7*UNITSIZE,1,{scale:3,bumpFrequency:24});
					break;
				case 3:
					for(let i=0;i<6;i++){
						new OliverBlue(this, bx+32*i, 16+y2+7*UNITSIZE,-128,{scale:1,bumpFrequency:24});
					}
					break;
				case 4:
    				new Archer(this,x-2*UNITSIZE+16, 16+y2+7*UNITSIZE,1,{'img':'parkerArcher','arrowSpd':900,'flipX':0});
					new Archer(this,x+2*UNITSIZE, 16+y2+7*UNITSIZE,1,{'img':'parkerArcher','arrowSpd':900,'flipX':1});
					break
				case 5:
					new Spawner(this, bx+32*10, 16+y2+7*UNITSIZE,1,{'img':'kahlessRainbow','anmIdle':'kahlessRainbow',bumpFrequency:24});
					break;

			}
    	}



    }
    
	makePlatform(x,y){
		let P = this.add.sprite(x,y,'platform');
		P.setOrigin(0);
		this.platforms.add(P);
	}

	hitPortal(player,portal){

		if(portal.coolDownTimer===0 && portal.twin!=null){
			
			portal.coolDownTimer=portal.coolDownTime;
			
			portal.twin.coolDownTimer=portal.twin.coolDownTime;
			this.playerSafeTime=SAFETIME;
			player.x=portal.twin.x + 16;
			player.y=portal.twin.y - 16;
			this.soundPortal.play();
			
// 			if(portal.twin.y<0){
// 				this.cameras.main.setBounds(portal.twin.x-W/2, portal.twin.y-16, W, H)
// 			}
			
		}
		
		
	}
	
    collidePlatform(player,platform){

    }

    bulletHitPlatform(bullet,platform){
        bullet.destroy();
    }
    
    bulletHitShield(bullet,shield){
        bullet.destroy();
    }

    playerLoseLife(){
        if(this.GAMEOVER) return false;
        if(this.restart) return false;
        if(this.playerDead) return false;
        this.playerDead = true;
		
		if(curHat=="cakeHat"){
			this.hat.destroy();
			curHat=null;
		}else{
        	lives--;
		}
        this.events.emit('playerDied');
        this.soundPlayerDie.play();
        if(lives<0){
            this.player.setVisible(false);
            this.player.body.checkCollision.none=true;
            let died = this.add.sprite(this.player.x,this.player.y,'ozzieYouDied');
        	died.play('ozzieYouDied');
            this.gameOver();
            
        }else{
            this.reset = true;
        }
    }

    hitLoot(player,loot){
        if(loot.cooldown<1){
            score++;
            this.events.emit('scoreUpdated');
            this.soundCoinPickup.play();
            loot.destroy();
        }
    }

    hitEnemy(player,enemy){

        if(enemy.myState === STATE_EN_DIE || !enemy.canHitPlayer){
            return false;
        }
        player.body.velocity.y = JUMP_SPEED/2;
//         enemy.body.velocity.y = player.body.velocity.y * -1.5;
    	if(this.playerSafeTime>0){
    		return false;
    	}
		enemy.hit(player);

    }
    
    tpEmy(emy,portal){
    	emy.x = portal.tpX;
    	emy.y = portal.tpY;
//     	emy.body.velocity.x *= -1;
    	emy.body.acceleration.x =  emy.body.acceleration.x * -1;

    }

    hitBullet(player,bullet){

        if(this.GAMEOVER) return false;
        this.shakeIt();
        if(bullet.destroyOnHit){
        	bullet.destroy();
        }
        if(this.playerSafeTime>0){
    		return false;
    	}
        
        this.playerLoseLife();
    }

    hitSpike(player,spike){
        if(this.GAMEOVER) return false;
        if(curHat=="yigaHat"){
        	return false;
        }
        this.shakeIt();
        if(this.playerSafeTime>0){
    		return false;
    	}
        this.playerLoseLife();
    }

    shakeIt(){
        if(this.shakeCooldown<1){
            this.shakeCooldown = 1000;
            this.cameras.main.shake(50,.005,.005);
        }
    }

    doubleJump(){
        if(this.canDoubleJump){
            this.canDoubleJump = false;
            this.player.body.velocity.y = (curHat == "alienHat") ? JUMP_SPEED/1.5 : JUMP_SPEED;
        }
    }
    
    doDash(){
    	if(curHat!="headband") return false;

        if(this.dashTimer>0){
            this.dashTimer = 0;
            this.dashingTimer=200;
            this.player.body.maxVelocity.setTo(MAX_SPEED * 5, MAX_SPEED * 5);
            this.player.body.setGravityY(0);
            this.player.body.velocity.x = MAX_SPEED * 5;
        }else{
        	this.dashTimer=200;
        }
    }
    
    finishReached(){
        this.finished = true;
    }

    update(time,delta)
    {
    
    	if(this.dashTimer>0){
    		this.dashTimer-=delta;
    	}
    	if(this.dashingTimer>0){
    		this.dashingTimer-=delta;
    		if(this.dashingTimer<=0){
            	this.player.body.maxVelocity.setTo(MAX_SPEED, MAX_SPEED * 5);
            	this.player.body.setGravityY(GRAVITY);
    		}
    	}
		if(this.playerSafeTime>0){

			this.playerSafeTime--;
			if( (this.playerSafeTime>20 && this.playerSafeTime <= 40) 
			  || (this.playerSafeTime>60 && this.playerSafeTime <= 80)	  
			  ){
				this.player.setTint("0x0048FF");
			}else{
				this.player.setTint("0xffffff");
			}

		}
    	if(this.player.y<-1000){
			this.cameras.main.centerOn(this.player.x, this.player.y);
    	}
    
    	if(this.player.y > 0 && this.cameras.main.scrollY<0){
    		this.cameras.main.scrollY+=  (this.cameras.main.scrollY>2) ? 2 : 1;
    	}
    	if(this.cameras.main.scrollY>0){
    		this.cameras.main.scrollY--;
    	}
    
//         this.bg0.tilePositionX +=.25;
        if(this.finished){

            this.flyTween.remove();
            this.flyTween = undefined;
            this.dashTimer=0;
            this.dashingTimer=0;
            this.scene.start('HoorayScene');
        }
        if(this.restart){
            this.flyTween.remove();
            this.flyTween = undefined;
            this.scene.restart();
        }
        if(this.reset){
            this.reset = false;
            this.player.body.velocity.y = 0;
            this.player.body.velocity.x = 0;
            this.player.x=this.resetX;
            this.player.y=this.resetY-UNITSIZE;
            this.playerSafeTime=SAFETIME;
            this.playerDead = false;
        }
        this.shakeCooldown-=delta;

        let onTheGround = this.player.body.touching.down;
        if (onTheGround) {
            // Jump when the player is touching the ground and the up arrow is pressed
            if(jumpInputIsActive()){
                this.player.body.velocity.y = (curHat == "alienHat") ? JUMP_SPEED/1.5 : JUMP_SPEED;
                this.canDoubleJump = true;
            }else{
                this.canDoubleJump = false;
            }
        }

        if (leftInputIsActive()) {
            // If the LEFT key is down, set the player velocity to move left
            this.player.body.acceleration.x = -ACCELERATION;
            this.player.flipX=true;
            if(this.player.anims.currentAnim.key != 'greenDotRun'){
            	this.player.play('greenDotRun');
            }
        } else if (rightInputIsActive()) {
            // If the RIGHT key is down, set the player velocity to move right
            this.player.body.acceleration.x = ACCELERATION;
            this.player.flipX=false;
            if(this.player.anims.currentAnim.key != 'greenDotRun'){
            	this.player.play('greenDotRun');
            }
        } else {
            this.player.body.acceleration.x = 0;
            if(this.player.anims.currentAnim.key != 'greenDotIdle'){
            	this.player.play('greenDotIdle');
            }
        }

        // STATE CODE
        if(this.playState===PLAYSTATE_BOSS){
            if(this.boss != undefined){
                this.boss.update(time,delta);
            }
        }else{
            for(let i=0;i<this.respawns.length;i++){
                if(this.player.x > this.respawns[i][0]){
                    this.resetX = this.respawns[i][0];
                    this.resetY = this.respawns[i][1];
                    this.respawns.splice(i,1);
                }
            }

            if(this.player.x>=this.nextChunkTrigger){
                this.nextChunkTrigger+=W/2;
                for(let i=0;i<4;i++){
                    let setRespawn = (i===0)
                    this.makeChunk(setRespawn);
                }
            }
        }


        // update groups
        let eArray = this.enemies.getChildren();
        for (var i = 0; i < eArray.length; i++) {
            let emy = eArray[i];
            emy.update(time,delta);
        }

        this.shooters.children.each((e)=>{
            e.update(time,delta);
        });

        this.loot.children.each((e)=>{
            e.update(time,delta);
        });
        
        this.portals.children.each((e)=>{
            e.update(time,delta);
        });

        this.specialPlatforms.children.each((e)=>{
            e.update(time,delta);
        });

        // cleanup
        let playerX = this.player.x;

        this.bullets.children.each((e)=>{
            e.update();
//                 || e.y>H || e.y<0
            if(e.x<playerX - W/2 || e.x>this.player.x + W/2 || e.y>H){
                e.destroy();
            }
        });

        this.cleanup.children.each((e)=>{
            if(e.x< playerX - (W*2)){
                e.destroy();
            }
        });

        if(this.player.y>H+512){
            this.playerLoseLife();
        }
        


    	if(this.hat && !this.GAMEOVER && !this.playerDead){
    	    this.hat.update();
    	}
    	

    }
    

    
    gameOver(){

        if(this.GAMEOVER) return false;
        this.GAMEOVER = true;
        this.player.setAlpha(0);
        this.player.body.enabled = false;
        this.cameras.main.stopFollow();
        this.dashTimer=0;
        this.dashingTimer=0;
        this.events.emit('gameOver');
    }

    gameRestart(){
        score = 0;
        lives = 3;
        level = 0;
        chunksToFinish= 15;
        this.dashTimer=0;
        this.dashingTimer=0;
        if(this.hat){
        	this.hat.myDestroy();
        }
        curHat = null;
// 		hats = hatsDb.map(a => {return {...a}});
		for(var i=0; i<hats.length; i++){
			hats[i].hasHat=false;
		}

        this.GAMEOVER=false;
        this.restart=true;

    }

}