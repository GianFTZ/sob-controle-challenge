import type { Api3Provider } from "../../domain/contracts";

export const apiFake3: Api3Provider = (props): Promise<void> => {
  return new Promise((resolve) => {
      console.log(`Dados enviados para ApiFake3: id=${props.id}, isBirthday=${props.isBirthDay}`);
      resolve(); // Não retorna dados, apenas resolve a Promise
  });
}