import type { BaseError } from "."

export class InternalError extends Error implements BaseError {
  constructor(item: string, public readonly from: string) {
    super(`An internal error occurred while processing ${item}`)
    this.name = "InternalError"
  }
}