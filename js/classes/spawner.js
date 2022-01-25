class Spawner extends Enemy {


    kill(){
        let ngl = -60;
        let spawnArray = [];
        spawnArray.push(new Enemy(this.myScene, this.x-60,this.y,1,{img:'kahLessSquare',anmIdle:'kahLessSquareWalk'}));
        spawnArray.push(new Enemy(this.myScene, this.x,this.y,1,{img:'kahLessFire'}));
        spawnArray.push(new Enemy(this.myScene, this.x+60,this.y,1,{img:'kahLessFall'}));

        
        
        for(let i=0;i<3;i++){
            let spawn = spawnArray[i];
            let vspd =  -500;
            let hspd = ngl;
            spawn.body.setVelocity(hspd,vspd);
            spawn.body.setBounce(0.2);
            ngl+= 60;
        }

        if(this.myState != STATE_EN_DIE){
            this.myState = STATE_EN_DIE;
        }
    }

}