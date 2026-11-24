# Prompts de Inteligência Artificial — Mucuratouille

Este documento reúne os prompts relacionados ao desenvolvimento do Mucuratouille, organizados conforme a evolução do projeto nas quatro etapas da disciplina.

---

## Etapa 1 — Fundamentos de Vue 3

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

---

## Etapa 2 — Bootstrap e evolução da interface

### Prompt complementar A — Integração do Bootstrap 5.3.6

> Evolua a interface atual do Mucuratouille incorporando o Bootstrap 5.3.6, sem remover as funcionalidades já implementadas. Utilize o grid responsivo, utilities de espaçamento, alinhamento, flexbox, cards, formulários, botões e demais recursos adequados à aplicação. Mantenha o CSS próprio para os elementos que compõem a identidade visual, como cores, mascote, fundos, formas decorativas e detalhes específicos. Inclua o Bootstrap localmente em `src/vendor/bootstrap.min.css` e garanta que a aplicação continue responsiva em desktop, tablet e celular. Nesta etapa, não implemente Vue Router nem altere o escopo funcional do projeto.

**Etapa:** adoção do framework CSS e refinamento da interface.

---

## Etapa 3 — Vue Router e organização da aplicação

### Prompt 12 — Evolução para Vue Router

> Evolua o projeto Mucuratouille desenvolvido nas etapas anteriores incorporando Vue Router. Mantenha as funcionalidades existentes, Bootstrap e identidade visual. Crie páginas para Início, Receitas, Sobre, Equipe e Fontes, implemente uma rota dinâmica `/receita/:id` para os detalhes das receitas e uma página 404. Utilize RouterLink e RouterView e preserve a experiência SPA sem recarregamento completo.

**Etapa:** reorganização da aplicação em rotas e páginas com Vue Router.

---

## Etapa 4 — Integração com PokéAPI e cardápio temático

### Prompt 13 — Integração com PokéAPI

> Evolua o projeto Mucuratouille desenvolvido nas etapas anteriores incorporando integração com uma API REST pública. Utilize a PokéAPI para consultar dados de Pokémon por meio de requisições HTTP GET assíncronas. Mantenha Vue 3, Bootstrap, Vue Router, componentização, reatividade e responsividade. Adapte o conceito do projeto para um cardápio fictício de receitas inspiradas em Pokémon, crie uma página Pokédex que permita pesquisar e visualizar informações retornadas pela API e indique quais Pokémon possuem receitas disponíveis. Separe, quando possível, a lógica de requisições dos componentes visuais e preserve a identidade bem-humorada do Mucuratouille.

**Etapa:** integração Front-End e Back-End por API REST, consumo de JSON e programação assíncrona.

### Prompt complementar B — Organização do cardápio temático

> A partir da integração com a PokéAPI, organize o catálogo do Mucuratouille como um cardápio fictício com 20 receitas inspiradas em Pokémon. Cada receita deve possuir identificação própria, nome, descrição, categoria, imagem, tempo, porções, dificuldade, ingredientes e modo de preparo. Relacione cada receita ao Pokémon correspondente por meio dos dados locais da aplicação. Mantenha separadas as informações autorais das receitas e as informações oficiais obtidas pela PokéAPI. Não apresente as receitas fictícias como conteúdo fornecido pela API.

**Etapa:** consolidação do catálogo autoral e associação entre receitas e Pokémon.

### Prompt complementar C — Persistência de favoritos e histórico

> Aprimore o gerenciamento de favoritos do Mucuratouille para que as receitas marcadas continuem salvas mesmo depois que o usuário atualizar ou fechar o navegador. Utilize `localStorage` e mantenha o estado reativo do Vue, organizando a lógica em `src/state/favoritos.js`. Implemente também um histórico das cinco receitas visualizadas mais recentemente, com persistência local em `src/state/historico.js`. Evite registros duplicados no histórico e preserve as funcionalidades já existentes.

**Etapa:** persistência local de preferências e histórico de navegação.

### Prompt complementar D — Ampliação da busca e dos filtros

> Amplie a busca global do Mucuratouille para localizar receitas por nome, ingrediente, categoria, nome do Pokémon relacionado e tipo do Pokémon. Mantenha os filtros de categoria e integre os novos critérios sem prejudicar a navegação entre páginas. Garanta que os resultados sejam atualizados reativamente, que os filtros possam ser combinados de maneira coerente e que a interface apresente um estado adequado quando nenhuma receita corresponder à pesquisa.

**Etapa:** ampliação dos mecanismos de pesquisa e descoberta de receitas.

