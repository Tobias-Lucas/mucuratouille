<script setup>
defineProps({
  quantidadeFavoritos: Number,
  favoritosAtivos: Boolean,
})

const emit = defineEmits(['favoritos', 'inicio'])
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

    <div class="cabecalho__sombra" aria-hidden="true"></div>

    <div class="cabecalho__conteudo container-fluid px-3 px-lg-4">
      <a
        class="cabecalho__logo-link"
        href="#inicio"
        aria-label="Voltar ao início do Mucuratouille"
        @click="emit('inicio')"
      >
        <img
          class="cabecalho__logo"
          :src="'./imagens/cabecalho-logo.png'"
          alt="Mucuratouille — Receitas boas. Conselhos duvidosos."
          width="2172"
          height="724"
        />
      </a>

      <img
        class="cabecalho__mascote"
        :src="'./imagens/cabecalho-mascote.webp'"
        alt="Mascote Mucuratouille com balão de fala convidando o usuário a cozinhar"
        width="1448"
        height="1086"
      />

      <a
        class="cabecalho__favoritos d-flex flex-column align-items-center justify-content-center shadow"
        :class="{ 'cabecalho__favoritos--ativo': favoritosAtivos }"
        href="#receitas"
        :aria-label="`Ver favoritos: ${quantidadeFavoritos}`"
        @click="emit('favoritos')"
      >
        <div class="d-flex align-items-center gap-1">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20.5 4.1 13C-.5 8.7 2 3.5 6.4 3.5c2.4 0 4.1 1.5 5.6 3.2 1.5-1.7 3.2-3.2 5.6-3.2 4.4 0 6.9 5.2 2.3 9.5L12 20.5Z" />
          </svg>
          <strong>{{ quantidadeFavoritos }}</strong>
        </div>
        <small>favoritos</small>
      </a>
    </div>
  </header>
</template>

<style scoped>
.cabecalho {
  position: relative;
  z-index: 1;
  width: 100%;
  height: clamp(190px, 14vw, 232px);
  overflow: hidden;
  background: #18241b;
}

.cabecalho__fundo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 54%;
}

.cabecalho__sombra {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(7, 22, 14, 0.2), transparent 45%, rgba(7, 22, 14, 0.08));
  pointer-events: none;
}

.cabecalho__conteudo {
  position: relative;
  width: 100%;
  height: 100%;
}

.cabecalho__logo-link {
  position: absolute;
  z-index: 3;
  left: clamp(12px, 2vw, 36px);
  top: clamp(10px, 1.1vw, 20px);
  display: block;
  width: min(25vw, 420px);
  transition: transform 0.18s ease, filter 0.18s ease;
}

.cabecalho__logo-link:hover {
  transform: translateY(-2px) scale(1.015);
  filter: drop-shadow(0 8px 15px rgba(0, 0, 0, 0.18));
}

.cabecalho__logo {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.cabecalho__mascote {
  position: absolute;
  right: clamp(86px, 7.5vw, 140px);
  top: -1px;
  width: min(39vw, 520px);
  height: 100%;
  object-fit: contain;
  object-position: right top;
}

.cabecalho__favoritos {
  position: absolute;
  z-index: 5;
  top: clamp(14px, 1.4vw, 24px);
  right: clamp(12px, 2vw, 34px);
  width: 76px;
  min-height: 68px;
  padding: 8px 7px;
  color: #fff;
  text-decoration: none;
  background: rgba(11, 38, 26, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 15px;
  backdrop-filter: blur(6px);
  transition: transform 0.18s ease, background 0.18s ease;
}

.cabecalho__favoritos:hover {
  color: #fff;
  transform: translateY(-2px);
  background: rgba(17, 59, 40, 0.98);
}

.cabecalho__favoritos--ativo {
  background: rgba(24, 84, 55, 0.98);
}

.cabecalho__favoritos svg {
  width: 17px;
  height: 17px;
  fill: #ff4052;
}

.cabecalho__favoritos strong {
  font-size: 16px;
  line-height: 1;
}

.cabecalho__favoritos small {
  margin-top: 3px;
  font-size: 9px;
}

@media (max-width: 991.98px) {
  .cabecalho__logo-link {
    width: min(34vw, 390px);
  }

  .cabecalho__mascote {
    right: 70px;
    width: min(45vw, 470px);
  }
}

@media (max-width: 767.98px) {
  .cabecalho {
    height: 188px;
  }

  .cabecalho__fundo {
    object-position: 50% 54%;
  }

  .cabecalho__logo-link {
    top: 12px;
    left: 12px;
    width: min(39vw, 280px);
  }

  .cabecalho__mascote {
    right: 62px;
    top: 4px;
    width: min(43vw, 320px);
    height: 92%;
  }

  .cabecalho__favoritos {
    width: 62px;
    min-height: 58px;
    right: 10px;
    top: 12px;
  }
}

@media (max-width: 575.98px) {
  .cabecalho {
    height: 174px;
  }

  .cabecalho__fundo {
    object-position: 49% 55%;
  }

  .cabecalho__logo-link {
    top: 10px;
    left: 10px;
    width: min(47vw, 205px);
  }

  .cabecalho__mascote {
    right: 48px;
    top: 6px;
    width: 40vw;
    height: 88%;
  }

  .cabecalho__favoritos {
    width: 52px;
    min-height: 50px;
    right: 8px;
    top: 10px;
    padding: 5px 4px;
    border-radius: 12px;
  }

  .cabecalho__favoritos svg {
    width: 14px;
    height: 14px;
  }

  .cabecalho__favoritos strong {
    font-size: 12px;
  }

  .cabecalho__favoritos small {
    margin-top: 1px;
    font-size: 7px;
  }
}
</style>
