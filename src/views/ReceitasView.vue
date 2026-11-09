<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FiltroCategorias from '../components/FiltroCategorias.vue'
import FiltroTipos from '../components/FiltroTipos.vue'
import CardReceita from '../components/CardReceita.vue'
import { dadosReceitas } from '../data/receitas.js'
import { filtrarReceitas } from '../data/filtros.js'
import { buscarPokemon } from '../services/pokeapi.js'
import { favoritos, eFavorita, favoritar } from '../state/favoritos.js'

const route = useRoute()
const router = useRouter()
const busca = ref('')
const categoria = ref('todas')
const tipo = ref('todos')
const somenteFavoritos = ref(false)
const carregandoTipos = ref(true)
const pokemonDados = ref({})
const tiposPorPokemon = ref({})

const receitasVisiveis = computed(() => filtrarReceitas(dadosReceitas, busca.value, categoria.value, somenteFavoritos.value, favoritos.value, 'selecao', tipo.value, tiposPorPokemon.value))

onMounted(async () => {
  const resultados = await Promise.allSettled(dadosReceitas.map((receita) => buscarPokemon(receita.pokemon)))
  const dados = {}
  const tipos = {}
  resultados.forEach((resultado, indice) => {
    if (resultado.status === 'fulfilled') {
      const nome = dadosReceitas[indice].pokemon
      dados[nome] = resultado.value
      tipos[nome] = resultado.value.types.map((item) => item.type.name)
    }
  })
  pokemonDados.value = dados
  tiposPorPokemon.value = tipos
  carregandoTipos.value = false
})

function atualizarQuery() {
  const query = {}
  if (busca.value) query.q = busca.value
  if (categoria.value !== 'todas') query.categoria = categoria.value
  if (tipo.value !== 'todos') query.tipo = tipo.value
  if (somenteFavoritos.value) query.favoritos = '1'
  router.replace({ name:'receitas', query })
}
function escolherCategoria(valor){ categoria.value = valor; somenteFavoritos.value = false; atualizarQuery() }
function escolherTipo(valor){ tipo.value = valor; atualizarQuery() }
function limparFiltros(){ busca.value=''; categoria.value='todas'; tipo.value='todos'; somenteFavoritos.value=false; router.replace({ name:'receitas' }) }
function surpreender(){ const base = receitasVisiveis.value.length ? receitasVisiveis.value : dadosReceitas; const receita = base[Math.floor(Math.random()*base.length)]; if(receita) router.push({ name:'receita', params:{ id:receita.id } }) }

watch(() => [route.query.q, route.query.favoritos, route.query.categoria, route.query.tipo], ([q,fav,cat,t]) => {
  busca.value = typeof q === 'string' ? q : ''
  somenteFavoritos.value = fav === '1'
  categoria.value = typeof cat === 'string' && ['todas','principais','lanches','massas','cafe','sobremesas','especial'].includes(cat) ? cat : 'todas'
  tipo.value = typeof t === 'string' ? t : 'todos'
}, { immediate:true })
</script>

