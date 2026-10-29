<script setup>
const emit = defineEmits(['abrir-info'])
</script>

<template>
  <footer class="rodape">
    <img
      class="rodape__personagem"
      :src="'/imagens/mucura-rodape.png'"
      alt="Mucuratouille de braços cruzados"
    />

    <div class="rodape__superficie">
      <div class="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 rodape__conteudo">
        <button
          class="rodape__marca btn p-0 border-0 text-start"
          type="button"
          @click="emit('abrir-info', 'sobre')"
        >
          <span>
            <strong class="rodape__titulo">Mucuratouille</strong>
            <small class="rodape__subtitulo">Receitas boas. Conselhos duvidosos.</small>
          </span>
        </button>

        <nav
          class="rodape__nav d-flex align-items-center justify-content-center flex-wrap gap-2 gap-lg-3"
          aria-label="Navegação do rodapé"
        >
          <button type="button" class="btn btn-link p-0 rodape__link" @click="emit('abrir-info', 'sobre')">
            Sobre o projeto
          </button>
          <span aria-hidden="true">|</span>
          <button type="button" class="btn btn-link p-0 rodape__link" @click="emit('abrir-info', 'equipe')">
            Equipe
          </button>
          <span aria-hidden="true">|</span>
          <button type="button" class="btn btn-link p-0 rodape__link" @click="emit('abrir-info', 'fontes')">
            Fontes das receitas
          </button>
        </nav>

        <div class="rodape__credito d-flex align-items-center justify-content-center justify-content-md-end gap-2">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21v-9M12 12c-1.1-3.8-4-6-8-6 0 4.3 2.9 7 8 6Zm0 0c1.1-4.2 4.2-6.6 8.3-6.3-.2 4.3-3.3 6.9-8.3 6.3ZM8.5 21h7" />
          </svg>
          <span class="rodape__frase">Feito com <svg class="rodape__coracao" viewBox="0 0 24 24" aria-label="amor"><path d="M12 20.5 4.1 13C-.5 8.7 2 3.5 6.4 3.5c2.4 0 4.1 1.5 5.6 3.2 1.5-1.7 3.2-3.2 5.6-3.2 4.4 0 6.9 5.2 2.3 9.5L12 20.5Z"/></svg> em Belém do Pará</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.rodape {
  position: relative;
  z-index: 7;
  min-height: 164px;
  margin-top: -52px;
  overflow: visible;
  color: #f6f0dd;
}

