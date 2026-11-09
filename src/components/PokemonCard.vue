<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import PokemonTypeBadge from './PokemonTypeBadge.vue'
import { artworkPokemon } from '../services/pokeapi.js'
import { estiloTipos } from '../utils/pokemonTheme.js'

defineEmits(['ver-receita'])
const props = defineProps({ pokemon: Object, receita: Object })
const tema = computed(() => estiloTipos(props.pokemon))
const artwork = computed(() => artworkPokemon(props.pokemon))
</script>

<template>
  <article class="pokemon-card card h-100 border-0 shadow-sm" :style="{ '--poke-accent': tema.corPrimaria }">
    <RouterLink class="pokemon-card__artwork" :to="{ name: 'pokemon', params: { nome: pokemon.name } }">
      <span class="pokemon-card__numero">#{{ String(pokemon.id).padStart(4,'0') }}</span>
      <img v-if="artwork" :src="artwork" :alt="`Artwork de ${pokemon.name}`" loading="lazy" />
    </RouterLink>
    <div class="card-body p-3 d-flex flex-column">
      <h2><RouterLink :to="{ name: 'pokemon', params: { nome: pokemon.name } }">{{ pokemon.name }}</RouterLink></h2>
      <div class="d-flex flex-wrap gap-1 mb-2"><PokemonTypeBadge v-for="tipo in pokemon.types" :key="tipo.type.name" :tipo="tipo.type.name" /></div>
      <div v-if="receita" class="pokemon-card__receita mt-auto">
        <span>RECEITA DISPONÍVEL</span>
        <RouterLink :to="{ name: 'receita', params: { id: receita.id } }">{{ receita.nome }}</RouterLink>
      </div>
      <div v-else class="pokemon-card__seguro mt-auto"><span>Ainda está seguro.</span><small>Por enquanto.</small></div>
    </div>
  </article>
</template>

<style scoped>
.pokemon-card {
  overflow: hidden;
  background: #fffdf8;
  border-radius: 18px !important;
  transition: transform .18s ease,box-shadow .18s ease;
}

.pokemon-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 28px rgba(44,33,22,.13) !important;
}

.pokemon-card__artwork {
  position: relative;
  display: grid;
  height: 180px;
  place-items: center;
  background: linear-gradient(145deg,color-mix(in srgb,var(--poke-accent) 14%,white),#fffdf8 70%);
  border-bottom: 4px solid var(--poke-accent);
}

.pokemon-card__artwork img {
  width: 145px;
  height: 145px;
  object-fit: contain;
  filter: drop-shadow(0 10px 10px rgba(0,0,0,.1));
  transition: transform .2s ease;
}

.pokemon-card:hover img {
  transform: scale(1.05);
}

.pokemon-card__numero {
  position: absolute;
  top: 10px;
  left: 12px;
  color: color-mix(in srgb,var(--poke-accent) 75%,#1b1b1b);
  font-size: 9px;
  font-weight: 900;
}

.pokemon-card h2 {
  margin: 0 0 8px;
  font: 800 18px/1.05 Georgia,'Times New Roman',serif;
  text-transform: capitalize;
}

.pokemon-card h2 a {
  color: #292a24;
  text-decoration: none;
}

.pokemon-card__receita {
  padding: 9px;
  background: #f6eee1;
  border-radius: 12px;
}

.pokemon-card__receita span {
  display: block;
  color: #c94c08;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: .6px;
}

.pokemon-card__receita a {
  display: block;
  margin-top: 3px;
  color: #292a24;
  font-size: 9px;
  font-weight: 800;
  text-decoration: none;
}

.pokemon-card__seguro {
  padding: 9px;
  color: #6f6b63;
  background: #f4f0e9;
  border-radius: 12px;
}

.pokemon-card__seguro span,.pokemon-card__seguro small {
  display: block;
}

.pokemon-card__seguro span {
  font-size: 9px;
  font-weight: 800;
}

.pokemon-card__seguro small {
  margin-top: 2px;
  font-size: 8px;
}

@media (max-width:575.98px) {
  .pokemon-card__artwork {
    height: 142px;
  }

  .pokemon-card__artwork img {
    width: 110px;
    height: 110px;
  }

  .pokemon-card h2 {
    font-size: 15px;
  }
}
</style>
