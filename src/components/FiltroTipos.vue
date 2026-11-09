<script setup>
import { nomesTipo } from '../utils/pokemonTheme.js'

defineProps({ selecionado: String, desabilitado: Boolean })
const emit = defineEmits(['selecionar'])
const tipos = ['todos','normal','fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy']
</script>

<template>
  <label class="filtro-tipo">
    <span>Tipo Pokémon</span>
    <select class="form-select rounded-pill" :value="selecionado" :disabled="desabilitado" @change="emit('selecionar', $event.target.value)">
      <option v-for="tipo in tipos" :key="tipo" :value="tipo">{{ tipo === 'todos' ? 'Todos os tipos' : nomesTipo[tipo] }}</option>
    </select>
  </label>
</template>

<style scoped>
.filtro-tipo {
  display: flex;
  min-width: 190px;
  flex-direction: column;
  gap: 4px;
}

.filtro-tipo span {
  color: #77736b;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .7px;
  text-transform: uppercase;
}

.filtro-tipo select {
  min-height: 42px;
  padding-left: 14px;
  color: #123c2c;
  background-color: #fffdf8;
  border: 1px solid #d9d0c1;
  font-size: 10px;
  font-weight: 800;
}

.filtro-tipo select:focus {
  border-color: #4f87c7;
  box-shadow: 0 0 0 .2rem rgba(79,135,199,.12);
}

@media (max-width:575.98px) {
  .filtro-tipo {
    width: 100%;
    min-width: 0;
  }
}
</style>
