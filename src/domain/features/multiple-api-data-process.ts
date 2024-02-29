import type { Api1Provider, Api2Provider, LocalCalcProvider } from "../contracts"

type Input = {
  name: string
}
type Output = {}
export type MultipleApiDataProcess = (input: Input) => Promise<Output>
type SetupMultipleApiDataProcessProps = {
  api1Provider: Api1Provider,
  api2Provider: Api2Provider,
  localCalc: LocalCalcProvider
}
type SetupMultipleApiDataProcess = (props: SetupMultipleApiDataProcessProps) => MultipleApiDataProcess

export const setupMultipleApiDataProcess: SetupMultipleApiDataProcess = ({api1Provider, api2Provider, localCalc}: SetupMultipleApiDataProcessProps) => async input => {
  const { id, name } = await api1Provider({ name: input.name })
  const { dataNascimento } = await api2Provider({ id })
  localCalc({ name, dataNascimento, id})
  return {}
}