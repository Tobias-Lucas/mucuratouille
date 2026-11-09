<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { buscarPokemon } from '../services/pokeapi.js'
import PokemonTypeBadge from './PokemonTypeBadge.vue'
import { estiloTipos } from '../utils/pokemonTheme.js'

const props = defineProps({ receita: Object, favorita: Boolean, selecionada: Boolean, pokemonDados: Object })
const emit = defineEmits(['favoritar'])
const pokemonLocal = ref(props.pokemonDados || null)
const tema = computed(() => estiloTipos(pokemonLocal.value))

onMounted(async () => {
  if (!pokemonLocal.value && props.receita?.pokemon) {
    try { pokemonLocal.value = await buscarPokemon(props.receita.pokemon) } catch { /* fallback visual local */ }
  }
})
</script>

<template>
  <article class="card card-receita h-100 border-0 shadow-sm" :class="{ 'card-receita--selecionada': selecionada }" :style="{ '--poke-accent': tema.corPrimaria }">
    <div class="card-receita__visual">
      <RouterLink :to="{ name: 'receita', params: { id: receita.id } }" class="card-receita__imagem-link" tabindex="-1" aria-hidden="true">
        <img :src="`/placeholders/receitas/${receita.imagem}.png`" alt="" width="1200" height="675" loading="lazy" />
      </RouterLink>
      <div class="card-receita__tipo-linha" aria-hidden="true"></div>
      <span class="badge rounded-pill card-receita__selo">{{ receita.categoria === 'principais' ? 'Prato principal' : receita.categoria === 'lanches' ? 'Lanche / petisco' : receita.categoria === 'massas' ? 'Massa / risoto' : receita.categoria === 'cafe' ? 'Café da manhã' : receita.categoria === 'sobremesas' ? 'Sobremesa' : 'Especial da Mucura' }}</span>
      <button class="btn btn-light rounded-circle shadow-sm card-receita__coracao" :class="{ 'card-receita__coracao--ativo': favorita }" type="button" :aria-pressed="favorita" @click="emit('favoritar', receita)">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5 4.1 13C-.5 8.7 2 3.5 6.4 3.5c2.4 0 4.1 1.5 5.6 3.2 1.5-1.7 3.2-3.2 5.6-3.2 4.4 0 6.9 5.2 2.3 9.5L12 20.5Z" /></svg>
      </button>
    </div>

    <div class="card-body d-flex flex-column p-3">
      <div class="d-flex align-items-start justify-content-between gap-2 mb-1">
        <h2 class="card-title mb-0"><RouterLink :to="{ name: 'receita', params: { id: receita.id } }">{{ receita.nome }}</RouterLink></h2>
        <span class="card-receita__pokemon">{{ receita.pokemon }}</span>
      </div>
      <div v-if="pokemonLocal" class="d-flex flex-wrap gap-1 mb-2"><PokemonTypeBadge v-for="tipo in pokemonLocal.types" :key="tipo.type.name" :tipo="tipo.type.name" /></div>
      <div class="card-receita__meta d-flex flex-wrap gap-2 mt-auto">
        <span>{{ receita.tempo }}</span><span>{{ receita.porcoes }} porções</span><span>{{ receita.dificuldade }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card-receita {
  min-width: 0;
  overflow: hidden;
  background: #fffdf8;
  border-radius: 18px !important;
  transition: transform .2s ease,box-shadow .2s ease;
}

.card-receita:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 26px rgba(50,38,24,.13) !important;
}

.card-receita--selecionada {
  outline: 2px solid var(--poke-accent);
  outline-offset: -2px;
}

.card-receita__visual {
  position: relative;
  height: 164px;
  overflow: hidden;
  background: #e4ddd2;
}

.card-receita__imagem-link {
  display: block;
  height: 100%;
}

.card-receita__visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .25s ease;
}

.card-receita:hover .card-receita__visual img {
  transform: scale(1.035);
}

.card-receita__tipo-linha {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 5px;
  background: var(--poke-accent);
}

.card-receita__selo {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 7px 10px;
  color: #fff;
  background: #123c2c;
  font-size: 8px;
  font-weight: 900;
}

.card-receita__coracao {
  position: absolute;
  top: 8px;
  right: 8px;
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  padding: 0;
  color: #365142;
  border: 0;
}

.card-receita__coracao svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
}

.card-receita__coracao--ativo {
  color: #ef2637;
}

.card-receita__coracao--ativo svg {
  fill: currentColor;
}

.card-receita h2 {
  font: 800 16px/1.15 Arial,Helvetica,sans-serif;
}

.card-receita h2 a {
  color: #292a24;
  text-decoration: none;
}

.card-receita h2 a:hover {
  color: #c94c08;
}

.card-receita__pokemon {
  flex: 0 0 auto;
  padding: 4px 7px;
  color: #817b71;
  background: #f1ece4;
  border-radius: 999px;
  font-size: 7px;
  font-weight: 900;
  text-transform: uppercase;
}

.card-receita__meta {
  color: #69665f;
  font-size: 8px;
}

.card-receita__meta span {
  padding: 4px 6px;
  background: #f4eee4;
  border-radius: 999px;
  white-space: nowrap;
}

@media (max-width:575.98px) {
  .card-receita__visual {
    height: 118px;
  }

  .card-receita .card-body {
    padding: 9px !important;
  }

  .card-receita h2 {
    display: -webkit-box;
    min-height: 30px;
    overflow: hidden;
    font-size: 12px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .card-receita__pokemon {
    font-size: 6px;
  }

  .card-receita__meta {
    font-size: 7px;
    gap: 4px !important;
  }
}
</style>
