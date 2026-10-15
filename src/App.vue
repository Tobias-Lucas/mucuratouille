<script setup>
import { ref } from 'vue'
import Cabecalho from './components/Cabecalho.vue'
import BuscaReceitas from './components/BuscaReceitas.vue'
import FiltroCategorias from './components/FiltroCategorias.vue'
import CardReceita from './components/CardReceita.vue'
import DetalheReceita from './components/DetalheReceita.vue'
import Rodape from './components/Rodape.vue'
import { dadosReceitas } from './data/receitas.js'
import { filtrarReceitas } from './data/filtros.js'

const receitas = ref(dadosReceitas)
const busca = ref('')
const categoria = ref('todas')
const favoritos = ref([])
const somenteFavoritos = ref(false)
const receitaSelecionada = ref(null)
const aviso = ref('')
const chaveBusca = ref(0)

function receitasVisiveis() {
  return filtrarReceitas(
    receitas.value,
    busca.value,
    categoria.value,
    somenteFavoritos.value,
    favoritos.value,
    false,
    'selecao',
  )
}

function eFavorita(id) {
  return favoritos.value.includes(id)
}

function favoritar(receita) {
  if (eFavorita(receita.id)) {
    favoritos.value = favoritos.value.filter((id) => id !== receita.id)
    aviso.value = `${receita.nome} saiu dos favoritos. A mucura fingiu que não sentiu.`
    return
  }

  favoritos.value.push(receita.id)
  aviso.value = `${receita.nome} foi para os favoritos. Escolha respeitável.`
}

function buscar(texto) {
  busca.value = texto
}

function escolherCategoria(id) {
  categoria.value = id
  somenteFavoritos.value = false
}

function limparFiltros() {
  busca.value = ''
  categoria.value = 'todas'
  somenteFavoritos.value = false
  receitaSelecionada.value = null
  chaveBusca.value++
}

function verFavoritos() {
  busca.value = ''
  categoria.value = 'todas'
  somenteFavoritos.value = true
  chaveBusca.value++
}

function abrirReceita(receita) {
  receitaSelecionada.value = receita
}

function surpreender() {
  const listaAtual = receitasVisiveis()
  const base = listaAtual.length ? listaAtual : receitas.value
  const opcoes = receitaSelecionada.value
    ? base.filter((receita) => receita.id !== receitaSelecionada.value.id)
    : base

  if (!opcoes.length) {
    receitaSelecionada.value = base[0] || null
    return
  }

  receitaSelecionada.value = opcoes[Math.floor(Math.random() * opcoes.length)]
}
</script>

<template>
  <a class="pular-conteudo" href="#receitas">Pular para as receitas</a>

  <Cabecalho
    :quantidade-favoritos="favoritos.length"
    :favoritos-ativos="somenteFavoritos"
    @favoritos="verFavoritos"
  />

  <main class="pagina">
    <section class="controles container" aria-label="Busca e filtros de receitas">
      <div class="controles__linha">
        <BuscaReceitas
          :key="chaveBusca"
          :valor-inicial="busca"
          @buscar="buscar"
        />

        <a
          class="botao-surpresa"
          href="#detalhes"
          @click="surpreender"
        >
          <span aria-hidden="true">⤨</span>
          Surpreenda-me!
        </a>
      </div>

      <FiltroCategorias
        :selecionada="categoria"
        :somente-favoritos="somenteFavoritos"
        @selecionar="escolherCategoria"
      />
    </section>

    <section class="conteudo container">
      <div id="receitas" class="catalogo" aria-labelledby="titulo-catalogo">
        <div class="catalogo__cabeca">
          <div>
            <span class="sobretitulo">RECEITAS DO PARÁ</span>
            <h1 id="titulo-catalogo">
              {{ somenteFavoritos ? 'Seus favoritos' : categoria === 'cirio' ? 'Especial Círio' : 'Escolha sua receita' }}
            </h1>
          </div>
          <span class="catalogo__quantidade">
            {{ receitasVisiveis().length }} {{ receitasVisiveis().length === 1 ? 'receita' : 'receitas' }}
          </span>
        </div>

        <div v-if="receitasVisiveis().length" class="grade-receitas">
          <CardReceita
            v-for="receita in receitasVisiveis()"
            :key="receita.id"
            :receita="receita"
            :favorita="eFavorita(receita.id)"
            :selecionada="receitaSelecionada?.id === receita.id"
            @abrir="abrirReceita"
            @favoritar="favoritar"
          />
        </div>

        <div v-else class="catalogo__vazio">
          <img
            :src="'./imagens/mucura-avatar.webp'"
            width="82"
            height="82"
            alt="Mucura chef procurando uma receita"
          />
          <h2>Nada apareceu por aqui.</h2>
          <p>A mucura procurou até embaixo da panela. Tente outro termo ou limpe os filtros.</p>
          <button class="botao-secundario" type="button" @click="limparFiltros">
            Mostrar todas as receitas
          </button>
        </div>
      </div>

      <div id="detalhes" class="detalhes-coluna">
        <DetalheReceita
          :key="receitaSelecionada ? receitaSelecionada.id : 'introducao'"
          :receita="receitaSelecionada"
          :favorita="receitaSelecionada ? eFavorita(receitaSelecionada.id) : false"
          @favoritar="favoritar"
        />
      </div>
    </section>
  </main>

  <Rodape :receitas="receitas" />

  <div v-show="aviso" class="aviso" role="status" aria-live="polite">
    <span aria-hidden="true">♥</span>
    <p>{{ aviso }}</p>
    <button type="button" aria-label="Fechar aviso" @click="aviso = ''">×</button>
  </div>
</template>
