import type { Api2Provider, Api2ProviderResponse } from "../../src/domain/contracts";

export const apiFake2: Api2Provider = (props): Promise<Api2ProviderResponse> => {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve({ dataNascimento: "01/01/1990" });
      }, 1000); // Simula uma operação assíncrona com delay
  });
}