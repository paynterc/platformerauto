class HatLoot extends Loot {


    onPickup(player){
        // add the hat
        curHat = this.hatKey;
        let hatConfig = hats.filter(obj => {
          return obj.img == curHat;
        });
        hatConfig.hasHat=true;
        this.myScene.soundCoinPickup.play();
        this.myScene.spawnHat();
    }



    init(){

        this.hatKey = this.myConfig.hasOwnProperty('img') ? this.myConfig.img : 'blobCrown';

        this.addGold = 0;
        this.body.setVelocity(0,-500);

    }
}