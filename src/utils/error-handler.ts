import { CorruptedDataError, DefaultError, InternalError, NotFoundError, TimeoutError } from "../domain/errors"

interface ErrorHandlerProps {
  code: string
  cause: string
  from: string
}

enum Errors {
  'Success' = '123',
  'NotFound' = '555',
  'Internal' = '780',
  'Corrupted' = '999',
  'TimedOut' = '000'
}

export async function errorHandler({ code, cause, from }: ErrorHandlerProps) {
  switch(code) {
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