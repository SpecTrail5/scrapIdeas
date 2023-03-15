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
        p: 80,
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
    var player = {
        maxSpd: 30,
        spdX: 0,
        spdY: 0,
        posX: 100,
        posY: 480,
        width: $("#player").width(),
        height: $("#player").height()
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
            player.spdY = player.spdY - 10
        }

        if (event.which === KEY.a) {
            player.spdX = player.spdX - 10
        }

        if (event.which === KEY.d) {
            player.spdX = player.spdX + 10
        }

        if (event.which === KEY.s) {
            player.spdY = player.spdY + 10
        }

        if(event.which === KEY.p) {
            pauseGame()
        }

    }


    function handleKeyUp(event) {

        if (event.which === KEY.w) {
            player.spdY = player.spdY + 10

        }

        if (event.which === KEY.a) {
            player.spdX = player.spdX + 10
        }

        if (event.which === KEY.d) {
            player.spdX = player.spdX - 10
        }

        if (event.which === KEY.s) {
            player.spdY = player.spdY - 10
        }


    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    function moveGameItems() {
        player.posY += player.spdY
        player.posX += player.spdX


    }


    function border() {

        if (player.posX < board.widthMin) {
            player.posX = board.widthMax - player.width
        }

        if (player.posX + player.width > board.widthMax) {
            player.posX = board.widthMin
        }

        if (player.posY < board.heightMin) {
            player.posY = board.heightMax - player.height
        }

        if (player.posY + player.height > board.heightMax) {
            player.posY = board.heightMin
        }

    }


    function redraw() {

        $("#player").css('left', player.posX)
        $("#player").css('top', player.posY)

    }

    function speedCap() {
        if (player.spdX >= player.maxSpd) {
            player.spdX = player.maxSpd
        }
        if (player.spdX <= -player.maxSpd) {
            player.spdX = -player.maxSpd
        }

        if (player.spdY >= player.maxSpd) {
            player.spdY = player.maxSpd
        }
        if (player.spdY <= -player.maxSpd) {
            player.spdY = -player.maxSpd
        }
    }

    function pauseGame() {
      
    }

    function endGame() {
        // stop the interval timer
        clearInterval(interval);
        

        // turn off event handlers
        $(document).off();
    }
}