<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="pagina-interna container-fluid px-3 px-lg-4">
    <div class="pagina-interna__hero rounded-4 shadow-sm">
      <span class="pagina-interna__sobretitulo">MUCURATOUILLE</span>
      <h1>Sobre o projeto</h1>
      <p>Receitas boas. Conselhos duvidosos. Uma experiência inspirada na culinária paraense.</p>
    </div>

    <div class="pagina-interna__conteudo card border-0 shadow-sm rounded-4">
      <div class="card-body p-4 p-md-5">
        <p>
          O <strong>Mucuratouille</strong> é uma aplicação de receitas da culinária paraense,
          desenvolvida pela turma do segundo semestre de Análise e Desenvolvimento de Sistemas da
          UNAMA, em Belém do Pará.
        </p>
        <p>
          A proposta valoriza pratos tradicionais da região, incluindo receitas ligadas ao período
          do Círio de Nazaré, combinando identidade amazônica, humor e fundamentos de desenvolvimento
          front-end com Vue.js.
        </p>
        <p>
          A interface foi evoluída com <strong>Bootstrap</strong>, mantendo a componentização, as props,
          os eventos, as diretivas e a reatividade já presentes no projeto original.
        </p>
        <p class="mb-0">
          Nesta nova etapa, o <strong>Vue Router</strong> organiza o conteúdo em diferentes páginas da
          mesma aplicação, mantendo a navegação no modelo SPA, sem recarregamento completo.
        </p>
      </div>
    </div>

    <div class="pagina-interna__acoes d-flex flex-wrap gap-2 justify-content-center">
      <RouterLink class="btn btn-mucura btn-acao rounded-pill px-4" to="/receitas">Explorar receitas</RouterLink>
      <RouterLink class="btn btn-outline-mucura btn-acao rounded-pill px-4" to="/equipe">Conhecer a equipe</RouterLink>
    </div>
  </section>
</template>

<style scoped src="../styles/paginas-internas.css"></style>
