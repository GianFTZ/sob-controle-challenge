- Construir um código responsável por processar dados de múltiplas APIs
- Esse código vai realizar as seguintes tarefas em sequencia
	- GET dados da ApiFake1
	- GET dados da ApiFake2 usando dados de ApiFake1
	- Realizar um calculo local usando calculoLocal com dados de ApiFake1 e ApiFake2
	- POST o resultado em ApiFake3

Código inicial:
typescript
// Define os tipos para as entradas e saídas das funções
type ApiFake1Response = {
    id: string;
    name: string;
};

type ApiFake2Response = {
    dataNascimento: string;
};

// Função que simula uma requisição a ApiFake1
function apiFake1(name: string): Promise<ApiFake1Response> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: "123", name: name });
        }, 1000); // Simula uma operação assíncrona com delay
    });
}

// Função que simula uma requisição a ApiFake2
function apiFake2(id: string): Promise<ApiFake2Response> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ dataNascimento: "01/01/1990" });
        }, 1000); // Simula uma operação assíncrona com delay
    });
}

function alertaObservabilidade(id: string): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000); // Simula uma operação assíncrona com delay
    });
}

// Função que realiza um cálculo local, retornando um booleano
function calculoLocal({ id, name, dataNascimento }: ApiFake1Response & ApiFake2Response): boolean {
    // Simula um cálculo, retornando sempre true para simplificar
    return true;
}

// Função que simula o envio de dados para ApiFake3
function apiFake3(id: string, isBirthday: boolean): Promise<void> {
    return new Promise((resolve) => {
        console.log(`Dados enviados para ApiFake3: id=${id}, isBirthday=${isBirthday}`);
        resolve(); // Não retorna dados, apenas resolve a Promise
    });
}


- Requisitos:
	- Versão inicial
		- O código deve executar o fluxo corretamente, sem erros do TypeScript, usando configuração strict: true no tsconfig
	- Versão alpha
		- O código deve ter testes e error handling simples
		- Pode modificar as funções fake para que recebam inputs dinamicos, para podermos construir testes
			- Simular problemas
				- Use id '123' para fluxo successo
				- Use id '555' para item não encontrado
				- Use id '780' para erro interno no servidor da apiFake
				- Use id '999' para dado corrompido
				- Use id '000' para erro de timeout
	- Versão beta
		- Garanta que os fluxos acima tenham erros específicos, com tratamento individualizado
			- Como a API é fake, um log diferente para cada erro é o suficiente
	- Versão production
		- Adicionar um chamada a alertaObservabilidade em caso de erro interno e dado corrompido
		- Implement um mecanismo de retry para erro de timeout

- Em todas as versões atualize os testes e garanta um coverage razoável. Argumento o coverage que achar necessário.

- As tecnologies que vamos usar:
	- TypeScript
	- Bun: https://bun.sh/
	- Vitest: https://vitest.dev/
	- (Opcional) Effect: https://effect.website/
		- Caso seja muito complicado usar o Effect, pode usar TypeScript normalmente, usando Promises, async/await e try/catch.