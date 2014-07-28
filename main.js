
var mainState = {
    head: null,
    
    preload: function() {
        game.load.image('head', 'assets/player.png');
    },
    
    create: function() {
        this.head = game.add.sprite(200, 200, 'head');
        this.head.anchor.set(0.5, 0.5);
    },
    
    update: function() {
        
    }
};

var game = new Phaser.Game(400, 400, Phaser.AUTO, 'game');

game.state.add('main', mainState);
game.state.start('main');
