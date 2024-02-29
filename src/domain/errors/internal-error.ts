export class InternalError extends Error {
  constructor(item: string) {
    super(`An internal error occurred while processing ${item}`)
    this.name = "InternalError"
  }
}