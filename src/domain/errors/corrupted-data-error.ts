import type { BaseError } from ".";

export class CorruptedDataError extends Error implements BaseError {
  constructor(item: string, public readonly from: string) {
    super(`Got corrupted data from ${item}`);
    this.name = "CorruptedDataError";
  }
}