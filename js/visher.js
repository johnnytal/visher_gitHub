var visherMain = function(game){
	accelX = 0;
	resetSounds = true;
	GO_NUM = 7;
};

visherMain.prototype = {
    create: function(){ 
        angleText = game.add.text(500, 20, "Visher!", {font: '26px', fill: 'white'});

		initPlugIns();
		loadSounds();
    }
};

function readAccel(acceleration){
	accelX = Math.round(acceleration.x);
	
	angleText.text = accelX;
	
	if (accelX < -(GO_NUM) && !sound2.isPlaying && resetSounds){
		resetSounds = false;
		sound2.play();
		window.plugins.flashlight.switchOn();
		
		setTimeout(function(){
			window.plugins.flashlight.switchOff();
		}, 1000);
		
		game.stage.backgroundColor = '#ff00ff';
	}
	else if (accelX > GO_NUM && !sound1.isPlaying && resetSounds){
		resetSounds = false;
		sound1.play();
		window.plugins.flashlight.switchOn();
		
		setTimeout(function(){
			window.plugins.flashlight.switchOff();
		}, 1000);
		
		game.stage.backgroundColor = '#00ff00';
	}
	
	else if (accelX < Math.floor(GO_NUM / 2) && accelX > -(Math.floor(GO_NUM / 2))){
		resetSounds = true;
		game.stage.backgroundColor = '#000000';
	}
}

function initPlugIns(){
	try{navigator.accelerometer.watchAcceleration(readAccel, onError, { frequency: 5 });} catch(e){}

    try{window.plugins.insomnia.keepAwake();} catch(e){} // keep awake
    try{StatusBar.hide();} catch(e){} // hide status bar
    try{window.androidVolume.setMusic(100, false);} catch(e){} // max media volume
}

function loadSounds(){
	sound1 = game.add.audio('hu', 1, false);
	sound2 = game.add.audio('ha', 1, false);
}

function roundIt(_num){
	return Math.round(_num * 100) / 100;
}

function onError() {
    alert('Sorry, No acceleration reading detected!');
};