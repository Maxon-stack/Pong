import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("pong_ball"))
const player = new Paddle(document.getElementById('paddle_player'))
const player_score = document.getElementById("player-score")
const com_score = document.getElementById("com-score")
const computer = new Paddle(document.getElementById('paddle_com'))

let lastTime
function update(time){
  if(lastTime != null){
    const delta = time - lastTime
    //update
    //
    ball.update(delta, [player.hit(), computer.hit()])
    computer.update(delta, ball.y)

    if(isLost()) handleLost()
  }
  
  lastTime = time
  //console.log(time)
  window.requestAnimationFrame(update)

}

function handleLost(){
  const space = ball.break()
  if(space.right >= window.innerWidth){
    player_score.textContent = parseInt(player_score.textContent) + 1
  }
  else{
    com_score.textContent = parseInt(com_score.textContent) + 1
  }
  ball.reset()
  computer.reset()
}

function isLost(){
  const space = ball.break()
  return(space.right >= window.innerWidth || space.left <= 0)
}

document.addEventListener("mousemove", e => {
  player.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)