### Prompt complementar E — Evolução da Pokédex

> Aprimore a Pokédex do Mucuratouille para oferecer uma experiência de consulta mais completa. Permita pesquisar Pokémon por nome ou número, filtrar por tipo, identificar quais possuem receitas relacionadas e navegar pelos resultados com paginação. Crie uma página individual de detalhes para cada Pokémon, apresentando as informações disponíveis na PokéAPI, como imagem, tipos, habilidades, características, estatísticas e cadeia evolutiva, quando disponíveis. Utilize uma rota dinâmica própria para os detalhes, mantenha a comunicação com a API separada dos componentes visuais e preserve a associação com as receitas do catálogo.

**Etapa:** ampliação da consulta de Pokémon e implementação dos detalhes individuais.

### Prompt complementar F — Tratamento dos estados da integração

> Revise os componentes que dependem da PokéAPI e padronize os estados de carregamento, erro e ausência de resultados. Durante as requisições, apresente uma indicação visual de carregamento. Quando a API estiver indisponível ou retornar uma resposta inválida, apresente uma mensagem compreensível e permita que o usuário tente novamente quando apropriado. Não exiba informações fictícias como se fossem respostas reais da API. Organize componentes reutilizáveis para esses estados e preserve a navegação e as demais funcionalidades da aplicação.

**Etapa:** tratamento de requisições assíncronas e melhoria da experiência em situações de falha.

### Prompt complementar G — Identidade visual dinâmica por tipo de Pokémon

> Refine a identidade visual do Mucuratouille para que os detalhes das receitas e páginas de Pokémon possam utilizar elementos visuais relacionados ao tipo do Pokémon correspondente. Centralize a definição dos temas em um utilitário próprio, evitando repetir regras de cores em vários componentes. Preserve a identidade visual geral do projeto, a legibilidade dos textos, o contraste dos elementos e a responsividade em diferentes tamanhos de tela.

**Etapa:** integração entre dados da PokéAPI e apresentação visual da aplicação.

---

## Etapa final — Qualidade, refinamento e documentação

### Prompt complementar H — Revisão funcional e testes

> Faça uma revisão técnica do Mucuratouille considerando todas as funcionalidades implementadas nas etapas anteriores. Verifique a integridade das 20 receitas, associações com Pokémon, busca, filtros, favoritos, histórico, rotas, Pokédex, detalhes individuais e estados de carregamento e erro. Revise os testes automatizados existentes e acrescente testes para comportamentos importantes que ainda não estejam cobertos. Execute os comandos de teste e build definidos no `package.json`, corrija os problemas encontrados e informe separadamente quais verificações foram efetivamente executadas e seus resultados. Não declare testes aprovados sem executá-los.

**Etapa:** validação funcional, testes automatizados e verificação da compilação.

### Prompt complementar I — Refinamento final da interface

> Revise visualmente todas as páginas do Mucuratouille em desktop, tablet e celular. Verifique alinhamentos, espaçamentos, proporções, tipografia, imagens, botões, estados de hover e foco, navegação e consistência dos componentes. Corrija problemas de responsividade e diferenças visuais entre elementos equivalentes. Preserve a identidade visual existente e não remova funcionalidades nem faça alterações desnecessárias na arquitetura. Apresente as correções de forma objetiva e valide as páginas após os ajustes.

**Etapa:** acabamento visual e consistência da experiência de navegação.

### Prompt complementar J — Revisão da documentação do projeto

> Revise a documentação do Mucuratouille com base no código-fonte e na versão final efetivamente implementada. Atualize o README para descrever corretamente a proposta atual, as funcionalidades, as tecnologias, as rotas e a organização dos diretórios. Mantenha um documento separado para as instruções de execução e outro para os prompts de Inteligência Artificial. Não descreva funcionalidades inexistentes, não invente comandos e preserve o histórico das etapas anteriores. Diferencie claramente as funcionalidades locais das informações obtidas pela PokéAPI.

**Etapa:** consolidação da documentação técnica e acadêmica.

---

## Observação sobre a evolução dos prompts

Os prompts das primeiras etapas refletem as restrições e os objetivos existentes naquele momento do desenvolvimento. Por isso, algumas orientações iniciais, como não utilizar Vue Router, Bootstrap ou `localStorage`, foram posteriormente ampliadas ou substituídas conforme os conteúdos das etapas seguintes.

A evolução do projeto manteve as funcionalidades anteriores sempre que compatíveis com os novos requisitos, incorporando gradualmente novos recursos e tecnologias até a versão final.
