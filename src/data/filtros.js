import { nomeTipo } from '../utils/pokemonTheme.js'

const nomesCategorias = {
  principais: 'prato principal pratos principais',
  lanches: 'lanche lanches petiscos',
  massas: 'massa massas risoto risotos',
  cafe: 'cafe café da manhã',
  sobremesas: 'sobremesa sobremesas doce doces',
  especial: 'especial especiais mucura',
}

export function normalizar(texto) {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function filtrarReceitas(
  receitas,
  busca,
  categoria,
  somenteFavoritos,
  favoritos,
  ordem = 'selecao',
  tipo = 'todos',
  tiposPorPokemon = {},
) {
  const termo = normalizar(busca)

  const resultado = receitas.filter((receita) => {
    const tipos = tiposPorPokemon[receita.pokemon] || []
    const nomesTipos = tipos.map((tipoPokemon) => nomeTipo(tipoPokemon))
    const categoriaTexto = nomesCategorias[receita.categoria] || receita.categoria
    const texto = normalizar([
      receita.nome,
      receita.pokemon,
      receita.descricao,
      receita.categoria,
      categoriaTexto,
      receita.ingredientes.join(' '),
      tipos.join(' '),
      nomesTipos.join(' '),
    ].join(' '))

    const combinaBusca = !termo || texto.includes(termo)
    const combinaCategoria = categoria === 'todas' || receita.categoria === categoria
    const combinaFavorito = !somenteFavoritos || favoritos.includes(receita.id)
    const combinaTipo = tipo === 'todos' || tipos.includes(tipo)

    return combinaBusca && combinaCategoria && combinaFavorito && combinaTipo
  })

  if (ordem === 'tempo') {
    return [...resultado].sort((a, b) => a.minutos - b.minutos)
  }

  if (ordem === 'nome') {
    return [...resultado].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
  }

  return resultado
}
