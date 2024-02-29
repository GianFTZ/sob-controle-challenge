import type { BaseError } from "."

export class TimeoutError extends Error implements BaseError {
  constructor(public readonly from: string){
    super('Got timeout error')
    this.name = "TimeoutError"
  }
}