export function normalizar(texto) {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function filtrarReceitas(receitas, busca, categoria, somenteFavoritos, favoritos, somenteRapidas, ordem) {
  const termo = normalizar(busca)

  const resultado = receitas.filter((receita) => {
    const texto = normalizar(`${receita.nome} ${receita.descricao} ${receita.ingredientes.join(' ')}`)
    const combinaBusca = !termo || texto.includes(termo)
    const combinaCategoria = categoria === 'todas'
      || (categoria === 'cirio' && receita.cirio)
      || receita.categoria === categoria
    const combinaFavorito = !somenteFavoritos || favoritos.includes(receita.id)
    const combinaRapida = !somenteRapidas || (receita.minutos <= 45 && !receita.tempo.includes('*'))

    return combinaBusca && combinaCategoria && combinaFavorito && combinaRapida
  })

  if (ordem === 'tempo') {
    return [...resultado].sort((a, b) => a.minutos - b.minutos)
  }

  if (ordem === 'nome') {
    return [...resultado].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
  }

  return resultado
}
