import type { AlertaObservabilidadeProvider, Api1Provider, Api1ProviderResponse, Api2Provider, Api3Provider, LocalCalcProvider } from "../contracts"
import { CorruptedDataError, InternalError, NotFoundError, TimeoutError } from "../errors"
import { Errors, type ErrorHandler } from "../../utils"
import { Effect, Schedule, Stream, pipe } from "effect"
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
  const retryPolicy = Schedule.addDelay(Schedule.recurs(1), () => "100 millis")
  const main = async () => await pipe(input, (data) => {
    return api1Provider({ name: data.name })
  }, async (data) => {
    const { id, name } = await data
    errorHandler({ code: id, cause: name, from: "Api1Provider" })
    return { id, name }
  }, async (data) => {
    const { id, name } = await data
    const res = await api2Provider({ id })
    return { id, name, ...res }
  }, async (data) => {
    const { dataNascimento, id, name } = await data
    const res = await localCalc({ dataNascimento, id, name })
    return { dataNascimento, id, name, isBirthDay: res }
  }, async (data): Promise<Output> => {
    const { id, isBirthDay } = await data
    await api3Provider({ id, isBirthDay })
    const response: Output = "Success"
    return response
  }).catch((reason): Output => {
    if(reason instanceof NotFoundError) return "NotFound"; 
    else if(reason instanceof CorruptedDataError) {
      alertaObservabilidadeProvider({ id: Errors.Corrupted })
      return "CorruptedData"
    } else if(reason instanceof InternalError) {
      alertaObservabilidadeProvider({ id: Errors.Internal })
      return "InternalError"
    } else if(reason instanceof TimeoutError) {
      if(attempts == 0) {
        attempts++ 
        main()
      }
      return "TimedOut"
    } else return "Unknown"
  })
  const pipelineResponse = await main()
  return pipelineResponse
}