var BUFFER_TIME = 40;
var $keyDowns = rxjs.fromEvent(document, 'keydown');

leftHandKeyMap = {
	'1': [0, 0], 
	'2': [0, 1], 
	'3': [0, 2], 
	'4': [0, 3], 
	'5': [0, 4], 
	'6': [0, 5],
	'q': [1, 0],  
	'w': [1, 1],  
	'e': [1, 2],  
	'r': [1, 3],  
	't': [1, 4],  
	'a': [2, 0],  
	's': [2, 1],  
	'd': [2, 2],  
	'f': [2, 3],  
	'g': [2, 4],
	'h': [2, 5],
	'z': [3, 0],  
	'x': [3, 1],  
	'c': [3, 2],  
	'v': [3, 3],
	'b': [3, 4],

 } 

 rightHandKeyMap = {
	'7': [0, 6], 
	'8': [0, 7], 
	'9': [0, 8], 
	'0': [0, 9], 
	'-': [0, 10], 
	'=': [0, 11],
	'y': [1, 5],  
	'u': [1, 6],  
	'i': [1, 7],  
	'o': [1, 8],  
	'p': [1, 9],  
	'j': [2, 6],  
	'k': [2, 7],  
	'l': [2, 8],  
	';': [2, 9],
	'\'': [2, 10],
	'n': [3, 5],  
	'm': [3, 6],  
	',': [3, 7],
	'.': [3, 8],
	'/': [3, 9],
 }



var [$leftHandKeys, $rightHandKeys] = $keyDowns.pipe(
	rxjs.operators.pluck('key'),
	// rxjs.operators.tap(console.log),
	rxjs.operators.partition(key => leftHandKeyMap[key] != null)
)

// $leftHandKeys.subscribe(console.log)

function buffer($stream, bufferTime){
	return $stream.pipe(
		rxjs.operators.bufferTime(bufferTime)
	)
}

function filterEmpty($stream){
	return $stream.pipe(
		rxjs.operators.filter(arr => arr.length > 0)
	)
}

function extractPadInfo($bufferedStream, padDictionary){
	return $bufferedStream.pipe(
		// rxjs.operators.tap(console.log),

		rxjs.operators.flatMap((keys) => {
			numKeys = keys.length;
			return rxjs.from(keys).pipe(
				rxjs.operators.map(key => padDictionary[key]),
				// rxjs.operators.tap(console.log),
				rxjs.operators.filter(coords => coords != null),
				rxjs.operators.reduce((acc, coords) => {
					return {
						y: acc.y + coords[0]/numKeys,
						numKeys: numKeys,
						strength: Math.min(numKeys/4, 1)
					}
				}, {y: 0}),
			)
		}),
		rxjs.operators.filter(val => val.y > 0)
	)
}

function processKeyStream($keys, keymap, hand){
	return extractPadInfo(filterEmpty(buffer($keys, BUFFER_TIME)), keymap).pipe(
		rxjs.operators.map(val => {

			copy = Object.assign({}, val);
			copy.hand = hand;
			return copy;
		})
	)
}

$drumStream = rxjs.merge(
	processKeyStream($leftHandKeys, leftHandKeyMap, "left"),
	processKeyStream($rightHandKeys, rightHandKeyMap, "right"),
)

function onHit(listener){
	$drumStream.subscribe(listener);
}


// $drumStream.subscribe(console.log)





