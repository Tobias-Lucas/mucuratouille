# Mucuratouille

**Receitas boas. Conselhos duvidosos.**

Mucuratouille é uma **Single Page Application (SPA) desenvolvida em Vue 3** para apresentar receitas da culinária paraense de forma simples, visual e bem-humorada. O projeto valoriza a identidade gastronômica de Belém do Pará e possui uma seção especial dedicada ao período do **Círio de Nazaré**.

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

## Proposta

A aplicação apresenta receitas típicas do Pará com uma identidade regional inspirada em Belém. A mascote é uma mucura cozinheira chamada **Mucuratouille**, personagem confiante, atrapalhada e bem-humorada que acompanha a experiência sem substituir as informações culinárias.

## Funcionalidades

- busca global por receita ou ingrediente, disponível em todas as páginas;
- filtros por categoria;
- categorias especiais do Círio de Nazaré e de Natal;
- marcação e remoção de receitas favoritas;
- contador reativo de favoritos;
- navegação para uma rota dinâmica de detalhes em `/receita/:id`;
- lista de ingredientes com marcação por checkbox;
- exibição do modo de preparo com `v-for`;
- botão “Surpreenda-me!” para selecionar uma receita aleatória;
- interface responsiva para desktop, tablet e celular.

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
- `/sobre` — informações sobre o projeto;
- `/equipe` — integrantes;
- `/fontes` — fontes das receitas;
- `/:pathMatch(.*)*` — página 404.

O `App.vue` mantém o cabeçalho, o rodapé e o toast de favoritos. O conteúdo central é trocado pelo `RouterView`. A navegação do cabeçalho, rodapé e cards utiliza `RouterLink`. O estado simples de favoritos foi movido para `src/state/favoritos.js` para continuar disponível durante a troca de rotas.

A configuração `vercel.json` adiciona o fallback necessário para que URLs internas da SPA possam ser abertas diretamente em produção.


## Evolução — 4ª etapa com integração à PokéAPI

A quarta fase evolui o Mucuratouille com a integração entre Front-End e Back-End por meio de uma API REST pública. A aplicação passou a consumir dados da **PokéAPI** utilizando requisições HTTP assíncronas, mantendo Vue 3, Bootstrap, Vue Router, componentização, reatividade e responsividade das etapas anteriores.

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
│   ├── FiltroCategorias.vue
│   └── Rodape.vue
├── data/
│   ├── filtros.js
│   └── receitas.js
├── router/
│   └── index.js
├── state/
│   └── favoritos.js
├── styles/
│   └── paginas-internas.css
├── views/
│   ├── HomeView.vue
│   ├── ReceitasView.vue
│   ├── ReceitaView.vue
│   ├── SobreView.vue
│   ├── EquipeView.vue
│   ├── FontesView.vue
│   └── NotFoundView.vue
├── App.vue
├── main.js
└── style.css
```


### Arquivos acrescentados ou ampliados na 4ª etapa

```text
src/
├── services/
│   └── pokeapi.js
├── views/
│   └── PokedexView.vue
└── data/
    └── receitas.js
