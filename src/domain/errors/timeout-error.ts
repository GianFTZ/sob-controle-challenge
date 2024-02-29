export class TimeoutError extends Error {
  constructor(){
    super('Got timeout error')
    this.name = "TimeoutError"
  }
}