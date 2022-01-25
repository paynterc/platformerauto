class HatTop extends Hat {

	init(){
		this.myScene.events.on('scoreUpdated', this.spawnCoin, this);
	}
	

	spawnCoin(){
		var odds = 5;
		if(Phaser.Math.Between(1,odds)===odds){
			new Coin(this.myScene,this.x,this.y,{vspd:-800});
		}
	}
	
	myDestroy(){
		this.myScene.events.off('scoreUpdated', this.spawnCoin, this);
		this.destroy();
	}

}