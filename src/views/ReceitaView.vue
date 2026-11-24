<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import DetalheReceita from '../components/DetalheReceita.vue'
import CardReceita from '../components/CardReceita.vue'
import EstadoVazio from '../components/EstadoVazio.vue'
import { dadosReceitas } from '../data/receitas.js'
import { buscarPokemon } from '../services/pokeapi.js'
import { eFavorita, favoritar } from '../state/favoritos.js'
import { registrarVisualizacao } from '../state/historico.js'

const route = useRoute()
const router = useRouter()
const pokemon = ref(null)
const carregandoPokemon = ref(false)
const erroPokemon = ref('')
const receita = computed(() => dadosReceitas.find((item) => item.id === route.params.id))
let tokenPokemon = 0

const relacionadas = computed(() => {
  if (!receita.value) return []
  return dadosReceitas.filter((item) => item.id !== receita.value.id && item.categoria === receita.value.categoria).slice(0, 3)
})

async function carregarPokemon() {
  const meuToken = ++tokenPokemon

  pokemon.value = null
  erroPokemon.value = ''

  if (!receita.value?.pokemon) {
    carregandoPokemon.value = false
    return
  }

  carregandoPokemon.value = true

  try {
    const dados = await buscarPokemon(receita.value.pokemon)
    if (meuToken === tokenPokemon) pokemon.value = dados
  } catch {
    if (meuToken === tokenPokemon) {
      erroPokemon.value = 'Os dados externos não puderam ser carregados. A receita continua disponível.'
    }
  } finally {
    if (meuToken === tokenPokemon) carregandoPokemon.value = false
  }
}

function voltarParaReceitas() {
  router.push({ name: 'receitas' })
}

watch(() => route.params.id, () => {
  if (receita.value) registrarVisualizacao(receita.value)
  carregarPokemon()
}, { immediate: true })
</script>

<template>
  <div class="receita-view container-fluid px-3 px-lg-4">
    <template v-if="receita">
      <div class="receita-view__acoes-topo"><RouterLink class="receita-view__voltar btn rounded-pill" to="/receitas">← Voltar às receitas</RouterLink></div>
      <nav class="receita-view__breadcrumb d-flex align-items-center gap-2" aria-label="Navegação da receita"><RouterLink to="/receitas">Receitas</RouterLink><span>/</span><span>{{ receita.nome }}</span></nav>
      <div class="receita-view__detalhe">
        <DetalheReceita :key="receita.id" :receita="receita" :pokemon="pokemon" :carregando-pokemon="carregandoPokemon" :erro-pokemon="erroPokemon" :favorita="eFavorita(receita.id)" @favoritar="favoritar" />
      </div>
      <section v-if="relacionadas.length" class="receita-view__relacionadas" aria-labelledby="titulo-relacionadas">
        <div class="d-flex align-items-end justify-content-between gap-3 mb-3"><div><span class="sobretitulo">CONTINUE EXPLORANDO</span><h2 id="titulo-relacionadas">Outras receitas</h2></div><RouterLink class="receita-view__link" to="/receitas">Ver todas</RouterLink></div>
        <div class="row g-3"><div v-for="item in relacionadas" :key="item.id" class="col-12 col-md-4"><CardReceita :receita="item" :favorita="eFavorita(item.id)" :selecionada="false" @favoritar="favoritar" /></div></div>
      </section>
    </template>
    <EstadoVazio
      v-else
      class="receita-view__nao-encontrada"
      titulo="A Mucura procurou, mas essa panela está vazia."
      mensagem="O endereço não corresponde a nenhuma das 20 receitas atuais."
      imagem="/imagens/nao-encontrado.webp"
      imagem-alt="Mucura procurando uma receita"
      acao-texto="Voltar às receitas"
      @acao="voltarParaReceitas"
    />
  </div>
</template>

<style scoped>
.receita-view {
  width: min(1240px,100%);
  margin: 0 auto;
  padding-top: 74px;
  padding-bottom: 70px;
}

.receita-view__acoes-topo {
  margin-bottom: 9px;
}

.receita-view__voltar {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  color: #123c2c;
  background: #fffdf8;
  border: 1px solid #c8bba9;
  box-shadow: 0 2px 6px rgba(18, 60, 44, 0.08);
  font-size: 9px;
  font-weight: 900;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  transition:
    background-color 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.receita-view__voltar:hover {
  color: #fff;
  background: #123c2c;
  border-color: #123c2c;
  box-shadow: 0 4px 12px rgba(18, 60, 44, 0.22);
}

.receita-view__breadcrumb {
  margin-bottom: 13px;
  color: #817b71;
  font-size: 8px;
}

.receita-view__breadcrumb a,.receita-view__link {
  color: #c94c08;
  font-weight: 900;
  text-decoration: none;
}

.receita-view__detalhe {
  max-width: 1120px;
  margin: 0 auto;
}

.receita-view__relacionadas {
  margin-top: 40px;
}

.receita-view__relacionadas h2 {
  margin: 4px 0 0;
  color: #292a24;
  font: 800 28px/1.1 Georgia,'Times New Roman',serif;
}

.receita-view__link {
  font-size: 9px;
}

.receita-view__nao-encontrada {
  max-width: 650px;
  margin: 0 auto;
  padding: 70px 20px 100px;
}

.btn-mucura {
  color: #fff;
  background: #c94c08;
  border-color: #c94c08;
  font-size: 10px;
  font-weight: 900;
}

@media (max-width:575.98px) {
  .receita-view {
    padding-top: 56px;
  }
}
</style>
