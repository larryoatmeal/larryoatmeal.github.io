window.onload = main;


function main() {
	navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );
	
	
	renderDrumPad(2);
	/*
	lightUpDrumPad(0, 0.25);
	lightUpDrumPad(1, 0.5);
	setTimeout(function(){darkenDrumPad(1)}, 1000);
	*/

	onHit(hit);

	
}

var cur_bank = '808';

function hit(n){
	/*var freq = (n.y*9000) + 300;

	var lowPassFilter = new Pizzicato.Effects.LowPassFilter({
	    frequency: freq,
	    peak: 10
	});*/

	if (n.hand == "left"){
		playSound(cur_bank, 0, n.strength, n.y);

		lightUpDrumPad(0,n.strength);
		setTimeout(function(){darkenDrumPad(0)}, 100);
	}

	else{
		playSound(cur_bank, 1, n.strength, n.y);

		lightUpDrumPad(1,n.strength);
		setTimeout(function(){darkenDrumPad(1)}, 100);
	}
	console.log(n);
}


function loadAndPlay(bankname){
	loadDrumBank(bankname, console.log);
	cur_bank = bankname;
}



/*
function updateNumPads(numPads) {
	changeNumPads(numPads);
	socket.emit('updateNumPads', numPads);
}
*/

