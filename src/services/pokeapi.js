const BASE_URL = 'https://pokeapi.co/api/v2'
const cache = new Map()
const pendentes = new Map()

const descricoesPokemonPt = {
  psyduck: 'Psyduck vive confuso por causa de fortes dores de cabeça. Quando a pressão aumenta, seus poderes psíquicos podem escapar sem aviso.',
  magikarp: 'Magikarp é famoso por parecer frágil e pouco ameaçador, mas sua persistência é o primeiro passo para uma evolução muito mais poderosa.',
  krabby: 'Krabby vive próximo à água e usa suas grandes pinças tanto para se defender quanto para disputar território.',
  kingler: 'Kingler possui uma pinça enorme e extremamente forte, capaz de exercer uma pressão impressionante apesar do peso adicional.',
  farfetchd: "Farfetch'd carrega um talo vegetal que utiliza como ferramenta, arma e companheiro inseparável.",
  tauros: 'Tauros é conhecido pelo temperamento intenso e pelas investidas velozes que realiza quando fica agitado.',
  slowpoke: 'Slowpoke é calmo, distraído e reage lentamente ao que acontece ao seu redor, mantendo quase sempre a mesma expressão serena.',
  squirtle: 'Squirtle se protege dentro do casco e dispara água com grande precisão quando precisa se defender.',
  torchic: 'Torchic mantém calor dentro do corpo e pode produzir chamas muito quentes quando entra em combate.',
  tepig: 'Tepig utiliza o fogo interno para atacar e aquece o próprio corpo quando precisa aumentar sua energia.',
  exeggcute: 'Exeggcute parece um grupo de ovos, mas na verdade é formado por criaturas vegetais que permanecem sempre juntas.',
  paras: 'Paras vive com cogumelos nas costas, que crescem enquanto absorvem nutrientes do corpo do Pokémon.',
  tangela: 'Tangela é coberto por inúmeras vinhas azuis que escondem quase completamente seu corpo e se movem de forma independente.',
  octillery: 'Octillery utiliza seus tentáculos para se fixar em superfícies e é conhecido por disparar jatos com grande precisão.',
  snorlax: 'Snorlax passa grande parte do tempo dormindo e costuma acordar principalmente para comer grandes quantidades de alimento.',
  jigglypuff: 'Jigglypuff possui uma voz capaz de induzir sono profundo em quem escuta sua canção por tempo suficiente.',
  vanillite: 'Vanillite prefere ambientes frios e produz ar gelado ao redor do corpo para manter sua temperatura confortável.',
  appletun: 'Appletun possui um aroma adocicado e um corpo que lembra uma torta de maçã, atraindo a atenção de outros Pokémon.',
  alcremie: 'Alcremie produz um creme doce e aromático cuja qualidade varia conforme seu estado emocional.',
  pikachu: 'Pikachu armazena eletricidade nas bochechas e pode liberá-la rapidamente quando se sente ameaçado ou animado.'
}

const habilidadesPt = {
  'damp': 'Umidade', 'cloud-nine': 'Anula Clima', 'swift-swim': 'Nado Rápido', 'rattled': 'Assustado',
  'hyper-cutter': 'Corte Potente', 'shell-armor': 'Armadura de Concha', 'sheer-force': 'Força Bruta',
  'keen-eye': 'Olhar Atento', 'inner-focus': 'Foco Interno', 'defiant': 'Desafiador', 'intimidate': 'Intimidação',
  'anger-point': 'Ponto de Fúria', 'oblivious': 'Distraído', 'own-tempo': 'Ritmo Próprio', 'regenerator': 'Regenerador',
  'torrent': 'Torrente', 'rain-dish': 'Prato de Chuva', 'blaze': 'Chama', 'speed-boost': 'Impulso de Velocidade',
  'thick-fat': 'Gordura Espessa', 'chlorophyll': 'Clorofila', 'harvest': 'Colheita', 'effect-spore': 'Esporo de Efeito',
  'dry-skin': 'Pele Seca', 'leaf-guard': 'Guarda-Folha', 'suction-cups': 'Ventosas', 'sniper': 'Franco-atirador',
  'moody': 'Oscilante', 'immunity': 'Imunidade', 'gluttony': 'Gula', 'cute-charm': 'Charme Fofo',
  'competitive': 'Competitivo', 'friend-guard': 'Guarda Amiga', 'ice-body': 'Corpo de Gelo', 'snow-cloak': 'Manto de Neve',
  'weak-armor': 'Armadura Fraca', 'ripen': 'Amadurecimento', 'sweet-veil': 'Véu Doce', 'aroma-veil': 'Véu Aromático',
  'static': 'Eletricidade Estática', 'lightning-rod': 'Para-raios'
}

