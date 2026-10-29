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
  <form class="busca input-group shadow-sm" role="search" @submit.prevent>
    <label class="visually-hidden" for="busca-receitas">Buscar por receita ou ingrediente</label>

    <span class="input-group-text busca__icone" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </svg>
    </span>

    <input
      id="busca-receitas"
      v-model="texto"
      class="form-control busca__campo"
      type="search"
      placeholder="Busque uma receita... (ex.: tacacá, maniçoba, cupuaçu)"
      autocomplete="off"
      @input="buscar"
    />

    <button
      v-if="texto"
      type="button"
      class="btn btn-light busca__limpar"
      aria-label="Limpar busca"
      @click="limpar"
    >
      ×
    </button>
  </form>
</template>

<style scoped>
.busca {
  min-width: 0;
  min-height: 58px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #d8d0c0;
  border-radius: 18px;
  box-shadow: 0 10px 24px rgba(73, 49, 24, 0.14) !important;
}

.busca:focus-within {
  border-color: var(--verde);
  box-shadow: 0 0 0 3px rgba(36, 75, 56, 0.15), 0 10px 24px rgba(73, 49, 24, 0.14) !important;
}

.busca__icone {
  padding-left: 18px;
  padding-right: 8px;
  color: var(--verde);
  background: #fff;
  border: 0;
}

.busca__icone svg {
  width: 23px;
  height: 23px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}

.busca__campo {
  min-width: 0;
  min-height: 56px;
  padding: 14px 12px;
  color: #4a4b43;
  background: #fff;
  border: 0;
  font-size: 14px;
}

.busca__campo:focus {
  box-shadow: none;
}

.busca__campo::placeholder {
  color: #77766e;
  opacity: 1;
}

.busca__campo::-webkit-search-cancel-button {
  display: none;
}

.busca__limpar {
  width: 48px;
  color: #666;
  background: #fff;
  border: 0;
  font-size: 24px;
}

@media (max-width: 575.98px) {
  .busca {
    min-height: 50px;
    border-radius: 16px;
  }

  .busca__icone {
    padding-left: 15px;
    padding-right: 6px;
  }

  .busca__icone svg {
    width: 20px;
    height: 20px;
  }

  .busca__campo {
    min-height: 48px;
    padding: 11px 8px;
    font-size: 12px;
  }

  .busca__limpar {
    width: 42px;
    font-size: 21px;
  }
}

</style>
