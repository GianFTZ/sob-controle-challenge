import type { Api1Provider, Api2Provider } from "../contracts"

type Input = {
  name: string
}
type Output = {}
export type MultipleApiDataProcess = (input: Input) => Promise<Output>
type SetupMultipleApiDataProcessProps = {
  api1Provider: Api1Provider,
  api2Provider: Api2Provider,
  // localCalc: LocalCalcProvider
}
type SetupMultipleApiDataProcess = (props: SetupMultipleApiDataProcessProps) => MultipleApiDataProcess

export const setupMultipleApiDataProcess: SetupMultipleApiDataProcess = ({api1Provider, api2Provider}: SetupMultipleApiDataProcessProps) => async input => {
  const { id } = await api1Provider({ name: input.name })
  await api2Provider({ id })
  return {}
}