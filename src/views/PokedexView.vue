<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import PokemonCard from '../components/PokemonCard.vue'
import FiltroTipos from '../components/FiltroTipos.vue'
import EstadoCarregamento from '../components/EstadoCarregamento.vue'
import EstadoErro from '../components/EstadoErro.vue'
import EstadoVazio from '../components/EstadoVazio.vue'
import { listarTodasEspecies, buscarPokemon, buscarTipo } from '../services/pokeapi.js'
import { nomesPokemonComReceita, receitasPorPokemon } from '../data/receitas.js'
import { normalizar } from '../data/filtros.js'

const TAMANHO_PAGINA = 24
const especies = ref([])
const pokemonPagina = ref([])
const busca = ref('')
const tipo = ref('todos')
const statusCardapio = ref('todos')
const pagina = ref(1)
const carregandoLista = ref(true)
const carregandoTipo = ref(false)
const carregandoCards = ref(false)
const erroLista = ref('')
const erroTipo = ref('')
const erroCards = ref('')
const nomesDoTipo = ref(null)
let tokenCards = 0
let tokenTipo = 0

function idDaUrl(url) {
  const partes = String(url).split('/').filter(Boolean)
  return Number(partes.at(-1)) || 0
}

const filtrados = computed(() => {
  const termo = normalizar(busca.value)

  return especies.value.filter((item) => {
    const id = idDaUrl(item.url)
    const buscaNumerica = /^\d+$/.test(termo) && Number(termo) === id
    const combinaBusca = !termo || normalizar(item.name).includes(termo) || buscaNumerica
    const combinaTipo = tipo.value === 'todos' || nomesDoTipo.value?.has(item.name)
    const temReceita = nomesPokemonComReceita.has(item.name)
    const combinaStatus = statusCardapio.value === 'todos'
      || (statusCardapio.value === 'com' && temReceita)
      || (statusCardapio.value === 'sem' && !temReceita)

    return combinaBusca && combinaTipo && combinaStatus
  })
})

const totalPaginas = computed(() => Math.max(1, Math.ceil(filtrados.value.length / TAMANHO_PAGINA)))
const inicio = computed(() => (pagina.value - 1) * TAMANHO_PAGINA)
const paginaNomes = computed(() => filtrados.value.slice(inicio.value, inicio.value + TAMANHO_PAGINA))

async function carregarLista() {
  carregandoLista.value = true
  erroLista.value = ''

  try {
    const dados = await listarTodasEspecies()
    especies.value = Array.isArray(dados.results) ? dados.results : []
  } catch {
    erroLista.value = 'Não foi possível consultar a PokéAPI agora. Verifique sua conexão e tente novamente.'
  } finally {
    carregandoLista.value = false
  }
}

async function carregarTipo() {
  const meuToken = ++tokenTipo
  erroTipo.value = ''

  if (tipo.value === 'todos') {
    nomesDoTipo.value = null
    carregandoTipo.value = false
    return
  }

  carregandoTipo.value = true
  nomesDoTipo.value = null

  try {
    const dados = await buscarTipo(tipo.value)
    if (meuToken !== tokenTipo) return

    nomesDoTipo.value = new Set(dados.pokemon.map((item) => item.pokemon.name))
  } catch {
    if (meuToken === tokenTipo) {
      nomesDoTipo.value = new Set()
      erroTipo.value = 'Não foi possível carregar esse tipo de Pokémon. Tente novamente.'
    }
  } finally {
    if (meuToken === tokenTipo) carregandoTipo.value = false
  }
}

async function carregarCards() {
  const meuToken = ++tokenCards
  const nomes = paginaNomes.value

  erroCards.value = ''

  if (!nomes.length) {
    pokemonPagina.value = []
    carregandoCards.value = false
    return
  }

  carregandoCards.value = true

  const resultados = await Promise.allSettled(
    nomes.map((item) => buscarPokemon(item.name)),
  )

  if (meuToken !== tokenCards) return

  pokemonPagina.value = resultados
    .filter((item) => item.status === 'fulfilled')
    .map((item) => item.value)

  if (!pokemonPagina.value.length) {
    erroCards.value = 'Não foi possível carregar os Pokémon desta página. Tente novamente.'
  }

  carregandoCards.value = false
}

async function mudarTipo(valor) {
  tipo.value = valor
  pagina.value = 1
  await carregarTipo()
}

function mudarStatus(valor) {
  statusCardapio.value = valor
  pagina.value = 1
}

