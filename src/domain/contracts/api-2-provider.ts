export type Api2ProviderResponse = {
  dataNascimento: string;
}

export type Api2Provider = (props: { id: string }) => Promise<Api2ProviderResponse>