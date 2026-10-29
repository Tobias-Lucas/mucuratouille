<script setup>
import { ref } from 'vue'

defineProps({
  selecionada: String,
  somenteFavoritos: Boolean,
})

const emit = defineEmits(['selecionar'])
const aberto = ref(false)

const categorias = [
  { id: 'todas', nome: 'Todas', icone: 'grade' },
  { id: 'cirio', nome: 'Especial Círio', icone: 'igreja' },
  { id: 'classicos', nome: 'Clássicos da terrinha', icone: 'peixe' },
  { id: 'casa', nome: 'Comida de casa', icone: 'panela' },
  { id: 'doces', nome: 'Doces e sobremesas', icone: 'cupcake' },
]

function selecionar(id) {
  emit('selecionar', id)
  aberto.value = false
}

function nomeSelecionado(selecionada, somenteFavoritos) {
  if (somenteFavoritos) return 'Favoritos'
  const item = categorias.find((categoria) => categoria.id === selecionada)
  return item ? item.nome : 'Categorias'
}
</script>

<template>
  <div class="filtros">
    <button
      type="button"
      class="btn filtros__toggle d-md-none w-100 rounded-4 shadow-sm d-flex align-items-center justify-content-between"
      :aria-expanded="aberto"
      @click="aberto = !aberto"
    >
      <span class="d-inline-flex align-items-center gap-2">
        <span class="filtros__toggle-icone" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <rect x="4" y="5" width="16" height="2.2" rx="1.1" />
            <rect x="4" y="10.9" width="16" height="2.2" rx="1.1" />
            <rect x="4" y="16.8" width="16" height="2.2" rx="1.1" />
          </svg>
        </span>
        <span>
          <small>Categorias</small>
          <strong>{{ nomeSelecionado(selecionada, somenteFavoritos) }}</strong>
        </span>
      </span>
      <svg class="filtros__seta" :class="{ 'filtros__seta--aberta': aberto }" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m7 9 5 5 5-5" />
      </svg>
    </button>

    <div
      v-show="aberto"
      class="filtros__lista-mobile d-md-none mt-2 p-2 rounded-4 shadow-sm"
      role="group"
      aria-label="Filtrar receitas por categoria"
    >
      <button
        v-for="item in categorias"
        :key="`mobile-${item.id}`"
        type="button"
        class="btn filtros__botao rounded-pill d-inline-flex align-items-center gap-2 shadow-sm"
        :class="{ 'filtros__ativo': selecionada === item.id && !somenteFavoritos }"
        :aria-pressed="selecionada === item.id && !somenteFavoritos"
        @click="selecionar(item.id)"
      >
        <span class="filtros__icone" aria-hidden="true">
          <svg v-if="item.icone === 'grade'" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="5" height="5" rx="1" fill="currentColor"/>
            <rect x="10" y="3" width="5" height="5" rx="1" fill="currentColor"/>
            <rect x="17" y="3" width="4" height="5" rx="1" fill="currentColor"/>
            <rect x="3" y="10" width="5" height="5" rx="1" fill="currentColor"/>
            <rect x="10" y="10" width="5" height="5" rx="1" fill="currentColor"/>
            <rect x="17" y="10" width="4" height="5" rx="1" fill="currentColor"/>
            <rect x="3" y="17" width="5" height="4" rx="1" fill="currentColor"/>
            <rect x="10" y="17" width="5" height="4" rx="1" fill="currentColor"/>
            <rect x="17" y="17" width="4" height="4" rx="1" fill="currentColor"/>
          </svg>

          <svg v-else-if="item.icone === 'igreja'" viewBox="0 0 24 24" fill="none">
            <path d="M12 2 14 4.5H13v4h3l4 3.5V22H4v-10l4-3.5h3v-4H10L12 2Z" fill="currentColor"/>
            <path d="M10 14h4v8h-4z" fill="#fff" opacity="0.35"/>
            <path d="M6 12h3v3H6zm9 0h3v3h-3z" fill="#fff" opacity="0.35"/>
          </svg>

          <svg v-else-if="item.icone === 'peixe'" viewBox="0 0 24 24" fill="none">
            <path d="M3 12c3.6-4.6 8.2-6.9 13.7-6.8 1.1 1.7 1.7 3.2 1.9 4.5H22l-2.1 2.3L22 14.3h-3.4c-.2 1.4-.8 2.9-1.9 4.5C11.2 18.9 6.6 16.6 3 12Z" fill="currentColor"/>
            <circle cx="14.2" cy="10.1" r="1" fill="#fff" opacity="0.7"/>
          </svg>

          <svg v-else-if="item.icone === 'panela'" viewBox="0 0 24 24" fill="none">
            <path d="M8.5 4h7v2h-7z" fill="currentColor"/>
            <path d="M9 2.5h6v1.8H9z" fill="currentColor"/>
            <path d="M4 9h16v4.2c0 4.3-3.5 7.8-7.8 7.8H11.8C7.5 21 4 17.5 4 13.2V9Z" fill="currentColor"/>
            <path d="M2.8 10.2h1.9v2.4H2.8a1.2 1.2 0 1 1 0-2.4Zm16.5 0h1.9a1.2 1.2 0 0 1 0 2.4h-1.9v-2.4Z" fill="currentColor"/>
            <path d="M8 6.5c0-1.1.7-2 1.6-2.5M12 6c0-1.3.8-2.4 1.9-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>

          <svg v-else viewBox="0 0 24 24" fill="none">
            <path d="M12 5.2c0-1.7 1.4-3.1 3.1-3.1S18.2 3.5 18.2 5.2c0 1-.5 1.8-1.2 2.4 1.9.9 3.4 2.7 4 5V14H3v-1.4c.6-2.3 2.1-4.1 4-5-.7-.6-1.2-1.5-1.2-2.4C5.8 3.5 7.2 2.1 8.9 2.1S12 3.5 12 5.2Z" fill="currentColor"/>
            <path d="M5 15h14v1.5c0 2.5-2 4.5-4.5 4.5h-5C7 21 5 19 5 16.5V15Z" fill="currentColor"/>
            <path d="M8 10.2c.8.5 1.7.8 2.6.8 1 0 1.9-.3 2.7-.8.8.5 1.7.8 2.6.8.8 0 1.6-.2 2.3-.6" stroke="#fff" opacity="0.45" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
        </span>
        {{ item.nome }}
      </button>
    </div>

    <div class="filtros__desktop d-none d-md-flex flex-wrap gap-2 gap-lg-3" role="group" aria-label="Filtrar receitas por categoria">
      <button
        v-for="item in categorias"
        :key="item.id"
        type="button"
        class="btn filtros__botao rounded-pill d-inline-flex align-items-center gap-2 shadow-sm"
        :class="{ 'filtros__ativo': selecionada === item.id && !somenteFavoritos }"
        :aria-pressed="selecionada === item.id && !somenteFavoritos"
        @click="selecionar(item.id)"
      >
        <span class="filtros__icone" aria-hidden="true">
          <svg v-if="item.icone === 'grade'" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="5" height="5" rx="1" fill="currentColor"/>
            <rect x="10" y="3" width="5" height="5" rx="1" fill="currentColor"/>
            <rect x="17" y="3" width="4" height="5" rx="1" fill="currentColor"/>
            <rect x="3" y="10" width="5" height="5" rx="1" fill="currentColor"/>
            <rect x="10" y="10" width="5" height="5" rx="1" fill="currentColor"/>
            <rect x="17" y="10" width="4" height="5" rx="1" fill="currentColor"/>
            <rect x="3" y="17" width="5" height="4" rx="1" fill="currentColor"/>
            <rect x="10" y="17" width="5" height="4" rx="1" fill="currentColor"/>
            <rect x="17" y="17" width="4" height="4" rx="1" fill="currentColor"/>
          </svg>

          <svg v-else-if="item.icone === 'igreja'" viewBox="0 0 24 24" fill="none">
            <path d="M12 2 14 4.5H13v4h3l4 3.5V22H4v-10l4-3.5h3v-4H10L12 2Z" fill="currentColor"/>
            <path d="M10 14h4v8h-4z" fill="#fff" opacity="0.35"/>
            <path d="M6 12h3v3H6zm9 0h3v3h-3z" fill="#fff" opacity="0.35"/>
          </svg>

          <svg v-else-if="item.icone === 'peixe'" viewBox="0 0 24 24" fill="none">
            <path d="M3 12c3.6-4.6 8.2-6.9 13.7-6.8 1.1 1.7 1.7 3.2 1.9 4.5H22l-2.1 2.3L22 14.3h-3.4c-.2 1.4-.8 2.9-1.9 4.5C11.2 18.9 6.6 16.6 3 12Z" fill="currentColor"/>
            <circle cx="14.2" cy="10.1" r="1" fill="#fff" opacity="0.7"/>
          </svg>

          <svg v-else-if="item.icone === 'panela'" viewBox="0 0 24 24" fill="none">
            <path d="M8.5 4h7v2h-7z" fill="currentColor"/>
            <path d="M9 2.5h6v1.8H9z" fill="currentColor"/>
            <path d="M4 9h16v4.2c0 4.3-3.5 7.8-7.8 7.8H11.8C7.5 21 4 17.5 4 13.2V9Z" fill="currentColor"/>
            <path d="M2.8 10.2h1.9v2.4H2.8a1.2 1.2 0 1 1 0-2.4Zm16.5 0h1.9a1.2 1.2 0 0 1 0 2.4h-1.9v-2.4Z" fill="currentColor"/>
            <path d="M8 6.5c0-1.1.7-2 1.6-2.5M12 6c0-1.3.8-2.4 1.9-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>

          <svg v-else viewBox="0 0 24 24" fill="none">
            <path d="M12 5.2c0-1.7 1.4-3.1 3.1-3.1S18.2 3.5 18.2 5.2c0 1-.5 1.8-1.2 2.4 1.9.9 3.4 2.7 4 5V14H3v-1.4c.6-2.3 2.1-4.1 4-5-.7-.6-1.2-1.5-1.2-2.4C5.8 3.5 7.2 2.1 8.9 2.1S12 3.5 12 5.2Z" fill="currentColor"/>
            <path d="M5 15h14v1.5c0 2.5-2 4.5-4.5 4.5h-5C7 21 5 19 5 16.5V15Z" fill="currentColor"/>
            <path d="M8 10.2c.8.5 1.7.8 2.6.8 1 0 1.9-.3 2.7-.8.8.5 1.7.8 2.6.8.8 0 1.6-.2 2.3-.6" stroke="#fff" opacity="0.45" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
        </span>
        {{ item.nome }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.filtros {
  width: min(1320px, 100%);
  margin: 16px auto 0;
}

.filtros__toggle {
  min-height: 52px;
  padding: 9px 14px;
  color: #244c36;
  background: rgba(255, 253, 248, 0.98);
  border: 1px solid #ddd4c2;
  text-align: left;
}

.filtros__toggle small,
.filtros__toggle strong {
  display: block;
}

.filtros__toggle small {
  margin-bottom: 1px;
  color: #77786f;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.7px;
  text-transform: uppercase;
}

.filtros__toggle strong {
  font-size: 12px;
}

.filtros__toggle-icone {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  color: #fff;
  background: #bd4a0a;
  border-radius: 10px;
}

.filtros__toggle-icone svg,
.filtros__seta {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.filtros__seta {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  transition: transform 0.18s ease;
}

.filtros__seta--aberta {
  transform: rotate(180deg);
}

.filtros__lista-mobile {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  background: rgba(255, 253, 248, 0.96);
  border: 1px solid #e3d9c8;
}

.filtros__botao {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  gap: 10px;
  padding: 11px 19px;
  color: #1e4933;
  background: rgba(255, 253, 248, 0.96);
  border: 1px solid #ddd4c2;
  border-radius: 999px;
  box-shadow: 0 4px 10px rgba(77, 51, 22, 0.06);
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.filtros__icone {
  display: inline-grid;
  width: 22px;
  height: 22px;
  place-items: center;
  flex-shrink: 0;
  color: #28563d;
  background: #edf3eb;
  border-radius: 50%;
}

.filtros__icone svg {
  width: 22px;
  height: 22px;
  color: currentColor;
}

.filtros__botao:hover {
  transform: translateY(-1px);
  background: #f5f7f1;
  border-color: #bfcdbf;
}

.filtros__botao.filtros__ativo {
  color: #fff;
  background: #bd4a0a;
  border-color: #bd4a0a;
  box-shadow: 0 7px 16px rgba(189, 74, 10, 0.22) !important;
}

.filtros__botao.filtros__ativo .filtros__icone {
  color: #fff;
  background: rgba(255, 255, 255, 0.16);
}

@media (max-width: 767.98px) {
  .filtros {
    margin-top: 10px;
  }

  .filtros__botao {
    min-height: 38px;
    padding: 7px 10px;
    font-size: 9px;
  }

  .filtros__icone,
  .filtros__icone svg {
    width: 17px;
    height: 17px;
  }
}
</style>
