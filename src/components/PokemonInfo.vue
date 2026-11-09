<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import PokemonTypeBadge from './PokemonTypeBadge.vue'
import { artworkPokemon, nomeHabilidade } from '../services/pokeapi.js'
import { estiloTipos } from '../utils/pokemonTheme.js'

const props = defineProps({ pokemon: Object, carregando: Boolean, erro: String, receita: Object })
const tema = computed(() => estiloTipos(props.pokemon))
const artwork = computed(() => artworkPokemon(props.pokemon))
const numero = computed(() => props.pokemon ? `#${String(props.pokemon.id).padStart(4,'0')}` : '')
const habilidades = computed(() => props.pokemon?.abilities?.map((item) => nomeHabilidade(item.ability.name)) || [])
</script>

<template>
  <aside class="pokemon-info" :style="{ '--poke-accent': tema.corPrimaria, '--poke-accent-2': tema.corSecundaria }">
    <div class="pokemon-info__cabeca">
      <div>
        <span class="pokemon-info__eyebrow">Ingrediente principal</span>
      </div>
      <span v-if="pokemon" class="pokemon-info__numero">{{ numero }}</span>
    </div>

    <div v-if="carregando" class="pokemon-info__estado">
      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <strong>Consultando a Pokédex...</strong>
      <small>Os dados externos estão sendo carregados.</small>
    </div>

    <div v-else-if="erro" class="pokemon-info__estado pokemon-info__estado--erro">
      <strong>A Mucura perdeu a conexão com a Pokédex.</strong>
      <small>{{ erro }}</small>
    </div>

    <template v-else-if="pokemon">
      <RouterLink class="pokemon-info__artwork" :to="{ name: 'pokemon', params: { nome: pokemon.name } }">
        <img v-if="artwork" :src="artwork" :alt="`Artwork oficial de ${pokemon.name}`" />
      </RouterLink>
      <div class="pokemon-info__nome">
        <strong>{{ pokemon.name }}</strong>
        <span>{{ receita?.nome }}</span>
      </div>
      <div class="d-flex flex-wrap justify-content-center gap-2 mb-3">
        <PokemonTypeBadge v-for="tipo in pokemon.types" :key="tipo.type.name" :tipo="tipo.type.name" />
      </div>
      <div class="pokemon-info__metricas">
        <div><small>Altura</small><strong>{{ (pokemon.height / 10).toFixed(1).replace('.', ',') }} m</strong></div>
        <div><small>Peso</small><strong>{{ (pokemon.weight / 10).toFixed(1).replace('.', ',') }} kg</strong></div>
        <div><small>Experiência</small><strong>{{ pokemon.base_experience ?? '—' }}</strong></div>
      </div>
      <div class="pokemon-info__habilidades">
        <small>Habilidades</small>
        <div class="d-flex flex-wrap gap-1 mt-1">
          <span v-for="habilidade in habilidades" :key="habilidade">{{ habilidade }}</span>
        </div>
      </div>
      <RouterLink class="pokemon-info__link" :to="{ name: 'pokemon', params: { nome: pokemon.name } }">Abrir ficha completa na Pokédex →</RouterLink>
    </template>
  </aside>
</template>

<style scoped>
.pokemon-info {
  position: relative;
  overflow: hidden;
  padding: 18px;
  background: #fffdf8;
  border: 1px solid #ded5c7;
  border-top: 5px solid var(--poke-accent);
  border-radius: 18px;
  box-shadow: 0 9px 20px rgba(52,39,23,.08);
}

.pokemon-info::after {
  content: '';
  position: absolute;
  right: -45px;
  top: -45px;
  width: 140px;
  height: 140px;
  background: radial-gradient(circle,var(--poke-accent) 0 2px,transparent 3px);
  background-size: 16px 16px;
  opacity: .08;
  pointer-events: none;
}

.pokemon-info__cabeca {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.pokemon-info__eyebrow {
  display: block;
  color: var(--poke-accent);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.pokemon-info__numero {
  color: #8b867d;
  font-size: 13px;
  font-weight: 900;
}

.pokemon-info__estado {
  display: flex;
  min-height: 260px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  color: #123c2c;
  text-align: center;
}

.pokemon-info__estado small {
  max-width: 260px;
  color: #77736c;
}

.pokemon-info__estado--erro {
  color: #a83b34;
}

.pokemon-info__artwork {
  display: grid;
  width: min(250px,78%);
  aspect-ratio: 1;
  margin: 10px auto 0;
  place-items: center;
  border-radius: 50%;
  background: radial-gradient(circle,rgba(255,255,255,.96) 0 48%,color-mix(in srgb,var(--poke-accent) 13%,white) 49% 70%,transparent 71%);
}

.pokemon-info__artwork img {
  width: 92%;
  height: 92%;
  object-fit: contain;
  filter: drop-shadow(0 12px 12px rgba(0,0,0,.12));
}

.pokemon-info__nome {
  text-align: center;
}

.pokemon-info__nome strong {
  display: block;
  color: #292a24;
  font: 800 27px/1 Georgia,'Times New Roman',serif;
  text-transform: capitalize;
}

.pokemon-info__nome span {
  display: block;
  margin: 5px 0 9px;
  color: #77736c;
  font-size: 10.5px;
}

.pokemon-info__metricas {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 6px;
  margin-top: 8px;
}

.pokemon-info__metricas div {
  padding: 9px 6px;
  text-align: center;
  background: #f4eee4;
  border-radius: 12px;
}

.pokemon-info__metricas small,.pokemon-info__habilidades small {
  display: block;
  color: #817b70;
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: .5px;
  text-transform: uppercase;
}

.pokemon-info__metricas strong {
  display: block;
  margin-top: 3px;
  color: #292a24;
  font-size: 13.5px;
}

.pokemon-info__habilidades {
  margin-top: 12px;
}

.pokemon-info__habilidades span {
  padding: 5px 8px;
  color: #123c2c;
  background: color-mix(in srgb,var(--poke-accent) 10%,white);
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 800;
  text-transform: capitalize;
}

.pokemon-info__link {
  display: block;
  margin-top: 14px;
  color: var(--poke-accent);
  font-size: 11.5px;
  font-weight: 900;
  text-decoration: none;
  text-align: right;
}
</style>
