let scratching = false;
loadScratches(console.log);

$(document).mousemove(detectScratch);

function detectScratch(event) {
	// create an array of mouse coords over 100 ms
	let coords = [];

	$(document).mousemove(addCoords)

	function addCoords(e) {
		coords.push({x: e.pageX, y: e.pageY})
	}

	setTimeout(() => {
		let is_scratch = checkMotion(coords);
		if (is_scratch && !scratching) {
			scratching = true;
			createScratch();
		}
		if (!is_scratch && scratching) {
			scratching = false;
			stopScratch();
		}
	}, 100);
}

function checkMotion(coords) {
	// mouse should not have moved more than 100 px horzontally
	// mouse should have moved more than 150 px vertically
	let all_x = coords.map((coord) => coord.x);
	let all_y = coords.map((coord) => coord.y);

	let x_diff = Math.max(...all_x) - Math.min(...all_x);
	let y_diff = Math.max(...all_y) - Math.min(...all_y);

	if (y_diff > 150 && x_diff < 100) {
		return true;
	} else {
		return false;
	}
}

function createScratch() {
	// play random record scratch, at most once every half second
	playScratch();

	var sparkles = $(document.body).sparkleh();
	for(var i = 0; i < sparkles.length; i++){
		sparkles[i].over();
	}

	setTimeout(() => {
		scratching = false;
		for(var i = 0; i < sparkles.length; i++){
			sparkles[i].out();
		}
	}, 500);



}