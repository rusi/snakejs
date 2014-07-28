
var mainState = {
    head: null,
    cursor: null,
    
    preload: function() {
        game.load.image('head', 'assets/player.png');
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursor = game.input.keyboard.createCursorKeys();
        
        this.head = game.add.sprite(200, 200, 'head');
        this.head.anchor.set(0.5, 0.5);
        //console.log(this.head.width + ", " + this.head.height);
        this.head.scale.x = 2;
        this.head.scale.y = 2;
        game.physics.arcade.enable(this.head);
        this.head.body.collideWorldBounds = true;
        //console.log(this.head.width + ", " + this.head.height);
    },
    
    update: function() {
        this.movePlayer();
    },
    
    movePlayer: function() {
        var v = null;
        if (this.cursor.left.isDown) {
            this.head.body.velocity.x = -300;
            this.head.body.velocity.y = 0;
            v = {x: -300, y: 0};
        } else if (this.cursor.right.isDown) {
            this.head.body.velocity.x = 300;
            this.head.body.velocity.y = 0;
            v = {x: 300, y: 0};
        } else if (this.cursor.up.isDown) {
            this.head.body.velocity.x = 0;
            this.head.body.velocity.y = -300;
            v = {x: 0, y: -300};
        } else if (this.cursor.down.isDown) {
            this.head.body.velocity.x = 0;
            this.head.body.velocity.y = 300;
            v = {x: 0, y: 300};
        }
        // if (v !== null)
        //     this.head.body.velocity = v;
    }
};

var game = new Phaser.Game(400, 400,
    Phaser.CANVAS, //Phaser.AUTO,
    'game');

game.state.add('main', mainState);
game.state.start('main');