function limparFiltros() {
  busca.value = ''
  tipo.value = 'todos'
  statusCardapio.value = 'todos'
  pagina.value = 1
  carregarTipo()
}

function irPagina(valor) {
  pagina.value = Math.min(Math.max(1, valor), totalPaginas.value)
  window.scrollTo({ top: 420, behavior: 'smooth' })
}

watch([busca, statusCardapio], () => {
  pagina.value = 1
})

watch(paginaNomes, carregarCards)

onMounted(carregarLista)
</script>

<template>
  <div class="pokedex-view">
    <section class="pokedex-hero container-fluid px-3 px-lg-4">
      <div class="pokedex-hero__painel rounded-4 shadow-sm">
        <div>
          <span>POKÉDEX DA COZINHA</span>
          <h1>Conheça os ingredientes antes que eles descubram o cardápio.</h1>
          <p>
            Esta área consome a PokéAPI em tempo real. Pesquise por nome ou número,
            filtre por tipo e descubra quais Pokémon já possuem receita no Mucuratouille.
          </p>
        </div>
        <div class="pokedex-hero__contador">
          <strong>{{ especies.length || '...' }}</strong>
          <small>espécies disponíveis</small>
        </div>
      </div>
    </section>

    <section class="pokedex-controles container-fluid px-3 px-lg-4">
      <div class="pokedex-controles__painel rounded-4 shadow-sm">
        <label class="pokedex-busca">
          <span>Buscar</span>
          <input
            v-model="busca"
            class="form-control rounded-pill"
            type="search"
            placeholder="Nome ou número da Pokédex"
          />
        </label>

        <FiltroTipos
          :selecionado="tipo"
          :desabilitado="carregandoLista || carregandoTipo"
          @selecionar="mudarTipo"
        />

        <div class="pokedex-status">
          <span>Cardápio</span>
          <div class="d-flex gap-1">
            <button
              v-for="item in [
                { id: 'todos', nome: 'Todos' },
                { id: 'com', nome: 'Com receita' },
                { id: 'sem', nome: 'Sem receita' },
              ]"
              :key="item.id"
              class="btn rounded-pill"
              :class="{ ativo: statusCardapio === item.id }"
              type="button"
              :aria-pressed="statusCardapio === item.id"
              @click="mudarStatus(item.id)"
            >
              {{ item.nome }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="pokedex-grid container-fluid px-3 px-lg-4 pb-5">
      <div class="pokedex-grid__cabeca d-flex align-items-end justify-content-between gap-3">
        <div>
          <span class="sobretitulo">RESULTADOS DA API</span>
          <h2>{{ filtrados.length }} Pokémon encontrados</h2>
        </div>
        <small>Página {{ pagina }} de {{ totalPaginas }}</small>
      </div>

      <EstadoErro
        v-if="erroLista"
        titulo="A PokéAPI não respondeu."
        :mensagem="erroLista"
        acao-texto="Tentar novamente"
        @tentar-novamente="carregarLista"
      />

      <EstadoErro
        v-else-if="erroTipo"
        titulo="Não foi possível aplicar o filtro."
        :mensagem="erroTipo"
        acao-texto="Tentar novamente"
        @tentar-novamente="carregarTipo"
      />

      <EstadoErro
        v-else-if="erroCards"
        titulo="Os Pokémon desta página não foram carregados."
        :mensagem="erroCards"
        acao-texto="Tentar novamente"
        @tentar-novamente="carregarCards"
      />

      <EstadoCarregamento
        v-else-if="carregandoLista || carregandoTipo || carregandoCards"
        titulo="Consultando a PokéAPI..."
        mensagem="A Mucura está separando os ingredientes da Pokédex."
      />

      <div v-else-if="pokemonPagina.length" class="row g-2 g-md-3">
        <div
          v-for="pokemon in pokemonPagina"
          :key="pokemon.id"
          class="col-6 col-md-4 col-xl-3"
        >
          <PokemonCard
            :pokemon="pokemon"
            :receita="receitasPorPokemon.get(pokemon.name)"
          />
        </div>
      </div>

      <EstadoVazio
        v-else
        titulo="Nenhum Pokémon encontrado."
        mensagem="A Mucura consultou até os cantos mais suspeitos da Pokédex. Ajuste a pesquisa ou limpe os filtros."
        acao-texto="Limpar filtros"
        @acao="limparFiltros"
      />

      <nav
        v-if="!erroLista && !erroTipo && !erroCards && totalPaginas > 1"
        class="pokedex-paginacao d-flex align-items-center justify-content-center gap-2 mt-4"
        aria-label="Paginação da Pokédex"
      >
        <button
          class="btn rounded-pill"
          type="button"
          :disabled="pagina === 1"
          @click="irPagina(pagina - 1)"
        >
          ← Anterior
        </button>
        <span>{{ pagina }} / {{ totalPaginas }}</span>
        <button
          class="btn rounded-pill"
          type="button"
          :disabled="pagina === totalPaginas"
          @click="irPagina(pagina + 1)"
        >
          Próxima →
        </button>
      </nav>
    </section>
  </div>
</template>

<style scoped>
.pokedex-view {
  padding-top: 70px;
}

.pokedex-hero,
.pokedex-controles,
.pokedex-grid {
  width: min(1420px, 100%);
  margin: 0 auto;
}

.pokedex-hero__painel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 30px;
  color: #fff;
  background-image: linear-gradient(
      120deg,
      rgba(128, 20, 25, 0.76),
      rgba(198, 40, 40, 0.58) 54%,
      rgba(91, 14, 18, 0.72)
    ),
    url('/imagens/fundo-vermelho-paisagem.png');
  background-color: #a51f25;
  background-size: cover;
  background-position: center 54%;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.pokedex-hero__painel > div:first-child {
  max-width: 850px;
}

.pokedex-hero span {
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 1px;
}

.pokedex-hero h1 {
  margin: 6px 0 8px;
  font: 800 clamp(28px, 4vw, 44px) / 1 Georgia, 'Times New Roman', serif;
}

.pokedex-hero p {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  line-height: 1.55;
}

.pokedex-hero__contador {
  display: flex;
  min-width: 150px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 18px;
  background: rgba(90, 15, 19, 0.38);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  text-align: center;
  backdrop-filter: blur(4px);
}

.pokedex-hero__contador strong {
  font: 800 32px / 1 Georgia, 'Times New Roman', serif;
}

.pokedex-hero__contador small {
  margin-top: 5px;
  font-size: 10px;
}

.pokedex-controles {
  padding-top: 18px;
  padding-bottom: 20px;
}

.pokedex-controles__painel {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) 210px auto;
  gap: 12px;
  align-items: end;
  padding: 16px;
  background: #fffdf8;
  border: 1px solid #ded4c4;
}

