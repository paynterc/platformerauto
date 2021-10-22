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
        this.load.image('blueSquare', 'img/blueSquare.png');
        this.load.image('audio', 'img/ui/Audio34x.png');
        this.load.image('equalizer', 'img/ui/Equalizer34x.png');
        this.load.image('egg', 'img/egg.png');

        this.load.spritesheet('fireball', 'img/fireball.png',{ frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('emyIdle', 'img/emyIdle.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyHit', 'img/emyHit.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyWalk', 'img/emyWalk.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyDie', 'img/emyDie.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('gusguy', 'img/Gus.png',{ frameWidth: 32, frameHeight: 32 });


        this.load.spritesheet('watcherIdle', 'img/WatcherIdle.png',{ frameWidth: 64, frameHeight: 64 });


        this.load.spritesheet('emyYellowFly', 'img/emyYellowFly.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('emyYellowDie', 'img/emyYellowDie.png',{ frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('commander', 'img/commander2_256.png',{ frameWidth: 256, frameHeight: 256 });


        this.load.spritesheet('coin', 'img/coin.png',{ frameWidth: 16, frameHeight: 16 });

        this.load.spritesheet('bossCrabWalk', 'img/MonsterBossWalk1.png',{ frameWidth: 448, frameHeight: 448 });
        this.load.image('crableg', 'img/crableg.png');


        this.load.audio('coinPickup', 'audio/sfx/Pickup_Coin36.mp3');
        this.load.audio('dropFall', 'audio/sfx/Hit_Hurt7.mp3');
        this.load.audio('playerDie', 'audio/sfx/PlayerDie.mp3');


        this.load.audio('theme1', 'audio/music/Mushrooms.mp3');

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

        animConfigs = {};
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

        this.scene.start('MenuScene');
    }



}