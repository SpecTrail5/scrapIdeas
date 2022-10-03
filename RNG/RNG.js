$(document).ready(runProgram)

function runProgram(){
    const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var num = []

  var num_of_num = $('#num-number').content()

  var between_num1 = $('#between-num1')
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);

  function newFrame(){
    $("#num").text(5)
  }


}
