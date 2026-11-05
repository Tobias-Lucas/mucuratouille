<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import DetalheReceita from '../components/DetalheReceita.vue'
import CardReceita from '../components/CardReceita.vue'
import { dadosReceitas } from '../data/receitas.js'
import { eFavorita, favoritar } from '../state/favoritos.js'

const route = useRoute()
const receita = computed(() => dadosReceitas.find((item) => item.id === route.params.id))
const relacionadas = computed(() => {
  if (!receita.value) return []
  return dadosReceitas
    .filter((item) => item.id !== receita.value.id && (item.categoria === receita.value.categoria || item.cirio === receita.value.cirio))
    .slice(0, 3)
})
</script>

<template>
  <div class="receita-view container-fluid px-3 px-lg-4">
    <template v-if="receita">
      <div class="receita-view__acoes-topo">
        <RouterLink class="receita-view__voltar btn rounded-pill d-inline-flex align-items-center gap-2" to="/receitas">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg>
          Voltar às receitas
        </RouterLink>
      </div>

      <nav class="receita-view__breadcrumb d-flex align-items-center gap-2" aria-label="Navegação da receita">
        <RouterLink to="/receitas">Receitas</RouterLink>
        <span aria-hidden="true">/</span>
        <span>{{ receita.nome }}</span>
      </nav>

      <div class="receita-view__detalhe">
        <DetalheReceita
          :key="receita.id"
          :receita="receita"
          :favorita="eFavorita(receita.id)"
          @favoritar="favoritar"
        />
      </div>

      <section v-if="relacionadas.length" class="receita-view__relacionadas" aria-labelledby="titulo-relacionadas">
        <div class="d-flex align-items-end justify-content-between gap-3 mb-3">
          <div>
            <span class="sobretitulo">CONTINUE EXPLORANDO</span>
            <h2 id="titulo-relacionadas">Outras receitas</h2>
          </div>
          <RouterLink class="receita-view__link" to="/receitas">Ver todas</RouterLink>
        </div>
        <div class="row g-3">
          <div v-for="item in relacionadas" :key="item.id" class="col-12 col-md-4">
            <CardReceita
              :receita="item"
              :favorita="eFavorita(item.id)"
              :selecionada="false"
              @favoritar="favoritar"
            />
          </div>
        </div>
      </section>
    </template>

    <section v-else class="receita-view__nao-encontrada text-center">
      <img src="/imagens/mucura-avatar.webp" alt="Mucura chef" width="96" height="96" />
      <span class="sobretitulo">RECEITA NÃO ENCONTRADA</span>
      <h1>A mucura procurou, mas essa panela está vazia.</h1>
      <p>O endereço da receita não corresponde a nenhum item do nosso catálogo.</p>
      <RouterLink class="btn btn-mucura rounded-pill px-4" to="/receitas">Voltar às receitas</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.receita-view {
  width: min(1240px, 100%);
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 54px;
}

.receita-view__acoes-topo {
  margin-bottom: 10px;
}

.receita-view__voltar {
  min-height: 42px;
  padding: 8px 15px;
  color: #244c36;
  background: #fffdf8;
  border: 1px solid #d6ccba;
  font-size: 11px;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 5px 14px rgba(65, 43, 22, 0.07);
}

.receita-view__voltar:hover {
  color: #fff;
  background: #244c36;
  border-color: #244c36;
}

.receita-view__voltar svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.receita-view__breadcrumb {
  margin-bottom: 14px;
  color: #7a796f;
  font-size: 10px;
}

.receita-view__breadcrumb a,
.receita-view__link {
  color: #8f3b0d;
  font-weight: 800;
  text-decoration: none;
}

.receita-view__detalhe {
  max-width: 980px;
  margin: 0 auto;
}

.receita-view__relacionadas {
  margin-top: 42px;
}

.receita-view__relacionadas h2 {
  margin: 4px 0 0;
  color: #24261f;
  font: 800 28px/1.1 Georgia, 'Times New Roman', serif;
}

.receita-view__link {
  font-size: 11px;
}

.receita-view__nao-encontrada {
  max-width: 650px;
  margin: 0 auto;
  padding: 70px 20px 90px;
}

.receita-view__nao-encontrada img {
  margin: 0 auto 18px;
  border-radius: 50%;
}

.receita-view__nao-encontrada h1 {
  margin: 8px 0 12px;
  color: #262820;
  font: 800 34px/1.05 Georgia, 'Times New Roman', serif;
}

.receita-view__nao-encontrada p {
  margin-bottom: 22px;
  color: #6a6c64;
  font-size: 13px;
}

.btn-mucura {
  color: #fff;
  background: #bd4a0a;
  border-color: #bd4a0a;
  font-size: 12px;
  font-weight: 800;
}

@media (max-width: 575.98px) {
  .receita-view {
    padding-top: 60px;
  }

  .receita-view__relacionadas h2 {
    font-size: 23px;
  }
}
</style>
