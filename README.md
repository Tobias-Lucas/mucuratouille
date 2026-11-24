# Mucuratouille

**Receitas duvidosas. Conselhos mais ainda.**

Mucuratouille é uma **Single Page Application (SPA) desenvolvida em Vue 3** que combina o universo da culinária com o mundo Pokémon. A aplicação apresenta um catálogo interativo com **20 receitas fictícias inspiradas em Pokémon**, permitindo explorar pratos temáticos, consultar ingredientes, acompanhar modos de preparo e descobrir informações sobre os Pokémon relacionados a cada receita.

O trabalho foi desenvolvido pela **turma do segundo semestre de Análise e Desenvolvimento de Sistemas (ADS) da UNAMA, em Belém do Pará**, como atividade da disciplina de Front-End Frameworks.

## Objetivo acadêmico

Na primeira etapa, o projeto foi construído para aplicar os fundamentos de Vue trabalhados na disciplina:

- componentes `.vue`;
- `<script setup>`;
- props;
- `ref()`;
- eventos como `@click`, `@input` e `@submit`;
- diretivas `v-if`, `v-show`, `v-for` e `v-model`;
- CSS próprio;
- reutilização de componentes.

Na segunda etapa, o projeto foi evoluído com **Bootstrap 5.3.6**, mantendo Vue.js, componentização e reatividade. O Bootstrap foi incluído localmente em `src/vendor/bootstrap.min.css`.

Na terceira etapa, o projeto passou a utilizar **Vue Router 4.6.4**, organizando o conteúdo em diferentes rotas sem recarregamento completo da aplicação. O projeto continua sem biblioteca externa de gerenciamento de estado e sem biblioteca pronta de componentes Vue.

Na quarta etapa, o projeto foi ampliado com a integração à **PokéAPI**, uma API REST pública que permite consultar informações do universo Pokémon por meio de requisições HTTP GET assíncronas. 

## Proposta

O **Mucuratouille** é uma aplicação interativa que une culinária e o universo Pokémon, apresentando um cardápio fictício com 20 receitas inspiradas em diferentes Pokémon. A experiência permite explorar pratos temáticos, consultar ingredientes e modos de preparo, marcar favoritos e descobrir informações sobre os personagens relacionados às receitas por meio de uma Pokédex integrada à PokéAPI.

A identidade visual mantém a mascote Mucuratouille, uma mucura cozinheira de personalidade confiante, atrapalhada e bem-humorada, que representa o estilo descontraído do projeto e acompanha o usuário durante a navegação.

## Funcionalidades

- busca global por receita ou ingrediente, disponível em todas as páginas;
- filtros por categoria;
- marcação e remoção de receitas favoritas;
- histórico de receitas acessadas
- contador reativo de favoritos;
- favoritos com persistência no localStorage;
- pokédex com pesquisa por nome ou número;
- filtros de Pokémon por tipo;
- filtro de Pokémon que possuem ou não receitas;
- paginação da Pokédex;
- página individual de detalhes dos Pokémon;
- consulta de características, estatísticas e cadeia evolutiva
- navegação para uma rota dinâmica de detalhes em `/receita/:id`;
- lista de ingredientes com marcação por checkbox;
- exibição do modo de preparo com `v-for`;
- botão “Surpreenda-me!” para selecionar uma receita aleatória;
- interface responsiva para desktop, tablet e celular.
- estados de carregamento, erro e ausência de resultados;
- identidade visual adaptada dinamicamente ao tipo do Pokémon.

## Evolução — 2ª etapa com Bootstrap

A segunda fase mantém todas as funcionalidades da primeira avaliação e utiliza o Bootstrap para simplificar layout, responsividade e estilização de elementos da interface.

Principais melhorias:

