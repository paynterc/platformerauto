class GusGuy extends EnemyFly {


    init() {

        // Override this
        // this.body.allowGravity = false;
        this.defaultAcc = 5;
        this.defaultVelocityY = 45;
        this.body.velocity.y = this.defaultVelocityY ;
        // inity + (a * sin(2 * PI * f * t + phase));
        // let a = 16;//amplitude
        // let PI = 3.14;
        // let f = 2;//frequency
        // let t = time;//time, some chaning parameter
        // let accMod = (a * sin(2 * PI * f * t + phase))

        this.anmIdle = 'gusGuyIdle';
        this.anmWalk = 'gusGuyIdle';
        this.anmRun = 'gusGuyIdle'
        this.anmHit = 'gusGuyIdle';
        this.anmAttack = 'gusGuyIdle';
        this.anmDie = null;


        this.nextShoot = 0;
        this.myDelay = 5000;
    }



}