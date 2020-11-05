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

document.getElementById("add-btn").addEventListener("click", (e) => {
    console.log('Hey user! You clicked the submit button.');
    document.getElementById("pw-input").value = "";
});
