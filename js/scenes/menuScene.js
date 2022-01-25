class MenuScene extends Phaser.Scene{
    constructor ()
    {
        super({key: 'MenuScene', active: false});
    }

    preload()
    {

    }

    create ()
    {
        let that = this;
        this.titleText = this.add.text(centerX, centerY, "ADVENTURES OF GREEN DOT", { fontSize: '64px', fontFamily: 'FourBitRegular' }).setOrigin(0.5).setTint('0x00ff00');

        this.startText = this.add.text(centerX, centerY+64, "START", { fontSize: '32px', fontFamily: 'FourBitRegular' }).setOrigin(0.5);
        
        this.creditText = this.add.text(centerX, centerY+256, "CREDITS", { fontSize: '16px', fontFamily: 'FourBitRegular' }).setOrigin(0.5);

        this.startText.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            that.scene.start('GameScene');
        }).on('pointerover',function(){
				this.setTint('0x00ff00');
			}).on('pointerout',function(){
				this.setTint('0xffffff');
			});
        
        this.creditText.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
//             that.scene.start('HoorayScene');
            that.scene.start('CreditScene');
        }).on('pointerover',function(){
            this.setTint('0x00ff00');
        }).on('pointerout',function(){
            this.setTint('0xffffff');
        });
        
    }
}