class Shooter extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, faction=1, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'shooter');
        scene.add.existing(this);

        this.myScene = scene;
        this.myDelay = 2000;
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

        let bullet = new Bullet(this.myScene,this.x,this.y,this.rotation,{anm:'fireball'});

    }


    init(){
        //overwrite me
    }
}