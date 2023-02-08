$(document).ready(runProgram);

function runProgram() {
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  // game variables


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
  var jumper = {
    maxSpd: 30,
    spdX: 0,
    spdY: 0,
    posX: 100,
    posY: 480,
    width: $("#jumper").width(),
    height: $("#jumper").height()
  }



  
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   
  $(document).on('keydown', handleKeyDown);                        
  $(document).on('keyup', handleKeyUp);

  
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
    speedCap()
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {

    if (event.which === KEY.w) {
      jumper.spdY = jumper.spdY - 10
    }

    if (event.which === KEY.a) {
      jumper.spdX = jumper.spdX - 10
    }

    if (event.which === KEY.d) {
      jumper.spdX = jumper.spdX + 10
    }

    if (event.which === KEY.s) {
      jumper.spdY = jumper.spdY + 10
    }

  }


  function handleKeyUp(event) {

    if (event.which === KEY.w) {
      jumper.spdY = jumper.spdY + 10
        
    }

    if (event.which === KEY.a) {
      jumper.spdX = jumper.spdX + 10
    }

    if (event.which === KEY.d) {
      jumper.spdX = jumper.spdX - 10
    }

    if (event.which === KEY.s) {
      jumper.spdY = jumper.spdY - 10
    }


  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function moveGameItems() {
    jumper.posY += jumper.spdY
    jumper.posX += jumper.spdX


  }


  function border() {

    if (jumper.posX < board.widthMin) {
      jumper.posX = board.widthMax - jumper.width
    }

    if (jumper.posX + jumper.width > board.widthMax) {
      jumper.posX = board.widthMin 
    }

    if (jumper.posY < board.heightMin) {
      jumper.posY = board.heightMax - jumper.height
    }

    if (jumper.posY + jumper.height > board.heightMax) {
      jumper.posY = board.heightMin
    }

  }


  function redraw() {

    $("#jumper").css('left', jumper.posX)
    $("#jumper").css('top', jumper.posY)

  }

  function speedCap() {
    if(jumper.spdX >= jumper.maxSpd){
        jumper.spdX = jumper.maxSpd
    }
    if(jumper.spdX <= -jumper.maxSpd){
        jumper.spdX = -jumper.maxSpd
    }

    if(jumper.spdY >= jumper.maxSpd){
        jumper.spdY = jumper.maxSpd
    }
    if(jumper.spdY <= -jumper.maxSpd){
        jumper.spdY = -jumper.maxSpd
    }
  }



  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}