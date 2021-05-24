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
        this.load.spritesheet('fireball', 'img/fireball.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.image('enemy', 'img/redSquare.png');
        this.load.image('platform', 'img/ground.png');
        this.load.image('square', 'img/ui/whiteSquare32x.png');
        this.load.image('blueSquare', 'img/blueSquare.png');
        this.load.image('audio', 'img/ui/Audio34x.png');
        this.load.image('equalizer', 'img/ui/Equalizer34x.png');
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

        this.scene.start('MenuScene');
    }



}