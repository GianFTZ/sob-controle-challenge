export type Api3ProviderProps = {
  id: string
  isBirthDay: boolean
}

export type Api3Provider = (props: Api3ProviderProps) => Promise<void>