import { CorruptedDataError, InternalError, NotFoundError, TimeoutError } from "../domain/errors"

interface ErrorHandlerProps {
  code: string
  cause: string
  from: string
}

export async function errorHandler({ code, cause, from }: ErrorHandlerProps) {
  switch(code) {
    case '123':
      break
    case '555':
      throw new NotFoundError(cause)
    case '780':
      throw new InternalError(cause)
    case '999':
      throw new CorruptedDataError(cause)
    case '000':
      throw new TimeoutError()
  }
}