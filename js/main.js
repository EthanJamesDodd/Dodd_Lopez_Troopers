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

const splatImage = new Image();
splatImage.src = "assets/redSplat.png";

// Our images array
let bugArray = [bugOne, bugTwo, bugThree];

animate();

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
        spawnRate*=.98;
    }

    // clear the canvas so all objects can be
    // redrawn in new positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // move each object down the canvas
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        object.y += spawnRateOfDescent;
        ctx.beginPath();
        ctx.rect(object.x, object.y, 50, 50);
        ctx.drawImage(object.image, object.x, object.y, 50, 50);
        ctx.fillStyle = 'rgba(200, 0, 0, 0)';
        ctx.fill();
        ctx.addHitRegion({id: `Bug${i}` });
    }
    // request another animation frame
    requestAnimationFrame(animate);
}

function onClick(){
  if(event.region) {
       console.log('it works?');
       for (var i = 0; i < objects.length; i++) {
           var object = objects[i];
           object.y += spawnRateOfDescent;
           ctx.drawImage(splatImage, object.x, object.y, 200, 200);
       }
     }
}

canvas.addEventListener('click', onClick);

})();
