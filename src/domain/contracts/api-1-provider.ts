export type Api1Response = {
  id: string;
  name: string;
};

export type Api1Provider = (props: { name: string }) => Promise<Api1Response>