export class CorruptedDataError extends Error {
  constructor(item: string) {
    super(`Got corrupted data from ${item}`);
    this.name = "CorruptedDataError";
  }
}