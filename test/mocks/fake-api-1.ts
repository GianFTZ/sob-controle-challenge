import type { Api1Provider, Api1Response } from "../../src/domain/contracts";

export const apiFake1: Api1Provider = (props): Promise<Api1Response>  => {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve({ id: "123", name: props.name });
      }, 1000); // Simula uma operação assíncrona com delay
  });
}