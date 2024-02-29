import { CorruptedDataError, DefaultError, InternalError, NotFoundError, TimeoutError } from "../domain/errors"

export interface ErrorHandlerProps {
  code: string
  cause: string
  from: string
}

export enum Errors {
  'Success' = '123',
  'NotFound' = '555',
  'Internal' = '780',
  'Corrupted' = '999',
  'TimedOut' = '000'
}

export type ErrorHandler = (props: ErrorHandlerProps) => void

export const errorHandler: ErrorHandler = ({ cause, code, from }: ErrorHandlerProps) => {
  switch (code) {
    case Errors.Success:
      break
    case Errors.NotFound:
      throw new NotFoundError(cause, from)
    case Errors.Internal:
      throw new InternalError(cause, from)
    case Errors.Corrupted:
      throw new CorruptedDataError(cause, from)
    case Errors.TimedOut:
      throw new TimeoutError(from)
    default:
      throw new DefaultError(from)
  }
}