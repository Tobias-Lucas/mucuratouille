<script setup>
const integrantes = [
  { nome: 'Ana Paula Silva Amorim', matricula: '04218364', imagem: 'equipe-ana' },
  { nome: 'Clayton China Simões', matricula: '04153200', imagem: 'equipe-clayton' },
  { nome: 'Jônatas Tiago Albuquerque de Moraes', matricula: '04214380', imagem: 'equipe-jonatas' },
  { nome: 'Lucas Jatene Tobias', matricula: '04217989', imagem: 'equipe-lucas' },
]
</script>

<template>
  <section class="pagina-interna container-fluid px-3 px-lg-4">
    <div class="pagina-interna__hero rounded-4 shadow-sm">
      <span class="pagina-interna__sobretitulo">QUEM COZINHOU O CÓDIGO</span>
      <h1>Equipe</h1>
      <p>Os integrantes responsáveis pela evolução do Mucuratouille.</p>
    </div>

    <div class="row g-3 g-lg-4 mt-1">
      <div v-for="integrante in integrantes" :key="integrante.matricula" class="col-12 col-lg-6">
        <article class="card h-100 border-0 shadow-sm rounded-4 equipe-card">
          <div class="card-body d-flex align-items-center gap-3 gap-md-4 p-4">
            <div class="equipe-card__personagem">
              <img :src="`/imagens/${integrante.imagem}.png`" :alt="`Personagem Mucura representando ${integrante.nome}`" />
            </div>
            <div>
              <span class="sobretitulo">INTEGRANTE</span>
              <h2 class="h5 mb-2">{{ integrante.nome }}</h2>
              <p class="mb-0">Matrícula: <strong>{{ integrante.matricula }}</strong></p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped src="../styles/paginas-internas.css"></style>
<style scoped>
.equipe-card {
  min-height: 190px;
  background: rgba(255, 255, 255, 0.97);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.equipe-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 26px rgba(58, 43, 25, 0.13) !important;
}

.equipe-card__personagem {
  display: flex;
  width: 100px;
  height: 118px;
  flex: 0 0 100px;
  align-items: center;
  justify-content: center;
}

.equipe-card__personagem img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
}

.equipe-card h2 {
  color: #282a24;
  font-weight: 800;
}

.equipe-card p {
  color: #65675f;
  font-size: 13px;
}

@media (max-width: 575.98px) {
  .equipe-card .card-body {
    flex-direction: column;
    text-align: center;
  }

  .equipe-card__personagem {
    width: 78px;
    height: 92px;
    flex-basis: 78px;
  }
}
</style>
