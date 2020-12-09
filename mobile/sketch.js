// Learned From "designers do code" https://www.youtube.com/watch?v=AbB9ayaffTc

// File -> Share -> Present -> Email Link to Mobile Device to run Sketch

//permission button variable
let button;
//default permission
let permissionGranted = false;

let cx, cy;

const canvasSize = 1200;
const grSize = canvasSize;

function setup() {
    createCanvas(canvasSize, canvasSize);
  frameRate(30);
  pg = createGraphics(grSize, grSize);
  cx = width/2;
  cy = height/2
  //DeviceOrientationEvent, DeviceMotionEvenet
  if(typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) ==='function'){
    //ios 13 device
    button= createButton('click to allow access to sensors');
    button.style("font-size", "24px");
    button.center();
    button.mousePressed( requestAccess );
  } else {
    // non ios 13 device
      textSize(48);
      //text("Non Ios 13 Device :/",100,100);
      permissionGranted = true;
  }
}

function requestAccess(){
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if(response == 'granted'); {
        permissionGranted = true;
      }
    })
  .catch(console.error);
  button.remove();
}

function draw() {
  if (!permissionGranted) return;
  //background(255);
  //rotationX, rotationY
  
  const dx = constrain(rotationY,-3,3);
  const dy = constrain(rotationX,-3,3);
  cx+=dx*2;
  cy+=dy*2;
  cx = constrain(cx, 0, width);
  cy = constrain(cy, 0, height);
  
  
  ellipse(cx,cy,200,200);
    pg.background(0);
  pg.fill(255);
  pg.textFont("Hind");
  pg.textSize(cx,cy);
  pg.push();
  pg.translate(grSize/2, grSize/2);
  pg.textAlign(LEFT, CENTER);
  pg.textLeading(canvasSize/6.6-10);
  pg.text("act of pro gression", -canvasSize/1.5+cx, -canvasSize/4.25+cy);
  pg.pop();

  let tilesX = 50;
  let tilesY = 8;

  let tileW = int(width/tilesX);
  let tileH = int(height/tilesY);

  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {

      // WARP
      let wave = int(sin(frameCount * 0.05 + ( x * y ) * 0.04) * 60);
      //wave = 0;
      // SOURCE
      let sx = x*tileW + wave;
      let sy = y*tileH + wave*1.25;
      let sw = tileW;
      let sh = tileH;


      // DESTINATION
      let hx = x*tileW;
      let hy = y*tileH;
      let dw = tileW;
      let dh = tileH;

      copy(pg, sx, sy, sw, sh, hx, hy, dw, dh);

    }
  }
}