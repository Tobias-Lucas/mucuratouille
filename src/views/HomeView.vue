<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import CardReceita from '../components/CardReceita.vue'
import PokemonCard from '../components/PokemonCard.vue'
import { dadosReceitas, receitasPorPokemon } from '../data/receitas.js'
import { buscarPokemon } from '../services/pokeapi.js'
import { eFavorita, favoritar } from '../state/favoritos.js'

const idsDestaques = ['psyduck-assado-com-batatas','krabby-burger-especial','tangela-espaguete-pesto','appletun-apple-pie']
const destaques = dadosReceitas.filter((receita) => idsDestaques.includes(receita.id))
const receitaDoDia = dadosReceitas[new Date().getDate() % dadosReceitas.length]
const pokemonNoCardapio = ref([])

onMounted(async () => {
  const nomes = ['psyduck','krabby','tangela','appletun']
  const resultados = await Promise.allSettled(nomes.map((nome) => buscarPokemon(nome)))
  pokemonNoCardapio.value = resultados.filter((item) => item.status === 'fulfilled').map((item) => item.value)
})
</script>

<template>
  <div class="home-view">
    <section class="home-hero container-fluid px-3 px-lg-4">
      <div class="home-hero__card shadow-sm">
        <img class="home-hero__imagem" src="/placeholders/home-hero.png" alt="Ilustração principal do Mucuratouille em sua nova fase Pokémon" />
        <div class="home-hero__sombra" aria-hidden="true"></div>
        <div class="home-hero__conteudo">
          <span class="home-hero__selo">POKÉ-COZINHA DUVIDOSA</span>
          <h1>Receitas duvidosas.<br />Conselhos mais ainda.</h1>
          <p>Agora com ingredientes que podem usar <strong>Hyper Beam</strong>. Explore 20 receitas temáticas e uma Pokédex conectada em tempo real à PokéAPI.</p>
          <div class="d-flex flex-wrap gap-2 gap-md-3 mt-4">
            <RouterLink class="btn btn-mucura btn-acao rounded-pill px-4" to="/receitas">Explorar receitas</RouterLink>
            <RouterLink class="btn btn-pokedex btn-acao rounded-pill px-4" to="/pokedex">Abrir Pokédex</RouterLink>
          </div>
          <div class="home-hero__stats d-flex flex-wrap gap-2 mt-4"><span>20 receitas</span><span>PokéAPI ao vivo</span><span>Tipos influenciam o visual</span></div>
        </div>
      </div>
    </section>

    <section class="home-secao container-fluid px-3 px-lg-4" aria-labelledby="titulo-destaques">
      <div class="home-secao__cabeca d-flex align-items-end justify-content-between gap-3">
        <div><span class="sobretitulo">COMECE POR AQUI</span><h2 id="titulo-destaques">Receitas em destaque</h2></div>
        <RouterLink class="home-secao__link" to="/receitas">Ver catálogo completo</RouterLink>
      </div>
      <div class="row g-2 g-md-3 g-xl-4">
        <div v-for="receita in destaques" :key="receita.id" class="col-6 col-lg-3">
          <CardReceita :receita="receita" :favorita="eFavorita(receita.id)" :selecionada="false" @favoritar="favoritar" />
        </div>
      </div>
    </section>

    <section class="home-secao container-fluid px-3 px-lg-4" aria-labelledby="titulo-dia">
      <div class="home-dia rounded-4 shadow-sm overflow-hidden">
        <div class="row g-0 align-items-stretch">
          <div class="col-12 col-md-5 home-dia__visual">
            <img :src="`/placeholders/receitas/${receitaDoDia.imagem}.png`" :alt="`Imagem da receita ${receitaDoDia.nome}`" />
            <span class="badge rounded-pill home-dia__selo">Receita do dia</span>
          </div>
          <div class="col-12 col-md-7 home-dia__conteudo">
            <span class="sobretitulo">UMA ESCOLHA DA MUCURA</span>
            <h2 id="titulo-dia">{{ receitaDoDia.nome }}</h2>
            <p>{{ receitaDoDia.descricao }}</p>
            <div class="home-dia__meta d-flex flex-wrap gap-2"><span>{{ receitaDoDia.tempo }}</span><span>{{ receitaDoDia.porcoes }} porções</span><span>{{ receitaDoDia.dificuldade }}</span><span>{{ receitaDoDia.pokemon }}</span></div>
            <p class="home-dia__frase">“{{ receitaDoDia.frase }}”</p>
            <RouterLink class="btn btn-mucura btn-acao rounded-pill px-4" :to="{ name:'receita', params:{ id:receitaDoDia.id } }">Ver receita do dia</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="home-secao home-pokedex container-fluid px-3 px-lg-4" aria-labelledby="titulo-cardapio">
      <div class="home-pokedex__painel rounded-4 shadow-sm">
        <div class="home-secao__cabeca d-flex align-items-end justify-content-between gap-3">
          <div><span class="sobretitulo">DA POKÉDEX PARA A COZINHA</span><h2 id="titulo-cardapio">Pokémons no cardápio</h2><p>Os dados abaixo vêm da PokéAPI. O selo indica quem já ganhou uma receita duvidosa.</p></div>
          <RouterLink class="home-secao__link home-secao__link--pokedex" to="/pokedex">Explorar Pokédex</RouterLink>
        </div>
        <div v-if="pokemonNoCardapio.length" class="row g-2 g-md-3">
          <div v-for="pokemon in pokemonNoCardapio" :key="pokemon.id" class="col-6 col-lg-3">
            <PokemonCard :pokemon="pokemon" :receita="receitasPorPokemon.get(pokemon.name)" />
          </div>
        </div>
        <div v-else class="home-pokedex__loading">Consultando a Pokédex...</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  padding: 84px 0 58px;
}

