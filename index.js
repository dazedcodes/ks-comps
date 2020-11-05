document.getElementById("pw-input").addEventListener("click", (e) => {
  console.log("Hey user! You clicked the password text field.");
  event.preventDefault();
});

document.getElementById("pw-input").addEventListener('keydown', (e) => {
  if (event.code == 'Backspace'){
    console.log('The physical key pressed was the BACKSPACE key.');
    event.preventDefault();
  }
});

document.getElementById("pw-input").addEventListener('keydown', (e) => {
  if (event.code == 'Enter'){
    console.log('The physical key pressed was the Enter key.');
    event.preventDefault();
  }
});
