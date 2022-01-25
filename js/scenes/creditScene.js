class CreditScene extends Phaser.Scene{
    constructor ()
    {
        super({key: 'CreditScene', active: false});
    }

    preload()
    {
        this.makeCreditData();

    }

    create ()
    {
        let that = this;
        this.titleText = this.add.text(centerX, 64, "ART  BY  MLC  STUDENTS", { fontSize: '64px', fontFamily: 'FourBitRegular' }).setTint('0x00ff00');
        this.titleText.setOrigin(0.5);

        this.startText = this.add.text(centerX, H-32, "HOME", { fontSize: '32px', fontFamily: 'FourBitRegular' });
        this.startText.setOrigin(0.5).setTint('0x00ff00');
        this.startText.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            that.scene.start('MenuScene');
        });
        
        this.addAnimations();
        
        //this.rollCredits();
        
        this.delayTime=100;
        this.delayTimer=this.delayTime;
        this.cIndex = 0;
        this.imgSpr=null;
        this.nameText = this.add.text(W/2, H/2 - 64, '', { fontSize: '64px', fontFamily: 'FourBitRegular' }).setOrigin(0.5);
        this.titleText = this.add.text(W/2, H/2 + 64, '', { fontSize: '64px', fontFamily: 'FourBitRegular' }).setOrigin(0.5);
        
        
        this.codeCredit = this.add.text(W/2, H-96, 'Code by Chris Paynter', { fontSize: '18px', fontFamily: 'FourBitRegular' }).setOrigin(0.5);
        this.musicCredit = this.add.text(W/2, H-72, 'Music: "Visiting the City With Your Kart" by Komiku', { fontSize: '18px', fontFamily: 'FourBitRegular' }).setOrigin(0.5);

        
        this.updateCredits(0);
        
    }
    
    makeCreditData(){
    	this.creditData = [
    	{name:'Gabe',title:'Hell Spawn',img:'hellSpawnMove',anm:'hellSpawnMove',scale:4},
    	{name:'Otto',title:'Ghost',img:'ottoGhost',anm:'ottoGhost',scale:3},
    	{name:'Gus',title:'Buzz Face',img:'gusguy',anm:'gusGuyIdle',scale:1.5},
    	{name:'Calliope',title:'Mushroom',img:'calliopeMushroom',anm:'mushroomIdle',scale:4},
    	{name:'Willow',title:'Portal',img:'willowPortal',scale:3},
    	{name:'Parker',title:'Commander',img:'commander',anm:'commanderWalk',scale:.5,org:{xx:.5,yy:.65}},
    	{name:'Oliver',title:'Blue',img:'oliverBlueWalk',anm:'oliverBlueWalk',scale:2},
    	{name:'Rock',title:'Rock Thing',img:'rockHammerGuy',anm:'rockHammerWalk',scale:2},
    	{name:'Ozzie',title:'You Died!',img:'ozzieYouDied',anm:'ozzieYouDied',scale:2},
    	{name:"Kah' Less",title:'Trans Power',img:'kahlessRainbow',anm:'kahlessRainbow',scale:1.5,org:{xx:.5,yy:.35}},
    	{name:'Calliope',title:'Slime Blob',img:'slimeBlob',anm:'slimeBlobWalk',scale:1.5,org:{xx:.5,yy:.35}},
		{name:'Parker',title:'Archer',img:'parkerArcher',anm:'parkerArcher'},
		{name:'Otto',title:'Green Dot',img:'greenDotIdle',anm:'greenDotIdle'},

    	];
    }
    
    rollCredits(){
    	let xStart = W/6;
    	let xx = xStart;
    	let yy = 160;
    	let xSpacing = W/3;
    	let ySpacing = 160;
    	for(let i=0;i<this.creditData.length;i++){
    	    
    	        		
        	if((i % 3 == 0) ){
        		xx = xStart;
        		yy+= i>0 ? ySpacing : 0;
        	}else{
            	xx+=xSpacing;
        	}
    	    
    	    let config = this.creditData[i];

    		this.add.text(xx, yy, config.name, { fontSize: '32px', fontFamily: 'FourBitRegular' }).setOrigin(0.5);
    	
    		let spr = this.add.sprite(xx,yy + 32,config.img);
    		spr.setScale(config.hasOwnProperty('scale') ? config.scale : 2);
    		if(config.hasOwnProperty('org')){
    			spr.setOrigin(config.org.xx,config.org.yy);
    		}
    		if(config.hasOwnProperty('anm')){
    			spr.play(config.anm);
    		}
    		
    		this.add.text(xx, yy+64, config.title, { fontSize: '28px', fontFamily: 'FourBitRegular' }).setOrigin(0.5);
        	
    	}
    	
    }
    
    updateCredits(idx){
    	if(this.imgSpr!==null){
    		this.imgSpr.destroy();		 		
    	}
    	
    	
    	let config = this.creditData[idx];

    	this.imgSpr = this.add.sprite(W/2,H/2,config.img);
		this.imgSpr.setScale(config.hasOwnProperty('scale') ? config.scale : 2);
		if(config.hasOwnProperty('org')){
			this.imgSpr.setOrigin(config.org.xx,config.org.yy);
		}
		if(config.hasOwnProperty('anm')){
			this.imgSpr.play(config.anm);
		}
		
		this.nameText.setText(config.name);
		this.titleText.setText(config.title);
    	
    }
    
    update(time,delta){
    
    	this.delayTimer--;
    	if(this.delayTimer<1){
    		this.delayTimer=this.delayTime;
    		this.cIndex++;
    		if(this.cIndex>=this.creditData.length){
    			this.cIndex=0;
    		}
    		this.updateCredits(this.cIndex);
    	}
    
    }
    
    
    addAnimations()
    {
        this.anims.create(animConfigs.fireball);
        this.anims.create(animConfigs.emyIdle);
        this.anims.create(animConfigs.emyHit);
        this.anims.create(animConfigs.emyWalk);
        this.anims.create(animConfigs.emyDie);
        this.anims.create(animConfigs.coin);
        this.anims.create(animConfigs.emyYellowFly);
        this.anims.create(animConfigs.emyYellowDie);
        this.anims.create(animConfigs.bossCrabWalk);
        this.anims.create(animConfigs.watcherIdle);
        this.anims.create(animConfigs.commanderWalk);
        this.anims.create(animConfigs.commanderAttack1);
        this.anims.create(animConfigs.gusGuyIdle);
        this.anims.create(animConfigs.crownPhase);
        this.anims.create(animConfigs.hellSpawnMove);
        this.anims.create(animConfigs.hellSpawnDie);
        this.anims.create(animConfigs.oliverBlueWalk);
        this.anims.create(animConfigs.oliverBlueDie);
        this.anims.create(animConfigs.ottoGhost);
        this.anims.create(animConfigs.parkerArcher);
        this.anims.create(animConfigs.kahlessRainbow);
        this.anims.create(animConfigs.ozzieYouDied);
        this.anims.create(animConfigs.mushroomIdle);
        this.anims.create(animConfigs.mushroomBuilding);
        this.anims.create(animConfigs.rockHammerWalk);
        this.anims.create(animConfigs.rockHammerAttack);
        this.anims.create(animConfigs.rockFire);
        this.anims.create(animConfigs.slimeBlobWalk);
        this.anims.create(animConfigs.greenDotIdle);

    }
    
    
}