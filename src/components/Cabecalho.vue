<script setup>
defineProps({
  quantidadeFavoritos: Number,
  favoritosAtivos: Boolean,
})

const emit = defineEmits(['favoritos'])
</script>

<template>
  <header id="inicio" class="cabecalho">
    <img
      class="cabecalho__fundo"
      :src="'./imagens/cabecalho-fundo.webp'"
      alt="Paisagem de Belém do Pará ao pôr do sol"
      width="1800"
      height="360"
      fetchpriority="high"
    />

    <div class="cabecalho__conteudo">
      <img
        class="cabecalho__logo"
        :src="'./imagens/cabecalho-logo.webp'"
        alt="Mucuratouille — Receitas boas. Conselhos duvidosos."
        width="2172"
        height="724"
      />

      <img
        class="cabecalho__mascote"
        :src="'./imagens/cabecalho-mascote.webp'"
        alt="Mascote Mucuratouille com balão de fala convidando o usuário a cozinhar"
        width="1448"
        height="1086"
      />

      <a
        class="cabecalho__favoritos"
        :class="{ 'cabecalho__favoritos--ativo': favoritosAtivos }"
        href="#receitas"
        :aria-label="`Ver favoritos: ${quantidadeFavoritos}`"
        @click="emit('favoritos')"
      >
        <span aria-hidden="true">♥</span>
        <strong>{{ quantidadeFavoritos }}</strong>
        <small>favoritos</small>
      </a>
    </div>
  </header>
</template>

<style scoped>
.cabecalho {
  position: relative;
  width: 100%;
  height: clamp(136px, 11.63vw, 180px);
  overflow: hidden;
  background: #18241b;
}

.cabecalho__fundo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 55%;
}

.cabecalho__conteudo {
  position: relative;
  width: 100%;
  height: 100%;
}

.cabecalho__logo {
  position: absolute;
  left: 0.9%;
  top: 2%;
  width: min(37%, 690px);
  height: auto;
  max-height: 96%;
  object-fit: contain;
}

.cabecalho__mascote {
  position: absolute;
  right: 6.8%;
  top: 0;
  width: min(44%, 560px);
  height: 100%;
  object-fit: contain;
  object-position: right top;
}

.cabecalho__favoritos {
  position: absolute;
  top: 20px;
  right: 1.6%;
  display: grid;
  width: clamp(58px, 5vw, 84px);
  min-height: clamp(52px, 4.7vw, 74px);
  place-items: center;
  align-content: center;
  padding: 6px 6px 8px;
  color: #fff;
  text-decoration: none;
  background: rgba(13, 31, 21, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.24);
}

.cabecalho__favoritos--ativo {
  background: rgba(20, 67, 44, 0.98);
}

.cabecalho__favoritos span {
  color: #ff3447;
  font-size: clamp(13px, 1.2vw, 20px);
  line-height: 1;
}

.cabecalho__favoritos strong {
  margin-top: 2px;
  font-size: clamp(11px, 1vw, 17px);
  line-height: 1;
}

.cabecalho__favoritos small {
  margin-top: 2px;
  font-size: clamp(7px, 0.68vw, 10px);
}

@media (max-width: 1024px) {
  .cabecalho__logo {
    width: 43%;
  }

  .cabecalho__mascote {
    right: 8.4%;
    width: 43%;
  }
}

@media (max-width: 640px) {
  .cabecalho {
    height: 128px;
  }

  .cabecalho__fundo {
    object-position: center 58%;
  }

  .cabecalho__logo {
    width: 58%;
    top: 4px;
    left: 4px;
  }

  .cabecalho__mascote {
    right: 10px;
    width: 44%;
  }

  .cabecalho__favoritos {
    top: 12px;
    right: 8px;
  }
}
</style>
