(() => {
//Variable Stack
 var canvas = document.getElementById("canvas");
 var ctx = canvas.getContext("2d");

let spawnLineY = 0, //Bugs spawn at y=0
    spawnRate = 1250, //Bugs spawn ever 2000ms
    spawnRateOfDescent = .50, //How fast the bugs will descend
    lastSpawn = -1, //Last bug spawned
    objects = [], //Holds all spawned objects
    startTime = Date.now(),
    playerLives = [1, 2, 3],
    playerImage = document.querySelector('#splatImage'),
    showScore = document.querySelector('.totalScore'),
    playState = true,
    clickCount = 0,
    finalScore = 0;

const bugOne = new Image();
bugOne.src = "assets/bug1.svg";

const bugTwo = new Image();
bugTwo.src = "assets/bug2.svg";

const bugThree = new Image();
bugThree.src = "assets/brainBug.svg";

const splatImage = new Image();
splatImage.src = "assets/redSplat.png";

// Our images array
let bugArray = [bugOne, bugTwo, bugThree];

animate();

function bugSpawn() { //Function aiding in where bugs will be spawned, and what type
    // create the new object
    var object = {
        // set x randomly but at least 15px off the canvas edges
        x: Math.random() * (canvas.width - 30),
        // set y to start on the line where objects are spawned
        y: spawnLineY,
        // give random image
        image: bugArray[Math.floor(Math.random()*bugArray.length)]
    }
    // add the new object to the objects[] array
    objects.push(object);
}

function animate() { //Begin Animate

    var time = Date.now();// get the elapsed time
    showScore.textContent = finalScore


    // see if its time to spawn a new object
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        bugSpawn();
        //spawnRate*=.99;
    }

    // clear the canvas so all objects can be
    // redrawn in new positions
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clearRect, clears old images

    objects.forEach((object, index) => { //Spawn the bugs
      object.y += spawnRateOfDescent;
      ctx.beginPath();
      ctx.rect(object.x, object.y, 50, 50);
      ctx.drawImage(object.image, object.x, object.y, 50, 50);
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fill();
      ctx.addHitRegion({id: `Bug${index}` });

      let i = 0;
      if(objects[index].y == canvas.height){ //Check if bugs hit bottom, if they do remove a life

        playerLives.splice(i, 1);
        i++;
      }
      if(playerLives.length == 0){ //Check when lives hit 0. If they do, lose the game
        loseGame();
      }
    })

    playerLives.forEach((lives, index) => { //Draw life total on Canvas
      ctx.drawImage(playerImage, 10 + (index*30), 10, 30, 30);
    })

    if(playState === false){ //Stops animation when you lose
      window.cancelAnimationFrame(animate);
      return;
    }


    requestAnimationFrame(animate);
} //End Animate

function loseGame() { //Lose game function, aka lose game screen
  console.log('you lost')
  playState = false;
  objects.splice(0);
  console.log(objects);
}

function onClick() { //Onclick, squash bugs!
  if(event.region) {//Check if it is in hit region
       clickCount++;

       objects.forEach((object, index) => {
         if(event.region == `Bug${index}`) { //If the area clicked is the same hit region. do this
           console.log(`Bug${index}`)
           delete objects[index];
          ctx.drawImage(playerImage, 10, 10, 10, 10)
           finalScore += 3;
         }
         console.log(finalScore);
       })
     }
}




canvas.addEventListener('click', onClick);

})();
