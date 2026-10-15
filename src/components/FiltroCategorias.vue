<script setup>
defineProps({
  selecionada: String,
  somenteFavoritos: Boolean,
})

const emit = defineEmits(['selecionar'])

const categorias = [
  { id: 'todas', nome: 'Todas', icone: 'grade' },
  { id: 'cirio', nome: 'Especial Círio', icone: 'igreja' },
  { id: 'classicos', nome: 'Clássicos da terrinha', icone: 'peixe' },
  { id: 'casa', nome: 'Comida de casa', icone: 'panela' },
  { id: 'doces', nome: 'Doces e sobremesas', icone: 'cupcake' },
]
</script>

<template>
  <div class="filtros" role="group" aria-label="Filtrar receitas por categoria">
    <button
      v-for="item in categorias"
      :key="item.id"
      type="button"
      :class="{ 'filtros__ativo': selecionada === item.id && !somenteFavoritos }"
      :aria-pressed="selecionada === item.id && !somenteFavoritos"
      @click="emit('selecionar', item.id)"
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
</template>

<style scoped>
.filtros {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 18px;
}

.filtros button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  gap: 10px;
  padding: 11px 19px;
  color: #1e4933;
  background: rgba(255, 253, 248, 0.96);
  border: 1px solid #ddd4c2;
  border-radius: 10px;
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
}

.filtros__icone svg {
  width: 22px;
  height: 22px;
  color: currentColor;
}

.filtros button:hover {
  background: #edf1e7;
}

.filtros button.filtros__ativo {
  color: #fff;
  background: #bd4a0a;
  border-color: #bd4a0a;
}

@media (max-width: 640px) {
  .filtros {
    gap: 7px;
  }

  .filtros button {
    min-height: 42px;
    padding: 9px 12px;
    font-size: 10px;
  }

  .filtros__icone,
  .filtros__icone svg {
    width: 18px;
    height: 18px;
  }
}
</style>
