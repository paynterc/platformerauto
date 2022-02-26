class Coin extends Loot {


    onPickup(player){
            score++;

            this.myScene.soundCoinPickup.play();
    }



    init(){
        this.addGold = 1;
        this.play('coin');
        this.body.setVelocity(Phaser.Math.Between(-100, 100),-500);
    }
}