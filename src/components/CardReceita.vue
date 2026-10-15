<script setup>
defineProps({
  receita: Object,
  favorita: Boolean,
  selecionada: Boolean,
})

const emit = defineEmits(['abrir', 'favoritar'])
</script>

<template>
  <article
    class="card-receita"
    :class="{ 'card-receita--selecionada': selecionada }"
    :data-receita="receita.id"
  >
    <div class="card-receita__visual">
      <a
        href="#detalhes"
        class="card-receita__imagem-link"
        tabindex="-1"
        aria-hidden="true"
        @click="emit('abrir', receita)"
      >
        <img
          :src="receita.imagemUrl || `./imagens/${receita.imagem}.webp`"
          alt=""
          width="600"
          height="360"
          loading="lazy"
        />
      </a>

      <span
        class="card-receita__selo"
        :class="`card-receita__selo--${receita.cirio ? 'cirio' : receita.categoria}`"
      >
        {{ receita.cirio ? 'Especial Círio' : receita.categoria === 'doces' ? 'Doces e sobremesas' : receita.categoria === 'casa' ? 'Comida de casa' : 'Clássicos da terrinha' }}
      </span>

      <button
        class="card-receita__coracao"
        :class="{ 'card-receita__coracao--ativo': favorita }"
        type="button"
        :aria-label="`${favorita ? 'Remover' : 'Adicionar'} ${receita.nome} ${favorita ? 'dos' : 'aos'} favoritos`"
        :aria-pressed="favorita"
        @click="emit('favoritar', receita)"
      >
        <span aria-hidden="true">{{ favorita ? '♥' : '♡' }}</span>
      </button>
    </div>

    <div class="card-receita__corpo">
      <h2>
        <a href="#detalhes" @click="emit('abrir', receita)">
          {{ receita.nome }}
        </a>
      </h2>

      <div class="card-receita__meta">
        <span>◷ {{ receita.tempo }}</span>
        <span>♙ {{ receita.porcoes }} porções</span>
        <span>♨ {{ receita.dificuldade }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card-receita {
  min-width: 0;
  overflow: hidden;
  background: #fffdf9;
  border: 1px solid #ded5c7;
  border-radius: 10px;
  box-shadow: 0 5px 14px rgba(70, 46, 23, 0.07);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.card-receita:hover,
.card-receita--selecionada {
  transform: translateY(-2px);
  border-color: #bd4a0a;
  box-shadow: 0 8px 20px rgba(91, 51, 20, 0.13);
}

.card-receita__visual {
  position: relative;
  height: 136px;
  overflow: hidden;
  background: #e5e7d9;
}

.card-receita__imagem-link {
  display: block;
  height: 100%;
}

.card-receita__visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease;
}

.card-receita:hover img {
  transform: scale(1.035);
}

.card-receita__selo {
  position: absolute;
  top: 10px;
  left: 10px;
  max-width: calc(100% - 62px);
  overflow: hidden;
  padding: 6px 10px;
  color: #fff;
  border-radius: 9px;
  font-size: 10px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #256341;
}

.card-receita__selo--cirio,
.card-receita__selo--doces {
  background: #a40b52;
}

.card-receita__selo--casa {
  background: #bd4a0a;
}

.card-receita__coracao {
  position: absolute;
  top: 8px;
  right: 8px;
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  color: #262b24;
  background: rgba(255, 255, 255, 0.95);
  border: 0;
  border-radius: 50%;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.14);
  font-size: 22px;
  cursor: pointer;
}

.card-receita__coracao--ativo {
  color: #ef2637;
}

.card-receita__corpo {
  padding: 9px 12px 11px;
}

.card-receita h2 {
  margin: 0 0 9px;
  font: 800 16px / 1.15 Arial, Helvetica, sans-serif;
}

.card-receita h2 a {
  color: #171915;
  text-decoration: none;
}

.card-receita__meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 7px;
  color: #64665f;
  font-size: 9px;
}

.card-receita__meta span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 560px) {
  .card-receita__visual {
    height: 152px;
  }
}
</style>
