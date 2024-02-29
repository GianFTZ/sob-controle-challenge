import type { Api1Provider, Api2Provider, Api3Provider, LocalCalcProvider } from "../contracts"

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

export const setupMultipleApiDataProcess: SetupMultipleApiDataProcess = ({api1Provider, api2Provider, localCalc, api3Provider}: SetupMultipleApiDataProcessProps) => async input => {
  const { id, name } = await api1Provider({ name: input.name })
  const { dataNascimento } = await api2Provider({ id })
  const success = await localCalc({ name, dataNascimento, id})
  await api3Provider({ id, isBirthDay: success })
  return {}
}