const INITIAL_VELOCITY = 0.015
const vel_Change = .000008
export default class Ball{
  constructor(ball_El){
    this.ball_El = ball_El
    this.reset()
  }

  get x(){
    return parseFloat(getComputedStyle(this.ball_El).getPropertyValue("--x"))
  }

  set x(value){
    this.ball_El.style.setProperty("--x", value)
  }

  get y(){
    return parseFloat(getComputedStyle(this.ball_El).getPropertyValue("--y"))
  }

  set y(value){
    this.ball_El.style.setProperty("--y", value)
  }

  break(){
    return this.ball_El.getBoundingClientRect()
  }
  reset(){
    this.x = 50
    this.y = 50
    this.direction = {x: 0}
    while(
      Math.abs(this.direction.x) <= 0.2 || 
      Math.abs(this.direction.x) >= 0.9
      ){
      const heading = randomNumberBetween(0, 2 * Math.PI)
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
    }
    this.velocity = INITIAL_VELOCITY
    
  }

  update(delta, paddle_hit){
    this.x += this.direction.x * this.velocity * delta
    this.y += this.direction.y * this.velocity * delta
    this.velocity += vel_Change * delta
    const space = this.break()

    if(space.bottom >= window.innerHeight || space.top<=0){
      this.direction.y *= -1
    }
    if(paddle_hit.some(r => isCollision(r, space))){
      this.direction.x *= -1
    }
  }
}


function randomNumberBetween(min, max){
  return Math.random() * (max - min) + min
}


function isCollision(hit_one, hit_two){
  return (  
    hit_one.left <= hit_two.right &&
    hit_one.right >= hit_two.left && 
    hit_one.top <= hit_two.bottom && 
    hit_one.bottom >= hit_two.top)
}