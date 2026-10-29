<script setup>
import { ref } from 'vue'
import Cabecalho from './components/Cabecalho.vue'
import BuscaReceitas from './components/BuscaReceitas.vue'
import FiltroCategorias from './components/FiltroCategorias.vue'
import CardReceita from './components/CardReceita.vue'
import DetalheReceita from './components/DetalheReceita.vue'
import ModalInformacoes from './components/ModalInformacoes.vue'
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
const modalAberto = ref('')

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
  receitaSelecionada.value = null
}

function voltarInicio() {
  busca.value = ''
  categoria.value = 'todas'
  somenteFavoritos.value = false
  receitaSelecionada.value = null
  aviso.value = ''
  chaveBusca.value++
}

function limparFiltros() {
  voltarInicio()
}

function verFavoritos() {
  busca.value = ''
  categoria.value = 'todas'
  somenteFavoritos.value = true
  receitaSelecionada.value = null
  chaveBusca.value++
}

function abrirReceita(receita) {
  receitaSelecionada.value = receita
}

function voltarReceitas() {
  receitaSelecionada.value = null
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

function abrirInformacoes(tipo) {
  modalAberto.value = tipo
}

function fecharInformacoes() {
  modalAberto.value = ''
}
</script>

<template>
  <a class="pular-conteudo" href="#receitas">Pular para as receitas</a>

  <Cabecalho
    :quantidade-favoritos="favoritos.length"
    :favoritos-ativos="somenteFavoritos"
    @favoritos="verFavoritos"
    @inicio="voltarInicio"
  />

  <main class="pagina">
    <section class="controles container-fluid px-3 px-lg-4" aria-label="Busca e filtros de receitas">
      <div class="controles__linha d-flex align-items-center gap-2 gap-md-3">
        <BuscaReceitas
          :key="chaveBusca"
          :valor-inicial="busca"
          @buscar="buscar"
        />

        <a
          class="botao-surpresa btn btn-warning rounded-pill shadow d-inline-flex align-items-center justify-content-center gap-2"
          href="#receitas"
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
        </a>
      </div>

      <FiltroCategorias
        :selecionada="categoria"
        :somente-favoritos="somenteFavoritos"
        @selecionar="escolherCategoria"
      />
    </section>

    <section id="receitas" class="conteudo container-fluid px-3 px-lg-4 pb-5">
      <div class="d-md-none">
        <template v-if="receitaSelecionada">
          <div class="detalhe-mobile__acoes d-flex align-items-center justify-content-between gap-2 mb-3">
            <button
              type="button"
              class="btn detalhe-mobile__voltar rounded-pill d-inline-flex align-items-center gap-2 shadow-sm"
              @click="voltarReceitas"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m14.5 6-6 6 6 6" />
              </svg>
              Voltar às receitas
            </button>
          </div>

          <DetalheReceita
            :key="`mobile-${receitaSelecionada.id}`"
            :receita="receitaSelecionada"
            :favorita="eFavorita(receitaSelecionada.id)"
            @favoritar="favoritar"
          />
        </template>

        <template v-else>
          <div class="catalogo__cabeca d-flex align-items-end justify-content-between gap-3">
            <div>
              <span class="sobretitulo">RECEITAS DO PARÁ</span>
              <h1 id="titulo-catalogo-mobile">
                {{ somenteFavoritos ? 'Seus favoritos' : categoria === 'cirio' ? 'Especial Círio' : 'Escolha sua receita' }}
              </h1>
            </div>
            <span class="catalogo__quantidade">
              {{ receitasVisiveis().length }} {{ receitasVisiveis().length === 1 ? 'receita' : 'receitas' }}
            </span>
          </div>

          <div v-if="receitasVisiveis().length" class="row g-2 grade-receitas grade-receitas--mobile">
            <div
              v-for="receita in receitasVisiveis()"
              :key="`mobile-${receita.id}`"
              class="col-6"
            >
              <CardReceita
                :receita="receita"
                :favorita="eFavorita(receita.id)"
                :selecionada="false"
                @abrir="abrirReceita"
                @favoritar="favoritar"
              />
            </div>
          </div>

          <div v-else class="catalogo__vazio card border-0 shadow-sm">
            <img
              :src="'/imagens/mucura-avatar.webp'"
              width="82"
              height="82"
              alt="Mucura chef procurando uma receita"
            />
            <h2>Nada apareceu por aqui.</h2>
            <p>A mucura procurou até embaixo da panela. Tente outro termo ou limpe os filtros.</p>
            <button class="botao-secundario btn btn-success" type="button" @click="limparFiltros">
              Mostrar todas as receitas
            </button>
          </div>
        </template>
      </div>

      <div class="d-none d-md-block">
        <div class="row g-4 align-items-start">
          <div class="catalogo col-12 col-xl-7" aria-labelledby="titulo-catalogo">
            <div class="catalogo__cabeca d-flex align-items-end justify-content-between gap-3">
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

            <div v-if="receitasVisiveis().length" class="row g-3 grade-receitas">
              <div
                v-for="receita in receitasVisiveis()"
                :key="receita.id"
                class="col-sm-6 col-lg-4"
              >
                <CardReceita
                  :receita="receita"
                  :favorita="eFavorita(receita.id)"
                  :selecionada="receitaSelecionada?.id === receita.id"
                  @abrir="abrirReceita"
                  @favoritar="favoritar"
                />
              </div>
            </div>

            <div v-else class="catalogo__vazio card border-0 shadow-sm">
              <img
                :src="'/imagens/mucura-avatar.webp'"
                width="82"
                height="82"
                alt="Mucura chef procurando uma receita"
              />
              <h2>Nada apareceu por aqui.</h2>
              <p>A mucura procurou até embaixo da panela. Tente outro termo ou limpe os filtros.</p>
              <button class="botao-secundario btn btn-success" type="button" @click="limparFiltros">
                Mostrar todas as receitas
              </button>
            </div>
          </div>

          <div id="detalhes" class="detalhes-coluna col-12 col-xl-5">
            <DetalheReceita
              :key="receitaSelecionada ? receitaSelecionada.id : 'introducao'"
              :receita="receitaSelecionada"
              :favorita="receitaSelecionada ? eFavorita(receitaSelecionada.id) : false"
              @favoritar="favoritar"
            />
          </div>
        </div>
      </div>
    </section>
  </main>

  <Rodape @abrir-info="abrirInformacoes" />

  <ModalInformacoes
    v-if="modalAberto"
    :tipo="modalAberto"
    :receitas="receitas"
    @fechar="fecharInformacoes"
  />

  <div v-show="aviso" class="toast show aviso border-0 shadow" role="status" aria-live="polite" aria-atomic="true">
    <div class="toast-header aviso__cabeca">
      <svg class="aviso__icone" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.5 4.1 13C-.5 8.7 2 3.5 6.4 3.5c2.4 0 4.1 1.5 5.6 3.2 1.5-1.7 3.2-3.2 5.6-3.2 4.4 0 6.9 5.2 2.3 9.5L12 20.5Z" />
      </svg>
      <strong class="me-auto">Favoritos</strong>
      <small>Mucuratouille</small>
      <button type="button" class="btn-close ms-2" aria-label="Fechar aviso" @click="aviso = ''"></button>
    </div>
    <div class="toast-body aviso__corpo">{{ aviso }}</div>
  </div>
</template>
