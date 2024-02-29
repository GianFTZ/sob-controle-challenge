export class NotFoundError extends Error {
  constructor(item: string) {
    super(`Cannot find ${item}`)
    this.name = "NotFoundError";
  }
}