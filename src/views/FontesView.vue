<script setup>
import { dadosReceitas } from '../data/receitas.js'
</script>

<template>
  <section class="pagina-interna container-fluid px-3 px-lg-4">
    <div class="pagina-interna__hero rounded-4 shadow-sm">
      <span class="pagina-interna__sobretitulo">DADOS E REFERÊNCIAS</span>
      <h1>Fontes do projeto</h1>
      <p>
        A nova fase combina conteúdo autoral do Mucuratouille com dados externos
        consumidos pela PokéAPI.
      </p>
    </div>

    <div class="fontes-api card border-0 shadow-sm rounded-4 mt-3">
      <div class="fontes-api__conteudo">
        <div class="fontes-api__texto">
          <span class="fontes-api__sobretitulo">API EXTERNA</span>
          <h2>PokéAPI</h2>
          <p>
            Usada para consultar Pokémon, tipos, sprites/artworks, habilidades,
            altura, peso, estatísticas, espécies e cadeias evolutivas.
          </p>
        </div>

        <a
          class="btn fontes-api__botao rounded-pill"
          href="https://pokeapi.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Acessar PokéAPI
        </a>
      </div>
    </div>

    <div class="fontes-lista list-group rounded-4 overflow-hidden shadow-sm mt-3">
      <div
        v-for="receita in dadosReceitas"
        :key="receita.id"
        class="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-1 gap-md-3 py-3 px-4"
      >
        <strong>{{ receita.nome }}</strong>
        <span class="text-secondary text-md-end">
          Receita autoral · Pokémon: {{ receita.pokemon }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped src="../styles/paginas-internas.css"></style>

<style scoped>
.fontes-api {
  overflow: hidden;
  color: #fff;
  background-image: linear-gradient(
      120deg,
      rgba(128, 20, 25, 0.76),
      rgba(198, 40, 40, 0.58) 54%,
      rgba(91, 14, 18, 0.72)
    ),
    url('/imagens/fundo-vermelho-paisagem.png');
  background-color: #a51f25;
  background-size: cover;
  background-position: center 54%;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.fontes-api__conteudo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 30px 34px;
}

.fontes-api__texto {
  max-width: 820px;
}

.fontes-api__sobretitulo {
  display: block;
  color: #fff;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 1px;
}

.fontes-api h2 {
  margin: 6px 0 8px;
  color: #fff;
  font: 800 32px / 1 Georgia, 'Times New Roman', serif;
}

.fontes-api p {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  line-height: 1.6;
}

.fontes-api__botao {
  display: inline-flex;
  min-width: 150px;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  padding: 0 22px;
  flex: 0 0 auto;
  color: #0b2d20;
  background: #f4c542;
  border: 1px solid #f4c542;
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease;
}

.fontes-api__botao:hover {
  color: #0b2d20;
  background: #e2b62f;
  border-color: #e2b62f;
  transform: translateY(-1px);
}

.fontes-lista {
  background: #fffdf8;
  border: 1px solid #e1d7c8;
}

.list-group-item {
  background: #fffdf8;
  border-color: #ece4d7;
  font-size: 11px;
}

.list-group-item strong {
  color: #292a24;
}

.list-group-item span {
  text-transform: capitalize;
}

@media (max-width: 767.98px) {
  .fontes-api {
    background-position: 66% center;
  }

  .fontes-api__conteudo {
    align-items: stretch;
    flex-direction: column;
    gap: 18px;
    padding: 24px 22px;
  }

  .fontes-api__botao {
    align-self: center;
    min-width: 160px;
  }

  .fontes-api h2 {
    font-size: 28px;
  }
}
</style>
