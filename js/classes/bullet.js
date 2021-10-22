class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, rotation, config = {}) {

        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'fireball');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.myScene = scene;


        if(config.hasOwnProperty('anm')){
            this.play(config.anm);
        }

        this.allowGrav = config.hasOwnProperty('allowGrav') ? config.allowGrav : false;
        this.initSpeed = config.hasOwnProperty('initSpeed') ? config.initSpeed : 128;
        this.accelerate = config.hasOwnProperty('accelerate') ? config.accelerate : false;
        let myGroup = config.hasOwnProperty('myGroup') ? config.myGroup : scene.bullets;


        this.body.setAllowGravity(this.allowGrav);
        this.angle = rotation;
        this.rotation = rotation;
        const vec = new Phaser.Math.Vector2();
        vec.setToPolar(this.rotation, this.initSpeed);// 500 is the bullet speed
        if(this.accelerate){
            this.body.acceleration = vec;
        }else{
            this.body.velocity = vec;
        }


        this.init();

        myGroup.add(this);

    }


    init(){

    }
}