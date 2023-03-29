$(document).ready(runProgram);

function runProgram() {
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  // game variables

  const mousePosText = document.getElementById('mouse-pos');

  let mousePos = { x: undefined, y: undefined };





  var board = {
    widthMax: $("#board").width(),
    widthMin: $("#board").width() - $("#board").width(),
    heightMax: $("#board").height(),
    heightMin: $("#board").height() - $("#board").height()
  }


  // controls
  var KEY = {
    space: 32,
    w: 87,
    a: 65,
    s: 83,
    d: 68,
    j: 74,
    k: 75,
    i: 73,
    l: 76

  }
  // Player
  var pointer = {
    maxSpd: 10,
    spdX: 0,
    spdY: 0,
    posX: 100,
    posY: 480,
    width: $("#pointer").width(),
    height: $("#pointer").height()

  }





  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);

  window.addEventListener('mousemove', (event) => {
    mousePos = { x: event.clientX, y: event.clientY };
    mousePosText.textContent = `(${mousePos.x}, ${mousePos.y})`;
  });

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveGameItems()
    redraw();
    border()
    trackMouse()

  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {


  }


  function handleKeyUp(event) {



  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function trackMouse () {
    if(mousePos.x < pointer.posX){
      pointer.spdX--
    }
    if(mousePos.x > pointer.posX){
      pointer.spdX++
    }
    if(mousePos.y < pointer.posY){
      pointer.spdY--
    }
    if(mousePos.y > pointer.posY){
      pointer.spdY++
    }

    if(mousePos.x === pointer.posX){
      pointer.spdX = 0
    }
    if(mousePos.y === pointer.posY){
      pointer.spdY = 0
    }


  }


  function moveGameItems() {
    pointer.posY += pointer.spdY
    pointer.posX += pointer.spdX


  }


  function border() {

    if (pointer.posX < board.widthMin) {
      pointer.posX = board.widthMin
    }

    if (pointer.posX > board.widthMax) {
      pointer.posX = board.widthMax - pointer.width
    }

    if (pointer.posY < board.heightMin) {
      pointer.posY = board.heightMin
    }

    if (pointer.posY + pointer.height > board.heightMax) {
      pointer.posY = board.heightMax - pointer.height
    }

  }


  function redraw() {

    $("#pointer").css('left', pointer.posX)
    $("#pointer").css('top', pointer.posY)

    $("#pointer").css('width', pointer.width)
    $("#pointer").css('height', pointer.height)

  }





  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}