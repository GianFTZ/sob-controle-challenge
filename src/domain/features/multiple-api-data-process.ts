type Input = {
  id: string
  name: string
  birthDate: string
}
type Output = {}
type MultipleApiDataProcess = (input: Input) => Promise<Output>
type SetupMultipleApiDataProcessProps = {}
type SetupMultipleApiDataProcess = (props: SetupMultipleApiDataProcessProps) => MultipleApiDataProcess

export const setupMultipleApiDataProcess: SetupMultipleApiDataProcess = ({}: SetupMultipleApiDataProcessProps) => async input => {
  return {}
}