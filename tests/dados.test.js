import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { dadosReceitas, nomesPokemonComReceita } from '../src/data/receitas.js'
import { filtrarReceitas, normalizar } from '../src/data/filtros.js'
import { coresTipo, nomesTipo } from '../src/utils/pokemonTheme.js'

const ler = (caminho) => fs.readFileSync(new URL(caminho, import.meta.url), 'utf8')
const filtrar = ({ busca='', categoria='todas', favoritos=false, ids=[], ordem='selecao', tipo='todos', tipos={} }={}) => filtrarReceitas(dadosReceitas,busca,categoria,favoritos,ids,ordem,tipo,tipos)

test('catalogo possui exatamente 20 receitas Pokemon completas', () => {
  assert.equal(dadosReceitas.length, 20)
  assert.equal(new Set(dadosReceitas.map(r=>r.id)).size,20)
  assert.equal(new Set(dadosReceitas.map(r=>r.pokemon)).size,20)
  for (const r of dadosReceitas) {
    for (const chave of ['id','pokemon','nome','categoria','tempo','minutos','porcoes','dificuldade','descricao','frase','alerta','alergenos','notaTempo','imagem']) assert.ok(r[chave], `${r.id}: ${chave}`)
    assert.ok(r.ingredientes.length >= 8, `${r.id}: ingredientes insuficientes`)
    assert.ok(r.passos.length >= 6, `${r.id}: preparo pouco detalhado`)
    assert.equal(r.imagem, r.id)
  }
})

test('todos os 20 placeholders 1200x675 existem', () => {
  for (const r of dadosReceitas) assert.ok(fs.existsSync(new URL(`../public/placeholders/receitas/${r.imagem}.png`, import.meta.url)), r.id)
  assert.ok(fs.existsSync(new URL('../public/placeholders/home-hero.png', import.meta.url)))
})

test('mapa de Pokemon com receita cobre o catalogo', () => {
  assert.equal(nomesPokemonComReceita.size,20)
  for (const r of dadosReceitas) assert.ok(nomesPokemonComReceita.has(r.pokemon))
})

test('normalizacao ignora acentos e caixa', () => assert.equal(normalizar('  POKÉMON  '),'pokemon'))
test('busca encontra receita pelo nome do Pokemon', () => assert.deepEqual(filtrar({busca:'psyduck'}).map(r=>r.id), ['psyduck-assado-com-batatas']))
test('busca encontra ingrediente', () => assert.ok(filtrar({busca:'parmesao'}).some(r=>r.id==='paras-risoto-cogumelos')))
test('categorias novas funcionam', () => {
  assert.ok(filtrar({categoria:'sobremesas'}).length >= 4)
  assert.ok(filtrar({categoria:'massas'}).every(r=>r.categoria==='massas'))
})
test('favoritos filtram apenas ids marcados', () => assert.deepEqual(filtrar({favoritos:true,ids:['pikachu-flambado']}).map(r=>r.id),['pikachu-flambado']))
test('filtro por tipo usa dados vindos da API', () => {
  const tipos = { psyduck:['water'], pikachu:['electric'] }
  assert.deepEqual(filtrar({tipo:'electric',tipos}).map(r=>r.id), ['pikachu-flambado'])
})
test('ordenacao por tempo preserva catalogo original', () => {
  const ids = dadosReceitas.map(r=>r.id)
  const ordenadas = filtrar({ordem:'tempo'})
  assert.ok(ordenadas.every((r,i)=>i===0 || r.minutos>=ordenadas[i-1].minutos))
  assert.deepEqual(dadosReceitas.map(r=>r.id),ids)
})

test('paleta de tipos contem os 18 tipos principais', () => {
  assert.equal(Object.keys(coresTipo).length,18)
  assert.equal(Object.keys(nomesTipo).length,18)
  assert.equal(nomesTipo.water,'Água')
  assert.ok(coresTipo.electric.startsWith('#'))
})

test('service separa integracao PokéAPI e usa fetch com cache', () => {
  const service = ler('../src/services/pokeapi.js')
  assert.ok(service.includes("const BASE_URL = 'https://pokeapi.co/api/v2'"))
  assert.ok(service.includes('fetch(url)'))
  assert.ok(service.includes('const cache = new Map()'))
  for (const nome of ['listarTodasEspecies','buscarPokemon','buscarEspecie','buscarTipo','buscarCadeiaEvolutiva']) assert.ok(service.includes(`function ${nome}`) || service.includes(`export function ${nome}`))
})

test('router preserva fases anteriores e adiciona Pokedex e Pokemon dinamico', () => {
  const router=ler('../src/router/index.js')
  for(const path of ["path: '/'","path: '/receitas'","path: '/receita/:id'","path: '/pokedex'","path: '/pokemon/:nome'","path: '/sobre'","path: '/equipe'","path: '/fontes'","path: '/:pathMatch(.*)*'"]) assert.ok(router.includes(path), path)
  assert.ok(router.includes('createWebHistory'))
})

