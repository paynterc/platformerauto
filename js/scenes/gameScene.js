class GameScene extends Phaser.Scene {
    constructor()
    {
        super({key: 'GameScene', active: false});
        this.GAMEOVER = false;
        this.enemyTimer = undefined;
        this.chunkW = 10;
        this.chunkH = 20;
        this.playState = PLAYSTATE_MAIN;//main or boss
        this.playStateReturn = PLAYSTATE_MAIN;//main or boss

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
        this.cameras.main.setBackgroundColor(0x85f2ff);
        this.addAnimations();

        this.bosses = [1,2,3,4,5,6];
        this.bosses.sort(() => (Math.random() > .5) ? 1 : -1);
        this.bossIndex = 0;

        //If world is bigger than the window
        this.worldWidth = this.physics.world.bounds.width;
        this.worldHeight = this.physics.world.bounds.height;
        this.bootScene = this.scene.get('BootScene');

        this.restart=false;
        this.reset = false;
        this.finished = false;
        this.playerDead = false;
        this.madeMiniBossDoor = false;
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

        this.player = this.physics.add.sprite(0+HALFUNIT, this.floorLvl * UNITSIZE - (UNITSIZE*2), curHero.img);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(false);
        this.player.body.maxVelocity.setTo(MAX_SPEED, MAX_SPEED * 5); // x, y
        this.player.body.drag.setTo(DRAG, 0);
        this.player.body.pushable = true;
        this.player.body.width=30;
        this.player.body.height=31;
        this.player.body.setOffset(1,0);
        this.player.depth = 100;
        if(curHero.anmIdl != null){
            this.player.play(curHero.anmIdl);
        }

        if(curHat=="alienHat"){
        	this.player.setGravityY(800);

        }else{
        	this.player.setGravityY(GRAVITY);
        }
        
		this.playerSafeTime=SAFETIME;


        this.resetX = this.player.x;
        this.resetY = this.player.y;
        this.resetXSave = this.resetX;
        this.resetYSave = this.resetY;
        this.canDoubleJump = false;
		this.dashTimer=0;
		this.dashingTimer=0;
        this.boss = undefined;
        this.curAcceleration = ACCELERATION;
        this.effectTimer = 0;


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
        this.iceBlobs = this.physics.add.staticGroup();
        this.cleanup = this.add.group();
        this.specialPlatforms = this.physics.add.staticGroup();
        this.portals = this.physics.add.staticGroup();
        this.bossDoors = this.physics.add.staticGroup();
        this.finish = this.physics.add.staticGroup();
        this.corpses = this.add.group();
        this.gates = this.add.group();
        this.kids = this.add.group();
        this.justMobs = this.add.group();// don't interact with player
        this.puppies = this.physics.add.staticGroup();

        // colliders
        this.physics.add.collider(this.player, this.platforms, this.collidePlatform,false,this);
        this.physics.add.overlap(this.player, this.loot, this.hitLoot,false,this);
        this.physics.add.overlap(this.player, this.portals, this.hitPortal,false,this);
        this.physics.add.overlap(this.player, this.bossDoors, this.hitBossDoor,false,this);
        this.physics.add.overlap(this.player, this.kids, this.hitKid,false,this);
        this.physics.add.collider(this.player, this.puppies, this.hitPuppy,false,this);
        this.physics.add.collider(this.kids, this.platforms);
        this.physics.add.collider(this.justMobs, this.platforms);
        this.physics.add.collider(this.puppies, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.enemies, this.gates);
        this.physics.add.collider(this.splatbullets, this.platforms, this.bulletHitPlatform,false,this);
        this.physics.add.collider(this.splatbullets, this.splatBulletShields, this.bulletHitShield,false,this);
        this.physics.add.collider(this.bullets, this.bulletShields, this.bulletHitShield,false,this);
        this.physics.add.collider(this.enemies, this.emyBlockers);
        this.physics.add.overlap(this.enemies, this.emyPortals,this.tpEmy,false,this);
        this.physics.add.collider(this.loot, this.platforms);
        this.physics.add.collider(this.player, this.enemies, this.hitEnemy,false,this);
        this.physics.add.overlap(this.player, this.bullets, this.hitBullet,false,this);
        this.physics.add.overlap(this.enemies, this.bullets, this.hitBulletEnemy,false,this);
        this.physics.add.overlap(this.player, this.splatbullets, this.hitBullet,false,this);
        this.physics.add.collider(this.player, this.spikes, this.hitSpike,false,this);
        this.physics.add.collider(this.player, this.iceBlobs, this.hitIceBlob,false,this);
        this.physics.add.collider(this.player, this.specialPlatforms);
        this.physics.add.overlap(this.player, this.finish, this.finishReached,false,this);


        let particles = this.add.particles('square');
        this.emitter = particles.createEmitter(
        {
        x:W/2,
        y:H/2,
        angle: { min: 180, max: 360 },
        speed: 500,
        gravityY: 350,
        lifespan: 1000,
        quantity: 4,
        scale: { min: 0.1, max: 1 },
        tint: ['0xFC7E7E','0xFCD77E','0xFCF87E','0xAAFC7E','0x7EFCDD','0x7EA0FC','0xBD7EFC','0xffffff']
        }
        );
        this.emitter.stop();


        this.emitter2 = particles.createEmitter(
        {
        x:W/2,
        y:H/2,
        angle: { min: 135, max: 360 },
        speed: 500,
        gravityY: 150,
        lifespan: 1000,
        quantity: 4,
        scale: { min: 0.05, max: .15 },
        tint: ['0x0088ff','0x0048FF','0x00c8ff','0xffffff']
        }
        );
        this.emitter2.stop();

        this.emitter3 = particles.createEmitter(
        {
        x:W/2,
        y:H/2,
        angle: { min: 135, max: 360 },
        speed: 500,
        gravityY: 150,
        lifespan: 1000,
        quantity: 4,
        scale: { min: 0.05, max: .15 },
        tint: ['0xff3700','0xff7700','0xffb700','0xffffff']
        }
        );
        this.emitter3.stop();

// controls

        // let chunkMarker = this.add.image((this.chunkW - 1) *UNITSIZE-1,(this.chunkW-1)*UNITSIZE-1,'hero');
        // chunkMarker.setOrigin(0);

        this.cameras.main.startFollow(this.player);
// ORIGINAL SETTINGS
//		this.cameras.main.setDeadzone(null, H);// Pair this with a scrollY check in the update() function
//		this.cameras.main.setDeadzone(null, H*.5);// Pair this with a scrollY check in the update() function
// END ORIGINAL SETTINGS

		this.cameras.main.setLerp(1,.05);//Slows VERTICAL FOLLOW

		/**** pretty good
		this.cameras.main.setDeadzone(W/3, H/2);
		this.cameras.main.setFollowOffset(0, H/6 * -1);
		****/

		/*** Experimental settings
		this.cameras.main.setZoom(1.5);
        his.cameras.main.setFollowOffset(0, 0);

        this.cameras.main.setLerp(1,.0);//STOPS VERTICAL FOLLOW
		****/
		
        this.scene.launch('HudScene');



        this.soundCoinPickup = this.sound.add('coinPickup',{volume:.15});
        this.soundDropFall = this.sound.add('dropFall',{volume:.25});
        this.soundPlayerDie = this.sound.add('playerDie',{volume:.25});
        this.soundPortal = this.sound.add('portal',{volume:.25});
        this.soundFireExplode = this.sound.add('fireExplode',{volume:.25});
        this.soundFail = this.sound.add('fail',{volume:.25});

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
        
        this.spawnHat();


//         this.enemyFly = new EnemyFly(this,this.player.x-64,this.player.y-128);
//         let spawner = new Spawner(this, this.player.x+128,this.player.y-64,1,{'img':'kahlessRainbow','anmIdle':'kahlessRainbow'});      
//         this.makePortalPair(this.player.x+128,this.player.y-64);
//         let mushroom = new Mushroom(this,this.player.x+128,this.player.y-16,1,{'img':'calliopeMushroom'});
        
//         let shield = this.physics.add.sprite(mushroom.x-148,mushroom.y+32,'hero');
//         shield.body.setAllowGravity(false);
//         shield.body.setImmovable(true);
//         this.bulletShields.add(shield);
// 		   new GoblinBomber(this,this.player.x+128,this.player.y-64,1,{img:'goblinBomber'});
// 		   new Goblin(this,this.player.x+128,this.player.y-64,1,{'flipX':Phaser.Math.Between(0,1)});
// 		   new EvilEyeball(this,this.player.x+128,this.player.y-64,1,{'flipX':Phaser.Math.Between(0,1)});
//         new Enemy(this, this.player.x+128,this.player.y-128,1,{img:'bonyBoomBox',anmIdle:'bonyIdle',anmWalk:'bonyWalk',anmDie:'bonyDie'});
// 		   new BobbyBomb(this,this.player.x+128,this.player.y-64);
// 		   new HammerGiant(this,this.player.x+128,this.player.y-64,1,{img:'rockHammerGuy',scale:2});
//         this.makeBossLvl1();
//        new Kid(this, this.player.x+128,this.player.y-64);
//           new Enemy(this, this.player.x+128,this.player.y-128,1,{img:'walkingDude',anmDefault:'walkingDude',canKillMe:false,damageOnImpact:false});
//         this.finish.add(F);


 		   //new HatLoot(this,this.player.x+128,this.player.y-64,{'hatKey':'blobCrown','img':'blobCrown'});
        this.gotHat('hornHelmet');
    }

    playerShoot(){
//        let angle = this.flipX ? 225 : -45;
        let angle = this.player.flipX ? 180 : 0;
        let xoff = this.player.flipX ? -16 : 16;
//        let arrow = new Arrow(this.myScene,this.x,this.y,angle,{'img':'arrow','initSpeed':this.arrowSpd});
        let bullet = new Bullet(this,this.player.x+xoff,this.player.y,angle,{anm:'fireball',faction:0});

    }

    dropHatLoot(key,x,y){
        new HatLoot(this,x,y,{'img':key});
    }

    makePuppy(x,y){
        let puppy =this.add.sprite(x,y,'roboPuppy');
        puppy.play('roboPuppy1');
        this.puppies.add(puppy);
    }

    spawnHat(){
             if(!curHat) return false;
			// Find the hat config in the hats array

			let hatConfig = hats.filter(obj => {
			  return obj.img == curHat;
			});
			if(!hatConfig) return false
			// Instantiate the hat. Use eval to translate a string to the Class name. So, instead of new Hat(), I do new (eval("Hat"))().
			if(this.hat){
			    this.hat.destroy();
			}
			if(hatConfig.length){
				this.hat=new (eval(hatConfig[0].hatClass))(this,this.player.x,this.player.y-30,hatConfig[0]);
			}
    }

    addBackground(){
        // Add your background images first! Images appear in the order you added them, back to front.
        // Create a tilesprite (x, y, width, height, key)
         this.bg0 = this.add.tileSprite(
             0,
             0,
             W,
             H,
             'mountains2'
         ).setOrigin(0,0).setScale(W/128,H/128).setScrollFactor(.50,0);

         this.bg1 = this.add.tileSprite(
             0-W/2,
             0,
             W,
             H,
             'mountains1',
             0
         ).setOrigin(0,0).setScale(W/128,H/128).setScrollFactor(.75,0);
         //.setTint('0x153626');
         
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
        let that = this;
        Object.values(animConfigs).forEach(val => {
          that.anims.create(val);
        });
//        this.anims.create(animConfigs.fireball);
//        this.anims.create(animConfigs.emyIdle);
//        this.anims.create(animConfigs.emyHit);
//        this.anims.create(animConfigs.emyWalk);
//        this.anims.create(animConfigs.emyDie);
//        this.anims.create(animConfigs.coin);
//        this.anims.create(animConfigs.emyYellowFly);
//        this.anims.create(animConfigs.emyYellowDie);
//        this.anims.create(animConfigs.bossCrabWalk);
//
//        this.anims.create(animConfigs.evilEyeball);
//        this.anims.create(animConfigs.bobTheBlobWalk);
//        this.anims.create(animConfigs.bobTheBlobDie);
//
//        this.anims.create(animConfigs.bonyIdle);
//        this.anims.create(animConfigs.bonyWalk);
//        this.anims.create(animConfigs.bonyDie);
//
//        this.anims.create(animConfigs.blueyIdle);
//        this.anims.create(animConfigs.blueyWalk);
//        this.anims.create(animConfigs.blueyDie);
//
//        this.anims.create(animConfigs.bobbyBombWalk);
//        this.anims.create(animConfigs.bobbyBombDie);
//
//        this.anims.create(animConfigs.goblinAttack);
//        this.anims.create(animConfigs.greenieIdle);
//        this.anims.create(animConfigs.greenieWalk);

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
                        
                        }else if(Phaser.Math.Between(1,10)===10 && j!=firstFloorLvl && ckGrid[i][Math.max(j-1,0)] === VOID){

                            this.makeIceBlob( this.chunkX+(i*UNITSIZE) + HALFUNIT,j*UNITSIZE - HALFUNIT);

                        }else{

                                if(!this.madeMiniBossDoor && Phaser.Math.Between(1,100)===100 && j!=firstFloorLvl && ckGrid[i][Math.max(j-1,0)] === VOID){
                                    this.madeMiniBossDoor = true;
                                    new BossDoor(this,this.chunkX + (i * UNITSIZE), j * UNITSIZE - (UNITSIZE*2) );
                                }
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
                            let grs = this.add.sprite( this.chunkX + (i * UNITSIZE), j * UNITSIZE-UNITSIZE+1,'grass');
                            grs.setOrigin(0,0);
                            grs.depth = 9;

                            // chance for tree
                            let treeroll = 6;
                            if( Phaser.Math.Between(1,treeroll) == treeroll){
                                let decRoll = Phaser.Math.Between(1,4);
                                let spr1 = null;
                                let flrs = ['flowerWt','flowerRd','flowerOr'];
                                switch (decRoll) {
                                    case 1:

                                        spr1 = this.add.sprite( this.chunkX + (i * UNITSIZE)-48, j * UNITSIZE  -127,'tree1');
                                        spr1.setOrigin(0,0);
                                        spr1.depth = 10;
                                        break;
                                    case 2:
                                        let flrTpe =  Phaser.Math.Between(0,2);
                                        spr1 = this.add.sprite( this.chunkX + (i * UNITSIZE), j * UNITSIZE - 16,flrs[flrTpe]);
                                        spr1.setOrigin(0,0);
                                        spr1.depth = 10;
                                        spr1.setScale(2);
                                        break;
                                    case 3:
                                        spr1 = this.add.sprite( this.chunkX + (i * UNITSIZE), j * UNITSIZE - UNITSIZE,'stump');
                                        spr1.setOrigin(0,0);
                                        spr1.depth = 10;
                                        break;
                                    case 4:
                                        spr1 = this.add.sprite( this.chunkX + (i * UNITSIZE), j * UNITSIZE - UNITSIZE-1,'tree2');
                                        spr1.setOrigin(0,0);
                                        spr1.depth = 10;
                                        break;
                                   case 5:
                                        if(Phaser.Math.Between(1,20)===20){
                                            this.makePuppy(this.chunkX + (i * UNITSIZE), j * UNITSIZE - 14);
                                        }
                                        break;

                                    }


//                                let mark = this.add.sprite( this.chunkX + (i * UNITSIZE), j * UNITSIZE,'hero');
//                                mark.setOrigin(0,0);
//                                mark.depth = 5000;
                            }


                            // chance for enemy spawn
                            let roll = Phaser.Math.Between(1,100);
                            let emy1roll = null;

                            if(roll<=5){
//                                new Enemy(this, this.chunkX+(i*UNITSIZE),-128);

                                emy1roll = Phaser.Math.Between(1,7);
                                switch (emy1roll) {
                                    case 1:
                                        new Enemy(this, this.chunkX+(i*UNITSIZE),-128);
                                        break;
                                    case 2:
                                        new EvilEyeball(this, this.chunkX+(i*UNITSIZE),-128);
                                        break;
                                    case 3:
                                        new BobTheBlob(this, this.chunkX+(i*UNITSIZE),-128);
                                        break;
                                    case 4:
                                        new Enemy(this, this.chunkX+(i*UNITSIZE),-128,1,{img:'bonyBoomBox',anmIdle:'bonyIdle',anmWalk:'bonyWalk',anmDie:'bonyDie'});
                                        break;
                                    case 5:
                                        new BobbyBomb(this, this.chunkX+(i*UNITSIZE),-128);
                                        break;
                                    case 6:
                                        let goblin = new Goblin(this, this.chunkX+(i*UNITSIZE),-64,1,{'flipX':Phaser.Math.Between(0,1)});
                                        if(Phaser.Math.Between(1,7)==7 ){
                                            new GoblinBomber(this,this.chunkX+(i*UNITSIZE)+UNITSIZE,-64,1,{img:'goblinBomber'});
                                        }
                                        break;
                                    case 7:
                                        new GoblinBomber(this,this.chunkX+(i*UNITSIZE),-64,1,{img:'goblinBomber'});
                                    }

                            }else if(roll>=5 && roll<=10){

                                new EnemyFly(this, this.chunkX+(i*UNITSIZE),Phaser.Math.Between(2,4) * UNITSIZE);


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
                                new Kid(this, this.chunkX+(i*UNITSIZE),-128);
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
        this.playStateReturn=PLAYSTATE_BOSS;

        let roomX = this.chunkX - 32000;//left
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

    makeMiniBossLvl1(door){
        this.playState=PLAYSTATE_MINIBOSS;
        this.playStateReturn=PLAYSTATE_MINIBOSS;
        let roomX = this.chunkX + 12000;
        let roomY = UNITSIZE;
        let returnTo = door;


//        let roomY = 500 * UNITSIZE * -1;

        // floor and ceiling
        for(let i=0; i<=18; i++){
            let P1 = this.add.sprite(roomX+(i*UNITSIZE),roomY,'platform');
            let P2 = this.add.sprite(roomX+(i*UNITSIZE),roomY+(16*UNITSIZE),'platform');

            P1.setOrigin(0);
            P2.setOrigin(0);
            this.platforms.add(P1);
            this.platforms.add(P2);
        }
        // left and right walls
        for(let i=1; i<=15; i++){
            let P1 = this.add.sprite(roomX,roomY+(i*UNITSIZE),'platform');
            let P2 = this.add.sprite(roomX+(18*UNITSIZE),roomY+(i*UNITSIZE),'platform');

            P1.setOrigin(0);
            P2.setOrigin(0);
            this.platforms.add(P1);
            this.platforms.add(P2);
        }

        // center platform
        for(let i=6; i<=12; i++){
            let P1 = this.add.sprite(roomX+(i*UNITSIZE),roomY,'platform');
            let P2 = this.add.sprite(roomX+(i*UNITSIZE),roomY+(8*UNITSIZE),'platform');

            P1.setOrigin(0);
            P2.setOrigin(0);
            this.platforms.add(P1);
            this.platforms.add(P2);
        }

        for(let i=1; i<=3; i++){
            let P1 = this.add.sprite(roomX+(i*UNITSIZE),roomY+(4*UNITSIZE),'platform');
            let P2 = this.add.sprite(roomX+(i*UNITSIZE),roomY+(12*UNITSIZE),'platform');

            P1.setOrigin(0);
            P2.setOrigin(0);
            this.platforms.add(P1);
            this.platforms.add(P2);
        }

        for(let i=15; i<=17; i++){
            let P1 = this.add.sprite(roomX+(i*UNITSIZE),roomY+(4*UNITSIZE),'platform');
            let P2 = this.add.sprite(roomX+(i*UNITSIZE),roomY+(12*UNITSIZE),'platform');

            P1.setOrigin(0);
            P2.setOrigin(0);
            this.platforms.add(P1);
            this.platforms.add(P2);
        }

        let P1 = this.add.sprite(roomX+(9*UNITSIZE),roomY+(12*UNITSIZE),'platform');
        P1.setOrigin(0);
        this.platforms.add(P1);


        //toggle gates
        let T1 = new Gate(this,roomX+(6*UNITSIZE),roomY+(7*UNITSIZE)).setVisible(false);
        let T2 = new Gate(this,roomX+(12*UNITSIZE),roomY+(7*UNITSIZE)).setVisible(false);
        let T3 = new Gate(this,roomX+(9*UNITSIZE),roomY+(15*UNITSIZE)).setVisible(false);


        //doors
        let door1 = this.add.sprite( roomX + UNITSIZE, roomY + UNITSIZE,'door');
        door1.setOrigin(0,0);


        let door2 = this.add.sprite( roomX + UNITSIZE, roomY + UNITSIZE*13,'door');
        door2.setOrigin(0,0);

        let door3 = this.add.sprite( roomX + UNITSIZE*15, roomY + UNITSIZE,'door');
        door3.setOrigin(0,0);

        let door4 = this.add.sprite( roomX + UNITSIZE*15, roomY + UNITSIZE*13,'door');
        door4.setOrigin(0,0);

        door2.tpX = door3.x +48;
        door2.tpY = door3.y +48;
        door4.tpX = door1.x +48;
        door4.tpY = door1.y +48;
        this.emyPortals.add(door2);
        this.emyPortals.add(door4);

        //this.body.setSize(this.width - this.scaleX, this.height - this.scaleY)
        door2.body.setSize(16, 64);
        door4.body.setSize(16, 64);

        this.resetXSave = this.resetX;
        this.resetYSave = this.resetY;
        this.resetX = roomX + (9 * UNITSIZE) + HALFUNIT;
        this.resetY = roomY + UNITSIZE * 9;
        let that = this;
        let myOnDestroy = function(){
            that.resetX = that.resetXSave;
            that.resetY = that.resetYSave;
            that.events.emit('bossGone');
            new Portal(that,roomX+(9*UNITSIZE),roomY+(11*UNITSIZE)-UNITSIZE,{'img':'minidoorOpen','onExit':function(){ that.returnToMainState(); returnTo.play('miniDoorBurn');}}).setTwin(returnTo);
        }


        // this array has been shuffled
        let rnd = this.bosses[this.bossIndex];
        let roomMid = roomX + UNITSIZE*5+(UNITSIZE/2);
        let B = undefined;
        if(rnd==1){
            B = new BossEvilEyeball(this,roomMid, roomY + UNITSIZE + (32),1,{'defaultAcc':100,'maxVelocity':200,'onDestroy':myOnDestroy});
        }else if(rnd==2){
            B = new BossBlobKing(this,roomMid, roomY + UNITSIZE + (32),1,{'defaultAcc':50,'maxVelocity':100,'onDestroy':myOnDestroy});
        }else if(rnd==3){
            B = new BossAvocado(this,roomMid, roomY + UNITSIZE + (32),1,{'defaultAcc':50,'maxVelocity':100,'onDestroy':myOnDestroy});
        }else if(rnd==4){
            B = new BossToxic(this,roomMid, roomY + UNITSIZE + (32),1,{'defaultAcc':50,'maxVelocity':100,'onDestroy':myOnDestroy});
        }else if(rnd==5){
            B = new BossDragon(this,roomMid, roomY + UNITSIZE + (32),1,{'defaultAcc':50,'maxVelocity':100,'onDestroy':myOnDestroy});
        }else{
            B = new BuffAmongus(this,roomMid, roomY + UNITSIZE + (32),1,{'defaultAcc':100,'maxVelocity':100,'onDestroy':myOnDestroy,img:'buffAmg'});
        }
        this.cameras.main.setBackgroundColor(0x000000);
        this.player.x = this.resetX;
        this.player.y = this.resetY;
        B.x = this.player.x;
        this.bossIndex++;
        if(this.bossIndex>=this.bosses.length){
            this.bossIndex=0;
        }
    }

    gotHat(hatKey){

        for(var i=0;i<hats.length;i++){
            if(hats[i].img==hatKey){
                hats[i].hasHat=true;
            }
        }

    }

    returnToMainState(){
        this.playState=PLAYSTATE_MAIN;
        this.playStateReturn=PLAYSTATE_MAIN;
        this.cameras.main.setBackgroundColor(0x85f2ff);
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
        S.depth = 100;
        this.cleanup.add(S);


        return S;
    }

    makeIceBlob(x,y){
        let S = new IceBlob(this, x,y);
        this.iceBlobs.add(S);
        S.depth = 100;
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
			portal.onExit();
			
// 			if(portal.twin.y<0){
// 				this.cameras.main.setBounds(portal.twin.x-W/2, portal.twin.y-16, W, H)
// 			}
			
		}
		
		
	}

    hitKid(player,kid){
        if(!kid.ascending){
            this.emitter.emitParticleAt(kid.x, kid.y, 50);
            this.soundPortal.play();
            kid.ascend();
            kidsSaved ++;
            this.events.emit('kidsUpdated');
            console.log('kidsSaved',kidsSaved);
            console.log('remainder',kidsSaved%3);

            if(kidsSaved % 3===0 || curHat=="cakeHat"){
                lives++;
                this.events.emit('extraLife');
            }
        }
    }

    hitPuppy(player,puppy){
        if(puppy.anims.currentAnim.key=='roboPuppy1'){
                puppy.play('roboPuppy2');
                this.soundDropFall.play();
        }

    }

	hitBossDoor(player,door){


	    if(door.state=='closed'){
	        if(playerHasKey){
	            playerHasKey = false;
	            this.events.emit('playerUsedKey');
                door.state='opening';
                door.play('miniDoorOpen');

	        }else{
	            if(!door.pulsing){
                    this.soundFail.play();
                    door.pulsing=true;
                    door.play('miniDoorPulse');
	            }
	        }
	    }else if(door.state=='open'){
            door.state = 'used';
	        this.soundPortal.play();
	        this.makeMiniBossLvl1(door);
	    }

	}

    collidePlatform(player,platform){

    }

    bulletHitPlatform(bullet,platform){
        if(bullet.destroyOnSplat){
        bullet.destroy();
        }
    }
    
    bulletHitShield(bullet,shield){
        if(bullet.destroyOnSplat){
            bullet.destroy();
        }

    }

    avacadoHatShoot(){
        for(let i=0;i<360;i+=15){
            let bullet = new Bullet(this,this.player.x,this.player.y-32,i,{img:'avocadoProject',anm:'avocadoProjectile',faction:0});
        }
    }



    playerLoseLife(){
        if(this.GAMEOVER) return false;
        if(this.restart) return false;
        if(this.playerDead) return false;
		if(curHat=="avocadoHat"){
		    if(this.player.y>H+512){
		        this.reset = true;
		        return false;
		    }

			this.hat.destroy();
			curHat=null;
            this.emitter3.emitParticleAt(this.x, this.y, 10);
            this.avacadoHatShoot();
            this.playerSafeTime=SAFETIME;
            return false;
		}
        this.playerDead = true;
        lives--;

        this.events.emit('playerDied');
        this.soundPlayerDie.play();
        if(lives<0){

            this.player.setVisible(false);
            this.player.body.checkCollision.none=true;
            let died = this.add.sprite(this.player.x,this.player.y,'ozzieYouDied');
        	died.play('ozzieYouDied');
            this.gameOver();
            
        }else{

            if(curHero.hasOwnProperty('anmDie')){
                this.player.play(curHero.anmDie);
                this.playState = PLAYSTATE_DEATH;
            }else{
                this.reset = true;
            }

        }
        this.emitter3.emitParticleAt(this.x, this.y, 10);

    }

    hitLoot(player,loot){
        if(this.playerDead){
            return false;
        }
        loot.pickup(player);

    }

    hitEnemy(player,enemy){
        if(this.playerDead){
            return false;
        }
        if(enemy.myState === STATE_EN_DIE || !enemy.canHitPlayer){
            return false;
        }
        player.body.velocity.y = JUMP_SPEED/2;
//         enemy.body.velocity.y = player.body.velocity.y * -1.5;
    	if(this.playerSafeTime>0){
    		return false;
    	}
    	this.emitter3.emitParticleAt(enemy.x, enemy.y, 3);

		enemy.hit(player);

    }
    
    tpEmy(emy,portal){
    	emy.x = portal.tpX;
    	emy.y = portal.tpY;
//     	emy.body.velocity.x *= -1;
//    	emy.body.acceleration.x =  emy.body.acceleration.x * -1;

    }

    hitBullet(player,bullet){
        if(bullet.faction===0) return false;
        if(this.GAMEOVER) return false;
        this.shakeIt();
        if(bullet.destroyOnHit){
        	bullet.destroy();
        }
        if(curHat=='hornHelmet'){
            this.hat.hp--;
            if(this.hat.hp<1){
                this.emitter3.emitParticleAt(this.hat.x, this.hat.y, 10);
                this.hat.destroy();
                curHat=null;
            }
            return false;
        }
        if(this.playerSafeTime>0){
    		return false;
    	}
        
        this.playerLoseLife();
    }

    hitBulletEnemy(enemy,bullet){
        if(bullet.faction===1) return false;
        if(this.GAMEOVER) return false;
        this.shakeIt();
        if(bullet.destroyOnHit){
            bullet.destroy();
        }


        enemy.hitBullet();
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


    hitIceBlob(player,spike){

        this.shakeIt();
        spike.destroy();
        this.soundDropFall.play();
        this.emitter2.emitParticleAt(spike.x, spike.y, 20);

        if(this.playerSafeTime>0) return false;
        if(curHat=='blobCrown'){
            this.iceBlobShoot(spike.x,spike.y);
        }else{
            this.curAcceleration = ACCELERATION/4;
            this.effectTimer = 200;
            this.player.setTint("0x0048FF");
        }


    }
    iceBlobShoot(x,y){
            new Bullet(this,x,y,0,{img:'iceBlast',faction:0,initSpeed:256});
            new Bullet(this,x,y,180,{img:'iceBlast',faction:0,initSpeed:256});
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

        if(this.playState==PLAYSTATE_DEATH){

                if(this.player.anims.currentFrame && this.player.anims.currentFrame.index === this.player.anims.getTotalFrames()  ){
                    this.playState=this.playStateReturn;
                    this.reset = true;
                }else{
                    return false;
                }

        }
        if(this.effectTimer>0){
            this.effectTimer--;
            if(this.effectTimer<=0){
                this.curAcceleration = ACCELERATION;
                this.player.setTint("0xFFFFFF");
            }
        }

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
    
//    	if(this.player.y > 0 && this.cameras.main.scrollY<0){
//    		this.cameras.main.scrollY+=  (this.cameras.main.scrollY>2) ? 2 : 1;
//    	}
//    	if(this.cameras.main.scrollY>0){
//    		this.cameras.main.scrollY--;
//    	}
    
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

        if(this.playState!=PLAYSTATE_CUTSCENE){

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
                this.player.body.acceleration.x = -this.curAcceleration;
                this.player.flipX=true;
                if(curHero.anmRun != null && this.player.anims.currentAnim.key != curHero.anmRun){
                    this.player.play(curHero.anmRun);
                }
            } else if (rightInputIsActive()) {
                // If the RIGHT key is down, set the player velocity to move right
                this.player.body.acceleration.x = this.curAcceleration;
                this.player.flipX=false;
                if(curHero.anmRun != null && this.player.anims.currentAnim.key != curHero.anmRun){
                    this.player.play(curHero.anmRun);
                }
            } else {
                this.player.body.acceleration.x = 0;
                if(curHero.anmIdl != null && this.player.anims.currentAnim.key != curHero.anmIdl){
                    this.player.play(curHero.anmIdl);
                }
            }
        }
        // STATE CODE
        if(this.playState===PLAYSTATE_BOSS){
            if(this.boss != undefined){
                this.boss.update(time,delta);
            }
        }else if(this.playState===PLAYSTATE_MINIBOSS){

        }else if(this.playState===PLAYSTATE_CUTSCENE){

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


        this.corpses.children.each((e)=>{
            e.update(time,delta);
        });

        this.portals.children.each((e)=>{
            e.update(time,delta);
        });

        this.gates.children.each((e)=>{
            e.update(time,delta);
        });

        this.bossDoors.children.each((e)=>{
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
            if(e.x<playerX - W/2 || e.x>this.player.x + W/2 || e.y>H*10){
                e.destroy();
            }
        });
        this.splatbullets.children.each((e)=>{
            e.update();
            if(e.x<playerX - W/2 || e.x>this.player.x + W/2 || e.y>H*10){
                e.destroy();
            }
        });
        this.justMobs.children.each((e)=>{
            e.update();
            if(e.x<playerX - W/2 || e.x>this.player.x + W/2 || e.y>H*10){
                e.destroy();
            }
        });
        if(this.playState===PLAYSTATE_MAIN){
//                this.cleanup.children.each((e)=>{
//                    if(e.x< playerX - (W*2)){
//                        e.destroy();
//                    }
//                });
        }


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
        kidsSaved = 0;
        chunksToFinish= 15;
        this.dashTimer=0;
        this.dashingTimer=0;
        if(this.hat){
        	this.hat.myDestroy();
        }
        // Ok, keep your damn hats.
//        curHat = null;
//		for(var i=0; i<hats.length; i++){
//			hats[i].hasHat=false;
//		}

        // Keep your key too.
        //playerHasKey=false;
        this.playState = PLAYSTATE_MAIN;
        this.playStateReturn = PLAYSTATE_MAIN;
        this.GAMEOVER=false;
        this.restart=true;

    }

}