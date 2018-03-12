(() => {
  console.log('Bug Squash!');

  //Variable Stack
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  let clickCount = 0,
      score = 0,
      clickBox = document.querySelector('#testBox');

  //Spawning Bugs
  let spawnLine = 0, //Bugs spawn at y=25
      spawnRate = 2000, //Bugs spawn every 2000ms
      spawnRateDescent = 0.60, //How fast the bugs will approach
      lastBug = -1; //Last bug spawned
      bugArray = []; //Holds all the Bugs
      startTime = Date.now(), //Start time, to calculate total time
      bug1 = new Image(15, 15);
      bug1.src = 'assets/Death.png';


animate(); //Begin animation

function bugSpawn() {
  let bugType; //Select a random bug to spawned
  if(Math.random() < 0.33) {
    t = "bug1";
  } else if(Math.random() < 0.66) {
    t = "blue";
  } else {
    t = "green";
  }

  //Create the new bug
  var object = {
        // set this objects type
        type: t,
        // set x randomly but at least 15px off the canvas edges
        x: Math.random() * (canvas.width - 30) + 15,
        // set y to start on the line where objects are spawned
        y: spawnLine,
    }

    // Add new Bug to the bugArray[] bugArray
    bugArray.push(object);
}

function animate() {
  //Find the total time
  let time = Date.now();

  //Check if it can spawn a new bugs
  if (time > (lastBug + spawnRate)) {
    lastBug = time;
    bugSpawn();
    spawnRate*=.99;
  }

  //Request another animation frame
  requestAnimationFrame(animate);

  //Clear the canvas to all bugs can be redrawn in new spots
  ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Move each bug down the canvas
    for (var i = 0; i < bugArray.length; i++) {
      var object = bugArray[i];
      var pattern = ctx.createPattern(bug1, "repeat");
      object.y += spawnRateDescent;
      ctx.beginPath();
      ctx.rect(object.x, object.y, 30, 30);
      ctx.closePath();
      ctx.fillStyle = object.type;
      ctx.fill();
    }
}






function bugSquash(){
  clickCount++;

  if(clickCount == 3){
    clickBox.classList.add('blue');
  }
  else {
    console.log('return');
  }
};



clickBox.addEventListener('click', bugSquash);
})();
