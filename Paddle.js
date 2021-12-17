let SPEED = 0.02
export default class Paddle{
  constructor(pad_Elm){
    this.pad_Elm = pad_Elm
    this.reset()
  }
  get position(){
    return parseFloat(getComputedStyle(this.pad_Elm).getPropertyValue("--position"))

  }  
  set position(value){
    this.pad_Elm.style.setProperty("--position", value)
  }

  hit(){
    return this.pad_Elm.getBoundingClientRect()
  }
  reset(){
    this.position = 50
  }
  update(delta, ballHeight){
    this.position += SPEED  * delta *  (ballHeight-this.position)
  }
}