export const coresTipo = {
  normal: '#8b8d78',
  fire: '#d95d38',
  water: '#4f87c7',
  electric: '#d6ae2f',
  grass: '#57945a',
  ice: '#67aeb5',
  fighting: '#a84439',
  poison: '#8b5395',
  ground: '#b88f4d',
  flying: '#788bc4',
  psychic: '#c9507f',
  bug: '#7e9239',
  rock: '#917955',
  ghost: '#675a84',
  dragon: '#604bb4',
  dark: '#5b514c',
  steel: '#858e99',
  fairy: '#cf78a4',
}

export const nomesTipo = {
  normal: 'Normal', fire: 'Fogo', water: 'Água', electric: 'Elétrico', grass: 'Planta', ice: 'Gelo',
  fighting: 'Lutador', poison: 'Veneno', ground: 'Terra', flying: 'Voador', psychic: 'Psíquico', bug: 'Inseto',
  rock: 'Pedra', ghost: 'Fantasma', dragon: 'Dragão', dark: 'Sombrio', steel: 'Aço', fairy: 'Fada',
}

export function corTipo(tipo) {
  return coresTipo[tipo] || '#C94C08'
}

export function nomeTipo(tipo) {
  return nomesTipo[tipo] || tipo || 'Desconhecido'
}

export function estiloTipos(pokemon) {
  const tipos = pokemon?.types?.map((item) => item.type.name) || []
  return {
    primario: tipos[0] || 'normal',
    secundario: tipos[1] || null,
    corPrimaria: corTipo(tipos[0]),
    corSecundaria: corTipo(tipos[1] || tipos[0]),
  }
}
