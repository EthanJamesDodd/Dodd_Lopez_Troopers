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
      spawnRateDescent = .60, //How fast the bugs will approach
      lastBug = -1; //Last bug spawned
      bugArray = []; //Holds all the Bugs
      startTime = Date.now(), //Start time, to calculate total time
      sadImage = document.querySelector('#sadFace'),
      happyImage = document.querySelector('#happyFace'),
      mediumImage = document.querySelector('#mediumFace');


animate(); //Begin animation

function bugSpawn() {
  //Create the new bug
  let object = {
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

  ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Move each bug down the canvas
    for (var i = 0; i < bugArray.length; i++) {
      var object = bugArray[i];
      object.y += spawnRateDescent;
      ctx.drawImage(sadImage, object.x, object.y, 40, 40);
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
