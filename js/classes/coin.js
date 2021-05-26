class Coin extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, faction=1, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'coin');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.myScene = scene;

        let vspd = config.hasOwnProperty('vspd') ? config.vspd : -500;
        let hspd = config.hasOwnProperty('hspd') ? config.hspd : Phaser.Math.Between(-100, 100);
        this.body.setVelocity(hspd,vspd);
        // this.body.velocity.x = Phaser.Math.Between(-100, 100);
        this.body.setBounce(0.2);
        this.body.drag.setTo(10, 0); // x, y

        this.addGold = 1;
        this.depth = 100000;
        this.cooldown = 1000;

        scene.loot.add(this);
        scene.cleanup.add(this);

        this.init();


    }

    update(time,delta){
        this.cooldown -= this.cooldown > 0 ? delta : 0;
        if(this.y > H){
            this.destroy();
        }
    }

    init(){
        this.play('coin');
    }
}