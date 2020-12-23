document.getElementById("pw-input").addEventListener("click", (e) => {
  console.log("Hey user! You clicked the password text field.");
  event.preventDefault();
});

$(document).ready(function(){
    $("#pw-input").bind("cut copy paste delete", function(e) {
        e.preventDefault();
    });
});

let uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
let roundCounter = 0;
let testPasscode = document.getElementById("passcode-wrapper").innerHTML;
let ksDataHolding = [];

document.getElementById("add-btn").addEventListener("click", (e) => {
    if (document.getElementById("pw-input").value == "password1234") {
      roundCounter = roundCounter + 1;
      console.log('Hey user! You clicked the submit button.');
      document.getElementById("pw-input").value = "";
      document.getElementById("counter").innerHTML = "Round: " + roundCounter;
      writeKsData();
    }
    else {
      window.alert('Hey user! You clicked the submit button, but your password input does not match our request! Please try again!');
      document.getElementById("pw-input").value = "";
      console.log('Disregard all inputs of Round' + roundCounter + 'above this mark.');
      ksDataHolding = [];
    }
});

document.getElementById("pw-input").addEventListener('keydown', (e) => {
  let character = String.fromCharCode(event.keyCode);
  let character_ascii = (event.keyCode);
  var flight_time = Date.now();
  let round = roundCounter;
  if (event.code == 'Enter'){
    console.log('The physical key pressed was the Enter key.');
    event.preventDefault();
  } else if (event.code == 'Backspace'){
    window.alert("You pressed the backspace key. Try typing password1234 WITHOUT pressing the backspace.");
    document.getElementById("pw-input").value = "";
    console.log('The physical key pressed was the BACKSPACE key.');
    ksDataHolding = [];
  } else {
    console.log("ASCII value of", character, "(keydown): ", character_ascii);
    console.log("Miliseconds of", character, "(keydown): ", flight_time);
    console.log("Round of", character, ": ", round);
    stashKsData(uuid, round, character, "keydown")
  }
});

document.getElementById("pw-input").addEventListener("keyup", (e) => {
  let character = String.fromCharCode(event.keyCode);
  let character_ascii = (event.keyCode);
  var dwell_time = Date.now();
  let round = roundCounter;
  if (event.code == 'Enter'){
    console.log('The physical key pressed was the Enter key.');
    event.preventDefault();
  } else if (event.code == 'Backspace'){
    window.alert("You pressed the backspace key. Try typing password1234 WITHOUT pressing the backspace.");
    document.getElementById("pw-input").value = "";
    console.log('The physical key pressed was the BACKSPACE key.');
    ksDataHolding = [];
  } else {
    console.log(character);
    console.log("ASCII value of", character, "(keyup): ", character_ascii);
    console.log("Miliseconds of", character, "(keyup): ", dwell_time);
    console.log("Round of", character, ": ", round);
    stashKsData(uuid, round, character, "keyup")
  }
});

function writeKsData() {
  for(let i = 0; i < ksDataHolding.length; i++){
    firebase.database().ref('events/' + ksDataHolding[i].uuid + '/round' + ksDataHolding[i].round + '/' + ksDataHolding[i].character + '/' + ksDataHolding[i].time).set({
      uuid: ksDataHolding[i].uuid,
      round: ksDataHolding[i].round,
      character: ksDataHolding[i].character,
      time: ksDataHolding[i].time,
      eventType: ksDataHolding[i].eventType
    });
  }
  ksDataHolding = []
}

function stashKsData(uuid, round, character, eventType) {
  let ksData =  {
    "uuid": uuid,
    "round": round,
    "character": character,
    "time": Date.now(),
    "eventType": eventType
    }
  ksDataHolding.push(ksData);
}