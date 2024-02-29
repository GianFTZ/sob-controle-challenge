import type { BaseError } from ".";

export class NotFoundError extends Error implements BaseError {
  constructor(item: string, public readonly from: string) {
    super(`Cannot find ${item}`)
    this.name = "NotFoundError";
  }
}