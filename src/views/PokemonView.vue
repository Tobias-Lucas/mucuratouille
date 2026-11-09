<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PokemonTypeBadge from '../components/PokemonTypeBadge.vue'
import PokemonEvolucao from '../components/PokemonEvolucao.vue'
import { buscarPokemon, buscarEspecie, buscarCadeiaEvolutiva, extrairNomesEvolucao, descricaoEspecie, artworkPokemon, nomeHabilidade } from '../services/pokeapi.js'
import { receitasPorPokemon } from '../data/receitas.js'
import { estiloTipos } from '../utils/pokemonTheme.js'

const route = useRoute()
const pokemon = ref(null)
const especie = ref(null)
const evolucao = ref([])
const carregando = ref(true)
const erro = ref('')

const receita = computed(() => pokemon.value ? receitasPorPokemon.get(pokemon.value.name) : null)
const tema = computed(() => estiloTipos(pokemon.value))
const descricao = computed(() => descricaoEspecie(especie.value, pokemon.value?.name || ''))
const stats = computed(() => pokemon.value?.stats || [])

async function carregar() {
  carregando.value = true
  erro.value = ''
  pokemon.value = null
  especie.value = null
  evolucao.value = []
  try {
    const nome = route.params.nome
    const [pokemonDados, especieDados] = await Promise.all([buscarPokemon(nome), buscarEspecie(nome)])
    pokemon.value = pokemonDados
    especie.value = especieDados
    if (especieDados.evolution_chain?.url) {
      const cadeia = await buscarCadeiaEvolutiva(especieDados.evolution_chain.url)
      const nomes = extrairNomesEvolucao(cadeia.chain)
      const resultados = await Promise.allSettled(nomes.map((item) => buscarPokemon(item.nome)))
      evolucao.value = resultados.filter((item) => item.status === 'fulfilled').map((item) => item.value)
    }
  } catch (e) {
    erro.value = e?.status === 404 ? 'Pokémon não encontrado na PokéAPI.' : 'A PokéAPI não respondeu como esperado.'
  } finally { carregando.value = false }
}

watch(() => route.params.nome, carregar, { immediate:true })

function nomeStat(nome) {
  return ({ hp:'HP', attack:'Ataque', defense:'Defesa', 'special-attack':'Ataque especial', 'special-defense':'Defesa especial', speed:'Velocidade' })[nome] || nome
}
</script>

<template>
  <div class="pokemon-view container-fluid px-3 px-lg-4" :style="{ '--poke-accent': tema.corPrimaria, '--poke-accent-2': tema.corSecundaria }">
    <div class="pokemon-view__topo"><RouterLink class="pokemon-view__voltar" to="/pokedex">← Voltar para a Pokédex</RouterLink></div>

    <section v-if="carregando" class="pokemon-view__estado"><span class="spinner-border" aria-hidden="true"></span><strong>Consultando ficha completa...</strong></section>
    <section v-else-if="erro" class="pokemon-view__estado"><strong>{{ erro }}</strong><RouterLink class="btn btn-pokedex rounded-pill" to="/pokedex">Voltar para a Pokédex</RouterLink></section>

    <template v-else-if="pokemon">
      <section class="pokemon-hero rounded-4 shadow-sm">
        <div class="pokemon-hero__artwork"><img :src="artworkPokemon(pokemon)" :alt="`Artwork oficial de ${pokemon.name}`" /></div>
        <div class="pokemon-hero__conteudo">
          <span class="pokemon-hero__numero">#{{ String(pokemon.id).padStart(4,'0') }}</span>
          <h1>{{ pokemon.name }}</h1>
          <div class="d-flex flex-wrap gap-2 mb-3"><PokemonTypeBadge v-for="tipo in pokemon.types" :key="tipo.type.name" :tipo="tipo.type.name" /></div>
          <p v-if="descricao">{{ descricao }}</p>
          <div class="pokemon-hero__metricas"><div><small>Altura</small><strong>{{ (pokemon.height/10).toFixed(1).replace('.',',') }} m</strong></div><div><small>Peso</small><strong>{{ (pokemon.weight/10).toFixed(1).replace('.',',') }} kg</strong></div><div><small>Experiência base</small><strong>{{ pokemon.base_experience ?? '—' }}</strong></div><div><small>Captura base</small><strong>{{ especie?.capture_rate ?? '—' }}</strong></div></div>
        </div>
      </section>

      <div class="pokemon-view__grade row g-3 g-lg-4">
        <section class="col-12 col-lg-7">
          <div class="pokemon-painel rounded-4 shadow-sm h-100">
            <span class="sobretitulo">ESTATÍSTICAS DA POKÉAPI</span><h2>Atributos base</h2>
            <div class="pokemon-stats"><div v-for="stat in stats" :key="stat.stat.name" class="pokemon-stat"><div class="d-flex justify-content-between gap-2"><span>{{ nomeStat(stat.stat.name) }}</span><strong>{{ stat.base_stat }}</strong></div><div class="pokemon-stat__barra"><span :style="{ width:`${Math.min(100, stat.base_stat/2)}%` }"></span></div></div></div>
            <div class="pokemon-habilidades"><span class="sobretitulo">HABILIDADES</span><div class="d-flex flex-wrap gap-2 mt-2"><span v-for="habilidade in pokemon.abilities" :key="habilidade.ability.name">{{ nomeHabilidade(habilidade.ability.name) }}</span></div></div>
          </div>
        </section>
        <section class="col-12 col-lg-5">
          <div class="pokemon-painel pokemon-painel--receita rounded-4 shadow-sm h-100">
            <span class="sobretitulo">NO CARDÁPIO</span>
            <template v-if="receita"><h2>Este Pokémon já tem receita.</h2><p>{{ receita.nome }}</p><img :src="`/placeholders/receitas/${receita.imagem}.png`" :alt="`Imagem da receita ${receita.nome}`" /><RouterLink class="btn btn-mucura rounded-pill" :to="{ name:'receita', params:{ id:receita.id } }">Ver receita</RouterLink></template>
            <template v-else><h2>Ainda está seguro.</h2><p>A Mucura ainda não teve nenhuma ideia culinária preocupante para {{ pokemon.name }}.</p><RouterLink class="btn btn-outline-secondary rounded-pill" to="/receitas">Ver quem já entrou no cardápio</RouterLink></template>
          </div>
        </section>
      </div>

      <section v-if="evolucao.length > 1" class="pokemon-evolucao rounded-4 shadow-sm">
        <span class="sobretitulo">CADEIA EVOLUTIVA</span><h2>Evoluções</h2><PokemonEvolucao :pokemons="evolucao" />
      </section>
    </template>
  </div>
