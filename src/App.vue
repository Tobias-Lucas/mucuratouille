<script setup>
import { ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import Cabecalho from './components/Cabecalho.vue'
import Rodape from './components/Rodape.vue'
import BuscaReceitas from './components/BuscaReceitas.vue'
import { favoritos, aviso, limparAviso } from './state/favoritos.js'

const route = useRoute()
const router = useRouter()
const textoBusca = ref(typeof route.query.q === 'string' ? route.query.q : '')

watch(() => route.query.q, (valor) => { textoBusca.value = typeof valor === 'string' ? valor : '' })

function executarBusca() {
  const termo = textoBusca.value.trim()
  router.push({ name: 'receitas', query: termo ? { q: termo } : {} })
}
</script>

<template>
  <a class="pular-conteudo" href="#conteudo-principal">Pular para o conteúdo</a>
  <Cabecalho :quantidade-favoritos="favoritos.length" />
  <main id="conteudo-principal" class="pagina">
    <section class="busca-global container-fluid px-3 px-lg-4" aria-label="Busca global de receitas">
      <form class="busca-global__linha d-flex align-items-center gap-2 gap-md-3" role="search" @submit.prevent="executarBusca">
        <BuscaReceitas :valor-inicial="textoBusca" placeholder="Busque uma receita ou Pokémon do cardápio..." @buscar="textoBusca = $event" />
        <button class="busca-global__botao btn rounded-pill shadow" type="submit">Buscar</button>
      </form>
    </section>
    <RouterView />
  </main>
  <Rodape />
  <div v-show="aviso" class="toast show aviso border-0 shadow" role="status" aria-live="polite" aria-atomic="true">
    <div class="toast-header aviso__cabeca"><strong class="me-auto">Favoritos</strong><small>Mucuratouille</small><button type="button" class="btn-close ms-2" aria-label="Fechar aviso" @click="limparAviso"></button></div>
    <div class="toast-body aviso__corpo">{{ aviso }}</div>
  </div>
</template>
