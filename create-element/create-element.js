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

    var mouse = {
        x: undefined,
        y: undefined
    }

    // target
    var target = {
        maxCount: 1,
        count: 0,
        id: '#target',
        posX: 0,
        posY: 0,
        width: 30,
        height: 30
    }

    //bullet
    var bullet = {
        maxCount: 1,
        count: 0,
        id: '#bullet',
        spdX: 0,
        spdY: 0,
        maxSpd: 20,
        posX: player.posX,
        posY: player.posY,
        width: 20,
        height: 20
    }

    var boom = {
        maxCount: 1,
        count: 0,
        id: '#boom',
        posX: player.posX,
        posY: player.posY,
        width: 200,
        height: 200
    }




    let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
    $(document).on('keydown', handleKeyDown);
    $(document).on('keyup', handleKeyUp);
    $(document).on('click', handleClick);



    ///////////////////////// CORE LOGIC ///////////////////////////////////////////


    /* 
    On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
    by calling this function and executing the code inside.
    */
    function newFrame() {
        moveGameItems()
        redraw();
        border()
        bulletboom()

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


    }


    function handleKeyUp(event) {

        if (event.which === KEY.w) {
            player.spdY = 0

        }

        if (event.which === KEY.a) {
            player.spdX = 0
        }

        if (event.which === KEY.d) {
            player.spdX = 0
        }

        if (event.which === KEY.s) {
            player.spdY = 0
        }


    }

    function handleClick(event) {

        if (target.count < target.maxCount) {
            mouse.x = event.clientX
            mouse.y = event.clientY

            target.posX = mouse.x - target.width
            target.posY = mouse.y - target.height

            createTarget()
            target.count++
        }

        if (bullet.count < bullet.maxCount) {

            createBullet()
            bullet.count++
        }


    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////// HboxPER FUNCTIONS ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    function moveGameItems() {
        player.posY += player.spdY
        player.posX += player.spdX

        if (bullet.count === bullet.maxCount) {
            if (bullet.posX < target.posX) {
                bullet.spdX = bullet.maxSpd
            }
            if (bullet.posX > target.posX) {
                bullet.spdX = -bullet.maxSpd
            }
            if (bullet.posY < target.posY) {
                bullet.spdY = bullet.maxSpd
            }
            if (bullet.posY > target.posY) {
                bullet.spdY = -bullet.maxSpd
            }
        }
        else {

            bullet.posX = player.posX + player.width/2

            bullet.posY = player.posY + player.height/2

        }

        bullet.posX += bullet.spdX
        bullet.posY += bullet.spdY

        boom.posX  = bullet.posX - boom.width/2
        boom.posY = bullet.posY - boom.height/2


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

        if (bullet.posX >= board.widthMax) {
            bullet.spdX = bullet.spdX * -1
        }

        if (bullet.posX <= board.widthMin) {
            bullet.spdX = bullet.spdX * -1
        }

        if (bullet.posY >= board.heightMax) {
            bullet.spdY = bullet.spdY * -1
        }

        if (bullet.posY <= board.widthMin) {
            bullet.spdY = bullet.spdY * -1
        }

    }


    function redraw() {

        $("#player").css('left', player.posX)
        $("#player").css('top', player.posY)

        $(bullet.id).css('left', bullet.posX)
        $(bullet.id).css('top', bullet.posY)

        $(target.id).css('left', target.posX)
        $(target.id).css('top', target.posY)

        $(boom.id).css('left', boom.posX)
        $(boom.id).css('top', boom.posY)

    }



    function createTarget() {
        const box = document.createElement('div')

        box.setAttribute('id', 'target');


        box.style.border = '2px inset purple'
        box.style.borderRadius = '50%'
        box.style.width = target.width + 'px';
        box.style.height = target.height + 'px';
        box.style.position = 'absolute';
        box.style.left = target.posX
        box.style.top = target.posY

        const con = document.getElementById('board')

        con.appendChild(box)
    }


    function createBullet() {
        const box = document.createElement('div')

        box.setAttribute('id', 'bullet');


        box.style.backgroundColor = 'darkred';
        box.style.border = '5px inset red'
        box.style.borderRadius = '50%'
        box.style.width = bullet.width + 'px';
        box.style.height = bullet.height + 'px';
        box.style.position = 'absolute';
        box.style.left = bullet.posX
        box.style.top = bullet.posY

        const con = document.getElementById('board')

        con.appendChild(box)
    }

    function bulletboom() {

        var tar = document.getElementById('target')
        var bull = document.getElementById('bullet')
        var bo = document.getElementById('boom')
        if (collide(bullet, target)) {

            tar.remove()
            bull.remove()

            target.count--
            bullet.count--

        }

    }

    function collide(obj1, obj2) {

        obj1.left = obj1.posX
        obj1.right = obj1.posX + obj1.width
        obj1.top = obj1.posY
        obj1.buttom = obj1.posY + obj1.height

        obj2.left = obj2.posX
        obj2.right = obj2.posX + obj2.width
        obj2.top = obj2.posY
        obj2.buttom = obj2.posY + obj2.height

        if (obj1.buttom > obj2.top && obj1.top < obj2.buttom && obj1.left < obj2.right && obj1.right > obj2.left) {
            return true
        } else { return false }

    }


    function endGame() {
        // stop the interval timer
        clearInterval(interval);


        // turn off event handlers
        $(document).off();
    }
}