test('App preserva moldura SPA, busca global e RouterView', () => {
  const app=ler('../src/App.vue')
  assert.ok(app.includes('<Cabecalho'))
  assert.ok(app.includes('<RouterView'))
  assert.ok(app.includes('<Rodape'))
  assert.ok(app.includes('@submit.prevent="executarBusca"'))
  assert.ok(app.includes('categoria, Pokémon ou tipo'))
})

test('cabecalho preserva logo visual, efeito de movimento e link Pokedex', () => {
  const cab=ler('../src/components/Cabecalho.vue')
  assert.ok(cab.includes('/imagens/cabecalho-logo.png'))
  assert.ok(cab.includes('cabecalho__marca:hover .cabecalho__logo'))
  assert.ok(!cab.includes('<span>Receitas duvidosas. Conselhos mais ainda.</span>'))
  assert.ok(cab.includes("{ nome: 'Pokédex', rota: '/pokedex'"))
})

test('pagina de receita consome Pokemon e passa para DetalheReceita', () => {
  const view=ler('../src/views/ReceitaView.vue')
  assert.ok(view.includes('buscarPokemon'))
  assert.ok(view.includes(':pokemon="pokemon"'))
  const detalhe=ler('../src/components/DetalheReceita.vue')
  assert.ok(detalhe.includes('<PokemonInfo'))
  assert.ok(detalhe.includes('--poke-accent'))
  assert.ok(detalhe.includes('Demais ingredientes'))
  assert.ok(detalhe.includes('Modo de preparo'))
})

test('Pokedex implementa busca filtros paginacao e disponibilidade de receita', () => {
  const view=ler('../src/views/PokedexView.vue')
  assert.ok(view.includes('TAMANHO_PAGINA = 24'))
  assert.ok(view.includes('buscarTipo'))
  assert.ok(view.includes('nomesPokemonComReceita'))
  assert.ok(view.includes('Com receita'))
  assert.ok(view.includes('Sem receita'))
  assert.ok(view.includes('<PokemonCard'))
})

test('ficha Pokemon usa especie stats e cadeia evolutiva', () => {
  const view=ler('../src/views/PokemonView.vue')
  for(const termo of ['buscarPokemon','buscarEspecie','buscarCadeiaEvolutiva','PokemonEvolucao','base_stat']) assert.ok(view.includes(termo))
})

test('Bootstrap, Vue Router e Vite permanecem instalados', () => {
  const pkg=JSON.parse(ler('../package.json'))
  assert.equal(pkg.version,'4.1.3')
  assert.equal(pkg.dependencies.vue,'^3.5.13')
  assert.equal(pkg.dependencies['vue-router'],'^4.6.4')
  assert.ok(fs.existsSync(new URL('../src/vendor/bootstrap.min.css',import.meta.url)))
})

test('Vercel preserva fallback de historico da SPA', () => {
  const vercel=JSON.parse(ler('../vercel.json'))
  assert.deepEqual(vercel.rewrites,[{source:'/(.*)',destination:'/index.html'}])
})


test('ajustes visuais v4.1 preservam logo, icones e traducao em portugues', () => {
  const cab=ler('../src/components/Cabecalho.vue')
  const detalhe=ler('../src/components/DetalheReceita.vue')
  const info=ler('../src/components/PokemonInfo.vue')
  const view=ler('../src/views/PokemonView.vue')
  const service=ler('../src/services/pokeapi.js')
  assert.ok(cab.includes('/imagens/cabecalho-logo.png'))
  assert.ok(!info.includes('Dados da PokéAPI'))
  assert.ok(detalhe.includes('<svg viewBox="0 0 24 24">'))
  assert.ok(view.includes('Atributos base'))
  assert.ok(service.includes('export function nomeHabilidade'))
  assert.ok(service.includes('A PokéAPI não disponibiliza uma descrição em português'))
})


test('ajustes visuais v4.1.3 preservam numeros vazados, busca vermelha e CTA padronizado', () => {
  const detalhe=ler('../src/components/DetalheReceita.vue')
  const appStyle=ler('../src/style.css')
  const receitas=ler('../src/views/ReceitasView.vue')
  assert.match(detalhe,/border:\s*2px solid var\(--poke-accent\)/)
  assert.match(detalhe,/background:\s*transparent/)
  assert.ok(appStyle.includes('#d8343b'))
  assert.match(appStyle,/font-size:\s*13px/)
  assert.ok(receitas.includes('<EstadoVazio'))
  assert.ok(ler('../src/components/EstadoVazio.vue').includes('btn btn-mucura rounded-pill'))
  assert.match(receitas,/font-size:\s*12\.5px/)
})

test('busca encontra categoria e tipo do Pokemon em portugues', () => {
  assert.ok(filtrar({ busca: 'sobremesa' }).some((receita) => receita.categoria === 'sobremesas'))

  const tipos = {
    torchic: ['fire'],
    tepig: ['fire'],
  }

  assert.deepEqual(
    filtrar({ busca: 'fogo', tipos }).map((receita) => receita.id),
    ['torchic-crocante', 'tepig-bacon-burger'],
  )
})

