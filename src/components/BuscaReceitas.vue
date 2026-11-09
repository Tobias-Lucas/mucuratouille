<script setup>
import { ref, watch } from 'vue'
const props = defineProps({ valorInicial: String, placeholder: { type: String, default: 'Busque uma receita...' } })
const emit = defineEmits(['buscar'])
const texto = ref(props.valorInicial || '')
watch(() => props.valorInicial, (valor) => { if ((valor || '') !== texto.value) texto.value = valor || '' })
watch(texto, (valor) => emit('buscar', valor))
</script>

<template>
  <div class="busca flex-grow-1">
    <span class="busca__icone" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg></span>
    <input v-model="texto" class="form-control busca__campo" type="search" :placeholder="placeholder" aria-label="Buscar receitas" />
  </div>
</template>

<style scoped>
.busca {
  position: relative;
}

.busca__icone {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 18px;
  display: grid;
  width: 20px;
  height: 20px;
  place-items: center;
  color: #123c2c;
  transform: translateY(-50%);
}

.busca__icone svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
}

.busca__campo {
  min-height: 52px;
  padding: 10px 18px 10px 52px;
  color: #292a24;
  background: #fffdf8;
  border: 1px solid #d9d0c1;
  border-radius: 18px;
  font-size: 12px;
  box-shadow: 0 8px 20px rgba(50,38,24,.08);
}

.busca__campo:focus {
  border-color: #4f87c7;
  box-shadow: 0 0 0 .2rem rgba(79,135,199,.12);
}

@media (max-width:575.98px) {
  .busca__campo {
    min-height: 46px;
    font-size: 10px;
    border-radius: 15px;
  }
}
</style>
