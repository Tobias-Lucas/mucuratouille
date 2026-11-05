<script setup>
import { dadosReceitas } from '../data/receitas.js'
</script>

<template>
  <section class="pagina-interna container-fluid px-3 px-lg-4">
    <div class="pagina-interna__hero rounded-4 shadow-sm">
      <span class="pagina-interna__sobretitulo">REFERÊNCIAS</span>
      <h1>Fontes das receitas</h1>
      <p>As referências culinárias utilizadas no projeto estão organizadas por receita.</p>
    </div>

    <div class="fontes-lista list-group rounded-4 overflow-hidden shadow-sm mt-3">
      <a
        v-for="receita in dadosReceitas"
        :key="receita.id"
        :href="receita.fonte.url"
        target="_blank"
        rel="noopener noreferrer"
        class="list-group-item list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-1 gap-md-3 py-3 px-4"
      >
        <strong>{{ receita.nome }}</strong>
        <span class="text-secondary text-md-end">{{ receita.fonte.nome }} ↗</span>
      </a>
    </div>
  </section>
</template>

<style scoped src="../styles/paginas-internas.css"></style>
<style scoped>
.fontes-lista {
  border: 1px solid #e3d8c6;
}

.list-group-item {
  border-color: #ece4d7;
  font-size: 12px;
}

.list-group-item strong {
  color: #283329;
}
</style>
