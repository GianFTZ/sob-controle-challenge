import { Effect } from "effect"
import type { Api1Provider, Api2Provider, Api3Provider, LocalCalcProvider } from "../contracts"
import { error } from "effect/Brand"
import { CorruptedDataError, InternalError, NotFoundError, TimeoutError } from "../errors"

type Input = {
  name: string
}
type Output = {}
export type MultipleApiDataProcess = (input: Input) => Promise<Output>
type SetupMultipleApiDataProcessProps = {
  api1Provider: Api1Provider,
  api2Provider: Api2Provider,
  localCalc: LocalCalcProvider,
  api3Provider: Api3Provider
}
type SetupMultipleApiDataProcess = (props: SetupMultipleApiDataProcessProps) => MultipleApiDataProcess

export const setupMultipleApiDataProcess: SetupMultipleApiDataProcess = ({ api1Provider, api2Provider, localCalc, api3Provider }: SetupMultipleApiDataProcessProps) => async input => {
  try {
    const { id, name } = await api1Provider({ name: input.name })
    switch(id) {
      case '123':
        break
      case '555':
        throw new NotFoundError(name)
      case '780':
        throw new InternalError(name)
      case '999':
        throw new CorruptedDataError(name)
      case '000':
        throw new TimeoutError()
    }
    const { dataNascimento } = await api2Provider({ id })
    const success = await localCalc({ name, dataNascimento, id })
    await api3Provider({ id, isBirthDay: success })
    return {}
  } catch (e) {
    console.log(typeof e)
    return {}
  }
}