<script setup>
import { ref } from 'vue'

defineProps({ selecionada: String, somenteFavoritos: Boolean })
const emit = defineEmits(['selecionar'])
const aberto = ref(false)

const categorias = [
  { id: 'todas', nome: 'Todas' },
  { id: 'principais', nome: 'Pratos principais' },
  { id: 'lanches', nome: 'Lanches e petiscos' },
  { id: 'massas', nome: 'Massas e risotos' },
  { id: 'cafe', nome: 'Café da manhã' },
  { id: 'sobremesas', nome: 'Sobremesas' },
  { id: 'especial', nome: 'Especial da Mucura' },
]

function selecionar(id) {
  emit('selecionar', id)
  aberto.value = false
}

function nomeSelecionado(valor, favoritos) {
  if (favoritos) return 'Favoritos'
  return categorias.find((item) => item.id === valor)?.nome || 'Todas'
}
</script>

<template>
  <div class="filtros-categoria">
    <button class="filtros-categoria__toggle btn d-md-none w-100 rounded-4" type="button" :aria-expanded="aberto" @click="aberto = !aberto">
      <span><small>Categoria</small><strong>{{ nomeSelecionado(selecionada, somenteFavoritos) }}</strong></span>
      <span aria-hidden="true">⌄</span>
    </button>
    <div v-show="aberto" class="filtros-categoria__mobile d-md-none">
      <button v-for="item in categorias" :key="item.id" class="btn filtros-categoria__botao rounded-pill" :class="{ ativo: selecionada === item.id && !somenteFavoritos }" type="button" @click="selecionar(item.id)">{{ item.nome }}</button>
    </div>
    <div class="d-none d-md-flex flex-wrap gap-2">
      <button v-for="item in categorias" :key="item.id" class="btn filtros-categoria__botao rounded-pill" :class="{ ativo: selecionada === item.id && !somenteFavoritos }" type="button" @click="selecionar(item.id)">{{ item.nome }}</button>
    </div>
  </div>
</template>

<style scoped>
.filtros-categoria {
  min-width: 0;
  flex: 1;
}

.filtros-categoria__toggle {
  display: flex;
  min-height: 52px;
  align-items: center;
  justify-content: space-between;
  padding: 9px 14px;
  color: #123c2c;
  background: #fffdf8;
  border: 1px solid #d9d0c1;
  text-align: left;
}

.filtros-categoria__toggle small,.filtros-categoria__toggle strong {
  display: block;
}

.filtros-categoria__toggle small {
  color: #807b70;
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: .8px;
}

.filtros-categoria__toggle strong {
  font-size: 12px;
}

.filtros-categoria__mobile {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 8px;
  padding: 10px;
  background: #fffdf8;
  border: 1px solid #e4d9c8;
  border-radius: 16px;
}

.filtros-categoria__botao {
  min-height: 42px;
  padding: 8px 15px;
  color: #123c2c;
  background: #fffdf8;
  border: 1px solid #d9d0c1;
  font-size: 10px;
  font-weight: 800;
}

.filtros-categoria__botao:hover {
  border-color: #c94c08;
  color: #c94c08;
}

.filtros-categoria__botao.ativo {
  color: #fff;
  background: #c94c08;
  border-color: #c94c08;
}
</style>