</template>

<style scoped>
.pokemon-view {
  width: min(1260px,100%);
  margin: 0 auto;
  padding-top: 74px;
  padding-bottom: 70px;
}

.pokemon-view__topo {
  margin-bottom: 12px;
}

.pokemon-view__voltar {
  color: #123c2c;
  font-size: 11.5px;
  font-weight: 900;
  text-decoration: none;
}

.pokemon-view__estado {
  display: flex;
  min-height: 460px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  color: #123c2c;
}

.pokemon-hero {
  display: grid;
  grid-template-columns: minmax(320px,42%) 1fr;
  overflow: hidden;
  background: #fffdf8;
  border: 1px solid #ddd4c6;
  border-top: 7px solid var(--poke-accent);
}

.pokemon-hero__artwork {
  display: grid;
  min-height: 390px;
  place-items: center;
  background: linear-gradient(145deg,color-mix(in srgb,var(--poke-accent) 18%,white),#fffdf8);
}

.pokemon-hero__artwork img {
  width: min(360px,88%);
  height: 340px;
  object-fit: contain;
  filter: drop-shadow(0 18px 16px rgba(0,0,0,.12));
}

.pokemon-hero__conteudo {
  padding: 38px 38px 30px;
}

.pokemon-hero__numero {
  color: var(--poke-accent);
  font-size: 12.5px;
  font-weight: 900;
}

.pokemon-hero h1 {
  margin: 4px 0 11px;
  color: #292a24;
  font: 800 clamp(38px,5vw,66px)/.95 Georgia,'Times New Roman',serif;
  text-transform: capitalize;
}

.pokemon-hero p {
  max-width: 650px;
  color: #656159;
  font-size: 13px;
  line-height: 1.7;
}

.pokemon-hero__metricas {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 7px;
  margin-top: 22px;
}

.pokemon-hero__metricas div {
  padding: 11px 8px;
  background: #f4eee4;
  border-radius: 12px;
  text-align: center;
}

.pokemon-hero__metricas small,.pokemon-hero__metricas strong {
  display: block;
}

.pokemon-hero__metricas small {
  color: #837c70;
  font-size: 9.5px;
  font-weight: 800;
  text-transform: uppercase;
}

.pokemon-hero__metricas strong {
  margin-top: 3px;
  color: #292a24;
  font-size: 14px;
}

.pokemon-view__grade {
  margin-top: 22px;
}

.pokemon-painel,.pokemon-evolucao {
  padding: 24px;
  background: #fffdf8;
  border: 1px solid #e0d7c9;
}

.pokemon-painel h2,.pokemon-evolucao h2 {
  margin: 4px 0 16px;
  color: #292a24;
  font: 800 28px/1 Georgia,'Times New Roman',serif;
}

.pokemon-stats {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.pokemon-stat {
  color: #56534d;
  font-size: 12px;
}

.pokemon-stat__barra {
  height: 7px;
  margin-top: 4px;
  overflow: hidden;
  background: #ece6dc;
  border-radius: 999px;
}

.pokemon-stat__barra span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg,var(--poke-accent),var(--poke-accent-2));
  border-radius: inherit;
}

.pokemon-habilidades {
  margin-top: 20px;
}

.pokemon-habilidades>div>span {
  padding: 6px 9px;
  color: #123c2c;
  background: #f1ece3;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  text-transform: capitalize;
}

.pokemon-painel--receita {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.pokemon-painel--receita p {
  color: #666159;
  font-size: 12.5px;
  line-height: 1.55;
}

.pokemon-painel--receita img {
  width: 100%;
  max-height: 190px;
  margin: 4px 0 14px;
  object-fit: cover;
  border-radius: 14px;
}

.pokemon-painel--receita .btn {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  align-self: center;
  padding: 0 20px;
  font-size: 11.5px;
  font-weight: 900;
  line-height: 1;
  text-align: center;
}

.btn-mucura {
  color: #fff;
  background: #c94c08;
  border-color: #c94c08;
}

.btn-pokedex {
  color: #fff;
  background: #c62828;
  border-color: #c62828;
}

.pokemon-evolucao {
  margin-top: 22px;
}

@media (max-width:767.98px) {
  .pokemon-view {
    padding-top: 56px;
  }

  .pokemon-hero {
    grid-template-columns: 1fr;
  }

  .pokemon-hero__artwork {
    min-height: 280px;
  }

  .pokemon-hero__artwork img {
    height: 250px;
  }

  .pokemon-hero__conteudo {
    padding: 24px 20px;
  }

  .pokemon-hero__metricas {
    grid-template-columns: repeat(2,1fr);
  }

  .pokemon-painel,.pokemon-evolucao {
    padding: 18px;
  }
}
</style>
