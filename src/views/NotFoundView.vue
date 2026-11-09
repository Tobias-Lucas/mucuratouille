<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="not-found container-fluid px-3 px-lg-4 text-center">
    <img src="/imagens/nao-encontrado.webp" alt="Mascote Mucuratouille" width="134" height="89" />
    <span class="sobretitulo">ERRO 404</span>
    <h1>Essa rota a Mucura ainda não encontrou.</h1>
    <p>A página que você tentou acessar não existe ou mudou de endereço.</p>
    <div class="d-flex flex-wrap justify-content-center gap-2">
      <RouterLink class="btn btn-mucura rounded-pill px-4" to="/">Voltar ao início</RouterLink>
      <RouterLink class="btn btn-outline-mucura rounded-pill px-4" to="/receitas">Ver receitas</RouterLink>
      <RouterLink class="btn btn-outline-mucura rounded-pill px-4" to="/pokedex">Abrir Pokédex</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  max-width: 760px;
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 110px;
}

.not-found img {
  margin: 0 auto 18px;
  border-radius: 50%;
}

.not-found h1 {
  margin: 8px 0 12px;
  color: #262820;
  font: 800 clamp(30px, 5vw, 48px)/1.04 Georgia, 'Times New Roman', serif;
}

.not-found p {
  max-width: 560px;
  margin: 0 auto 24px;
  color: #6a6c64;
  font-size: 13px;
  line-height: 1.6;
}

.btn-mucura {
  color: #fff;
  background: #c94c08;
  border-color: #c94c08;
  font-size: 12px;
  font-weight: 800;
}

.btn-outline-mucura {
  color: #123c2c;
  border-color: #123c2c;
  font-size: 12px;
  font-weight: 800;
}
</style>
