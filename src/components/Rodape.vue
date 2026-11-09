<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="rodape">
    <div class="rodape__grama" aria-hidden="true"></div>

    <img
      class="rodape__arte rodape__arte--esquerda"
      src="/imagens/rodape-esquerda.png"
      alt=""
      aria-hidden="true"
    />

    <img
      class="rodape__arte rodape__arte--direita"
      src="/imagens/rodape-direita.png"
      alt=""
      aria-hidden="true"
    />

    <img
      class="rodape__personagem"
      src="/imagens/mucura-rodape.png"
      alt="Mucuratouille de braços cruzados"
    />

    <div class="rodape__superficie">
      <div class="container d-flex flex-column flex-md-row align-items-center justify-content-between rodape__conteudo">
        <RouterLink class="rodape__marca" to="/">
          <strong>Mucuratouille</strong>
          <small>Receitas duvidosas. Conselhos mais ainda.</small>
        </RouterLink>

        <nav class="rodape__nav d-flex align-items-center justify-content-center flex-wrap" aria-label="Navegação do rodapé">
          <RouterLink to="/receitas">Receitas</RouterLink>
          <span>|</span>
          <RouterLink class="rodape__pokedex" to="/pokedex">Pokédex</RouterLink>
          <span>|</span>
          <RouterLink to="/sobre">Sobre</RouterLink>
          <span>|</span>
          <RouterLink to="/equipe">Equipe</RouterLink>
          <span>|</span>
          <RouterLink to="/fontes">Fontes</RouterLink>
        </nav>

        <div class="rodape__credito">Vue + Bootstrap + PokéAPI</div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.rodape {
  position: relative;
  z-index: 7;
  height: 145px;
  margin-top: 0;
  overflow: visible;
  isolation: isolate;
  color: #f8f0dc;
  background-image: linear-gradient(
      rgba(11, 63, 47, 0.42),
      rgba(11, 63, 47, 0.52)
    ),
    url('/imagens/fundo-verde-paisagem.png');
  background-color: #0b3f2f;
  background-repeat: no-repeat;
  background-position: center 58%;
  background-size: cover;
}

.rodape__grama {
  position: absolute;
  z-index: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 28px;
  background-image: url('/imagens/rodape-grama.png');
  background-repeat: repeat-x;
  background-position: center bottom;
  background-size: auto 100%;
  pointer-events: none;
}

.rodape__arte {
  position: absolute;
  z-index: 1;
  bottom: 0;
  width: auto;
  height: clamp(265px, 19vw, 305px);
  max-width: none;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
}

.rodape__arte--esquerda {
  left: 0;
  object-position: left bottom;
}

.rodape__arte--direita {
  right: 0;
  object-position: right bottom;
}

.rodape__superficie {
  position: absolute;
  z-index: 2;
  inset: 0;
  display: flex;
  align-items: center;
  background: transparent;
}

.rodape__conteudo {
  position: relative;
  z-index: 3;
  min-height: 78px;
  padding: 10px 28px;
  gap: 18px;
  background: transparent;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.62);
}

.rodape__personagem {
  position: absolute;
  z-index: 4;
  top: 50%;
  left: max(28px, calc((100vw - 1430px) / 2 + 18px));
  width: 88px;
  height: 106px;
  object-fit: contain;
  filter: drop-shadow(0 7px 8px rgba(0, 0, 0, 0.26));
  transform: translateY(-50%);
  pointer-events: none;
}

.rodape__marca {
  min-width: 235px;
  margin-left: 96px;
  color: inherit;
  text-decoration: none;
}

.rodape__marca strong,
.rodape__marca small {
  display: block;
}

.rodape__marca strong {
  color: #f4c542;
  font: 800 20px / 1 Georgia, 'Times New Roman', serif;
}

.rodape__marca small {
  margin-top: 4px;
  color: #fff7df;
  font-size: 9px;
}

.rodape__nav {
  gap: 8px 14px;
  color: rgba(246, 240, 221, 0.45);
}

