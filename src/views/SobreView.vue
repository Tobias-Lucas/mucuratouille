<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="pagina-interna container-fluid px-3 px-lg-4">
    <div class="pagina-interna__hero rounded-4 shadow-sm">
      <span class="pagina-interna__sobretitulo">MUCURATOUILLE · FASE API</span>
      <h1>Sobre o projeto</h1>
      <p>Receitas duvidosas. Conselhos mais ainda. Agora com ingredientes que podem usar Hyper Beam.</p>
    </div>
    <div class="pagina-interna__conteudo card border-0 shadow-sm rounded-4">
      <div class="card-body p-4 p-md-5">
        <p>O <strong>Mucuratouille</strong> começou como uma aplicação de receitas em Vue 3 e evoluiu em etapas para incorporar Bootstrap, responsividade, Vue Router e, nesta fase, comunicação real com uma API externa.</p>
        <p>O novo conceito mistura cozinha, humor e dados de Pokémon. As <strong>20 receitas</strong> são dados locais criados pelo projeto, enquanto imagem oficial, número da Pokédex, tipos, altura, peso, habilidades, estatísticas, espécie e cadeia evolutiva são consultados pela <strong>PokéAPI</strong>.</p>
        <p>A integração foi separada em <code>src/services/pokeapi.js</code>. Os componentes visuais consomem funções desse service e trabalham com estados de carregamento, erro e sucesso usando programação assíncrona.</p>
        <p class="mb-0">O tipo retornado pela API também influencia o visual das receitas: cores dos passos, barras de progresso, linhas de destaque e cards mudam dinamicamente conforme o Pokémon usado.</p>
      </div>
    </div>
    <div class="pagina-interna__acoes d-flex flex-wrap gap-2 justify-content-center">
      <RouterLink class="btn btn-mucura btn-acao rounded-pill px-4" to="/receitas">Explorar receitas</RouterLink>
      <RouterLink class="btn btn-outline-mucura btn-acao rounded-pill px-4" to="/pokedex">Abrir Pokédex</RouterLink>
    </div>
  </section>
</template>
<style scoped src="../styles/paginas-internas.css"></style>
