class GameScene extends Phaser.Scene {
    constructor()
    {
        super({key: 'GameScene', active: false});
        this.GAMEOVER = false;
        this.enemyTimer = undefined;
        this.lives = 3;
        this.chunks=[];
        this.chunkCount=0;

        this.chunkW = 10;
        this.chunkH = 20;
        this.resetX=0;
        this.resetY=0;

    }

    preload()
    {

    }

    create()
    {
        let that = this;
        this.cameras.main.setBackgroundColor(0x000000);
        this.addAnimations();


        //If world is bigger than the window
        this.worldWidth = this.physics.world.bounds.width;
        this.worldHeight = this.physics.world.bounds.height;
        this.bootScene = this.scene.get('BootScene');

        this.restart=false;
        this.reset = false;
        this.shakeCooldown = 0;
        this.floorLvl = 12;
        this.chunkX = 0;

        this.respawns = [];
        this.enemyDirection = 1;
        this.nextChunkTrigger = W/2;


        this.player = this.physics.add.sprite(0+HALFUNIT, this.floorLvl * UNITSIZE - (UNITSIZE*2), 'hero');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(false);
        this.player.body.maxVelocity.setTo(MAX_SPEED, MAX_SPEED * 5); // x, y
        this.player.body.drag.setTo(DRAG, 0);
        this.resetX = this.player.x;
        this.resetY = this.player.y;
        this.canDoubleJump = false;


        // groups
        this.platforms = this.physics.add.staticGroup();
        this.platformImages = this.add.group();
        this.enemies = this.add.group();
        this.shooters = this.physics.add.staticGroup();
        this.bullets = this.add.group();
        this.spikes = this.physics.add.staticGroup();

        // colliders
        this.physics.add.collider(this.player, this.platforms, this.collidePlatform);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.player, this.enemies, this.hitEnemy,false,this);
        this.physics.add.overlap(this.player, this.bullets, this.hitBullet,false,this);
        this.physics.add.collider(this.player, this.spikes, this.hitSpike,false,this);


        //this.makePlatforms();

        //this.startEnemies();

        for(let i=0;i<4;i++){
            let setRespawn = (i===0);
            this.makeChunk(setRespawn);
        }



        spaceKey = this.input.keyboard.addKey('space');  // Get key object
        activePointer = this.input.activePointer;
        upKey = this.input.keyboard.addKey('up');  // Get key object
        downKey = this.input.keyboard.addKey('down');  // Get key object
        leftKey = this.input.keyboard.addKey('left');  // Get key object
        rightKey = this.input.keyboard.addKey('right');  // Get key object

        upKey.on('down', function(event) {
            that.doubleJump();
        });
        spaceKey.on('down', function(event) {
            that.doubleJump();
        });

        // let chunkMarker = this.add.image((this.chunkW - 1) *UNITSIZE-1,(this.chunkW-1)*UNITSIZE-1,'hero');
        // chunkMarker.setOrigin(0);

        this.cameras.main.startFollow(this.player);
        //this.cameras.main.setFollowOffset(0, 128);
        this.cameras.main.setLerp(1,0);//STOPS VERTICAL FOLLOW

