// JavaScript Document

console.log("Linked up");
var countdownTimer = setInterval('secoundsPassed()', 1000);
var secounds = 60;

    function secoundsPassed(){
var minutes = Math.round ((secounds - 30) / 60);
var remainingSecounds = secounds % 60;

      if (remainingSecounds < 10){
          remainingSecounds = "0" +remainingSecounds;
      }

  document.getElementById ('countdown').innerHTML = minutes + ":" + remainingSecounds
      if (secounds == 0){
        clearInterval(countdownTimer)
  document.getElementById('timeUp').innerHTML= "Times Up!";

      }else{
        secounds --;
      }
    }
