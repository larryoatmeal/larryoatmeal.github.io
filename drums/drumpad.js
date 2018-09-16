function renderDrumPad(num_boxes) {
	const drumpad = document.getElementById('drumpad');
	const drumpadSpan = document.createElement('div');
	drumpadSpan.className = "row align-items-center";
	drumpad.appendChild(drumpadSpan);

	for (var i = 0; i < num_boxes; i++) { 
		const pad = document.createElement('div');
		pad.className = "col";
		drumpadSpan.appendChild(pad);

		const padBody = document.createElement('div');
		padBody.className = "card";
		var pad_id = "pad" + i.toString();
		padBody.setAttribute('id', pad_id);
		pad.appendChild(padBody);
	}
}

function lightUpDrumPad(pad_id, hitKeysRatio) {
	const id = "pad" + pad_id.toString();
	var pad = document.getElementById(id);

	var red;
	var green;

	//special modifications due to hitKeysRatio being .25, .5, .75.1
	if (hitKeysRatio > 0.25){
		red = (255).toString(16);
		green  = Math.floor((1-hitKeysRatio)*(2)*(255)).toString(16);

		if (green == "0"){
			green = "00"
		}
	}

	else{
		red = Math.floor((hitKeysRatio - 0.25)*(4)*(255)).toString(16);
		green = (255).toString(16);
		if (red == "0"){
			red = "00"
		}
	}

	var borderAttribute = 'border-color: ' + '#' + red + green + '00';
	var boxShadow = 'border-color: ' + '#' + red + green + '00; box-shadow: 0px 0px 20px 10px ' + "#" + red + green + '00, inset 0px 0px 10px 2px ' + "#" + red + green + '00';



	//pad.setAttribute('style', borderAttribute);
	pad.setAttribute('style', boxShadow);
}

function darkenDrumPad(pad_id) {
	const id = "pad" + pad_id.toString();
	var pad = document.getElementById(id);
	pad.setAttribute('style', 'border-color: var(--dark_color)');
}


function changeNumPads(numPads) {
	//at some point, add setting active in dropdown menu
	const drumpad = document.getElementById('drumpad');
	drumpad.innerHTML = "";
	renderDrumPad(numPads);
}