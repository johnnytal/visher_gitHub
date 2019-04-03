var visherMain = function(game){
	GO_ANGLE = 25; // the visher angle which makes the sound trigger
	
	HU_COLOR = '#ff00ff';
	HA_COLOR = '#f0ff0f';
};

visherMain.prototype = {
	
	/*
	 // LOADING VIA JSON  //

	 preload: function(){
        var mediaJson = game.cache.getJSON('media'); // media.json is the name of the file from the server
		
		sound_to_play1 = mediaJson.sound1; // e.g "sound1":"huSfx.mp3"
		sound_to_play2 = mediaJson.sound2;	
		image = mediaJson.bg; 

        game.load.audio('huSfx', 'assets/audio/' + sound_to_play1);
        game.load.audio('huSfx', 'assets/audio/' + sound_to_play2);
        game.load.image('wiper', 'assets/images/' + image);
	}, */
	  
    create: function(){ 
    	game.stage.backgroundColor = '#ff4502';

		wiper = game.add.sprite(0, 0, 'wiper'); // the wiper image is mostly for debugging purposses
		wiper.enableBody = true;
		wiper.physicsBodyType = Phaser.Physics.ARCADE;

        wiper.y = HEIGHT / 2 + wiper.height / 4;
        wiper.x = (WIDTH / 2 - wiper.width / 2)  + 500;
        wiper.anchor.set(1, .5);

    	game.add.image(0, 0, 'bg').alpha = 0.6;
 
        debug_text = game.add.text(250, 50, "Vish it!", {font: '32px', fill: 'white'});
        
        loadSounds();
        initPlugIns();

    	window.addEventListener("devicemotion", readVisherAccel, true);
    	//https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent
    },
    
    update: function(){
    	if (wiper.angle < -GO_ANGLE && game.stage.backgroundColor != 16711935){
			haSfx.play();
			flashVisher(HU_COLOR);	
		}
    	
    	else if (wiper.angle > GO_ANGLE && game.stage.backgroundColor != 15793935){    		
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
	window.plugins.flashlight.switchOn(); //flash
	navigator.vibrate(35); //vibrate
	game.stage.backgroundColor = _color; //change color
	
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