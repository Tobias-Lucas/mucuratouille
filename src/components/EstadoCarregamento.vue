<script setup>
defineProps({
  titulo: {
    type: String,
    default: 'Carregando...',
  },
  mensagem: {
    type: String,
    default: '',
  },
  compacto: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="estado estado--carregamento"
    :class="{ 'estado--compacto': compacto }"
    role="status"
    aria-live="polite"
  >
    <span class="spinner-border" aria-hidden="true"></span>
    <strong>{{ titulo }}</strong>
    <p v-if="mensagem">{{ mensagem }}</p>
  </div>
</template>

<style scoped>
.estado {
  display: flex;
  min-height: 280px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  padding: 28px;
  color: #123c2c;
  background: #fffdf8;
  border: 1px solid #e0d7c9;
  border-radius: 20px;
  text-align: center;
}

.estado .spinner-border {
  width: 30px;
  height: 30px;
  color: #c94c08;
}

.estado strong {
  font-size: 13px;
}

.estado p {
  max-width: 560px;
  margin: 0;
  color: #77736b;
  font-size: 11.5px;
  line-height: 1.55;
}

.estado--compacto {
  min-height: 120px;
  padding: 20px;
  background: transparent;
  border: 0;
}

.estado--compacto .spinner-border {
  width: 22px;
  height: 22px;
}

.estado--compacto strong {
  font-size: 11px;
}
</style>
