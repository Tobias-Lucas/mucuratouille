# Guia rápido para apresentação

## Estrutura do projeto

O `App.vue` é o componente principal. Ele importa e utiliza seis componentes:

- `Cabecalho.vue`;
- `BuscaReceitas.vue`;
- `FiltroCategorias.vue`;
- `CardReceita.vue`;
- `DetalheReceita.vue`;
- `Rodape.vue`.

## Reutilização e props

O melhor exemplo para explicar é o `CardReceita.vue`. O componente recebe dados por props e é repetido no `App.vue` com `v-for`.

```vue
<CardReceita
  v-for="receita in receitasVisiveis()"
  :key="receita.id"
  :receita="receita"
  :favorita="eFavorita(receita.id)"
  @favoritar="favoritar"
/>
```

A mesma estrutura visual apresenta diferentes receitas.

## Diretivas

### `v-for`

Usado para repetir os cards, ingredientes e passos do modo de preparo.

### `v-if`

Usado para mostrar elementos somente quando uma condição é verdadeira, como alertas, mensagens e botões condicionais.

### `v-show`

Usado no aviso de favoritos. O elemento permanece no documento e sua visibilidade muda conforme o valor de `aviso`.

### `v-model`

Usado no campo de busca e nos checkboxes de ingredientes.

## Reatividade

No `App.vue`, os favoritos são armazenados em um `ref`:

```js
const favoritos = ref([])
```

O clique no coração chama a função `favoritar()`. Ao alterar `favoritos.value`, o Vue atualiza automaticamente o contador do cabeçalho e os cards.

## CSS

A página utiliza CSS próprio. No desktop, a área principal possui uma grade com catálogo à esquerda e detalhes à direita. Em telas menores, a grade é reorganizada para uma única coluna.

Não há Vue Router, Bootstrap, Tailwind ou biblioteca de gerenciamento de estado.