        this.scene.launch('HudScene');

    }

    addAnimations()
    {
        this.anims.create(animConfigs.fireball);
    }

    // xx will be the far left side. y is always 0
    makeChunk(setRespawn){

        this.chunks.push(this.chunkX);
        this.chunkCount++;
        //make a grid
        let ckGrid = [];
        for(var i=0; i<this.chunkW; i++){
            let ckRows = []
            for(var j=0;j<this.chunkH; j++){
                ckRows[j]=VOID;
            }
            ckGrid[i]=ckRows;
        }

        // add first SECTION
        // sections cannot be more than 3 wide. can be floor or void
        // first and last section must be floor
        // next section width cannot be more than remaining width
        let sectionW=Phaser.Math.Between(1,this.chunkW);
        let sectionType = PLATFORM;
        let lastSectionType = sectionType;
        let wRemaining = this.chunkW;
        let modFloor = undefined;
        let curX = 0;
        let firstFloorLvl = this.floorLvl;


        if(setRespawn){
            let px = this.chunkX + HALFUNIT;
            let py = (this.floorLvl*UNITSIZE) - HALFUNIT;
            let P = this.add.image(px,py+UNITSIZE,'square');
            P.setDepth(1);
            this.respawns.push([px,py-UNITSIZE]);
        }

        while(wRemaining>0){

            // First column will be floor
            for(let fx=curX;fx<sectionW+curX;fx++){
                for(let fy=this.floorLvl;fy<this.chunkH;fy++){
                    ckGrid[fx][fy]=sectionType;
                }
            }

            curX = sectionW+curX;
            wRemaining-=sectionW;
            sectionW= Math.min(Phaser.Math.Between(1,wRemaining),3);
            if(lastSectionType===VOID && sectionW>1){
                sectionType=PLATFORM;
            }else{
                sectionType = Phaser.Math.Between(VOID,PLATFORM);
            }
            lastSectionType = sectionType;
            if(sectionType===PLATFORM){
                modFloor = Phaser.Math.Between(0,6) - 3;
                this.floorLvl += modFloor;
                this.floorLvl = this.floorLvl < 4 ? 4 : this.floorLvl >= this.chunkH ? this.chunkH-1 : this.floorLvl;
            }
        }

        // Last section must be floor
        for(let fy=this.floorLvl;fy<this.chunkH;fy++){
            ckGrid[this.chunkW-1][fy]=PLATFORM;
        }

        // make mini platforms
        // && ckGrid[i-1][j]!=VOID
        for(let k=0;k<2;k++){
            for(var i=1; i<this.chunkW-1; i++){
                // scan down the rows for a platform
                for(var j=0;j<this.chunkH; j++){
                    if(ckGrid[i][j]===PLATFORM){
                        // We have a platform. We could make a mini platform.
                        if( j>3 && Phaser.Math.Between(1,5)===5 ){
                            // make a mini
                            ckGrid[i][j-3]=PLATFORM;
                        }
                        break;
                    }
                }
            }
        }


        //INSTANTIATE chunk
        for(var i=0; i<this.chunkW; i++){
            for(var j=0;j<this.chunkH; j++){
                if(ckGrid[i][j]===PLATFORM){
                    if(
                        ckGrid[Math.max(i-1,0)][j] === VOID
                        || ckGrid[Math.min(i+1,this.chunkW-1)][j] === VOID
                        || ckGrid[i][Math.max(j-1,0)] === VOID
                        || ckGrid[i][Math.min(j+1,this.chunkH-1)] === VOID

                    ){
                        // instatiate floor
                        let P = this.add.sprite(this.chunkX+(i*UNITSIZE),j*UNITSIZE,'platform');
                        P.setOrigin(0);
                        this.platforms.add(P);

                        if( Phaser.Math.Between(1,100)===100 && !setRespawn && j!=firstFloorLvl){
                            let P = new Shooter(this, this.chunkX+(i*UNITSIZE) + HALFUNIT,j*UNITSIZE + HALFUNIT);
                            let chooseAngle = Phaser.Math.Between(0,3);
                            if(chooseAngle===0){
                                P.angle = 180;
                            }else if(chooseAngle===1){
                                P.angle = -90;
                            }else if(chooseAngle===2){
                                P.angle = 90;
                            }else{
                                P.angle = 0;
                            }
                            this.shooters.add(P);
                        }else if(Phaser.Math.Between(1,10)===10 && j!=firstFloorLvl && ckGrid[i][Math.max(j-1,0)] === VOID){
                            let S = new Spikes(this, this.chunkX+(i*UNITSIZE) + HALFUNIT,j*UNITSIZE);
                            this.spikes.add(S);
                        }

                    }else{
                        // images are lighter weight, less memory.
                        let P = this.add.image(this.chunkX+(i*UNITSIZE),j*UNITSIZE,'platform');
                        P.setOrigin(0);
                        this.platformImages.add(P);
                    }

                }
            }
        }

        //blue
        for(var i=0; i<this.chunkW; i++){
                if(ckGrid[i][this.chunkH-1]===PLATFORM){
                    // instatiate floor
                    let P = this.add.image(this.chunkX+(i*UNITSIZE),(this.chunkH-1)*UNITSIZE,'blueSquare');
                    P.setOrigin(0);
                }
        }


        this.chunkX+=this.chunkW * UNITSIZE;

    }




    startEnemies = function(){
        this.enemyTimer = this.time.addEvent({
            delay: 5000,                // ms
            callback: this.makeEnemy,
            //args: [],
            callbackScope: this,
            loop: true
        });
    }

    makeShooter(x,y){
        let shooter = new Shooter(this,x,y,);
        shooter.angle = -90;
        // shooter.rotation = 90;
        this.shooters.add(shooter);
    }

    makeEnemy = function(){
        if(this.enemies.countActive(true) >= MAXENEMIES) return false;
        let enemy = this.physics.add.sprite(W/2,32,'enemy');
        enemy.setBounce(0.2);
        enemy.setCollideWorldBounds(false);
        enemy.body.maxVelocity.setTo(MAX_SPEED, MAX_SPEED * 10); // x, y
        enemy.body.acceleration.x = ACCELERATION/2 * this.enemyDirection;
        this.enemies.add(enemy);
        this.enemyDirection *= -1;
    }

    collidePlatform(player,platform){

    }

    playerLoseLife(){
        if(this.restart) return false;

        this.lives--;
        this.events.emit('playerDied');

        if(this.lives<0){
            this.gameOver();
        }else{
            this.reset = true;
        }
    }


    hitEnemy(player,enemy){

        this.shakeIt();
        if(player.y <= enemy.y-UNITSIZE){
            enemy.destroy();
        }else if(enemy.y <= player.y-UNITSIZE){
            this.playerLoseLife();
        }
    }

    hitBullet(player,bullet){
        if(this.GAMEOVER) return false;
        this.shakeIt();
        bullet.destroy();
        this.playerLoseLife();
    }

    hitSpike(player,spike){
        if(this.GAMEOVER) return false;
        this.shakeIt();
        this.playerLoseLife();
    }

    shakeIt(){
        if(this.shakeCooldown<1){
            this.shakeCooldown = 1000;
            this.cameras.main.shake(50,.005,.005);
        }
    }

    doubleJump(){
        if(this.canDoubleJump){
            this.canDoubleJump = false;
            this.player.body.velocity.y = JUMP_SPEED;
        }
    }

    update(time,delta)
    {

        if(this.restart){
            this.scene.restart();
        }
        if(this.reset){
            this.reset = false;
            this.player.body.velocity.y = 0;
            this.player.body.velocity.x = 0;
            this.player.x=this.resetX;
            this.player.y=this.resetY-UNITSIZE;
        }
        this.shakeCooldown-=delta;

        let onTheGround = this.player.body.touching.down;

        if (onTheGround) {
            // Jump when the player is touching the ground and the up arrow is pressed
            if(jumpInputIsActive()){
                this.player.body.velocity.y = JUMP_SPEED;
                this.canDoubleJump = true;
            }else{
                this.canDoubleJump = false;
            }
        }

        if (leftInputIsActive()) {
            // If the LEFT key is down, set the player velocity to move left
            this.player.body.acceleration.x = -ACCELERATION;
        } else if (rightInputIsActive()) {
            // If the RIGHT key is down, set the player velocity to move right
            this.player.body.acceleration.x = ACCELERATION;
        } else {
            this.player.body.acceleration.x = 0;
        }

        let eArray = this.enemies.getChildren();
        for (var i = 0; i < eArray.length; i++) {
            let emy = eArray[i];

            if(emy.body.touching.right){
                emy.body.acceleration.x = ACCELERATION/2 * -1;
            }else if(emy.body.touching.left){
                emy.body.acceleration.x = ACCELERATION/2;
            }else{
                //do nothing
            }

            if(emy.x < 0 - UNITSIZE/2){
                if(emy.y>H-64){
                    emy.y=0;
                    emy.x=W/2;
                }else{
                    emy.x = W+UNITSIZE/2;
                }
            }else if(emy.x > W+UNITSIZE/2){
                if(emy.y>H-64){
                    emy.y=0;
                    emy.x=W/2;
                }else{
                    emy.x = UNITSIZE/2;
                }
            }else if(emy.y > H){
                emy.destroy();
            }
        }

        let pArray = this.platforms.getChildren();
        let playerX = this.player.x;
        for (var i = 0; i < pArray.length; i++) {
            let plat = pArray[i];
            if(plat.x< playerX - (W*2)){
                plat.destroy();
            }
        }

        pArray = this.platformImages.getChildren();
        for (var i = 0; i < pArray.length; i++) {
            let plat = pArray[i];
            if(plat.x< playerX - (W*2)){
                plat.destroy();
            }
        }

        for(let i=0;i<this.respawns.length;i++){
            if(this.player.x > this.respawns[i][0]){
                this.resetX = this.respawns[i][0];
                this.resetY = this.respawns[i][1];
                this.respawns.splice(i,1);
            }
        }

        if(this.player.x>=this.nextChunkTrigger){
            this.nextChunkTrigger+=W/2;
            for(let i=0;i<4;i++){
                let setRespawn = (i===0)
                this.makeChunk(setRespawn);
            }
        }




        this.shooters.children.each((e)=>{
            if(e.x< playerX - (W*2)){
                e.destroy();
            }else{
                e.update(time,delta);
            }
        });


        this.bullets.children.each((e)=>{
            if(e.x<this.player.x - W/2
                || e.x>this.player.x + W/2
                || e.y>H
                || e.y<0
            ){
                e.destroy();
            }
        });

        if(this.player.y>H+512){
            this.playerLoseLife();
        }

    }
    
    gameOver(){

        if(this.GAMEOVER) return false;
        this.GAMEOVER = true;
        this.player.setAlpha(0);
        this.cameras.main.stopFollow();
        this.events.emit('gameOver');
    }

    gameRestart(){
        this.lives = 3;
        this.GAMEOVER=false;
        this.restart=true;
    }

}