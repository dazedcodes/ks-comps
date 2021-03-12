$(document).ready(function(){
    $("#pw-input").bind("cut copy paste delete", function(e) {
        e.preventDefault();
    });
});

let masterKeyList = new Array("KeyA","KeyB","KeyC","KeyD","KeyE","KeyF","KeyG","KeyH","KeyI",
"KeyJ","KeyK","KeyL","KeyM","KeyN","KeyO","KeyP","KeyQ","KeyR","KeyS","KeyT","KeyU","KeyV",
"KeyW","KeyX","KeyY","KeyZ","Digit0","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6",
"Digit7","Digit8","Digit9","ShiftLeft","ShiftRight","Period");
let uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
let testStage = 1;
let roundCounter = 1;
let testPasscode = document.getElementById("passcode-wrapper").innerHTML;
let ksDataHolding = [];

document.getElementById("pw-input").addEventListener("click", (e) => {
  event.preventDefault();
});

document.getElementById("start-btn").addEventListener("click", (e) => {
  startUp();
});

document.getElementById("add-btn").addEventListener("click", (e) => {
  if (document.getElementById("pw-input").value == ".tie5Roanl" && ksDataHolding.length == 22) {
    roundCounter = roundCounter + 1;
    document.getElementById("pw-input").value = "";
    if ((roundCounter % 10) == 1) {
      testStage += 1;
      if (testStage == 4) {
        advanceToThankYou();
      }
    }
    advanceRoundMessage("text-blank");
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
  let charCode = event.code;
  console.log(charCode);
  let round = roundCounter;
  if (event.code == 'Enter'){
    event.preventDefault();
  } else if (masterKeyList.includes(charCode)) {
    stashKsData(uuid, round, charCode, "keydown")
  } else {
    advanceRoundMessage("text-error");
    document.getElementById("pw-input").value = "";
    ksDataHolding = [];
  } 
});

document.getElementById("pw-input").addEventListener("keyup", (e) => {
  let charCode = event.code;
  let round = roundCounter;
  if (event.code == 'Enter'){
    event.preventDefault();
  } else if (masterKeyList.includes(charCode)) {
    stashKsData(uuid, round, charCode, "keyup")
  } else {
    advanceRoundMessage("text-error");
    document.getElementById("pw-input").value = "";
    ksDataHolding = [];
  } 
});

function writeKsData() {
  for(let i = 0; i < ksDataHolding.length; i++) {
  firebase.database().ref('System-demo/ID=' + ksDataHolding[i].uuid + '/round' + ksDataHolding[i].round + 
    '/' + ksDataHolding[i].charCode + '/' + ksDataHolding[i].time).set({
      testStage: ksDataHolding[i].testStage,
      uuid: ksDataHolding[i].uuid,
      round: ksDataHolding[i].round,
      character: ksDataHolding[i].charCode,
      time: ksDataHolding[i].time,
      eventType: ksDataHolding[i].eventType
    });
  }
  ksDataHolding = [];
}

function stashKsData(uuid, round, charCode, eventType) {
  let ksData =  {
    "testStage": testStage,
    "uuid": uuid,
    "round": round,
    "charCode": charCode,
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
}

function advanceRoundMessage(element) {
  let newTestInstructions = document.getElementById(element).innerHTML;
  document.getElementById("current-round-instructions").innerHTML = newTestInstructions;
}

function advanceToThankYou() {
  $("#test-window").hide();
  $("#thank-you").show();
  $("#progressBarWrapper").hide();
}

function updateProgressBar() {
  if (roundCounter < 41) {
    var elem = document.getElementById("progressBar");
    width = ((roundCounter + 4) / 35) * 100;
    elem.style.width = width + "%";
    elem.innerHTML = "Round " + roundCounter + " of 30";
  }
}