<template>
  <div class="receitas-view">
    <section class="receitas-intro container-fluid px-3 px-lg-4">
      <div class="receitas-intro__painel rounded-4 shadow-sm">
        <span class="sobretitulo">CARDÁPIO SUSPEITO</span>
        <h1>Receitas que a Pokédex preferia esconder.</h1>
        <p>Busque por nome da receita, ingrediente ou Pokémon. O tipo retornado pela PokéAPI também pode filtrar o cardápio e alterar detalhes visuais.</p>
      </div>
    </section>

    <section class="controles container-fluid px-3 px-lg-4" aria-label="Filtros de receitas">
      <div class="controles__linha d-flex flex-column flex-xl-row align-items-stretch align-items-xl-end justify-content-between gap-3">
        <FiltroCategorias :selecionada="categoria" :somente-favoritos="somenteFavoritos" @selecionar="escolherCategoria" />
        <div class="controles__direita d-flex flex-column flex-sm-row align-items-stretch align-items-sm-end gap-2">
          <FiltroTipos :selecionado="tipo" :desabilitado="carregandoTipos" @selecionar="escolherTipo" />
          <button class="botao-surpresa btn rounded-pill" type="button" @click="surpreender">Surpreenda-me!</button>
        </div>
      </div>
    </section>

    <section id="receitas" class="catalogo container-fluid px-3 px-lg-4 pb-5" aria-labelledby="titulo-catalogo">
      <div class="catalogo__cabeca d-flex align-items-end justify-content-between gap-3">
        <div><span class="sobretitulo">20 RECEITAS</span><h2 id="titulo-catalogo">{{ somenteFavoritos ? 'Seus favoritos' : busca ? `Resultados para “${busca}”` : 'Escolha uma receita' }}</h2></div>
        <span class="catalogo__quantidade">{{ receitasVisiveis.length }} {{ receitasVisiveis.length === 1 ? 'receita' : 'receitas' }}</span>
      </div>

      <div v-if="receitasVisiveis.length" class="row g-2 g-md-3 grade-receitas">
        <div v-for="receita in receitasVisiveis" :key="receita.id" class="col-6 col-md-4 col-xl-3">
          <CardReceita :receita="receita" :pokemon-dados="pokemonDados[receita.pokemon]" :favorita="eFavorita(receita.id)" :selecionada="false" @favoritar="favoritar" />
        </div>
      </div>
      <div v-else class="catalogo__vazio card border-0 shadow-sm">
        <img src="/imagens/nao-encontrado.webp" width="134" height="89" alt="Mucura procurando uma receita" />
        <h2>Nada apareceu por aqui.</h2><p>A Mucura consultou a cozinha e a Pokédex. Tente outro termo ou limpe os filtros.</p>
        <button class="btn btn-mucura btn-acao rounded-pill px-4" type="button" @click="limparFiltros">Mostrar todas as receitas</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.receitas-view {
  padding-top: 70px;
}

.receitas-intro,
.controles,
.catalogo {
  width: min(1420px, 100%);
  margin: 0 auto;
}

.receitas-intro__painel {
  padding: 26px 30px;
  color: #fff;
  background-image: linear-gradient(
      90deg,
      rgba(8, 38, 27, 0.58),
      rgba(8, 38, 27, 0.36)
    ),
    url('/imagens/fundo-verde-paisagem.png');
  background-color: #0b3f2f;
  background-size: cover;
  background-position: center 55%;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.receitas-intro .sobretitulo {
  color: #f4c542;
}

.receitas-intro h1 {
  margin: 5px 0 8px;
  font: 800 clamp(28px, 4vw, 43px) / 1 Georgia, 'Times New Roman', serif;
}

.receitas-intro p {
  max-width: 830px;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  line-height: 1.55;
}

.controles {
  padding-top: 22px;
  padding-bottom: 22px;
}

.controles__direita {
  flex: 0 0 auto;
}

.botao-surpresa {
  min-height: 42px;
  padding: 8px 17px;
  color: #fff;
  background: #123c2c;
  border: 1px solid #123c2c;
  font-size: 10px;
  font-weight: 900;
}

.botao-surpresa:hover {
  color: #fff;
  background: #0b2d20;
}

.catalogo__cabeca {
  margin-bottom: 15px;
}

.catalogo__cabeca h2 {
  margin: 4px 0 0;
  color: #292a24;
  font: 800 32px / 1.05 Georgia, 'Times New Roman', serif;
}

.catalogo__quantidade {
  color: #77736b;
  font-size: 10.5px;
  font-weight: 800;
}

.catalogo__vazio {
  align-items: center;
  margin-top: 20px;
  padding: 45px 20px;
  text-align: center;
  background: #fffdf8;
  border-radius: 20px !important;
}

.catalogo__vazio h2 {
  margin: 10px 0 6px;
  font: 800 25px / 1 Georgia, 'Times New Roman', serif;
}

.catalogo__vazio p {
  max-width: 560px;
  margin: 0 auto 16px;
  color: #6d6961;
  font-size: 12.5px;
  line-height: 1.55;
}

.btn-mucura {
  display: inline-flex;
  min-height: var(--altura-acao);
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #c94c08;
  border-color: #c94c08;
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
}

@media (max-width: 767.98px) {
  .receitas-view {
    padding-top: 54px;
  }

  .receitas-intro__painel {
    padding: 20px;
    background-position: center center;
  }

  .catalogo__cabeca h2 {
    font-size: 25px;
  }
}
</style>
