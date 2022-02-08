var upKey, leftKey, rightKey, downKey, attKey, spaceKey, activePointer, centerX, centerY, defaultVolume, animConfigs, hatsDb, hats, curHat, score, lives, level, chunksToFinish, heroes, curHero;
const MAX_SPEED = 400; // pixels/second
const DRAG = 1000; // pixels/second
const GRAVITY = 2600; // pixels/second/second
const JUMP_SPEED = -900; // pixels/second (negative y is up)
const ACCELERATION = 400; // pixels/second/second
const PLATFORM_DELAY = 3200;// milliseconds
const UNITSIZE = 32;
const HALFUNIT = 16;
const MAXENEMIES = 100;
const W = 1280;
const H = 640;
const VOID = 0;
const PLATFORM = 1;
const SAFETIME = 100;

const STATE_EN_IDLE = 0;
const STATE_EN_MOVE = 1;
const STATE_EN_HIT = 2;
const STATE_EN_ATTACK = 3;
const STATE_EN_JUMP = 4;
const STATE_EN_DIE = 5;

const STATE_PLATFORM_SOLID = 0;
const STATE_PLATFORM_PHASE = 1;
const STATE_PLATFORM_IDLE = 2;

const PLAYSTATE_MAIN = 0;
const PLAYSTATE_BOSS = 1;
const PLAYSTATE_MINIBOSS = 2;
const PLAYSTATE_DEATH = 3;

const fireInputIsActive = function() {
    return activePointer.isDown;
};

const upInputIsActive = function(){
    return upKey.isDown;
}

const downInputIsActive = function(){
    return downKey.isDown;
}

const leftInputIsActive = function(){
    return leftKey.isDown;
}

const rightInputIsActive = function(){
    return rightKey.isDown;
}

const jumpInputIsActive = function() {
    return upKey.isDown || spaceKey.isDown;
};
// 640x1280 = 20 x 40 units
// chunk = 10wx20h
// 4 chunks per page
var config = {
    type: Phaser.AUTO,
    width: W,
    height: H,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true,
        roundPixels: false
    },
    parent: 'ph_game',
    backgroundColor: '#000000',
    scene: [BootScene,MenuScene,GameScene,SettingsScene,HudScene,CreditScene,HoorayScene],
    physics: {
        default: 'arcade',
        arcade: {
//             gravity: { y: 2600 },
            fps: 260,
            debug:false,
        }
    },
};

var game = new Phaser.Game(config);