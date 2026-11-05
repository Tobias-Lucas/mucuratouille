<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FiltroCategorias from '../components/FiltroCategorias.vue'
import CardReceita from '../components/CardReceita.vue'
import { dadosReceitas } from '../data/receitas.js'
import { filtrarReceitas } from '../data/filtros.js'
import { favoritos, eFavorita, favoritar } from '../state/favoritos.js'

const route = useRoute()
const router = useRouter()
const busca = ref('')
const categoria = ref('todas')
const somenteFavoritos = ref(false)

function receitasVisiveis() {
  return filtrarReceitas(
    dadosReceitas,
    busca.value,
    categoria.value,
    somenteFavoritos.value,
    favoritos.value,
    false,
    'selecao',
  )
}

function escolherCategoria(id) {
  categoria.value = id
  somenteFavoritos.value = false

  const query = {}
  if (busca.value) query.q = busca.value
  if (id !== 'todas') query.categoria = id
  router.replace({ name: 'receitas', query })
}

function limparFiltros() {
  busca.value = ''
  categoria.value = 'todas'
  somenteFavoritos.value = false
  router.replace({ name: 'receitas' })
}

function surpreender() {
  const listaAtual = receitasVisiveis()
  const base = listaAtual.length ? listaAtual : dadosReceitas
  const receita = base[Math.floor(Math.random() * base.length)]
  if (receita) router.push({ name: 'receita', params: { id: receita.id } })
}

watch(
  () => [route.query.q, route.query.favoritos, route.query.categoria],
  ([buscaQuery, favoritosQuery, categoriaQuery]) => {
    busca.value = typeof buscaQuery === 'string' ? buscaQuery : ''
    somenteFavoritos.value = favoritosQuery === '1'

    if (favoritosQuery === '1') {
      categoria.value = 'todas'
    } else if (typeof categoriaQuery === 'string' && ['todas', 'cirio', 'natal', 'classicos', 'casa', 'doces'].includes(categoriaQuery)) {
      categoria.value = categoriaQuery
    } else {
      categoria.value = 'todas'
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="receitas-view">
    <section class="controles controles--categorias container-fluid px-3 px-lg-4" aria-label="Filtros de receitas">
      <div class="controles__categorias d-flex align-items-start justify-content-between gap-3">
        <FiltroCategorias
          :selecionada="categoria"
          :somente-favoritos="somenteFavoritos"
          @selecionar="escolherCategoria"
        />

        <button
          class="botao-surpresa botao-surpresa--verde btn rounded-pill shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
          type="button"
          @click="surpreender"
        >
          <svg class="botao-surpresa__icone" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h3.2c2.1 0 3.1 1.1 4.2 3.2l1.2 2.4c1.1 2.1 2.2 3.4 4.5 3.4H20" />
            <path d="m17 13 3 3-3 3" />
            <path d="M4 17h3.1c1.9 0 3-.9 4-2.7" />
            <path d="M13.3 8.7C14.2 7.6 15.2 7 17 7h3" />
            <path d="m17 4 3 3-3 3" />
          </svg>
          <span class="botao-surpresa__texto">Surpreenda-me!</span>
        </button>
      </div>
    </section>

    <section id="receitas" class="conteudo catalogo container-fluid px-3 px-lg-4 pb-5" aria-labelledby="titulo-catalogo">
      <div class="catalogo__cabeca d-flex align-items-end justify-content-between gap-3">
        <div>
          <span class="sobretitulo">RECEITAS DO PARÁ</span>
          <h1 id="titulo-catalogo">
            {{ somenteFavoritos ? 'Seus favoritos' : categoria === 'cirio' ? 'Especial Círio' : categoria === 'natal' ? 'Especial Natal' : busca ? `Resultados para “${busca}”` : 'Escolha sua receita' }}
          </h1>
        </div>
        <span class="catalogo__quantidade">
          {{ receitasVisiveis().length }} {{ receitasVisiveis().length === 1 ? 'receita' : 'receitas' }}
        </span>
      </div>

      <div v-if="receitasVisiveis().length" class="row g-2 g-md-3 grade-receitas">
        <div v-for="receita in receitasVisiveis()" :key="receita.id" class="col-6 col-md-4 col-xl-3">
          <CardReceita
            :receita="receita"
            :favorita="eFavorita(receita.id)"
            :selecionada="false"
            @favoritar="favoritar"
          />
        </div>
      </div>

      <div v-else class="catalogo__vazio card border-0 shadow-sm">
        <img src="/imagens/mucura-avatar.webp" width="82" height="82" alt="Mucura chef procurando uma receita" />
        <h2>Nada apareceu por aqui.</h2>
        <p>A mucura procurou até embaixo da panela. Tente outro termo ou limpe os filtros.</p>
        <button class="botao-secundario btn btn-success btn-acao" type="button" @click="limparFiltros">
          Mostrar todas as receitas
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.receitas-view {
  padding-top: 1px;
}

.catalogo {
  width: min(1420px, 100%);
  margin: 0 auto;
}
</style>
