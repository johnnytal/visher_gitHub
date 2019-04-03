var visherMain = function(game){
	GO_NUM = 25;
	
	HU_COLOR = '#ff00ff';
	HA_COLOR = '#f0ff0f';
};

visherMain.prototype = {
    create: function(){ 
    	game.stage.backgroundColor = '#ff4502';
    	
        wipers = game.add.group();
		wipers.enableBody = true;
		wipers.physicsBodyType = Phaser.Physics.ARCADE;
		
		wiper = wipers.create(0, 0, 'wiper');

        wiper.y = HEIGHT / 2 + wiper.height / 4;
        wiper.x = (WIDTH / 2 - wiper.width / 2)  + 500;
        
        wiper.anchor.set(1, .5);
        
        wiper.body.collideWorldBounds = true;

    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
        debug_text = game.add.text(250, 50, "Vish it!", {font: '32px', fill: 'white'});
        
        loadSounds();
        initPlugIns();

    	window.addEventListener("devicemotion", readVisherAccel, true);
    },
    
    update: function(){
    	if (wiper.angle < -GO_NUM && game.stage.backgroundColor != 16711935){
			haSfx.play();
			flashVisher(HU_COLOR);	
		}
    	
    	else if (wiper.angle > GO_NUM && game.stage.backgroundColor != 15793935){    		
			huSfx.play();
			flashVisher(HA_COLOR);
		}	
	}
};

function readVisherAccel(event){
	wiper.angle = event.accelerationIncludingGravity.x * 3;
	debug_text.text = Math.round(event.accelerationIncludingGravity.x * 100) / 100;
}

function flashVisher(_color){
	window.plugins.flashlight.switchOn();
	setTimeout(function(){navigator.vibrate(35);}, 20);	
	game.stage.backgroundColor = _color;
	
	setTimeout(function(){
		window.plugins.flashlight.switchOff();
	}, 100);	
}

function loadSounds(){
	huSfx = game.add.audio('hu', 1);
	haSfx = game.add.audio('ha', 1);
}

function initPlugIns(){
    try{window.plugins.insomnia.keepAwake();} catch(e){} // keep device awake
    try{StatusBar.hide();} catch(e){} // hide status bar
    try{window.androidVolume.setMusic(100, false);} catch(e){} // change device media volume to maximum
}