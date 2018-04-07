(() => {
//Variable Stack
 var canvas = document.getElementById("canvas");
 var ctx = canvas.getContext("2d");
let spawnLineY = 0, //Bugs spawn at y=0
    spawnRate = 2500, //Bugs spawn ever 2000ms
    spawnRateOfDescent = 0.50, //How fast the bugs will descend
    lastSpawn = -1, //Last bug spawned
    objects = [], //Holds all spawned objects
    startTime = Date.now(); //Star time, to calculate total time

const bugOne = new Image();
bugOne.src = "assets/bug1.svg";

const bugTwo = new Image();
bugTwo.src = "assets/bug2.svg";

const bugThree = new Image();
bugThree.src = "assets/brainBug.svg";

// Our images array
let bugArray = [bugOne, bugTwo, bugThree];

console.log(bugArray)

animate();

console.log(bugArray);

function bugSpawn() {
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

function animate() {

    // get the elapsed time
    var time = Date.now();

    // see if its time to spawn a new object
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        bugSpawn();
        spawnRate*=.99;
    }

    // request another animation frame
    requestAnimationFrame(animate);

    // clear the canvas so all objects can be
    // redrawn in new positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // move each object down the canvas
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        object.y += spawnRateOfDescent;
        ctx.beginPath();
        ctx.arc(object.x, object.y,10, 0, 2 * Math.PI, false);
        ctx.drawImage(object.image, object.x, object.y, 40, 40);
        ctx.fill();
        ctx.addHitRegion({id: `Bug${i}` });
    }
}

canvas.addEventListener('click', function(event) {
  if(event.region) {
    console.log('it works?');
  }
})

})();
