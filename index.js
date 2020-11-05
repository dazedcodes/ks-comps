
document.getElementById("pw-input").addEventListener("click", (e) => {
  console.log("Hey user! You clicked the password text field.");
  event.preventDefault();
});

let counter = 0;
document.getElementById("add-btn").addEventListener("click", (e) => {
    counter = counter + 1;
    console.log('Hey user! You clicked the submit button.');
    document.getElementById("pw-input").value = "";
    document.getElementById("counter").innerHTML = "Round: " + counter;

});

document.getElementById("pw-input").addEventListener('keydown', (e) => {
  let character = String.fromCharCode(event.keyCode);
  let character_ascii = (event.keyCode);
  var d = new Date();
  var flight_time = d.getMilliseconds();
  let round = counter;
  if (event.code == 'Enter'){
    console.log('The physical key pressed was the Enter key.');
    event.preventDefault();
  }
  if (event.code == 'Backspace'){
    window.alert("You pressed the backspace key. Try typing password1234 WITHOUT pressing the backspace.");
    document.getElementById("pw-input").value = "";
    console.log('The physical key pressed was the BACKSPACE key.');
  }

  // console.log(character);
  console.log("ASCII value of", character, "(keydown): ", character_ascii);
  console.log("Miliseconds of", character, "(keydown): ", flight_time);
  console.log("Round of", character, ": ",round);
});

document.getElementById("pw-input").addEventListener("keyup", (e) => {
  let character = String.fromCharCode(event.keyCode);
  let character_ascii = (event.keyCode);
  var d = new Date();
  var dwell_time = d.getMilliseconds();
  let round = counter;
  if (event.code == 'Enter'){
    console.log('The physical key Enter was released.');
    event.preventDefault();
  }
  if (event.code == 'Backspace'){
    window.alert("You pressed the backspace key. Try typing password1234 WITHOUT pressing the backspace.");
    document.getElementById("pw-input").value = "";
    console.log('The physical key pressed was the BACKSPACE key.');
  }
  console.log(character);
  console.log("ASCII value of", character, "(keyup): ", character_ascii);
  console.log("Miliseconds of", character, "(keyup): ", dwell_time);
  console.log("Round of", character, ": ",round);

});