.home-hero,.home-secao {
  width: min(1380px,100%);
  margin: 0 auto;
}

.home-hero__card {
  position: relative;
  min-height: 400px;
  overflow: hidden;
  color: #fff;
  background: #123c2c;
  border: 1px solid #d5c9b7;
  border-radius: 28px;
}

.home-hero__imagem,.home-hero__sombra {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.home-hero__imagem {
  object-fit: cover;
}

.home-hero__sombra {
  background: linear-gradient(90deg,rgba(6,21,14,.93),rgba(6,21,14,.78) 46%,rgba(6,21,14,.22) 75%);
}

.home-hero__conteudo {
  position: relative;
  z-index: 2;
  width: min(760px,68%);
  padding: clamp(32px,5vw,66px);
}

.home-hero__selo {
  display: inline-flex;
  padding: 7px 10px;
  color: #fff;
  background: #c62828;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .8px;
}

.home-hero h1,.home-secao h2,.home-dia h2 {
  font-family: Georgia,'Times New Roman',serif;
  font-weight: 800;
}

.home-hero h1 {
  margin: 14px 0;
  color: #fff;
  font-size: clamp(36px,4.8vw,62px);
  line-height: .98;
}

.home-hero p {
  max-width: 660px;
  margin: 0;
  color: rgba(255,255,255,.9);
  font-size: 14px;
  line-height: 1.65;
}

.home-hero__stats span {
  padding: 6px 9px;
  background: rgba(255,255,255,.1);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 999px;
  font-size: 9.5px;
  font-weight: 800;
}

.home-secao {
  margin-top: 44px;
}

.home-secao__cabeca {
  margin-bottom: 16px;
}

.home-secao h2 {
  margin: 4px 0 0;
  color: #292a24;
  font-size: clamp(24px,3vw,34px);
}

.home-secao__cabeca p {
  max-width: 620px;
  margin: 6px 0 0;
  color: #6d6a63;
  font-size: 11.5px;
}

.home-secao__link {
  color: #c94c08;
  font-size: 11px;
  font-weight: 900;
  text-decoration: none;
  white-space: nowrap;
}

.home-secao__link--pokedex {
  color: #c62828;
}

.home-dia {
  background: #fffdf8;
  border: 1px solid #dfd4c3;
}

.home-dia__visual {
  position: relative;
  min-height: 310px;
  background: #e4ddd2;
}

.home-dia__visual img {
  width: 100%;
  height: 100%;
  min-height: 310px;
  object-fit: cover;
}

.home-dia__selo {
  position: absolute;
  top: 18px;
  left: 18px;
  padding: 8px 11px;
  background: #c94c08;
}

.home-dia__conteudo {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: clamp(24px,4vw,48px);
}

.home-dia h2 {
  margin: 5px 0 10px;
  color: #292a24;
  font-size: 34px;
}

.home-dia__conteudo>p {
  color: #66635c;
  font-size: 12px;
  line-height: 1.65;
}

.home-dia__meta span {
  padding: 5px 8px;
  color: #123c2c;
  background: #f1ebdf;
  border-radius: 999px;
  font-size: 9.5px;
  font-weight: 800;
}

.home-dia__frase {
  margin: 16px 0 !important;
  padding-left: 12px;
  border-left: 3px solid #c94c08;
  font-style: italic;
}

.home-pokedex__painel {
  padding: 22px;
  background: linear-gradient(135deg,#f8f0e4,#fffdf8);
  border: 1px solid #dfd3c2;
}

.home-pokedex__loading {
  padding: 50px;
  text-align: center;
  color: #123c2c;
}

.btn-mucura {
  color: #fff;
  background: #c94c08;
  border-color: #c94c08;
  font-size: 11px;
  font-weight: 900;
}

.btn-pokedex {
  color: #fff;
  background: #c62828;
  border-color: #c62828;
  font-size: 11px;
  font-weight: 900;
}

.btn-mucura:hover,.btn-pokedex:hover {
  color: #fff;
  filter: brightness(.92);
}

@media (max-width:767.98px) {
  .home-view {
    padding-top: 62px;
  }

  .home-hero__card {
    min-height: 360px;
  }

  .home-hero__conteudo {
    width: 100%;
    padding: 30px 20px;
  }

  .home-hero h1 {
    font-size: 38px;
  }

  .home-hero__sombra {
    background: rgba(6,21,14,.78);
  }

  .home-dia__visual,.home-dia__visual img {
    min-height: 220px;
  }

  .home-dia h2 {
    font-size: 27px;
  }

  .home-pokedex__painel {
    padding: 14px;
  }
}
</style>
