import type { LocalCalcProvider } from "../../domain/contracts";

export const calculoLocal: LocalCalcProvider = (props): boolean => {
  // Simula um cálculo, retornando sempre true para simplificar
  return true;
}