test('favoritos possuem persistencia local e validacao dos dados armazenados', () => {
  const state = ler('../src/state/favoritos.js')

  assert.ok(state.includes('mucuratouille:favoritos:v1'))
  assert.ok(state.includes('window.localStorage.getItem'))
  assert.ok(state.includes('window.localStorage.setItem'))
  assert.ok(state.includes('watch(favoritos, salvarFavoritos'))
  assert.ok(state.includes('Array.isArray(armazenados)'))
})

test('historico de receitas possui limite, ordem recente e persistencia local', () => {
  const state = ler('../src/state/historico.js')

  assert.ok(state.includes('mucuratouille:historico:v1'))
  assert.ok(state.includes('LIMITE_HISTORICO = 5'))
  assert.ok(state.includes('registrarVisualizacao'))
  assert.ok(state.includes('limparHistorico'))
  assert.ok(state.includes('window.localStorage.setItem'))
  assert.ok(ler('../src/views/ReceitaView.vue').includes('registrarVisualizacao(receita.value)'))
  assert.ok(ler('../src/views/HomeView.vue').includes('Vistos recentemente'))
})

test('estados de carregamento, erro e vazio sao componentes reutilizaveis', () => {
  for (const nome of ['EstadoCarregamento.vue', 'EstadoErro.vue', 'EstadoVazio.vue']) {
    assert.ok(fs.existsSync(new URL(`../src/components/${nome}`, import.meta.url)), nome)
  }

  const pokedex = ler('../src/views/PokedexView.vue')
  const receitas = ler('../src/views/ReceitasView.vue')
  assert.ok(pokedex.includes('<EstadoCarregamento'))
  assert.ok(pokedex.includes('<EstadoErro'))
  assert.ok(pokedex.includes('<EstadoVazio'))
  assert.ok(receitas.includes('<EstadoVazio'))
})

test('Pokédex mantém filtros por tipo e disponibilidade de receita', () => {
  const view = ler('../src/views/PokedexView.vue')
  assert.ok(view.includes('statusCardapio'))
  assert.ok(view.includes("statusCardapio.value === 'com'"))
  assert.ok(view.includes("statusCardapio.value === 'sem'"))
  assert.ok(view.includes('FiltroTipos'))
})


test('favoritos carregam do navegador e salvam novas alteracoes', async () => {
  const armazenamento = new Map([
    ['mucuratouille:favoritos:v1', JSON.stringify(['id-inexistente', 'psyduck-assado-com-batatas'])],
  ])
  const janelaAnterior = globalThis.window
  const { nextTick } = await import('vue')

  globalThis.window = {
    localStorage: {
      getItem: (chave) => armazenamento.get(chave) ?? null,
      setItem: (chave, valor) => armazenamento.set(chave, valor),
    },
  }

  try {
    const estado = await import(`../src/state/favoritos.js?teste=${Date.now()}`)
    assert.deepEqual(estado.favoritos.value, ['psyduck-assado-com-batatas'])

    estado.favoritar(dadosReceitas[1])
    await nextTick()

    assert.deepEqual(
      JSON.parse(armazenamento.get('mucuratouille:favoritos:v1')),
      ['psyduck-assado-com-batatas', dadosReceitas[1].id],
    )

    const recarregado = await import(`../src/state/favoritos.js?recarregado=${Date.now()}`)
    assert.deepEqual(recarregado.favoritos.value, ['psyduck-assado-com-batatas', dadosReceitas[1].id])
  } finally {
    if (janelaAnterior === undefined) delete globalThis.window
    else globalThis.window = janelaAnterior
  }
})

test('historico registra receitas recentes sem duplicar e respeita limite', async () => {
  const armazenamento = new Map()
  const janelaAnterior = globalThis.window
  const { nextTick } = await import('vue')

  globalThis.window = {
    localStorage: {
      getItem: (chave) => armazenamento.get(chave) ?? null,
      setItem: (chave, valor) => armazenamento.set(chave, valor),
    },
  }

  try {
    const estado = await import(`../src/state/historico.js?teste=${Date.now()}`)

    for (const receita of dadosReceitas.slice(0, 6)) {
      estado.registrarVisualizacao(receita)
    }
    estado.registrarVisualizacao(dadosReceitas[2])
    await nextTick()

    assert.deepEqual(estado.historicoReceitas.value, [
      dadosReceitas[2].id,
      dadosReceitas[5].id,
      dadosReceitas[4].id,
      dadosReceitas[3].id,
      dadosReceitas[1].id,
    ])
    assert.deepEqual(
      JSON.parse(armazenamento.get('mucuratouille:historico:v1')),
      estado.historicoReceitas.value,
    )

    const recarregado = await import(`../src/state/historico.js?recarregado=${Date.now()}`)
    assert.deepEqual(recarregado.historicoReceitas.value, estado.historicoReceitas.value)

    estado.limparHistorico()
    await nextTick()
    assert.deepEqual(estado.historicoReceitas.value, [])
  } finally {
    if (janelaAnterior === undefined) delete globalThis.window
    else globalThis.window = janelaAnterior
  }
})
