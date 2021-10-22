class Watcher extends Enemy {


    init() {

        this.anmDie = undefined;// will default to destroy event
        this.anmIdle = 'watcherIdle';

        // Override this
        this.defaultAcc = 0;// stands still


    }


}