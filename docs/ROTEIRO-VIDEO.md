# Roteiro de apresentação — até 5 minutos

| Tempo | Parte |
| --- | --- |
| 0:00–0:35 | Nome, contexto e proposta regional do Mucuratouille |
| 0:35–1:15 | Demonstração da busca, filtros, favoritos e detalhes |
| 1:15–1:55 | Componentização e reutilização do `CardReceita.vue` |
| 1:55–2:35 | Explicação de uma prop |
| 2:35–3:15 | Explicação de `v-for` e `v-if` |
| 3:15–3:55 | Reatividade com `ref()` e evento `@click` |
| 3:55–4:20 | Busca com `v-model` |
| 4:20–4:35 | CSS próprio e responsividade |
| 4:35–4:55 | Uso de inteligência artificial e prompts do README |
| 4:55–5:00 | Encerramento |

## Demonstração sugerida

1. Digitar `tacacá` na busca.
2. Limpar a busca.
3. Selecionar `Especial Círio`.
4. Marcar uma receita como favorita.
5. Mostrar a alteração do contador de favoritos.
6. Selecionar uma receita e mostrar ingredientes e modo de preparo.
7. Marcar dois ingredientes.

## Código para mostrar

- imports dos componentes no `App.vue`;
- `CardReceita` com `v-for`;
- props em `CardReceita.vue`;
- `v-model` em `BuscaReceitas.vue`;
- `ref()` e `@click` relacionados aos favoritos;
- CSS da `.grade-receitas` e media queries;
- seção de prompts no README.
