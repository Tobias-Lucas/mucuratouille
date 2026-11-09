<script setup>
import { computed } from 'vue'
import { corTipo, nomeTipo } from '../utils/pokemonTheme.js'
const props = defineProps({ tipo: String })
const estilo = computed(() => ({ backgroundColor: corTipo(props.tipo) }))
</script>

<template>
  <span class="pokemon-type-badge badge rounded-pill" :style="estilo">{{ nomeTipo(tipo) }}</span>
</template>

<style scoped>
.pokemon-type-badge {
  padding: 7px 10px;
  color: #fff;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .35px;
  text-transform: uppercase;
  box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
}
</style>
