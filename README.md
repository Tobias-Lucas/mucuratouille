# Mucuratouille

**Receitas boas. Conselhos duvidosos.**

Mucuratouille é uma aplicação **One Page desenvolvida em Vue 3** para apresentar receitas da culinária paraense de forma simples, visual e bem-humorada. O projeto valoriza a identidade gastronômica de Belém do Pará e possui uma seção especial dedicada ao período do **Círio de Nazaré**.

O trabalho foi desenvolvido pela **turma do segundo semestre de Análise e Desenvolvimento de Sistemas (ADS) da UNAMA, em Belém do Pará**, como atividade da disciplina de Front-End Frameworks.

## Objetivo acadêmico

O projeto foi construído para aplicar somente os fundamentos de Vue trabalhados na disciplina:

- componentes `.vue`;
- `<script setup>`;
- props;
- `ref()`;
- eventos como `@click`, `@input` e `@submit`;
- diretivas `v-if`, `v-show`, `v-for` e `v-model`;
- CSS próprio;
- reutilização de componentes.

O projeto **não utiliza** Vue Router, Bootstrap, Tailwind, bibliotecas externas de componentes ou bibliotecas de gerenciamento de estado.

## Proposta

A aplicação apresenta receitas típicas do Pará com uma identidade regional inspirada em Belém. A mascote é uma mucura cozinheira chamada **Mucuratouille**, personagem confiante, atrapalhada e bem-humorada que acompanha a experiência sem substituir as informações culinárias.

## Funcionalidades

- busca por receita ou ingrediente;
- filtros por categoria;
- categoria especial do Círio de Nazaré;
- marcação e remoção de receitas favoritas;
- contador reativo de favoritos;
- seleção de uma receita para exibir os detalhes na mesma página;
- lista de ingredientes com marcação por checkbox;
- exibição do modo de preparo com `v-for`;
- botão para selecionar uma receita aleatória;
- interface responsiva para desktop, tablet e celular.

## Componentes

A interface foi dividida em componentes com responsabilidades específicas:

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
├── App.vue
├── main.js
└── style.css
```

O `CardReceita.vue` é reutilizado para exibir diferentes receitas a partir de props. O `DetalheReceita.vue` recebe a receita selecionada e utiliza `v-for` para mostrar ingredientes e etapas do preparo.

## Como executar

É necessário possuir Node.js instalado.

```bash
npm install
npm run dev
```

Depois, abra no navegador o endereço informado pelo Vite.

## Uso de Inteligência Artificial

Como proposto no enunciado da tarefa, a inteligência artificial foi utilizada como ferramenta de apoio nas etapas de concepção, identidade visual, componentização, conteúdo, implementação de interações e refinamento da interface. Todo o desenvolvimento foi limitado aos conteúdos estudados na disciplina.

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

## Imagens e referências visuais

As imagens do projeto têm finalidade acadêmica e ilustrativa.

- Mascote, capa principal e parte das imagens culinárias: imagens criadas com apoio de IA para o projeto;

As referências culinárias utilizadas em cada receita estão registradas nos próprios dados da aplicação e podem ser acessadas pelo painel de detalhes.

## Observações

As receitas foram adaptadas para fins acadêmicos e de demonstração da interface. As orientações de segurança exibidas para ingredientes como tucupi e maniva devem ser levadas a sério. Antes do preparo real, devem ser observadas as orientações dos fabricantes e as referências indicadas na aplicação.

---

## Equipe

**Ana Paula Silva Amorim**
**Clayton China Simões**
**Jônatas Tiago Albuquerque de Moraes**
**Lucas Jatene Tobias**


**Mucuratouille — Receitas boas. Conselhos duvidosos.**  
Belém do Pará · 2026
