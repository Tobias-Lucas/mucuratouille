<script setup>
defineProps({
  titulo: {
    type: String,
    default: 'Nenhum resultado encontrado.',
  },
  mensagem: {
    type: String,
    default: '',
  },
  imagem: {
    type: String,
    default: '',
  },
  imagemAlt: {
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

const emit = defineEmits(['acao'])
</script>

<template>
  <div
    class="estado estado--vazio"
    :class="{ 'estado--compacto': compacto }"
    role="status"
  >
    <img v-if="imagem" :src="imagem" :alt="imagemAlt" />
    <strong>{{ titulo }}</strong>
    <p v-if="mensagem">{{ mensagem }}</p>
    <button
      v-if="acaoTexto"
      class="btn btn-mucura rounded-pill"
      type="button"
      @click="emit('acao')"
    >
      {{ acaoTexto }}
    </button>
  </div>
</template>

<style scoped>
.estado {
  display: flex;
  min-height: 240px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  padding: 32px 22px;
  color: #292a24;
  background: #fffdf8;
  border: 1px solid #e0d7c9;
  border-radius: 20px;
  text-align: center;
}

.estado img {
  width: 134px;
  max-height: 100px;
  object-fit: contain;
}

.estado strong {
  font: 800 23px / 1.05 Georgia, 'Times New Roman', serif;
}

.estado p {
  max-width: 560px;
  margin: 0;
  color: #77736b;
  font-size: 12px;
  line-height: 1.55;
}

.estado .btn {
  min-height: 40px;
  padding: 8px 18px;
  color: #fff;
  background: #c94c08;
  border-color: #c94c08;
  font-size: 10px;
  font-weight: 900;
}

.estado .btn:hover {
  color: #fff;
  background: #a93d05;
  border-color: #a93d05;
}

.estado--compacto {
  min-height: 140px;
  padding: 20px;
  background: transparent;
  border: 0;
}

.estado--compacto strong {
  font-size: 17px;
}
</style>