- grid responsivo com `container-fluid`, `row`, `col-12`, `col-sm-*`, `col-lg-*` e `col-xl-*`;
- espaçamentos com `g-3`, `g-4`, `gap-*`, `px-*` e `pb-*`;
- cards de receitas modernizados com `card`, `card-body`, `card-title`, `rounded-4`, `h-100` e `shadow-sm`;
- busca com `input-group`, `input-group-text` e `form-control`, agora global e disponível em todas as rotas;
- botão “Surpreenda-me!” destacado em verde ao lado das categorias, mantendo classes Bootstrap de botão e arredondamento;
- filtros em formato pill, com SVGs próprios e estados ativos mais evidentes;
- ícones da interface substituídos por SVGs vetoriais consistentes;
- organização com `d-flex`, `align-items-center`, `justify-content-between` e `flex-wrap`;
- estrutura visual baseada em cards, formulários, badges, progress e utilities do Bootstrap;
- equipe representada por quatro personagens Mucura distintos, associados a nome e matrícula;
- responsividade aprimorada em desktop, tablet e dispositivos móveis;
- cabeçalho com logo transparente, mascote, contador de favoritos e navegação principal;
- rodapé com recorte ondulado real, personagem próprio e links para Sobre, Equipe e Fontes;
- novas imagens locais para Vatapá paraense e Chibé.
- barra reativa de ingredientes com `progress` e `progress-bar`, atualizada conforme os checkboxes são marcados;
- notificações de favoritos apresentadas com o componente visual `toast`, controlado pelo Vue;
- tempo, porções e dificuldade exibidos como `badge` com `rounded-pill` no detalhe das receitas.

O CSS próprio continua sendo utilizado para preservar a identidade regional do Mucuratouille, como cores, ondulações, sobreposições, mascote e elementos decorativos.

## Evolução — 3ª etapa com Vue Router

A terceira fase reorganiza o projeto como uma SPA com rotas reais, preservando as funcionalidades das etapas anteriores.

Rotas implementadas:

- `/` — página inicial;
- `/receitas` — catálogo com busca, categorias e favoritos;
- `/receita/:id` — rota dinâmica para o detalhe de cada receita;
- `/pokedex` — catálogo de Pokémon
- `/pokemon/:nome` — detalhes individuais de um Pokémon
- `/sobre` — informações sobre o projeto;
- `/equipe` — integrantes;
- `/fontes` — fontes das receitas;
- `/:pathMatch(.*)*` — página 404.

O `App.vue` mantém o cabeçalho, o rodapé e o toast de favoritos. O conteúdo central é trocado pelo `RouterView`. A navegação do cabeçalho, rodapé e cards utiliza `RouterLink`. O estado simples de favoritos foi movido para `src/state/favoritos.js` para continuar disponível durante a troca de rotas.

A configuração `vercel.json` adiciona o fallback necessário para que URLs internas da SPA possam ser abertas diretamente em produção.


## Evolução — 4ª etapa com integração à PokéAPI

A quarta fase evolui o Mucuratouille com a integração do Front-End com uma API REST pública, utilizando a **PokéAPI** para consultar e apresentar informações externas de forma assíncrona. A aplicação passou a consumir dados da **PokéAPI** utilizando requisições HTTP assíncronas, mantendo Vue 3, Bootstrap, Vue Router, componentização, reatividade e responsividade das etapas anteriores.

Nesta fase, o conceito do projeto foi adaptado para um cardápio fictício e bem-humorado de receitas inspiradas em Pokémon, preservando a identidade do Mucuratouille.

Principais implementações:

- integração com a API pública **PokéAPI**;
- requisições HTTP `GET` realizadas de forma assíncrona;
- separação da lógica de comunicação com a API em `src/services/pokeapi.js`;
- consumo e tratamento de dados JSON retornados pela API;
- nova rota `/pokedex` para consulta dos Pokémon;
- pesquisa de Pokémon por nome ou número;
- exibição dinâmica de nome, número, imagem oficial, tipos, habilidades, altura, peso, experiência base e demais informações disponibilizadas pela API;
- consulta de espécies e cadeias evolutivas quando necessárias à interface;
- tratamento e tradução de informações exibidas ao usuário;
- indicação visual dos Pokémon que já possuem receitas disponíveis no Mucuratouille;
- associação entre as receitas locais e os Pokémon consultados na API;
- substituição do cardápio anterior por **20 receitas temáticas fictícias**;
- uso de `ref()`, `v-if`, `v-for`, interpolação e eventos para apresentar e manipular os dados recebidos;
- estados de carregamento, erro e ausência de resultados durante as consultas;
- busca do catálogo integrada aos nomes das receitas, ingredientes e Pokémon;
- tipo do Pokémon utilizado para influenciar detalhes visuais da interface e do componente de receita;
- página de detalhes da receita combinando informações autorais do prato com dados obtidos em tempo real pela PokéAPI;
- manutenção das rotas, favoritos, Bootstrap, responsividade, cabeçalho, rodapé e demais funcionalidades das etapas anteriores;
- nova identidade visual combinando o tema culinário do Mucuratouille com uma estética inspirada em jogos de criaturas e aventura;
- imagens autorais e ilustrativas criadas especificamente para as novas receitas e para a identidade visual da quarta fase.

