class Shooter extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, faction=1, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'shooter');
        scene.add.existing(this);

        this.myScene = scene;
        this.initSpeed=128;
        
//         this.myDelay = 2000;
//         this.nextShoot = 0;
        
        this.myDelay = 250;
        this.nextShoot = this.myDelay;
        
        
    }

    update(time,delta){
//         if(this.nextShoot===0){
//             this.nextShoot = time;
//         }
//         if(time>this.nextShoot){
//             this.nextShoot+=this.myDelay;
//             this.shoot();
//         }
		this.nextShoot--;
		if(this.nextShoot<1){
			this.nextShoot = this.myDelay;
			this.shoot();
		}

    }

    shoot(){

        let bullet = new Bullet(this.myScene,this.x,this.y,this.angle,{anm:'fireball',img:'fireball'});

    }


    init(){
        //overwrite me
    }
}