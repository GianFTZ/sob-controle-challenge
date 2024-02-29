type Input = {}
type Output = {}
type MultipleApiDataProcess = (input: Input) => Promise<Output>
type SetupMultipleApiDataProcessProps = {}
type SetupMultipleApiDataProcess = (props: SetupMultipleApiDataProcessProps) => MultipleApiDataProcess

export const setupMultipleApiDataProcess: SetupMultipleApiDataProcess = () => async input => {
  return {}
}