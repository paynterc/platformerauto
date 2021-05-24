class Shooter extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, faction=1, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'shooter');
        scene.add.existing(this);

        this.myScene = scene;
        this.myDelay = 1000;
        this.nextShoot = 0;
        this.initSpeed=128;
    }

    update(time,delta){
        if(this.nextShoot===0){
            this.nextShoot = time;
        }
        if(time>this.nextShoot){
            this.nextShoot+=this.myDelay;
            this.shoot();
        }
    }

    shoot(){
        let bullet = this.myScene.physics.add.sprite(this.x,this.y,'fireball');
        bullet.play('fireball');
        bullet.body.setAllowGravity(false);
        bullet.angle = this.angle;
        bullet.rotation = this.rotation;
        const vec = new Phaser.Math.Vector2();
        vec.setToPolar(bullet.rotation, this.initSpeed);// 500 is the bullet speed
        bullet.body.acceleration = vec;
        this.myScene.bullets.add(bullet);
    }


    init(){
        //overwrite me
    }
}