A comunicação com a API ocorre no Front-End. Quando uma página necessita de informações de um Pokémon, a aplicação executa uma requisição assíncrona para a PokéAPI, recebe a resposta em formato JSON, trata os dados necessários e atualiza a interface reativamente.

A quarta etapa utiliza operações `GET`. Não foi necessário desenvolver um servidor próprio nem implementar operações de cadastro, edição ou exclusão na API.

## Organização do projeto

```text
src/
├── components/
│   ├── BuscaReceitas.vue
│   ├── Cabecalho.vue
│   ├── CardReceita.vue
│   ├── DetalheReceita.vue
│   ├── EstadoCarregamento.vue
│   ├── EstadoErro.vue
│   ├── EstadoVazio.vue
│   ├── FiltroCategorias.vue
│   ├── FiltroTipos.vue
│   ├── ModalInformacoes.vue
│   ├── PokemonCard.vue
│   ├── PokemonEvolucao.vue
│   ├── PokemonInfo.vue
│   ├── PokemonTypeBadge.vue
│   └── Rodape.vue
├── data/
│   ├── filtros.js
│   └── receitas.js
├── router/
│   └── index.js
├── services/
│   └── pokeapi.js
├── state/
│   ├── favoritos.js
│   └── historico.js
├── styles/
│   └── paginas-internas.css
├── utils/
│   └── pokemonTheme.js
├── vendor/
│   └── bootstrap.min.css
├── views/
│   ├── EquipeView.vue
│   ├── FontesView.vue
│   ├── HomeView.vue
│   ├── NotFoundView.vue
│   ├── PokedexView.vue
│   ├── PokemonView.vue
│   ├── ReceitaView.vue
│   ├── ReceitasView.vue
│   └── SobreView.vue
├── App.vue
├── main.js
└── style.css
```

## Como executar

Para consultar os requisitos, instruções de instalação, execução em ambiente de desenvolvimento, testes automatizados e geração da versão de produção, acesse o guia:

[**Como executar o Mucuratouille (EXECUCAO.md)**](EXECUCAO.md)

## Uso de Inteligência Artificial

A inteligência artificial foi utilizada como ferramenta de apoio durante o desenvolvimento do Mucuratouille, contribuindo para a concepção da proposta, identidade visual, componentização, implementação de funcionalidades, integração com a PokéAPI, testes e refinamento da aplicação.

Os prompts utilizados nas etapas de desenvolvimento, juntamente com os registros complementares de evolução e consolidação do projeto, estão organizados em um documento próprio:

[**Consultar os prompts de Inteligência Artificial (PROMPTS_IA.md)**](PROMPTS_IA.md)

## Imagens e referências visuais

As imagens do projeto têm finalidade acadêmica e ilustrativa.

- Mascote, capa principal e parte das imagens culinárias: imagens criadas com apoio de IA para o projeto;

As referências culinárias utilizadas em cada receita estão registradas nos próprios dados da aplicação e podem ser acessadas pelo painel de detalhes.

## Observações

**Cardápio autoral e conteúdo fictício**

O catálogo do Mucuratouille reúne 20 receitas fictícias e autorais, desenvolvidas com auxílio de IA, especialmente para o projeto e inspiradas em diferentes Pokémon. Cada prato possui nome, descrição, imagem, ingredientes e modo de preparo próprios, combinando características dos personagens com propostas culinárias temáticas.

---

## Equipe

| Integrante | Matrícula |
| --- | --- |
| Ana Paula Silva Amorim | 04218364 |
| Clayton China Simões | 04153200 |
| Jônatas Tiago Albuquerque de Moraes | 04214380 |
| Lucas Jatene Tobias | 04217989 |


**Mucuratouille — Receitas duvidosas. Conselhos mais ainda.**  
Belém do Pará · 2026