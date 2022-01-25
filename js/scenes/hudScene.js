class HudScene extends Phaser.Scene{
    constructor ()
    {
        super({key: 'HudScene', active: false});


    }

    preload()
    {

    }

    create ()
    {
        let that = this;
        this.gameScene = this.scene.get('GameScene');
        this.gameScene.events.on('playerDied', this.drawLives, this);
        this.gameScene.events.on('gameOver', this.gameOver, this);
        this.gameScene.events.on('scoreUpdated', this.updateScore, this);

        this.lifeImages = this.add.group();
        this.drawLives();

        this.gameOverText = this.add.text(centerX, centerY, "GAME OVER", { fontSize: '64px', fontFamily: 'FourBitRegular' });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.setVisible(false);

        this.restartText = this.add.text(centerX, centerY+64, "PLAY AGAIN", { fontSize: '32px', fontFamily: 'FourBitRegular' });
        this.restartText.setOrigin(0.5);
        this.restartText.setVisible(false);

        this.scoreText = this.add.text(16, 8, "Coins: " + score.toString(), { fontSize: '16px', fontFamily: 'FourBitRegular' });
        
        this.levelText = this.add.text(W/2, 8, "Level: " + level.toString(), { fontSize: '16px', fontFamily: 'FourBitRegular' });

		


		this.rightText = this.add.text( W/2+64,H/2+48, "RIGHT", { fontSize: '12px', fontFamily: 'FourBitRegular' });
        this.rightText.setOrigin(0.5);
        this.leftText = this.add.text( W/2-64,H/2+48, "LEFT", { fontSize: '12px', fontFamily: 'FourBitRegular' });
        this.leftText.setOrigin(0.5);
        this.upText = this.add.text( W/2,H/2-16, "JUMP", { fontSize: '12px', fontFamily: 'FourBitRegular' });
        this.upText.setOrigin(0.5);
        this.upText2 = this.add.text( W/2,H/2-64, "DOUBLE JUMP", { fontSize: '12px', fontFamily: 'FourBitRegular' });
        this.upText2.setOrigin(0.5);
        
		this.rightArrow = this.add.image(W/2+64,H/2+48,'arrowKey').setAlpha(0.5);
		this.leftArrow = this.add.image(W/2-64,H/2+48,'arrowKey').setAngle(180).setAlpha(0.5);
		this.upArrow = this.add.image(W/2,H/2-16,'arrowKey').setAngle(-90).setAlpha(0.5);
		this.upArrow2 = this.add.image(W/2,H/2-64,'arrowKey').setAngle(-90).setAlpha(0.5);
       
        this.fadeArrowTime = level < 2 ? 200 : 1;

        // Put this last
        let settingsButton = this.add.sprite(32,H-HALFUNIT,'equalizer').setScale(0.5).setAlpha(0.5).setInteractive().on('pointerdown', (pointer, localX, localY, event) => {
            //this.bootScene.events.emit('audioClicked');
            this.scene.launch('SettingsScene');
            this.gameScene.scene.pause();
            this.scene.pause();
        },this).on('pointerover',function(){
            this.setAlpha(1);
        }).on('pointerout',function(){
            this.setAlpha(0.5);
        });

    }
    
    update(time,delta){
    	if(this.fadeArrowTime>0){
    	    this.fadeArrowTime--;
			if(this.fadeArrowTime<=0){
				this.rightArrow.setAlpha(0);
				this.leftArrow.setAlpha(0);
				this.upArrow.setAlpha(0);
				this.upArrow2.setAlpha(0);
				
				this.rightText.setAlpha(0);
				this.leftText.setAlpha(0);
				this.upText.setAlpha(0);
				this.upText2.setAlpha(0);
				
			}
    	}

    }

    updateScore(){
        this.scoreText.setText("Coins: "+ score.toString());
    }
    gameOver(){

        this.gameOverText.setVisible(true);
        this.gameOverText.setDepth(1);
        this.restartTimer = this.time.addEvent({ delay: 1000, callback: this.showRestartText, callbackScope: this, loop: false });

    }

    showRestartText(){
        this.restartTimer.remove();
        this.restartText.setVisible(true);
        this.restartText.setDepth(1);
        let that = this;
        this.restartText.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            that.gameScene.gameRestart();
        }).on('pointerover',function(){
            this.setTint('0x00ff00');
        }).on('pointerout',function(){
            this.setTint('0xffffff');
        });
    }

    drawLives(){
        this.lifeImages.clear(true,true);
        let xx = W-128;
        for(let i=0;i<lives;i++){
            let img = this.add.image(xx,HALFUNIT,'hero').setScale(.5);
            this.lifeImages.add(img);
            xx += 32;
        }
    }
}