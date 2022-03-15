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
        this.load.image('tree1', 'img/tree1.png');
        this.load.image('door', 'img/door.png');
        this.load.image('minidoor', 'img/minidoor.png');
        this.load.image('minidoorOpen', 'img/minidoorOpen.png');
        this.load.image('key', 'img/key.png');
        this.load.image('heart', 'img/Heart.png');
        this.load.image('flowerRd', 'img/flowerRd.png');
        this.load.image('flowerOr', 'img/flowerOr.png');
        this.load.image('flowerWt', 'img/flowerWt.png');
        this.load.image('stump', 'img/stump.png');
        this.load.image('grass', 'img/grass.png');
        this.load.image('tree2', 'img/tree3.png');
        this.load.image('blobCrown', 'img/blobCrown.png');
        this.load.image('bombGoblin', 'img/bombGoblin.png');
        this.load.image('avocadoHat', 'img/hats/angryAvocadoHat.png');


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
        this.load.spritesheet('mountains1', 'img/mountains1.png',{ frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('mountains2', 'img/mountains2.png',{ frameWidth: 128, frameHeight: 128 });
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
        this.load.spritesheet('evilEyeball', 'img/evil_eyeball.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('evilEyeballDie', 'img/evil_eyeball_die.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('bobTheBlob', 'img/bob_the_blob.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('bonyBoomBox', 'img/bony_the_boom_box.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('blueyWalk', 'img/Bluey.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('blueyDie', 'img/Bluey_DEATH.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('gusGrave', 'img/gus_the_grave.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('bobbyBomb', 'img/bobby_the_bomb.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('goblin', 'img/Goblin.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('greenie', 'img/Greenie.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('kapow', 'img/kapow.png',{ frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('the_all_seeing_eye', 'img/the_all_seeing_eye.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('minidoorAnim', 'img/minidoorAnim.png',{ frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('blobKing', 'img/blob_king.png',{ frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet('kidCry', 'img/little_girl_cry.png',{ frameWidth: 30, frameHeight: 34 });
        this.load.spritesheet('kidAscend', 'img/little_girl_acsend.png',{ frameWidth: 30, frameHeight: 34 });
        this.load.spritesheet('walkingDude', 'img/walking_dude.png',{ frameWidth: 32, frameHeight: 34 });
        this.load.spritesheet('icyBlob', 'img/iceyBlob.png',{ frameWidth: 32, frameHeight: 34 });
        this.load.spritesheet('toxicBoss', 'img/Toxic_Boss.png',{ frameWidth: 32, frameHeight: 34 });
        this.load.spritesheet('toxicMinion', 'img/TOXIC_MINION.png',{ frameWidth: 34, frameHeight: 34 });
        this.load.spritesheet('toxicBullet', 'img/toxicBullet.png',{ frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('goblinBomber', 'img/goblinBomber.png',{ frameWidth: 19, frameHeight: 19 });
        this.load.spritesheet('avocadoSpawn', 'img/avocadoSpawn.png',{ frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('avocadoWalk', 'img/avocadoWalk.png',{ frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('forestDragon', 'img/forest_dragon .png',{ frameWidth: 96, frameHeight: 60 });
        this.load.spritesheet('buffAmg', 'img/buffAmongus.png',{ frameWidth: 125, frameHeight: 82 });
        this.load.spritesheet('roboPuppy', 'img/roboPuppy.png',{ frameWidth: 32, frameHeight: 28 });

        

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
        playerHasKey = true;
        kidsSaved = 0;

        hatsDb = [
 			{img:'blobCrown',price:0,hasHat:false,hatClass:"Hat",descrip:"Protection from blobs"},
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

        hats = [
 			{img:'blobCrown',price:0,hasHat:false,hatClass:"Hat",descrip:"Protection from blobs"},
            {img:'cakeHat',price:25,hasHat:false,hatClass:"Hat",descrip:"Extra Life.",anm:"cakeHat"},
 			{img:'hornHelmet',price:25,hasHat:false,hatClass:"HatHornHelmet",descrip:"Blocks arrows."},
 			{img:'avocadoHat',price:25,hasHat:false,hatClass:"Hat",descrip:"???"},
        ];
        curHat = null;

        heroes = [
            {img:'greenie',name:"Greenie",anmIdl:'greenieIdle',anmRun:'greenieWalk'},
            {img:'emyIdle',name:"Red Dot",anmIdl:'emyIdle',anmRun:'emyWalk'},
            {img:'blueyWalk',name:"Bluey",anmIdl:'blueyIdle',anmRun:'blueyWalk',anmDie:'blueyDie'},
            {img:'allSeeEyeIdle',name:"The All Seeing Eye",anmIdl:'allSeeEyeIdle',anmRun:'allSeeEyeWalk',anmDie:'allSeeEyeDie'}
        ];
        curHero = heroes[0];

        animConfigs = {};
        animConfigs.roboPuppy1 = {
            key: 'roboPuppy1',
            frames: this.anims.generateFrameNumbers('roboPuppy', { start: 0, end: 0, first: 0 }),
            frameRate: 4,
            repeat: 0
        };
        animConfigs.roboPuppy2 = {
            key: 'roboPuppy2',
            frames: this.anims.generateFrameNumbers('roboPuppy', { start: 1, end: 1, first: 1 }),
            frameRate: 4,
            repeat: 0
        };
        animConfigs.buffAmgIntro = {
            key: 'buffAmgIntro',
            frames: this.anims.generateFrameNumbers('buffAmg', { start: 0, end: 4, first: 0 }),
            frameRate: 4,
            repeat: 0
        };
        animConfigs.buffAmgWalk = {
            key: 'buffAmgWalk',
            frames: this.anims.generateFrameNumbers('buffAmg', { start: 5, end: 8, first: 5 }),
            frameRate: 8,
            repeat: -1
        };
        animConfigs.buffAmgAttack1 = {
            key: 'buffAmgAttack1',
            frames: [
                {key:'buffAmg',frame:0,duration:1},
                {key:'buffAmg',frame:1,duration:1},
                {key:'buffAmg',frame:2,duration:1},
                {key:'buffAmg',frame:3,duration:1},
                {key:'buffAmg',frame:4,duration:1},
                {key:'buffAmg',frame:5,duration:1},
                {key:'buffAmg',frame:5,duration:1},
            ],
            frameRate: 4,
            repeat: 0
        };


        animConfigs.buffAmgPunch = {
            key: 'buffAmgPunch',
            frames: [
                {key:'buffAmg',frame:9,duration:1},
                {key:'buffAmg',frame:10,duration:1},
                {key:'buffAmg',frame:10,duration:1},
                {key:'buffAmg',frame:10,duration:1},
            ],
            frameRate: 4,
            repeat: 0
        };
        animConfigs.buffAmgDie = {
            key: 'buffAmgDie',
            frames: this.anims.generateFrameNumbers('buffAmg', { start: 11, end: 29, first: 11 }),
            frameRate: 8,
            repeat: 0
        };
        animConfigs.forestDragonWalk = {
            key: 'forestDragonWalk',
            frames: [
                {key:'forestDragon',frame:0,duration:1},
            ],
            frameRate: 1,
            repeat: -1
        };
        animConfigs.forestDragonFire = {
            key: 'forestDragonFire',
            frames: this.anims.generateFrameNumbers('forestDragon', { start: 0, end: 1, first: 0 }),
            frameRate: 24,
            repeat: -1
        };
        animConfigs.avocadoSpawn = {
            key: 'avocadoSpawn',
            frames: this.anims.generateFrameNumbers('avocadoSpawn', { start: 0, end: 10, first: 0 }),
            frameRate: 14,
            repeat: 0
        };
        animConfigs.avocadoWalk = {
            key: 'avocadoWalk',
            frames: this.anims.generateFrameNumbers('avocadoWalk', { start: 0, end: 3, first: 0 }),
            frameRate: 14,
            repeat: -1
        };
        animConfigs.goblinBomberIdle = {
            key: 'goblinBomberIdle',
            frames: this.anims.generateFrameNumbers('goblinBomber', { start: 0, end: 26, first: 0 }),
            frameRate: 14,
            repeat: -1
        };
        animConfigs.goblinBomberAttack = {
            key: 'goblinBomberAttack',
            frames: this.anims.generateFrameNumbers('goblinBomber', { start: 27, end: 37, first: 0 }),
            frameRate: 14,
            repeat: 0
        };
        animConfigs.goblinBomberDie = {
            key: 'goblinBomberDie',
            frames: this.anims.generateFrameNumbers('goblinBomber', { start: 38, end: 51, first: 0 }),
            frameRate: 14,
            repeat: 0
        };

        animConfigs.toxicBullet = {
            key: 'toxicBullet',
            frames: this.anims.generateFrameNumbers('toxicBullet', { start: 0, end: 4, first: 0 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.toxicMinionWalk = {
            key: 'toxicMinionWalk',
            frames: [
                {key:'toxicMinion',frame:9,duration:1},
                {key:'toxicMinion',frame:10,duration:1},
                {key:'toxicMinion',frame:11,duration:1},
                {key:'toxicMinion',frame:10,duration:1},
            ],
            frameRate: 8,
            repeat: -1
        };
        animConfigs.toxicMinionSpawn = {
            key: 'toxicMinionSpawn',
            frames: this.anims.generateFrameNumbers('toxicMinion', { start: 0, end: 11, first: 0 }),
            frameRate: 12,
            repeat: 0
        };
        animConfigs.toxicMinionDie = {
            key: 'toxicMinionDie',
            frames: [
                {key:'toxicMinion',frame:10,duration:1},
                {key:'toxicMinion',frame:8,duration:1},
                {key:'toxicMinion',frame:6,duration:1},
                {key:'toxicMinion',frame:4,duration:1},
                {key:'toxicMinion',frame:2,duration:1},
            ],
            frameRate: 24,
            repeat: 0
        };
        animConfigs.toxicBossCan = {
            key: 'toxicBossCan',
            frames: [
                {key:'toxicBoss',frame:0,duration:3},
                {key:'toxicBoss',frame:0,duration:3},
                {key:'toxicBoss',frame:0,duration:3},
            ],
            frameRate: 1,
            repeat: 0
        };
        animConfigs.toxicBossIntro = {
            key: 'toxicBossIntro',
            frames: this.anims.generateFrameNumbers('toxicBoss', { start: 0, end: 15, first: 0 }),
            frameRate: 11,
            repeat: 0
        };
        animConfigs.toxicBossWalk = {
            key: 'toxicBossWalk',
            frames: this.anims.generateFrameNumbers('toxicBoss', { start: 16, end: 19, first: 16 }),
            frameRate: 8,
            repeat: -1
        };
        animConfigs.toxicBossDie = {
            key: 'toxicBossDie',
            frames: this.anims.generateFrameNumbers('toxicBoss', { start: 20, end: 42, first: 20 }),
            frameRate: 8,
            repeat: 0
        };
        animConfigs.icyBlobIdle = {
            key: 'icyBlobIdle',
            frames: this.anims.generateFrameNumbers('icyBlob', { start: 0, end: 1, first: 0 }),
            frameRate: 4,
            repeat: -1
        };
        animConfigs.walkingDude = {
            key: 'walkingDude',
            frames: this.anims.generateFrameNumbers('walkingDude', { start: 0, end: 1, first: 0 }),
            frameRate: 4,
            repeat: -1
        };
        animConfigs.kidCry = {
            key: 'kidCry',
            frames: this.anims.generateFrameNumbers('kidCry', { start: 0, end: 1, first: 0 }),
            frameRate: 2,
            repeat: -1
        };
        animConfigs.kidAscend = {
            key: 'kidAscend',
            frames: this.anims.generateFrameNumbers('kidAscend', { start: 0, end: 1, first: 0 }),
            frameRate: 2,
            repeat: -1
        };
        animConfigs.blobKingIdle = {
            key: 'blobKingIdle',
            frames: [
                {key:'blobKing',frame:0,duration:3},
                {key:'blobKing',frame:1,duration:3},
                {key:'blobKing',frame:2,duration:3},
                {key:'blobKing',frame:0,duration:3},
                {key:'blobKing',frame:3,duration:2},
            ],
            frameRate: 1,
            repeat: -1
        };
        animConfigs.blobKingWalk = {
            key: 'blobKingWalk',
            frames: [
                {key:'blobKing',frame:2,duration:3},
                {key:'blobKing',frame:3,duration:3},
                {key:'blobKing',frame:2,duration:3},
                {key:'blobKing',frame:3,duration:3},
                {key:'blobKing',frame:4,duration:2},
            ],
            frameRate: 2,
            repeat: -1
        };
        animConfigs.blobKingDie = {
            key: 'blobKingDie',
            frames: this.anims.generateFrameNumbers('blobKing', { start: 4, end: 17, first: 4 }),
            frameRate: 8,
            repeat: 0
        };
        animConfigs.miniDoorPulse = {
            key: 'miniDoorPulse',
            frames: [
            	{key:'minidoorAnim',frame:0,duration:1},
            	{key:'minidoorAnim',frame:1,duration:1},
            	{key:'minidoorAnim',frame:2,duration:1},
            	{key:'minidoorAnim',frame:1,duration:1},
            ],
            frameRate: 8,
            repeat: 0
        };
        animConfigs.miniDoorOpen = {
            key: 'miniDoorOpen',
            frames: this.anims.generateFrameNumbers('minidoorAnim', { start: 10, end: 21, first: 1 }),
            frameRate: 6,
            repeat: 0
        };
        animConfigs.miniDoorBurn = {
            key: 'miniDoorBurn',
            frames: this.anims.generateFrameNumbers('minidoorAnim', { start: 3, end: 9, first: 1 }),
            frameRate: 12,
            repeat: 0
        };
        animConfigs.allSeeEyeIdle = {
            key: 'allSeeEyeIdle',
            frames: this.anims.generateFrameNumbers('the_all_seeing_eye', { start: 0, end: 1, first: 0 }),
            frameRate: 1,
            repeat: -1
        };
        animConfigs.allSeeEyeWalk = {
            key: 'allSeeEyeWalk',
            frames: this.anims.generateFrameNumbers('the_all_seeing_eye', { start: 2, end: 2, first: 2 }),
            frameRate: 1,
            repeat: -1
        };
        animConfigs.allSeeEyeDie = {
            key: 'allSeeEyeDie',
            frames: this.anims.generateFrameNumbers('the_all_seeing_eye', { start: 3, end: 16, first: 3 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.kapow = {
            key: 'kapow',
            frames: this.anims.generateFrameNumbers('kapow', { start: 0, end: 2, first: 0 }),
            frameRate: 24,
            repeat: 0
        };
        animConfigs.greenieIdle = {
            key: 'greenieIdle',
            frames: this.anims.generateFrameNumbers('greenie', { start: 0, end: 1, first: 0 }),
            frameRate: 6,
            repeat: -1
        };
        animConfigs.greenieWalk = {
            key: 'greenieWalk',
            frames: this.anims.generateFrameNumbers('greenie', { start: 2, end: 5, first: 2 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.goblinAttack = {
            key: 'goblinAttack',
            frames: this.anims.generateFrameNumbers('goblin', { start: 0, end: 7, first: 0 }),
            frameRate: 6,
            repeat: -1
        };

        animConfigs.bobbyBombWalk = {
            key: 'bobbyBombWalk',
            frames: this.anims.generateFrameNumbers('bobbyBomb', { start: 1, end: 2, first: 1 }),
            frameRate: 6,
            repeat: -1
        };

        animConfigs.bobbyBombDie = {
            key: 'bobbyBombDie',
            frames: this.anims.generateFrameNumbers('bobbyBomb', { start: 3, end: 28, first: 3 }),
            frameRate: 14,
            repeat: 0
        };
        animConfigs.gusGrave = {
            key: 'gusGrave',
            frames: this.anims.generateFrameNumbers('gusGrave', { start: 0, end: 17, first: 0 }),
            frameRate: 5,
            repeat: 0
        };
        animConfigs.blueyIdle = {
            key: 'blueyIdle',
            frames: this.anims.generateFrameNumbers('blueyWalk', { start: 2, end: 3, first: 2 }),
            frameRate: 4,
            repeat: -1
        };
        animConfigs.blueyWalk = {
            key: 'blueyWalk',
            frames: this.anims.generateFrameNumbers('blueyWalk', { start: 0, end: 3, first: 0 }),
            frameRate: 4,
            repeat: -1
        };
        animConfigs.blueyDie = {
            key: 'blueyDie',
            frames: this.anims.generateFrameNumbers('blueyDie', { start: 0, end: 8, first: 0 }),
            frameRate: 4,
            repeat: -1
        };

        animConfigs.bonyIdle = {
            key: 'bonyIdle',
            frames: this.anims.generateFrameNumbers('bonyBoomBox', { start: 0, end: 1, first: 0 }),
            frameRate: 2,
            repeat: -1
        };

        animConfigs.bonyWalk = {
            key: 'bonyWalk',
            frames: this.anims.generateFrameNumbers('bonyBoomBox', { start: 2, end: 3, first: 2 }),
            frameRate: 4,
            repeat: -1
        };

        animConfigs.bonyDie = {
            key: 'bonyDie',
            frames: this.anims.generateFrameNumbers('bonyBoomBox', { start: 4, end: 18, first: 4 }),
            frameRate: 5,
            repeat: 0
        };

        animConfigs.bobTheBlobWalk = {
            key: 'bobTheBlobWalk',
            frames: this.anims.generateFrameNumbers('bobTheBlob', { start: 0, end: 3, first: 0 }),
            frameRate: 2,
            repeat: -1
        };
        animConfigs.bobTheBlobDie = {
            key: 'bobTheBlobDie',
            frames: this.anims.generateFrameNumbers('bobTheBlob', { start: 4, end: 18, first: 4 }),
            frameRate: 12,
            repeat: -1
        };
        animConfigs.evilEyeball = {
            key: 'evilEyeball',
            frames: this.anims.generateFrameNumbers('evilEyeball', { start: 0, end: 18, first: 0 }),
            frameRate: 24,
            repeat: -1
        };
        animConfigs.evilEyeballDie = {
            key: 'evilEyeballDie',
            frames: this.anims.generateFrameNumbers('evilEyeballDie', { start: 0, end: 24, first: 0 }),
            frameRate: 19,
            repeat: -1
        };
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