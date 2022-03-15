class Bomb extends Bullet {

    init(){
        this.body.setGravityY(GRAVITY);
        this.body.setAllowGravity(true);
        this.body.setBounce(0.2);
        this.destroyOnSplat = false;// let it sit on the platform
        this.lifeSpan=Phaser.Math.Between(100,200);
    }

    onDestroy(){
        new Bullet(this.myScene,this.x,this.y,0,{'anm':'kapow','initSpeed':0,'destroyAfterAnim':true,'img':'kapow',scale:.5});
        this.myScene.soundFireExplode.play();
    }

}