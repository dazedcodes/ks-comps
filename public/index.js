$(document).ready(function(){
    $("#pw-input").bind("cut copy paste delete", function(e) {
        e.preventDefault();
    });
});

let isCharRegex = new RegExp("[ -~]"); //new RegExp(/^[\w\\.]/g);
let isCharRegex2 = new RegExp("¾"); //new RegExp(/^[\w\\.]/g);
let uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
let testStage = 4;
let roundCounter = 38;
let testPasscode = document.getElementById("passcode-wrapper").innerHTML;
let ksDataHolding = [];

document.getElementById("pw-input").addEventListener("click", (e) => {
  event.preventDefault();
});

document.getElementById("start-btn").addEventListener("click", (e) => {
  startUp();
});

document.getElementById("continue-btn").addEventListener("click", (e) => {
  continueTests();
});

document.getElementById("add-btn").addEventListener("click", (e) => {
  if (document.getElementById("pw-input").value == ".tie5Roanl") {
    roundCounter = roundCounter + 1;
    document.getElementById("pw-input").value = "";
    if ((roundCounter % 10) == 1) {
      testStage += 1;
      if (testStage == 5) {
        advanceToThankYou();
      } else if (testStage == 4){
        advanceToStage4();
      }
    }
    advanceRoundMessage("text-round-" + roundCounter)
    updateProgressBar();
    writeKsData();
  }
  else {
    advanceRoundMessage("text-typo");
    document.getElementById("pw-input").value = "";
    ksDataHolding = [];
  }
});

document.getElementById("pw-input").addEventListener('keydown', (e) => {
  let character = String.fromCharCode(event.keyCode);
  console.log(character);
  let round = roundCounter;
  if (event.code == 'Enter'){
    event.preventDefault();
  } else if (event.code == 'Backspace'){
    advanceRoundMessage("text-backspace");
    document.getElementById("pw-input").value = "";
    ksDataHolding = [];
  } else if (isCharRegex.test(character)) {
    stashKsData(uuid, round, character, "keydown")
  } else if (isCharRegex2.test(character)) {
    stashKsData(uuid, round, character, "keyup")
  }
});

document.getElementById("pw-input").addEventListener("keyup", (e) => {
  let character = String.fromCharCode(event.keyCode);
  let round = roundCounter;
  if (event.code == 'Enter'){
    event.preventDefault();
  } else if (event.code == 'Backspace'){
    advanceRoundMessage("text-backspace");
    document.getElementById("pw-input").value = "";
    ksDataHolding = [];
  } else if (isCharRegex.test(character)) {
    stashKsData(uuid, round, character, "keyup")
  } else if (isCharRegex2.test(character)) {
    stashKsData(uuid, round, character, "keyup")
  }
});

function writeKsData() {
  for(let i = 0; i < ksDataHolding.length; i++){
    firebase.database().ref('events/ID=' + ksDataHolding[i].uuid + 
    '/test' + ksDataHolding[i].testStage +'/round' + ksDataHolding[i].round + 
    '/' + ksDataHolding[i].character + '/' + ksDataHolding[i].time).set({
      testStage: ksDataHolding[i].testStage,
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
    "testStage": testStage,
    "uuid": uuid,
    "round": round,
    "character": character,
    "time": Date.now(),
    "eventType": eventType
    }
  ksDataHolding.push(ksData);
}

function startUp() {
  $("#intro-instructions").hide();
  $("#test-window").show();
  $("#progressBarWrapper").show();
  $("#test-1-instructions").show();
  $("#test-2-instructions").hide();
  let newRoundInstructions = document.getElementById("text-round-1").innerHTML;
  document.getElementById("current-round-instructions").innerHTML = newRoundInstructions;
}

function advanceRoundMessage(element) {
  let newTestInstructions = document.getElementById(element).innerHTML;
  document.getElementById("current-round-instructions").innerHTML = newTestInstructions;
}

function advanceToStage4() {
  $("#stage-4-instructions").show();
  $("#test-window").hide();
  $("#progressBarWrapper").hide();
}

function continueTests() {
  $("#stage-4-instructions").hide();
  $("#test-window").show();
  $("#progressBarWrapper").show();
  $("#test-1-instructions").hide();
  $("#test-2-instructions").show();
  let newRoundInstructions = document.getElementById("text-round-31").innerHTML;
  document.getElementById("current-round-instructions").innerHTML = newRoundInstructions;
}

function advanceToThankYou() {
  $("#test-window").hide();
  $("#thank-you").show();
  $("#progressBarWrapper").hide();
}

function updateProgressBar() {
  if (roundCounter < 41) {
    var elem = document.getElementById("progressBar");
    width = ((roundCounter - 1) / 40) * 100;
    elem.style.width = width + "%";
    elem.innerHTML = "Round " + roundCounter + " of 40";
  }
}