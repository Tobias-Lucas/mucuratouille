export function normalizar(texto) {
  return String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

export function filtrarReceitas(receitas, busca, categoria, somenteFavoritos, favoritos, ordem = 'selecao', tipo = 'todos', tiposPorPokemon = {}) {
  const termo = normalizar(busca)
  const resultado = receitas.filter((receita) => {
    const texto = normalizar(`${receita.nome} ${receita.pokemon} ${receita.descricao} ${receita.ingredientes.join(' ')}`)
    const combinaBusca = !termo || texto.includes(termo)
    const combinaCategoria = categoria === 'todas' || receita.categoria === categoria
    const combinaFavorito = !somenteFavoritos || favoritos.includes(receita.id)
    const tipos = tiposPorPokemon[receita.pokemon] || []
    const combinaTipo = tipo === 'todos' || tipos.includes(tipo)
    return combinaBusca && combinaCategoria && combinaFavorito && combinaTipo
  })

  if (ordem === 'tempo') return [...resultado].sort((a,b) => a.minutos - b.minutos)
  if (ordem === 'nome') return [...resultado].sort((a,b) => a.nome.localeCompare(b.nome, 'pt-BR'))
  return resultado
}
