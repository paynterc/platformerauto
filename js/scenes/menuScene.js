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
        this.titleText = this.add.text(centerX, centerY, "Any Hero's Journey", { fontSize: '48px', fontFamily: 'FourBitRegular' }).setOrigin(0.5).setTint('0x00ff00');

        this.startText = this.add.text(centerX, centerY+64, "START", { fontSize: '32px', fontFamily: 'FourBitRegular' }).setOrigin(0.5);
        this.startText.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            that.scene.start('GameScene');
//            that.scene.start('HoorayScene');
        }).on('pointerover',function(){
				this.setTint('0x00ff00');
			}).on('pointerout',function(){
				this.setTint('0xffffff');
			});
//        this.creditText = this.add.text(centerX, centerY+256, "CREDITS", { fontSize: '16px', fontFamily: 'FourBitRegular' }).setOrigin(0.5);
//        this.creditText.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
//            that.scene.start('CreditScene');
//        }).on('pointerover',function(){
//            this.setTint('0x00ff00');
//        }).on('pointerout',function(){
//            this.setTint('0xffffff');
//        });



        this.anims.create(animConfigs.greenDotIdle);
        this.anims.create(animConfigs.emyIdle);
        this.anims.create(animConfigs.blueyIdle);
        this.anims.create(animConfigs.greenieIdle);
        this.anims.create(animConfigs.allSeeEyeIdle);


        this.H = 0;
		this.heroImg = this.add.sprite(W/2,H/4,curHero.img).setScale(4);
		this.heroImg.play(curHero.anmIdl);

        this.heroImg.setInteractive().on('pointerdown', function(pointer, localX, localY, event){

            that.H++;
            if(that.H >= heroes.length){
                that.H=0;
            }
            curHero = heroes[that.H];
            that.heroImg.play(curHero.anmIdl);

        })


        this.nextHero = this.add.text(centerX,32, "next hero", { fontSize: '16px', fontFamily: 'FourBitRegular' }).setOrigin(0.5);
        this.nextHero.setInteractive().on('pointerdown', function(pointer, localX, localY, event){

            that.H++;
            if(that.H >= heroes.length){
                that.H=0;
            }
            curHero = heroes[that.H];
            that.heroImg.play(curHero.anmIdl);

        }).on('pointerover',function(){
				this.setTint('0x00ff00');
			}).on('pointerout',function(){
				this.setTint('0xffffff');
			});


    }
}