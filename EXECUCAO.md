# Como executar o Mucuratouille

Este documento apresenta os requisitos e os procedimentos para instalar, executar, testar e gerar a versão de produção do Mucuratouille.

## Requisitos

Antes de iniciar, verifique se o ambiente possui:

- **Node.js:** versão `22.12.0` ou superior.
- **npm:** instalado junto com o Node.js.
- **Conexão com a internet:** necessária para carregar os dados consultados na PokéAPI.

Para conferir as versões instaladas, execute:

```bash
node --version
npm --version
```

## 1. Obter o projeto

Baixe ou clone o repositório do Mucuratouille e abra o terminal na pasta raiz do projeto, onde estão os arquivos `package.json` e `package-lock.json`.

## 2. Instalar as dependências

Na pasta raiz, execute:

```bash
npm ci
```

O comando instala as dependências registradas no `package-lock.json`, mantendo as versões definidas para o projeto.

Caso seja necessário instalar ou atualizar as dependências sem utilizar a instalação limpa, execute:

```bash
npm install
```

## 3. Executar em ambiente de desenvolvimento

Após a instalação, inicie o servidor local:

```bash
npm run dev
```

O Vite iniciará a aplicação. Acesse no navegador o endereço exibido no terminal. Na configuração atual, o endereço padrão é:

```text
http://127.0.0.1:5173/
```

Mantenha o terminal aberto enquanto estiver utilizando o servidor de desenvolvimento. Para encerrá-lo, pressione `Ctrl + C`.

## 4. Executar os testes automatizados

Para executar os testes configurados no projeto, utilize:

```bash
npm test
```

O comando executa o arquivo `tests/dados.test.js` com o módulo nativo de testes do Node.js.

Os testes verificam aspectos da aplicação, incluindo:

- Integridade e quantidade das 20 receitas cadastradas;
- Existência das imagens utilizadas no catálogo;
- Associação entre as receitas e os Pokémon;
- Funcionamento da busca, dos filtros e da ordenação;
- Paleta visual e identificação dos tipos de Pokémon;
- Organização do serviço de integração com a PokéAPI;
- Configuração das rotas da aplicação;
- Elementos principais da estrutura SPA.

## 5. Gerar a versão de produção

Para compilar a aplicação e gerar os arquivos otimizados para publicação, execute:

```bash
npm run build
```

Se a compilação for concluída, os arquivos de produção serão gerados na pasta:

```text
dist/
```

Essa é a pasta que deve ser utilizada no processo de publicação em uma hospedagem compatível com aplicações estáticas.

## 6. Visualizar a versão de produção localmente

Depois de executar o build, é possível conferir a versão compilada antes da publicação:

```bash
npm run preview
```

O Vite iniciará uma prévia local. Na configuração padrão, o endereço será:

```text
http://127.0.0.1:4173/
```

## Observações

- O Bootstrap é carregado por um arquivo local em `src/vendor/bootstrap.min.css`; não é necessário instalá-lo separadamente.
- A aplicação não utiliza banco de dados nem exige um servidor Back-End próprio.
- As informações dos Pokémon são consultadas diretamente na PokéAPI por requisições HTTP realizadas pelo Front-End.
- A conexão com a internet é necessária para as consultas externas. Se a PokéAPI estiver indisponível, as consultas que dependem dela poderão não carregar.
- Os favoritos e o histórico de receitas utilizam o armazenamento local (`localStorage`) do navegador.
- A configuração `vercel.json` contém uma regra de reescrita para encaminhar as rotas da aplicação SPA ao `index.html`, necessária para permitir o acesso direto às rotas internas em hospedagens que utilizem essa configuração.
