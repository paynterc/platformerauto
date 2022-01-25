// this.arrow = game.add.sprite(-100,-100, "arrow");
// game.physics.enable(this.arrow, Phaser.Physics.ARCADE);
// this.arrow.body.allowRotation=false;
// this.arrow.body.immovable = true;
// this.arrow.body.friction.x=0;
// this.arrow.body.velocity.x = 0;
// this.arrow.body.velocity.y = 0;
//this.arrow.rotation = Math.atan2(this.arrow.body.velocity.y, this.arrow.body.velocity.x);
class Arrow extends Bullet {

    init(){
            this.body.setGravityY(GRAVITY);

        this.body.setAllowGravity(true);

    }

    update(){
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }
}