.rodape__nav a {
  color: #fff9e7;
  font-size: 10px;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.rodape__nav a:hover {
  color: #f4c542;
  transform: translateY(-1px);
}

.rodape__nav .rodape__pokedex {
  color: #ffb0b0;
}

.rodape__credito {
  color: #fff7df;
  font-size: 10px;
  font-weight: 700;
  white-space: nowrap;
}

@media (min-width: 1400px) {
  .rodape__conteudo {
    max-width: 1430px;
  }
}

@media (max-width: 1199.98px) {
  .rodape {
    height: 150px;
  }

  .rodape__grama {
    height: 26px;
  }

  .rodape__arte {
    height: clamp(225px, 25vw, 270px);
  }

  .rodape__conteudo {
    min-height: 72px;
    padding: 8px 22px;
    gap: 12px;
  }

  .rodape__personagem {
    left: 24px;
    width: 78px;
    height: 94px;
  }

  .rodape__marca {
    min-width: 205px;
    margin-left: 84px;
  }

  .rodape__marca strong {
    font-size: 18px;
  }

  .rodape__nav {
    gap: 7px 10px;
  }

  .rodape__nav a,
  .rodape__credito {
    font-size: 9px;
  }
}

@media (max-width: 991.98px) {
  .rodape {
    height: 155px;
  }

  .rodape__grama {
    height: 25px;
  }

  .rodape__arte {
    height: 220px;
  }

  .rodape__conteudo {
    padding-right: 18px;
    padding-left: 18px;
    gap: 8px;
  }

  .rodape__personagem {
    left: 18px;
    width: 72px;
    height: 86px;
  }

  .rodape__marca {
    min-width: 180px;
    margin-left: 76px;
  }

  .rodape__marca strong {
    font-size: 17px;
  }

  .rodape__marca small {
    font-size: 8px;
  }

  .rodape__nav {
    gap: 5px 8px;
  }

  .rodape__nav a,
  .rodape__credito {
    font-size: 8px;
  }
}

@media (max-width: 767.98px) {
  .rodape {
    height: 205px;
    overflow-x: clip;
    background-position: center 64%;
  }

  .rodape__grama {
    height: 22px;
  }

  .rodape__arte {
    bottom: 0;
    width: min(42vw, 150px);
    height: auto;
    max-width: 150px;
  }

  .rodape__arte--esquerda {
    left: 0;
  }

  .rodape__arte--direita {
    right: 0;
  }

  .rodape__superficie {
    align-items: center;
  }

  .rodape__conteudo {
    min-height: 0;
    margin: 0 10px;
    padding: 62px 8px 26px;
    gap: 6px;
    text-align: center;
  }

  .rodape__personagem {
    top: 14px;
    left: 50%;
    width: 50px;
    height: 58px;
    transform: translateX(-50%);
  }

  .rodape__marca {
    min-width: 0;
    margin-left: 0;
  }

  .rodape__marca strong {
    font-size: 16px;
  }

  .rodape__marca small {
    font-size: 7.5px;
  }

  .rodape__nav {
    max-width: 100%;
    margin-top: 1px;
    gap: 3px 6px;
  }

  .rodape__nav a,
  .rodape__credito {
    font-size: 7.5px;
  }
}

@media (max-width: 479.98px) {
  .rodape {
    height: 190px;
  }

  .rodape__grama {
    height: 20px;
  }

  .rodape__arte {
    width: min(38vw, 126px);
    max-width: 126px;
  }

  .rodape__conteudo {
    margin: 0 7px;
    padding: 55px 6px 23px;
    gap: 5px;
  }

  .rodape__personagem {
    top: 12px;
    width: 46px;
    height: 53px;
  }

  .rodape__marca strong {
    font-size: 15px;
  }

  .rodape__marca small,
  .rodape__nav a,
  .rodape__credito {
    font-size: 7px;
  }

  .rodape__nav {
    gap: 2px 5px;
  }
}
</style>