```

`services/pokeapi.js` concentra a comunicação com a PokéAPI e o tratamento dos dados externos. `PokedexView.vue` apresenta a consulta e exploração dos Pokémon, enquanto `receitas.js` mantém o conteúdo autoral das receitas e sua associação com os Pokémon utilizados na integração.

Os arquivos em `components` continuam representando partes reutilizáveis da interface. Os arquivos em `views` representam as páginas associadas às rotas. `router/index.js` centraliza a configuração do Vue Router.

## Como executar

É necessário possuir Node.js instalado.

```bash
npm install
npm run dev
```

Depois, abra no navegador o endereço informado pelo Vite.

## Uso de Inteligência Artificial

Como proposto no enunciado da tarefa, a inteligência artificial foi utilizada como ferramenta de apoio nas etapas de concepção, identidade visual, componentização, conteúdo, implementação de interações e refinamento da interface.

Os prompts abaixo registram principalmente a **1ª etapa**, quando frameworks CSS e Vue Router ainda não eram permitidos. Na **2ª etapa**, o Bootstrap passou a ser integrado. Na **3ª etapa**, o projeto foi reorganizado como SPA com Vue Router.


Na **4ª etapa**, a IA também foi utilizada como apoio para planejar a integração com a PokéAPI, organizar o serviço de requisições, adaptar a identidade visual, estruturar a Pokédex e desenvolver o novo conjunto de receitas temáticas.

### Prompt 1 — Definição da proposta

> Tenho que desenvolver uma aplicação One Page em Vue 3 sobre receitas culinárias. O projeto deve usar apenas componentes .vue, `<script setup>`, props, ref(), eventos, v-if, v-show, v-for, v-model e CSS próprio. Não use Vue Router, frameworks CSS, bibliotecas de componentes ou gerenciamento de estado. Sugira uma proposta de aplicativo de receitas com identidade própria e funcionalidades simples que demonstrem os conteúdos estudados.

**Etapa:** definição inicial do projeto e das funcionalidades.

### Prompt 2 — Adaptação para Belém

> Adapte a proposta do aplicativo de receitas para a realidade de Belém do Pará. O projeto deve valorizar a culinária paraense e incluir receitas típicas da região, com uma seção especial relacionada ao período do Círio de Nazaré. Mantenha o escopo simples, adequado a um trabalho acadêmico de fundamentos de Vue.

**Etapa:** regionalização da proposta.

### Prompt 3 — Criação do Mucuratouille

> Crie uma identidade para um aplicativo de receitas paraenses chamado Mucuratouille. A mascote deve ser uma mucura cozinheira, engraçada, confiante e um pouco atrapalhada. O humor deve ser leve e situacional, com regionalismo discreto, sem exagerar em expressões como “égua” ou “pai d’égua”. Sugira slogan, personalidade e exemplos de falas curtas para a interface.

**Etapa:** criação do nome, mascote e linguagem do projeto.

### Prompt 4 — Divisão em componentes

> Para o aplicativo Mucuratouille, sugira uma estrutura simples e coerente de componentes Vue 3. Utilize arquivos .vue com `<script setup>` e mantenha tudo em uma única página. Preciso de pelo menos quatro componentes reutilizáveis. Não use Vue Router nem bibliotecas externas. Indique também quais componentes podem receber props.

**Etapa:** definição da estrutura de componentes.

### Prompt 5 — Identidade visual e CSS

> Crie uma proposta visual para o Mucuratouille usando apenas HTML e CSS dentro dos componentes Vue. A interface deve lembrar Belém do Pará e a culinária amazônica, com cores inspiradas em tucupi, jambu, madeira e tons quentes. O layout deve ser moderno, amigável e responsivo. Não use Bootstrap, Tailwind ou qualquer framework CSS.

**Etapa:** definição do design e da identidade visual.

### Prompt 6 — Conteúdo regional

> Crie uma lista de receitas paraenses para utilizar como dados locais em uma aplicação Vue. Inclua pratos como pato no tucupi, maniçoba, tacacá, arroz paraense, vatapá paraense, pirarucu de casaca, peixe frito com açaí, creme de cupuaçu e bolo de macaxeira. Para cada receita, forneça nome, categoria, tempo, porções, ingredientes e modo de preparo. Não utilize banco de dados ou API.

**Etapa:** criação do conteúdo local utilizado pela aplicação.

### Prompt 7 — Props e reutilização

> Crie um componente Vue 3 chamado CardReceita.vue usando `<script setup>`. Ele deve receber informações de uma receita por props, como nome, imagem, categoria, tempo e porções. O mesmo componente deverá ser reutilizado várias vezes com dados diferentes. Use apenas props, template e CSS próprio, sem bibliotecas externas.

**Etapa:** construção e reutilização do card de receitas.

### Prompt 8 — Diretivas e v-model

> Implemente uma busca simples para as receitas do Mucuratouille utilizando ref() e v-model. O usuário deve digitar o nome de uma receita ou ingrediente e a lista exibida deve mudar conforme a pesquisa. Utilize apenas recursos básicos de Vue trabalhados em aula, como ref, v-model, v-if e v-for.

**Etapa:** implementação da busca de receitas.

### Prompt 9 — Reatividade com eventos

> Adicione ao Mucuratouille uma função simples de favoritos utilizando ref() e @click. Ao clicar no coração de uma receita, ela deve ser marcada ou desmarcada como favorita e o contador de favoritos no cabeçalho deve ser atualizado automaticamente. Não use localStorage, Pinia ou qualquer biblioteca externa.

**Etapa:** implementação de favoritos e reatividade.

### Prompt 10 — Uso de v-if e v-for

> Crie um componente DetalheReceita.vue para o Mucuratouille. Ao selecionar uma receita, o componente deve aparecer na mesma página utilizando v-if. Os ingredientes e etapas do modo de preparo devem ser exibidos com v-for. Permita marcar ingredientes como separados usando eventos simples. Não utilize modal externo, Router ou bibliotecas.

**Etapa:** desenvolvimento da área de detalhes da receita.

### Prompt 11 — Ajustes de interface

> Revise a interface do Mucuratouille para funcionar bem em desktop, tablet e celular utilizando apenas CSS próprio. Ajuste grid, tamanhos de fonte, imagens, botões e espaçamentos. Não altere a estrutura Vue nem adicione bibliotecas externas. Mantenha o código simples e compreensível para estudantes que estão aprendendo componentes, props, diretivas, eventos e reatividade.

**Etapa:** refinamento visual e responsividade.


### Prompt 12 — Evolução para Vue Router

> Evolua o projeto Mucuratouille desenvolvido nas etapas anteriores incorporando Vue Router. Mantenha as funcionalidades existentes, Bootstrap e identidade visual. Crie páginas para Início, Receitas, Sobre, Equipe e Fontes, implemente uma rota dinâmica `/receita/:id` para os detalhes das receitas e uma página 404. Utilize RouterLink e RouterView e preserve a experiência SPA sem recarregamento completo.

**Etapa:** reorganização da aplicação em rotas e páginas com Vue Router.


### Prompt 13 — Integração com PokéAPI

> Evolua o projeto Mucuratouille desenvolvido nas etapas anteriores incorporando integração com uma API REST pública. Utilize a PokéAPI para consultar dados de Pokémon por meio de requisições HTTP GET assíncronas. Mantenha Vue 3, Bootstrap, Vue Router, componentização, reatividade e responsividade. Adapte o conceito do projeto para um cardápio fictício de receitas inspiradas em Pokémon, crie uma página Pokédex que permita pesquisar e visualizar informações retornadas pela API e indique quais Pokémon possuem receitas disponíveis. Separe, quando possível, a lógica de requisições dos componentes visuais e preserve a identidade bem-humorada do Mucuratouille.

**Etapa:** integração Front-End e Back-End por API REST, consumo de JSON e programação assíncrona.

## Imagens e referências visuais

As imagens do projeto têm finalidade acadêmica e ilustrativa.

- Mascote, capa principal e parte das imagens culinárias: imagens criadas com apoio de IA para o projeto;

As referências culinárias utilizadas em cada receita estão registradas nos próprios dados da aplicação e podem ser acessadas pelo painel de detalhes.

## Observações

As receitas foram adaptadas para fins acadêmicos e de demonstração da interface. As orientações de segurança exibidas para ingredientes como tucupi e maniva devem ser levadas a sério. Antes do preparo real, devem ser observadas as orientações dos fabricantes e as referências indicadas na aplicação.

---

## Equipe

| Integrante | Matrícula |
| --- | --- |
| Ana Paula Silva Amorim | 04218364 |
| Clayton China Simões | 04153200 |
| Jônatas Tiago Albuquerque de Moraes | 04214380 |
| Lucas Jatene Tobias | 04217989 |


**Mucuratouille — Receitas boas. Conselhos duvidosos.**  
Belém do Pará · 2026

## Responsividade atual

- O catálogo mantém duas colunas em celulares.
- As categorias continuam recolhíveis no mobile.
- O detalhe da receita agora é exibido pela rota dinâmica `/receita/:id`.
- Cabeçalho e menu principal foram ajustados para comportar a navegação por rotas.
- Bootstrap e CSS próprio continuam trabalhando em conjunto na responsividade.


## Atualização 3.1

A versão 3.1 refina a identidade visual da SPA, amplia o menu, reforça os fundos das páginas internas, adiciona Receita do Dia, inclui um Especial Natal com quatro receitas, aumenta a legibilidade do modo de preparo e adiciona um botão explícito para voltar ao catálogo ao abrir uma receita.

## Atualização 4.1.3

A versão 4.1.3 consolida a quarta etapa do projeto com integração à PokéAPI, nova rota Pokédex, 20 receitas temáticas, dados externos carregados de forma assíncrona, identidade visual atualizada, novos fundos e ilustrações, responsividade refinada e ajustes nos componentes de navegação, receitas e rodapé.
