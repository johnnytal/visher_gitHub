var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){
        game.load.audio('hu', 'assets/audio/hu.mp3');
        game.load.audio('ha', 'assets/audio/ha.mp3');
    },
    
    create: function(){
        this.game.state.start("Visher"); 
    }
};