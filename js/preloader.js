var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){
        game.load.audio('hu', 'assets/audio/hu.ogg');
        game.load.audio('ha', 'assets/audio/ha.ogg');
    },
    
    create: function(){
        this.game.state.start("Visher"); 
    }
};