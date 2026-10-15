<script setup>
import { ref } from 'vue'

const props = defineProps({
  valorInicial: String,
})

const emit = defineEmits(['buscar'])
const texto = ref(props.valorInicial || '')

function buscar(evento) {
  emit('buscar', evento.target.value)
}

function limpar() {
  texto.value = ''
  emit('buscar', '')
}
</script>

<template>
  <form class="busca" role="search" @submit.prevent>
    <label class="sr-only" for="busca-receitas">Buscar por receita ou ingrediente</label>

    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </svg>

    <input
      id="busca-receitas"
      v-model="texto"
      type="search"
      placeholder="Busque uma receita... (ex.: tacacá, maniçoba, cupuaçu)"
      autocomplete="off"
      @input="buscar"
    />

    <button
      v-if="texto"
      type="button"
      class="busca__limpar"
      aria-label="Limpar busca"
      @click="limpar"
    >
      ×
    </button>
  </form>
</template>

<style scoped>
.busca {
  position: relative;
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  min-height: 58px;
  background: #fff;
  border: 1px solid #d8d0c0;
  border-radius: 17px;
  box-shadow: 0 8px 20px rgba(73, 49, 24, 0.11);
}

.busca:focus-within {
  outline: 3px solid rgba(36, 75, 56, 0.18);
  border-color: var(--verde);
}

.busca svg {
  width: 24px;
  height: 24px;
  margin-left: 18px;
  flex-shrink: 0;
  fill: none;
  stroke: var(--verde);
  stroke-width: 2;
}

.busca input {
  width: 100%;
  min-width: 0;
  min-height: 56px;
  padding: 14px 48px 14px 14px;
  color: #4a4b43;
  background: transparent;
  border: 0;
  outline: none;
  font: inherit;
  font-size: 14px;
}

.busca input::placeholder {
  color: #77766e;
  opacity: 1;
}

.busca input::-webkit-search-cancel-button {
  display: none;
}

.busca__limpar {
  position: absolute;
  right: 6px;
  width: 44px;
  height: 44px;
  color: #666;
  background: transparent;
  border: 0;
  font-size: 26px;
  cursor: pointer;
}
</style>