.pokedex-busca,
.pokedex-status {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pokedex-busca > span,
.pokedex-status > span {
  color: #77736b;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.7px;
  text-transform: uppercase;
}

.pokedex-busca input {
  min-height: 42px;
  padding-left: 14px;
  border-color: #d9d0c1;
  font-size: 11.5px;
}

.pokedex-status .btn {
  min-height: 42px;
  padding: 7px 12px;
  color: #6d665e;
  background: #f4eee4;
  border: 1px solid #ded4c4;
  font-size: 10.5px;
  font-weight: 800;
}

.pokedex-status .btn.ativo {
  color: #fff;
  background: #c62828;
  border-color: #c62828;
}

.pokedex-grid__cabeca {
  margin-bottom: 14px;
}

.pokedex-grid h2 {
  margin: 4px 0 0;
  color: #292a24;
  font: 800 30px / 1.05 Georgia, 'Times New Roman', serif;
}

.pokedex-grid__cabeca small {
  color: #817c72;
  font-size: 10.5px;
}

.pokedex-paginacao .btn {
  min-height: 40px;
  padding: 7px 14px;
  color: #123c2c;
  background: #fffdf8;
  border: 1px solid #d9d0c1;
  font-size: 10.5px;
  font-weight: 900;
}

.pokedex-paginacao span {
  min-width: 70px;
  color: #6d685f;
  font-size: 10.5px;
  text-align: center;
}

@media (max-width: 767.98px) {
  .pokedex-view {
    padding-top: 54px;
  }

  .pokedex-hero__painel {
    align-items: flex-start;
    flex-direction: column;
    padding: 22px;
    background-position: 68% center;
  }

  .pokedex-hero__contador {
    min-width: 0;
    width: 100%;
    flex-direction: row;
    gap: 8px;
  }

  .pokedex-controles__painel {
    grid-template-columns: 1fr;
  }

  .pokedex-status .d-flex {
    flex-wrap: wrap;
  }

  .pokedex-grid h2 {
    font-size: 24px;
  }
}
</style>
