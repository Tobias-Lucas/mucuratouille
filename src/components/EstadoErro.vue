<script setup>
defineProps({
  titulo: {
    type: String,
    default: 'Não foi possível concluir a operação.',
  },
  mensagem: {
    type: String,
    default: '',
  },
  acaoTexto: {
    type: String,
    default: '',
  },
  compacto: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['tentar-novamente'])
</script>

<template>
  <div
    class="estado estado--erro"
    :class="{ 'estado--compacto': compacto }"
    role="alert"
  >
    <strong>{{ titulo }}</strong>
    <p v-if="mensagem">{{ mensagem }}</p>
    <button
      v-if="acaoTexto"
      class="btn btn-outline-secondary rounded-pill"
      type="button"
      @click="emit('tentar-novamente')"
    >
      {{ acaoTexto }}
    </button>
  </div>
</template>

<style scoped>
.estado {
  display: flex;
  min-height: 220px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  padding: 28px;
  color: #a83b34;
  background: #fffdf8;
  border: 1px solid #e0d7c9;
  border-radius: 20px;
  text-align: center;
}

.estado strong {
  font-size: 13px;
}

.estado p {
  max-width: 600px;
  margin: 0;
  color: #77736b;
  font-size: 11.5px;
  line-height: 1.55;
}

.estado .btn {
  min-height: 38px;
  padding: 7px 16px;
  color: #a83b34;
  border-color: #a83b34;
  font-size: 10px;
  font-weight: 900;
}

.estado .btn:hover {
  color: #fff;
  background: #a83b34;
}

.estado--compacto {
  min-height: 110px;
  padding: 18px;
  background: transparent;
  border: 0;
}

.estado--compacto strong {
  font-size: 11px;
}

.estado--compacto p {
  font-size: 10px;
}
</style>
