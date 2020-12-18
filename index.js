
document.getElementById("pw-input").addEventListener("click", (e) => {
  console.log("Hey user! You clicked the password text field.");
  event.preventDefault();
});

$(document).ready(function(){
    $("#pw-input").bind("cut copy paste", function(e) {
        e.preventDefault();
    });
});

let roundCounter = 0;
let testPasscode = document.getElementById("passcode-wrapper").innerHTML;
let ksData = [
  {
    "uuid": 1,
    "round": 1,
    "character": "A",
    "keydown-mili": 0065,
    "keyup-mili": 0080
  }
]
console.log(ksData);
document.getElementById("add-btn").addEventListener("click", (e) => {
    if (document.getElementById("pw-input").value == "password1234") {
      roundCounter = roundCounter + 1;
      console.log('Hey user! You clicked the submit button.');
      document.getElementById("pw-input").value = "";
      document.getElementById("counter").innerHTML = "Round: " + roundCounter;
    }
    else {
      window.alert('Hey user! You clicked the submit button, but your password input does not match our request! Please try again!');
      document.getElementById("pw-input").value = "";
      console.log('Disregard all inputs of Round' + roundCounter + 'above this mark.');
    }
});

document.getElementById("pw-input").addEventListener('keydown', (e) => {
  let character = String.fromCharCode(event.keyCode);
  let character_ascii = (event.keyCode);
  var flight_time = Date.now();
  let round = roundCounter;
  var database
  if (event.code == 'Enter'){
    console.log('The physical key pressed was the Enter key.');
    event.preventDefault();
  } else if (event.code == 'Backspace'){
    window.alert("You pressed the backspace key. Try typing password1234 WITHOUT pressing the backspace.");
    document.getElementById("pw-input").value = "";
    console.log('The physical key pressed was the BACKSPACE key.');
  //} else if (document.getElementById("pw-input").value ==
       //     testPasscode.substring(0, document.getElementById("pw-input").value.length - 1)){
    //window.alert("You have made a typo while inserting the passcode. We've all done it. Many times. Try again!");
    //document.getElementById("pw-input").value = "";
  //  console.log('The physical key pressed was a typo.');
  } else {
    // console.log(character);
    console.log("ASCII value of", character, "(keydown): ", character_ascii);
    console.log("Miliseconds of", character, "(keydown): ", flight_time);
    console.log("Round of", character, ": ", round);
    // character-keydown-mili == flight_time
    // character-round == round
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
  //} else if (document.getElementById("pw-input").value ==
    //        testPasscode.substring(0, document.getElementById("pw-input").value.length)){
    //window.alert("You have made a typo while inserting the passcode. We've all done it. Many times. Try again!");
    //document.getElementById("pw-input").value = "";
    //console.log('The physical key pressed was a typo.');
  } else {
    console.log(character);
    console.log("ASCII value of", character, "(keyup): ", character_ascii);
    console.log("Miliseconds of", character, "(keyup): ", dwell_time);
    console.log("Round of", character, ": ", round);
    // character-keyup-mili == dwell_time
    // character-round == round
  }
});
