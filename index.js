class Character {
  constructor(flight_time, dwell_time, trial){
    this.ftime = flight_time;
    this.dtime = dwell_time;
    this.trial = trial;
  }
}

class Round {
  constructor(){
    this.character_list = [];
    this.length = 0;
  }
}

class User {
  constructor(){
    this.round_list = [];
  }
}

document.getElementById("pw-input").addEventListener("click", (e) => {
  console.log("Hey user! You clicked the password text field.");
  event.preventDefault();
});

document.getElementById("pw-input").addEventListener('keydown', (e) => {
  if (event.code == 'Backspace'){
    window.alert("You pressed the backspace key. Try typing password1234 WITHOUT pressing the backspace.");
    console.log('The physical key pressed was the BACKSPACE key.');
  }
});

document.getElementById("pw-input").addEventListener('keydown', (e) => {
  if (event.code == 'Enter'){
    console.log('The physical key pressed was the Enter key.');
    event.preventDefault();
  }
});
let counter = 0;
document.getElementById("add-btn").addEventListener("click", (e) => {
    console.log('Hey user! You clicked the submit button.');
    document.getElementById("pw-input").value = "";
    counter = counter + 1;
    console.log(counter);
    document.getElementById("counter").innerHTML = "Round: " + counter;

});