export function nomeHabilidade(nome) {
  if (!nome) return 'Habilidade desconhecida'
  return habilidadesPt[nome] || nome.replaceAll('-', ' ').replace(/\b\w/g, (letra) => letra.toUpperCase())
}

async function requisitar(url) {
  if (cache.has(url)) return cache.get(url)
  if (pendentes.has(url)) return pendentes.get(url)

  const promessa = fetch(url)
    .then(async (resposta) => {
      if (!resposta.ok) {
        const erro = new Error(`PokéAPI respondeu ${resposta.status}`)
        erro.status = resposta.status
        throw erro
      }
      const dados = await resposta.json()
      cache.set(url, dados)
      return dados
    })
    .finally(() => pendentes.delete(url))

  pendentes.set(url, promessa)
  return promessa
}

export function listarPokemon(limit = 24, offset = 0) {
  return requisitar(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
}

export function listarTodosPokemon() {
  return requisitar(`${BASE_URL}/pokemon?limit=2000&offset=0`)
}

export function listarTodasEspecies() {
  return requisitar(`${BASE_URL}/pokemon-species?limit=2000&offset=0`)
}

export function buscarPokemon(nomeOuId) {
  return requisitar(`${BASE_URL}/pokemon/${String(nomeOuId).toLowerCase()}`)
}

export function buscarEspecie(nomeOuId) {
  return requisitar(`${BASE_URL}/pokemon-species/${String(nomeOuId).toLowerCase()}`)
}

export function buscarTipo(tipo) {
  return requisitar(`${BASE_URL}/type/${String(tipo).toLowerCase()}`)
}

export function buscarCadeiaEvolutiva(urlOuId) {
  const url = String(urlOuId).startsWith('http')
    ? String(urlOuId)
    : `${BASE_URL}/evolution-chain/${urlOuId}`
  return requisitar(url)
}

export function artworkPokemon(pokemon) {
  return pokemon?.sprites?.other?.['official-artwork']?.front_default
    || pokemon?.sprites?.other?.home?.front_default
    || pokemon?.sprites?.front_default
    || ''
}

export function limparCachePokeApi() {
  cache.clear()
}

export function extrairNomesEvolucao(chain) {
  const nomes = []
  function percorrer(no, nivel = 0) {
    if (!no) return
    nomes.push({ nome: no.species.name, nivel })
    for (const proximo of no.evolves_to || []) percorrer(proximo, nivel + 1)
  }
  percorrer(chain)
  return nomes
}

export function descricaoEspecie(species, nomePokemon = '') {
  const entradas = species?.flavor_text_entries || []
  const entradaPt = entradas.find((item) => item.language?.name === 'pt-br')
    || entradas.find((item) => item.language?.name === 'pt')
  if (entradaPt) return entradaPt.flavor_text.replace(/[\n\f\r]+/g, ' ')
  if (descricoesPokemonPt[nomePokemon]) return descricoesPokemonPt[nomePokemon]
  return 'A PokéAPI não disponibiliza uma descrição em português para este Pokémon. Os dados técnicos abaixo continuam sendo carregados diretamente da API.'
}
