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

        this.lifeImages = this.add.group();
        this.drawLives();

        this.gameOverText = this.add.text(centerX, centerY, "GAME OVER", { fontSize: '64px', fontFamily: 'FourBitRegular' });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.setVisible(false);

        this.restartText = this.add.text(centerX, centerY+64, "PLAY AGAIN", { fontSize: '32px', fontFamily: 'FourBitRegular' });
        this.restartText.setOrigin(0.5);
        this.restartText.setVisible(false);

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
        });
    }

    drawLives(){
        this.lifeImages.clear(true,true);
        let xx = W-128;
        for(let i=0;i<this.gameScene.lives;i++){
            let img = this.add.image(xx,H-HALFUNIT,'hero').setScale(.5);
            this.lifeImages.add(img);
            xx += 32;
        }
    }
}