.rodape__superficie {
  position: absolute;
  inset: 0;
  min-height: 164px;
  padding-top: 56px;
  background-image:
    linear-gradient(rgba(7, 24, 15, 0.32), rgba(7, 24, 15, 0.3)),
    url('/imagens/rodape-fundo.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 180' preserveAspectRatio='none'%3E%3Cpath fill='white' d='M0 62 C120 35 225 38 350 52 C500 70 625 75 775 48 C930 20 1085 15 1228 31 C1320 41 1380 52 1440 44 L1440 180 L0 180 Z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 180' preserveAspectRatio='none'%3E%3Cpath fill='white' d='M0 62 C120 35 225 38 350 52 C500 70 625 75 775 48 C930 20 1085 15 1228 31 C1320 41 1380 52 1440 44 L1440 180 L0 180 Z'/%3E%3C/svg%3E");
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

.rodape__personagem {
  position: absolute;
  z-index: 4;
  left: max(18px, calc((100vw - 1320px) / 2));
  bottom: 9px;
  width: 98px;
  height: 116px;
  object-fit: contain;
  object-position: center bottom;
  filter: drop-shadow(0 7px 8px rgba(0, 0, 0, 0.26));
  pointer-events: none;
}

.rodape__conteudo {
  position: relative;
  z-index: 3;
  min-height: 102px;
  padding-top: 18px;
  padding-bottom: 14px;
}

.rodape__marca {
  min-width: 215px;
  margin-left: 105px;
  color: inherit;
  background: transparent;
}

.rodape__titulo,
.rodape__subtitulo {
  display: block;
}

.rodape__titulo {
  color: #f3d07a;
  font: 800 21px / 1 Georgia, 'Times New Roman', serif;
}

.rodape__subtitulo {
  margin-top: 4px;
  color: #f5e9c7;
  font-size: 9px;
}

.rodape__nav {
  color: rgba(246, 240, 221, 0.55);
}

.rodape__link {
  color: #f8f1dc;
  font-size: 11px;
  font-weight: 700;
  text-decoration: none;
}

.rodape__link:hover {
  color: #f3d07a;
  text-decoration: underline;
}

.rodape__credito {
  color: #f5e9c7;
  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
}

.rodape__credito svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: #f3d07a;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.rodape__frase {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.rodape__coracao {
  width: 13px !important;
  height: 13px !important;
  fill: #ff4a59 !important;
  stroke: none !important;
}

@media (max-width: 991.98px) {
  .rodape__marca {
    min-width: 180px;
    margin-left: 88px;
  }

  .rodape__personagem {
    width: 82px;
    height: 100px;
  }
}

@media (max-width: 767.98px) {
  .rodape {
    min-height: 208px;
    margin-top: -28px;
  }

  .rodape__superficie {
    min-height: 208px;
    padding-top: 46px;
    background-position: 58% center;
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 420 220' preserveAspectRatio='none'%3E%3Cpath fill='white' d='M0 48 C72 28 122 42 181 51 C236 60 273 20 337 27 C373 31 399 42 420 36 L420 220 L0 220 Z'/%3E%3C/svg%3E");
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 420 220' preserveAspectRatio='none'%3E%3Cpath fill='white' d='M0 48 C72 28 122 42 181 51 C236 60 273 20 337 27 C373 31 399 42 420 36 L420 220 L0 220 Z'/%3E%3C/svg%3E");
  }

  .rodape__conteudo {
    display: grid !important;
    grid-template-columns: 74px 1fr;
    grid-template-areas:
      "personagem marca"
      "nav nav"
      "credito credito";
    align-items: center !important;
    justify-items: stretch;
    gap: 7px 10px !important;
    min-height: 154px;
    padding: 14px 14px 10px;
    text-align: left;
  }

  .rodape__marca {
    grid-area: marca;
    min-width: 0;
    margin-left: 0;
    padding: 0 !important;
    text-align: left !important;
  }

  .rodape__personagem {
    left: max(14px, calc((100vw - 540px) / 2));
    bottom: 94px;
    width: 70px;
    height: 82px;
  }

  .rodape__titulo {
    font-size: 18px;
  }

  .rodape__subtitulo {
    margin-top: 3px;
    font-size: 8px;
  }

  .rodape__nav {
    grid-area: nav;
    width: 100%;
    justify-content: center !important;
    gap: 7px !important;
    padding-top: 3px;
    font-size: 0;
  }

  .rodape__link {
    font-size: 10px;
  }

  .rodape__nav > span {
    font-size: 10px;
  }

  .rodape__credito {
    grid-area: credito;
    justify-content: center !important;
    width: 100%;
    white-space: normal;
    font-size: 9px;
    text-align: center;
  }

  .rodape__credito > svg {
    display: none;
  }
}

@media (max-width: 480px) {
  .rodape {
    min-height: 196px;
    margin-top: -22px;
  }

  .rodape__superficie {
    min-height: 196px;
    padding-top: 42px;
  }

  .rodape__conteudo {
    grid-template-columns: 64px 1fr;
    min-height: 146px;
    padding-right: 10px;
    padding-left: 10px;
  }

  .rodape__personagem {
    left: 12px;
    bottom: 90px;
    width: 60px;
    height: 72px;
  }

  .rodape__titulo {
    font-size: 17px;
  }

  .rodape__link {
    font-size: 9px;
  }
}
</style>
