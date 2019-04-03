var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){
        game.load.audio('hu', 'assets/audio/hu.mp3');
        game.load.audio('ha', 'assets/audio/ha.mp3');
        
        game.load.image('bg', 'assets/images/bg.png');
        game.load.image('wiper', 'assets/images/wiper.png');
    },
    
    create: function(){
        this.game.state.start("Visher"); 
    }
};