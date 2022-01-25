class HoorayScene extends Phaser.Scene{
    constructor ()
    {
        super({key: 'HoorayScene', active: false});
    }

    preload()
    {

    }

    create ()
    {
        let that = this;
        
        this.gameScene = this.scene.get('GameScene');
        this.scene.stop('HudScene');

        
        this.delayTime=100;
        this.delayTimer=this.delayTime;
        this.cIndex = 0;
        this.imgSpr=null;
        this.nameText = this.add.text(W/2, H/2 - 64, '', { fontSize: '64px', fontFamily: 'FourBitRegular' }).setOrigin(0.5);
        this.titleText = this.add.text(W/2, H/2 + 64, '', { fontSize: '64px', fontFamily: 'FourBitRegular' }).setOrigin(0.5);
        
        
		let particles = this.add.particles('square');
		var emitter = particles.createEmitter(
		{
		x:W/2,
		y:H/2,
		angle: { min: 180, max: 360 },
		speed: 500,
		gravityY: 350,
		lifespan: 3000,
		quantity: 4,
		scale: { min: 0.1, max: 1 },
		tint: ['0xFC7E7E','0xFCD77E','0xFCF87E','0xAAFC7E','0x7EFCDD','0x7EA0FC','0xBD7EFC','0xffffff']
		}
		);
		
    	this.anims.create(animConfigs.greenDotIdle);
    	this.anims.create(animConfigs.alienHat);
        this.anims.create(animConfigs.cakeHat);
        this.anims.create(animConfigs.yigaHat);
    	
		this.imgSpr = this.add.sprite(W/2,H/2,'greenDotIdle').setScale(4);
		this.imgSpr.play('greenDotIdle');
		
        if(curHat){
        	let xoff = curHat == 'yigaHat' ? 72 : 0;
			let yoff = curHat == 'yigaHat' ? 32 : 0;
            this.hatImg =  this.add.sprite(W/2+xoff,H/2-120-yoff,curHat).setScale(4);
        }
		
		this.titleText1 = this.add.text(centerX, 68, "YOU DID IT!!", { fontSize: '64px', fontFamily: 'FourBitRegular' }).setTint('0xffffff').setOrigin(0.5);
		this.titleText2 = this.add.text(centerX, 64, "YOU DID IT!!", { fontSize: '64px', fontFamily: 'FourBitRegular' }).setTint('0xFF57E9').setOrigin(0.5);
		
		
		this.hatDescripText = this.add.text(centerX, H-66, "", { fontSize: '28px', fontFamily: 'FourBitRegular' }).setOrigin(0.5);

		

    	this.showHats = [];
		this.refreshHats();
     
    	this.startText = this.add.text(centerX, H-32, "CONTINUE", { fontSize: '32px', fontFamily: 'FourBitRegular' });
        this.startText.setOrigin(0.5).setTint('0x00ff00');
        this.startText.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            that.scene.start('GameScene');
        }).on('pointerover',function(){
				this.setTint('0xffffff');
			}).on('pointerout',function(){
				this.setTint('0x00ff00');
			});
        this.scoreText = this.add.text(16, 8, "Coins: " + score.toString(), { fontSize: '16px', fontFamily: 'FourBitRegular' });

        this.failSound = this.sound.add('fail',{volume:.25});
        this.buySound = this.sound.add('portal',{volume:.25});


     
    }
    
	updateScore(){
        this.scoreText.setText("Coins: "+ score.toString());
    }
    
    refreshHats(){
		for(var i=0;i<hats.length;i++){
			// if hats[i] not in hasHats ...
			this.showHats.push(hats[i]);
// 			if(this.showHats.length===3) break;
		}
    	let showHatX=W/2-384;
		let showHatY=H-128;
		let hatSpace = 64;
		let that = this;
		for(var i=0;i<this.showHats.length;i++){
		
			this.add.image(showHatX + (128*i),showHatY,'square').setScale(2.5).setTint('0xC4C4C4');
			let xoff = this.showHats[i].img == 'yigaHat' ? 28 : 0;
			let yoff = this.showHats[i].img == 'yigaHat' ? 16 : 8;
			let scl = this.showHats[i].img == 'yigaHat' ? 1.5 : 2;
			if(!this.showHats[i].hasHat){
				this.add.text(showHatX + (128*i),showHatY-68, this.showHats[i].price.toString(), { fontSize: '28px', fontFamily: 'FourBitRegular' }).setOrigin(.5);
			}

			let hatSpr = this.add.sprite(showHatX + (128*i)+xoff,showHatY-yoff,this.showHats[i].img).setScale(scl);
			let idx = i;
			let hatData = this.showHats[i];
			hatSpr.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
				this.buyHat(idx);
			},this).on('pointerover',function(){
				this.setScale(2.5);
				that.hatDescripText.setText(hatData.descrip);
			}).on('pointerout',function(){
				this.setScale(scl);
				that.hatDescripText.setText("");
			});
			
		}
    }
    

	buyHat(i){
		if(this.showHats[i].hasHat){
			// Already owns the hat. Put on the hat, no charge.
			this.buySound.play();
			curHat=this.showHats[i].img;
			this.scene.restart();
			return true;
		}
		if( score<this.showHats[i].price ){
			this.failSound.play();
			return false;
		}
		
		curHat=this.showHats[i].img;
		score -= this.showHats[i].price;
		this.updateScore();

		this.showHats[i].hasHat=true;
		this.scene.restart();
		return true;
		
	}
    

    

    update(time,delta){
    
//     	this.delayTimer--;
//     	if(this.delayTimer<1){
//     		this.delayTimer=this.delayTime;
//     		this.cIndex++;
//     		if(this.cIndex>=this.creditData.length){
//     			this.cIndex=0;
//     		}
//     		this.updateCredits(this.cIndex);
//     	}
    
    }
    
    

    
    
}