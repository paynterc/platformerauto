class Kid extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'kidCry');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.myScene = scene;


        // this.body.velocity.x = Phaser.Math.Between(-100, 100);
        this.body.setBounce(0.02);
        this.body.drag.setTo(10, 0); // x, y
        this.body.setGravityY(GRAVITY);

        this.depth = 100000;
        this.cooldown = 500;
        this.ascending = false;

        scene.kids.add(this);
        scene.cleanup.add(this);

        this.init();


    }

    ascend(){
        if(!this.ascending){
            this.ascending=true;
            this.play('kidAscend');
            this.body.setGravityY(0);
            this.body.acceleration.y = -20;
        }
    }

    update(time,delta){
        this.cooldown -= this.cooldown > 0 ? delta : 0;
        if(this.y > H*5 || this.y<H*-2){
            this.destroy();
        }
    }

    init(){
        this.play('kidCry');
    }
}