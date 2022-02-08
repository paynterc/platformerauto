class Gate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, config.hasOwnProperty('img') ? config.img : 'redSquare');
        this.setOrigin(0,0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        scene.gates.add(this);
        this.myScene = scene;

//        let vspd = config.hasOwnProperty('vspd') ? config.vspd : -500;
//        let hspd = config.hasOwnProperty('hspd') ? config.hspd : Phaser.Math.Between(-100, 100);
        this.toggleTime = config.hasOwnProperty('toggleTime') ? config.toggleTime : Phaser.Math.Between(4000,6000);

        this.toggleTimer = this.toggleTime;
        this.autoToggle = config.hasOwnProperty('autoToggle') ? config.autoToggle : true;
        this.visible = true;

        this.init();

    }

    update(time,delta){
        if(this.autoToggle){
            this.toggleTimer -= delta;
            if(this.toggleTimer<=0){
                this.toggleTimer = this.toggleTime;
                this.toggle();
            }
        }

    }

    toggle(){
        this.body.enable = !this.body.enable;
        this.visible = !this.visible;
        this.setVisible(this.visible);
    }

    init(){

    }
}