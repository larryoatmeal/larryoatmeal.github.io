var midi = null;  // global MIDIAccess object
//shoudl be used every time midiAccess is asked for
//initialized by line 14, should be added to main

function onMIDISuccess( midiAccess ) {
  console.log( "MIDI ready!" );
  midi = midiAccess;  // store in the global (in real usage, would probably keep in an object instance)
}

function onMIDIFailure(msg) {
  console.log( "Failed to get MIDI access - " + msg );
}

//navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );


//returns a list of lists: [output.manufacturer + output.name, output.id]
//identifying and naming MIDI outputs
function listMidiOutputs(midiAccess) {  
    console.log("Fetching MIDI outputs...");
    var outputIds = [];
    for (var entry of midiAccess.outputs) {
        var output = entry[1];
        outputIds.push([output.name + " : " + output.manufacturer,output.id]);
        console.log( "Output port [type:'" + output.type + "'] id:'" + output.id +
          "' manufacturer:'" + output.manufacturer + "' name:'" + output.name +
          "' version:'" + output.version + "'" );
    }
    return outputIds;
}
  

//portID is the id of the midi output (found in the array returned by listMidiOutputs)
//note is the midi number of the note, 0 <= velocity <= 127
//if release time > 0 (default -1), a note off message with 
//specified releaseVelocity (default 64) is sent after releaseTime ms    
function sendMidiNoteOn( midiAccess, portID, note, velocity, releaseTime = -1, releaseVelocity = 64) {
    var noteOnMessage = [0x90, note, velocity];    //[0x90, 60, 0x7f] = note on, middle C, full velocity 
    var output = midiAccess.outputs.get(portID);
    output.send(noteOnMessage);  //omitting the timestamp means send immediately.
    if (releaseTime >= 0) {
        output.send([0x80, note, releaseVelocity], window.performance.now() + releaseTime); // Inlined array creation- note off, middle C,  
        // release velocity = 64 (0x40), timestamp = now + 1000ms.
    }
}
  
function sendMidiNoteOff( midiAccess, portID, note, releaseVelocity = 64) {
    var noteOffMessage = [0x80, note, releaseVelocity];    //[0x80, 60, 0x40] = note on, middle C, 64 velocity 
    var output = midiAccess.outputs.get(portID);
    output.send(noteOffMessage);  //omitting the timestamp means send immediately.
}