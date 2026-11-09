<script setup>
import { RouterLink } from 'vue-router'
import PokemonTypeBadge from './PokemonTypeBadge.vue'
import { artworkPokemon } from '../services/pokeapi.js'
defineProps({ pokemons: Array })
</script>

<template>
  <div class="evolucao d-flex flex-wrap align-items-center gap-2 gap-md-3">
    <template v-for="(pokemon, indice) in pokemons" :key="pokemon.name">
      <span v-if="indice" class="evolucao__seta" aria-hidden="true">→</span>
      <RouterLink class="evolucao__item" :to="{ name: 'pokemon', params: { nome: pokemon.name } }">
        <img :src="artworkPokemon(pokemon)" :alt="pokemon.name" />
        <strong>{{ pokemon.name }}</strong>
        <div class="d-flex gap-1 justify-content-center"><PokemonTypeBadge v-for="tipo in pokemon.types" :key="tipo.type.name" :tipo="tipo.type.name" /></div>
      </RouterLink>
    </template>
  </div>
</template>

<style scoped>
.evolucao__seta {
  color: #b0a89b;
  font-size: 20px;
  font-weight: 900;
}

.evolucao__item {
  display: flex;
  width: 132px;
  min-height: 160px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 8px;
  color: #292a24;
  text-decoration: none;
  background: #fffdf8;
  border: 1px solid #e0d7c8;
  border-radius: 16px;
}

.evolucao__item img {
  width: 92px;
  height: 92px;
  object-fit: contain;
}

.evolucao__item strong {
  margin: 3px 0 7px;
  font-size: 11px;
  text-transform: capitalize;
}
</style>
