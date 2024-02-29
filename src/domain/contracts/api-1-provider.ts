export type Api1ProviderResponse = {
  id: string;
  name: string;
};

export type Api1Provider = (props: { name: string }) => Promise<Api1ProviderResponse>