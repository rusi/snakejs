
var mainState = {
    head: null,
    cursor: null,
    step: {x: 0, y: 0},
    snakeSpeed: 200,
    
    preload: function() {
        game.load.image('head', 'assets/player.png');
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursor = game.input.keyboard.createCursorKeys();
        
        this.head = game.add.sprite(0, 0, 'head');
        // this.head.anchor.set(0.5, 0.5);
        // this.head.scale.x = 2;
        // this.head.scale.y = 2;
        game.physics.arcade.enable(this.head);
        this.head.body.collideWorldBounds = true;
        
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        
        upKey.onDown.add(this.goUp, this);
        downKey.onDown.add(this.goDown, this);
        leftKey.onDown.add(this.goLeft, this);
        rightKey.onDown.add(this.goRight, this);
        
        game.time.events.loop(this.snakeSpeed, this.moveSnake, this);
        //this.moveSnake();
    },
    
    goUp: function() {
        this.step.x = 0;
        this.step.y = -this.head.height;
    },
    goDown: function() {
        this.step.x = 0;
        this.step.y = this.head.height;
    },
    goLeft: function() {
        this.step.x = -this.head.width;
        this.step.y = 0;
    },
    goRight: function() {
        this.step.x = this.head.width;
        this.step.y = 0;
    },
    
    moveSnake: function() {
        if (this.tween && this.tween.isRunning)
            return;
            
        var toX = this.head.x + this.step.x;
        var toY = this.head.y + this.step.y;
        if (toX < 0 || toY < 0 || toX >= game.world.width || toY >= game.world.height) {
            this.step.x = 0;
            this.step.y = 0;
        } else {
            // this.head.x = toX;
            // this.head.y = toY;
            // this.step.x = 0;
            // this.step.y = 0;
            this.tween = game.add.tween(this.head);
            this.tween.to({x: toX, y: toY}, this.snakeSpeed, null, true);
            this.tween.onComplete.addOnce(function() {
        		this.moveSnake();
        	}, this);
        }
    },
    
    update: function() {
        //this.movePlayer();
    },
    
    render: function() {
        //game.debug.spriteInfo(this.head, 32, 32);
        var s = game.world.width / this.head.width;
        var w = this.head.width;
        for (var i = 0; i < s; ++i) {
            game.debug.geom(new Phaser.Line(w*i, 0, w*i, game.world.height));
        }
        for (var i = 0; i < s; ++i) {
            game.debug.geom(new Phaser.Line(0, w*i, game.world.width, w*i));
        }
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
