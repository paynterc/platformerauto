class HatHelmet extends Hat {

	init(){
		this.myScene.physics.add.existing(this);
		this.body.setAllowGravity(false).setImmovable(true);

		this.myScene.splatBulletShields.add(this);
	}
	

}