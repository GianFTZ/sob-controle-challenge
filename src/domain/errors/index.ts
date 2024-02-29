export * from './not-found-error'
export * from './internal-error'
export * from './corrupted-data-error'
export * from './timeout-error'


export interface BaseError {
  from: string
}

export class DefaultError extends Error implements BaseError {
  constructor(public readonly from: string){
    super("Caught undefined exception")
  }
}