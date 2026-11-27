<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="pagina-interna container-fluid px-3 px-lg-4">
    <div class="pagina-interna__hero rounded-4 shadow-sm">
      <span class="pagina-interna__sobretitulo">MUCURATOUILLE</span>
      <h1>Sobre o projeto</h1>
      <p>Receitas duvidosas. Conselhos mais ainda. Agora com ingredientes que podem usar Hyper Beam.</p>
    </div>
    <div class="pagina-interna__conteudo card border-0 shadow-sm rounded-4">
      <div class="card-body p-4 p-md-5">
        <p>O <strong>Mucuratouille</strong> é um projeto acadêmico desenvolvido por alunos do segundo semestre de Análise e Desenvolvimento de Sistemas da UNAMA, durante a disciplina de Front-End Frameworks.</p>
        <p>Inicialmente dedicado à culinária paraense, o projeto evoluiu ao longo do semestre e ganhou uma nova proposta: unir gastronomia, criatividade, humor e o universo Pokémon em uma experiência digital interativa.</p>
        <p>O cardápio reúne <strong>20 receitas fictícias e autorais</strong>, inspiradas nas características de diferentes Pokémon. Além de explorar os pratos, os visitantes podem consultar a Pokédex, descobrir curiosidades e identificar possíveis candidatos às próximas criações da cozinha.</p>
        <p>A proposta é oferecer uma experiência divertida e diferente dos catálogos tradicionais de receitas, conduzida por uma mucura cozinheira que esbanja confiança, criatividade e critérios culinários um tanto questionáveis.</p>
        <p class="mb-0"><strong>Mucuratouille — Receitas duvidosas. Conselhos mais ainda.</strong></p>
      </div>
    </div>
    <div class="pagina-interna__acoes d-flex flex-wrap gap-2 justify-content-center">
      <RouterLink class="btn btn-mucura btn-acao rounded-pill px-4" to="/receitas">Explorar receitas</RouterLink>
      <RouterLink class="btn btn-outline-mucura btn-acao rounded-pill px-4" to="/pokedex">Abrir Pokédex</RouterLink>
    </div>
  </section>
</template>
<style scoped src="../styles/paginas-internas.css"></style>
