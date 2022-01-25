class BootScene extends Phaser.Scene{
    constructor ()
    {
        super('BootScene');
        this.mediaService=undefined;
    }

    preload()
    {
        this.load.image('hero', 'img/greenSquare.png');
        this.load.image('shooter', 'img/shooter.png');
        this.load.image('spikes', 'img/spikes.png');
        this.load.image('enemy', 'img/redSquare.png');
        this.load.image('redSquare', 'img/redSquare.png');
        this.load.image('platform', 'img/ground.png');
        this.load.image('square', 'img/ui/whiteSquare32x.png');
        this.load.image('checkpoint', 'img/checkpoint.png');
        this.load.image('blueSquare', 'img/blueSquare.png');
        this.load.image('audio', 'img/ui/Audio34x.png');
        this.load.image('equalizer', 'img/ui/Equalizer34x.png');
        this.load.image('egg', 'img/egg.png');
        this.load.image('bigpurple', 'img/bigpurple.png');
        this.load.image('arrow', 'img/Parker_arrow_15x9_2.png');
        this.load.image('willowPortal', 'img/WillowPortal2.png');
        this.load.image('MushroomBullet', 'img/Mushroom2Bullet.png');
        this.load.image('blocker', 'img/blockerX8.png');
        this.load.image('arrowKey', 'img/arrowRight.png');
        this.load.image('kahLessFire', 'img/KahLessFire.png');
        this.load.image('kahLessFall', 'img/KahLessFall.png');
        this.load.image('topHat', 'img/hats/topHat.png');
        this.load.image('gnomeHat', 'img/hats/GnomeHat.png');
        this.load.image('vikingHat', 'img/hats/VikingHelmet.png');
        this.load.image('hornHelmet', 'img/hats/horn knight helmet32x.png');
        this.load.image('headband', 'img/hats/headband.png');

        this.load.spritesheet('fireball', 'img/fireball.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('greenDotIdle', 'img/GreenDotIdle.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('greenDotRun', 'img/GreenDotRun.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyIdle', 'img/emyIdle.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyHit', 'img/emyHit.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyWalk', 'img/emyWalk.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyDie', 'img/emyDie.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('gusguy', 'img/Gus.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('crown', 'img/crown.png',{ frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('hellSpawnMove', 'img/Gabe_hell_spawn.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('hellSpawnDie', 'img/Gabe_hell_spawnDeath.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('oliverBlue', 'img/Oliverblue2.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('ottoGhost', 'img/OttoGhost2.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('parkerArcher', 'img/Parker_archerKnight32.png',{ frameWidth: 36, frameHeight: 36 });
        this.load.spritesheet('mountains', 'img/mountains.png',{ frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('kahlessRainbow', 'img/Kahless_Rainbow64_12fps.png',{ frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ozzieYouDied', 'img/Ozzie_YouDied.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('calliopeMushroom', 'img/Mushroom2-40.png',{ frameWidth: 40, frameHeight: 40 });
        this.load.spritesheet('rockHammerGuy', 'img/Rock_Hammer_92x.png',{ frameWidth: 92, frameHeight: 92 });
        this.load.spritesheet('rockFire', 'img/Rock_Fire_50x108.png',{ frameWidth: 50, frameHeight: 108 });
        this.load.spritesheet('slimeBlob', 'img/Calliope_SlimeBlob.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('kahLessSquare', 'img/KahLessSquare.png',{ frameWidth: 28, frameHeight: 28 });
        this.load.spritesheet('watcherIdle', 'img/WatcherIdle.png',{ frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('emyYellowFly', 'img/emyYellowFly.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyYellowDie', 'img/emyYellowDie.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('commander', 'img/commander2_256.png',{ frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('coin', 'img/coin.png',{ frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('alienHat', 'img/hats/alienHat.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('cakeHat', 'img/hats/cake.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('yigaHat', 'img/hats/bigYiga128.png',{ frameWidth: 128, frameHeight: 128 });

        
        
        this.load.spritesheet('bossCrabWalk', 'img/MonsterBossWalk1.png',{ frameWidth: 448, frameHeight: 448 });
        this.load.image('crableg', 'img/crableg.png');

		// Sounds
        this.load.audio('coinPickup', 'audio/sfx/Pickup_Coin36.mp3');
        this.load.audio('dropFall', 'audio/sfx/Hit_Hurt7.mp3');
        this.load.audio('playerDie', 'audio/sfx/PlayerDie.mp3');
        this.load.audio('portal', 'audio/sfx/Portal.mp3');
        this.load.audio('fireExplode', 'audio/sfx/Hit_Hurt24.mp3');
        this.load.audio('fail', 'audio/sfx/Fail.mp3');

		// Music
        this.load.audio('theme1', 'audio/music/44 Visiting the city with your kart 1.mp3');

//         this.load.image('bullet', 'img/bullet.png');
//         this.load.audio('theme1', 'audio/music/Electro Fight - Kwon.mp3');
//         this.load.audio('incoming1', 'audio/sfx/incoming1.mp3');


    }

    create ()
    {
        centerX = this.cameras.main.width / 2;
        centerY = this.cameras.main.height / 2;

        defaultVolume = 0.15;

        // spaceKey.on('up', function(event) {
        //     this.scene.launch('ControlScene');
        //     this.scene.pause();
        // },this);

        this.mediaService = new MediaService(this);
        this.mediaService.setMusic('theme1');
        
        lives = 3;
        score = 0;
        level = 0;
        chunksToFinish = 15;
        
        hats = [
//			{img:'gnomeHat',price:10,hasHat:false,hatClass:"Hat",descrip:"A nice red hat."},
//			{img:'topHat',price:25,hasHat:false,hatClass:"HatTop",descrip:"Chance to spawn extra coins."},
//			{img:'hornHelmet',price:25,hasHat:false,hatClass:"HatHornHelmet",descrip:"Blocks arrows."},
//			{img:'alienHat',price:25,hasHat:false,hatClass:"Hat",descrip:"Alien Hat. Reduced gravity.",anm:"alienHat"},
//			{img:'cakeHat',price:25,hasHat:false,hatClass:"Hat",descrip:"Extra Life.",anm:"cakeHat"},
//			{img:'yigaHat',price:25,hasHat:false,hatClass:"Hat",descrip:"Yiga Clan Mask. Protection from spikes.",anm:"yigaHat",xoff:18,yoff:-40},
//			{img:'headband',price:25,hasHat:false,hatClass:"Hat",descrip:"Headband. Forward dash.",yoff:-24},
// 			{img:'vikingHat',price:100,hasHat:false,hatClass:"HatHelmet",descrip:"Protection from falling eggs."},
// 			{img:'spikes',price:100,hasHat:false,hatClass:"Hat",descrip:"???"},

        ];
// 		hatsClone = hats.map(a => {return {...a}});

        curHat = null;

        animConfigs = {};
        
        animConfigs.greenDotIdle = {
            key: 'greenDotIdle',
            frames: this.anims.generateFrameNumbers('greenDotIdle', { start: 0, end: 1, first: 0 }),
            frameRate: 4,
            repeat: -1
        };
        animConfigs.greenDotRun = {
            key: 'greenDotRun',
            frames: this.anims.generateFrameNumbers('greenDotRun', { start: 0, end: 1, first: 0 }),
            frameRate: 4,
            repeat: -1
        };
        
        animConfigs.kahlessRainbow = {
            key: 'kahlessRainbow',
            frames: this.anims.generateFrameNumbers('kahlessRainbow', { start: 0, end: 6, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.fireball = {
            key: 'fireball',
            frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 3, first: 0 }),
            frameRate: 8,
            repeat: -1
        };

        animConfigs.emyIdle = {
            key: 'emyIdle',
            frames: this.anims.generateFrameNumbers('emyIdle', { start: 0, end: 3, first: 0 }),
            frameRate: 8,
            repeat: -1
        };

        animConfigs.emyHit = {
            key: 'emyHit',
            frames: this.anims.generateFrameNumbers('emyHit', { start: 0, end: 1, first: 0 }),
            frameRate: 16,
            repeat: 0
        };

        animConfigs.emyWalk = {
            key: 'emyWalk',
            frames: this.anims.generateFrameNumbers('emyWalk', { start: 0, end: 5, first: 0 }),
            frameRate: 8,
            repeat: -1
        };

        animConfigs.emyDie = {
            key: 'emyDie',
            frames: this.anims.generateFrameNumbers('emyDie', { start: 0, end: 14, first: 0 }),
            frameRate: 16,
            repeat: 0
        };

        animConfigs.coin = {
            key: 'coin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 7, first: 0 }),
            frameRate: 16,
            repeat: -1
        };

        animConfigs.emyYellowFly = {
            key: 'emyYellowFly',
            frames: this.anims.generateFrameNumbers('emyYellowFly', { start: 0, end: 2, first: 0 }),
            frameRate: 6,
            repeat: -1
        };

        animConfigs.emyYellowDie = {
            key: 'emyYellowDie',
            frames: this.anims.generateFrameNumbers('emyYellowDie', { start: 0, end: 3, first: 0 }),
            frameRate: 16,
            repeat: 0
        };

        animConfigs.bossCrabWalk = {
            key: 'bossCrabWalk',
            frames: this.anims.generateFrameNumbers('bossCrabWalk', { start: 0, end: 9, first: 0 }),
            frameRate: 12,
            repeat: -1
        };

        animConfigs.watcherIdle = {
            key: 'watcherIdle',
            frames: this.anims.generateFrameNumbers('watcherIdle', { start: 0, end: 3, first: 0 }),
            frameRate: 16,
            repeat: -1
        };

        animConfigs.commanderWalk = {
            key: 'commanderWalk',
            frames: this.anims.generateFrameNumbers('commander', { start: 0, end: 2, first: 0 }),
            frameRate: 6,
            repeat: -1
        };

        animConfigs.commanderAttack1 = {
            key: 'commanderAttack1',
            frames: this.anims.generateFrameNumbers('commander', { start: 2, end: 7, first: 2 }),
            frameRate: 12,
            repeat: 0
        };

        animConfigs.gusGuyIdle = {
            key: 'gusGuyIdle',
            frames: this.anims.generateFrameNumbers('gusguy', { start: 0, end: 0, first: 0 }),
            frameRate: 1,
            repeat: 0
        };
        animConfigs.crownPhase = {
            key: 'crownPhase',
            frames: this.anims.generateFrameNumbers('crown', { start: 0, end: 3, first: 0 }),
            frameRate: 2,
            repeat: 0
        };
        animConfigs.hellSpawnMove = {
            key: 'hellSpawnMove',
            frames: this.anims.generateFrameNumbers('hellSpawnMove', { start: 0, end: 5, first: 0 }),
            frameRate: 6,
            repeat: -1
        };
        animConfigs.hellSpawnDie = {
            key: 'hellSpawnDie',
            frames: this.anims.generateFrameNumbers('hellSpawnDie', { start: 0, end: 6, first: 0 }),
            frameRate: 8,
            repeat: 0
        };
        animConfigs.oliverBlueWalk = {
            key: 'oliverBlueWalk',
            frames: this.anims.generateFrameNumbers('oliverBlue', { start: 0, end: 1, first: 0 }),
            frameRate: 6,
            repeat: -1
        };
        animConfigs.oliverBlueDie = {
            key: 'oliverBlueDie',
            frames: this.anims.generateFrameNumbers('oliverBlue', { start: 2, end: 5, first: 0 }),
            frameRate: 3,
            repeat: 0
        };
        animConfigs.ottoGhost = {
            key: 'ottoGhost',
            frames: this.anims.generateFrameNumbers('ottoGhost', { start: 0, end: 40, first: 0 }),
            frameRate: 6,
            repeat: -1
        };
        animConfigs.parkerArcher = {
            key: 'parkerArcher',
            frames: this.anims.generateFrameNumbers('parkerArcher', { start: 0, end: 5, first: 0 }),
            frameRate: 6,
            repeat: -1
        };
        animConfigs.ozzieYouDied = {
            key: 'ozzieYouDied',
            frames: this.anims.generateFrameNumbers('ozzieYouDied', { start: 0, end: 8, first: 0 }),
            frameRate: 12,
            repeat: 0
        };
        animConfigs.mushroomIdle = {
            key: 'mushroomIdle',
            frames: [
            	{key:'calliopeMushroom',frame:0,duration:1},
            	{key:'calliopeMushroom',frame:1,duration:1},
            	{key:'calliopeMushroom',frame:2,duration:1},
            	{key:'calliopeMushroom',frame:3,duration:1},
            	{key:'calliopeMushroom',frame:2,duration:1},
            	{key:'calliopeMushroom',frame:1,duration:1},
            ],
            frameRate: 6,
            repeat: -1
        };
        animConfigs.mushroomBuilding = {
            key: 'mushroomBuilding',
            frames: this.anims.generateFrameNumbers('calliopeMushroom', { start: 5, end: 26, first: 5 }),
            frameRate: 12,
            repeat: 0
        };
        animConfigs.rockHammerWalk = {
            key: 'rockHammerWalk',
            frames: this.anims.generateFrameNumbers('rockHammerGuy', { start: 4, end: 5, first: 4 }),
            frameRate: 2,
            repeat: -1
        };
        animConfigs.rockHammerAttack = {
            key: 'rockHammerAttack',
            frames: this.anims.generateFrameNumbers('rockHammerGuy', { start: 0, end: 9, first: 0 }),
            frameRate: 14,
            repeat: 0
        };
        animConfigs.rockFire = {
            key: 'rockFire',
            frames: [
            	{key:'rockFire',frame:0,duration:1},
            	{key:'rockFire',frame:1,duration:1},
            ],
            frameRate: 12,
            repeat: -1
        };
        animConfigs.slimeBlobWalk = {
            key: 'slimeBlobWalk',
            frames: this.anims.generateFrameNumbers('slimeBlob', { start: 0, end: 11, first: 0 }),
            frameRate: 18,
            repeat: -1
        };
        animConfigs.kahLessSquareWalk = {
            key: 'kahLessSquareWalk',
            frames: this.anims.generateFrameNumbers('kahLessSquare', { start: 0, end: 1, first: 0 }),
            frameRate: 4,
            repeat: -1
        };
        
        animConfigs.alienHat = {
            key: 'alienHat',
            frames: this.anims.generateFrameNumbers('alienHat', { start: 0, end: 4, first: 0 }),
            frameRate: 8,
            repeat: -1
        };
        
        animConfigs.cakeHat = {
            key: 'cakeHat',
            frames: this.anims.generateFrameNumbers('cakeHat', { start: 0, end: 2, first: 0 }),
            frameRate: 8,
            repeat: -1
        };
        
        animConfigs.yigaHat = {
            key: 'yigaHat',
            frames: this.anims.generateFrameNumbers('yigaHat', { start: 0, end: 2, first: 0 }),
            frameRate: 8,
            repeat: -1
        };
        
        
        this.scene.start('MenuScene');
//         this.scene.start('CreditScene');
    }



}