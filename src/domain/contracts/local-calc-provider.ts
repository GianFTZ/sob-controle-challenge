import type { Api1ProviderResponse, Api2ProviderResponse } from "."

export type LocalCalcProviderProps = Api1ProviderResponse & Api2ProviderResponse

export type LocalCalcProvider = (props: LocalCalcProviderProps) => boolean