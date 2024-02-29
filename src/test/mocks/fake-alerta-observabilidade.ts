import type { AlertaObservabilidadeProvider } from "../../domain/contracts";

export const alertaObservabilidade: AlertaObservabilidadeProvider = (props): Promise<boolean> => {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(true);
      }, 1000); // Simula uma operação assíncrona com delay
  });
}