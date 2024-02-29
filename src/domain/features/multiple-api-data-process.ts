import type { Api1Provider } from "../contracts/api-1-provider"

type Input = {
  id: string
  name: string
  birthDate: string
}
type Output = {}
type MultipleApiDataProcess = (input: Input) => Promise<Output>
type SetupMultipleApiDataProcessProps = {
  api1Provider: Api1Provider
}
type SetupMultipleApiDataProcess = (props: SetupMultipleApiDataProcessProps) => MultipleApiDataProcess

export const setupMultipleApiDataProcess: SetupMultipleApiDataProcess = ({}: SetupMultipleApiDataProcessProps) => async input => {
  return {}
}