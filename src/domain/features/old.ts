import type { AlertaObservabilidadeProvider, Api1Provider, Api2Provider, Api3Provider, LocalCalcProvider } from "../contracts"
import { CorruptedDataError, InternalError, NotFoundError, TimeoutError } from "../errors"
import { Errors, type ErrorHandler } from "../../utils"
type Input = {
  name: string
}
type Output = "Success" | "NotFound" | "CorruptedData" | "InternalError" | "TimedOut" | "Unknown"
export type MultipleApiDataProcess = (input: Input) => Promise<Output>
type SetupMultipleApiDataProcessProps = {
  api1Provider: Api1Provider,
  api2Provider: Api2Provider,
  localCalc: LocalCalcProvider,
  api3Provider: Api3Provider,
  alertaObservabilidadeProvider: AlertaObservabilidadeProvider,
  errorHandler: ErrorHandler
}
type SetupMultipleApiDataProcess = (props: SetupMultipleApiDataProcessProps) => MultipleApiDataProcess

export const setupMultipleApiDataProcess: SetupMultipleApiDataProcess = ({ api1Provider, api2Provider, localCalc, api3Provider, alertaObservabilidadeProvider, errorHandler }: SetupMultipleApiDataProcessProps) => async input => {
  let attempts = 0
  async function DangerousRetryMechanism() {
    try {
      const { id, name } = await api1Provider({ name: input.name })
      errorHandler({ code: id, cause: name, from: "Api1Provider"})
      const { dataNascimento } = await api2Provider({ id })
      const success = await localCalc({ name, dataNascimento, id })
      await api3Provider({ id, isBirthDay: success })
      return "Success"
    } catch (e) {
      console.log(JSON.stringify(e))
      if(e instanceof NotFoundError) {
        return "NotFound"
      } else if(e instanceof CorruptedDataError) {
        alertaObservabilidadeProvider({ id: Errors.Corrupted })
        return "CorruptedData"
      } else if(e instanceof InternalError) {
        alertaObservabilidadeProvider({ id: Errors.Internal })
        return "InternalError"
      } else if(e instanceof TimeoutError) {
        if(attempts != 0) {
          attempts++ 
          return DangerousRetryMechanism()
        }
        return "TimedOut"
      } else {
        return "Unknown"
      }
    }
  }
  return await DangerousRetryMechanism()
}