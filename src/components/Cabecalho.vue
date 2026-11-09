<script setup>
import { RouterLink, useRoute } from 'vue-router'

defineProps({ quantidadeFavoritos: Number })
const route = useRoute()

const links = [
  { nome: 'Início', rota: '/' },
  { nome: 'Receitas', rota: '/receitas' },
  { nome: 'Pokédex', rota: '/pokedex', destaque: true },
  { nome: 'Sobre', rota: '/sobre' },
  { nome: 'Equipe', rota: '/equipe' },
  { nome: 'Fontes', rota: '/fontes' },
]

function rotaAtiva(link) {
  if (link.rota === '/') return route.path === '/'
  if (link.rota === '/receitas') return route.path === '/receitas' || route.path.startsWith('/receita/')
  if (link.rota === '/pokedex') return route.path === '/pokedex' || route.path.startsWith('/pokemon/')
  return route.path === link.rota
}
</script>

<template>
  <header id="inicio" class="cabecalho">
    <img class="cabecalho__fundo" src="/imagens/cabecalho-fundo.webp" alt="Paisagem de Belém do Pará ao pôr do sol" />
    <div class="cabecalho__sombra" aria-hidden="true"></div>
    <div class="cabecalho__grade" aria-hidden="true"></div>

    <div class="cabecalho__conteudo container-fluid px-3 px-lg-4">
      <RouterLink class="cabecalho__marca" to="/" aria-label="Voltar ao início do Mucuratouille">
        <img class="cabecalho__logo" src="/imagens/cabecalho-logo.png" alt="Mucuratouille" />
      </RouterLink>

      <img class="cabecalho__mascote" src="/imagens/cabecalho-mascote.webp" alt="Mascote Mucuratouille" />

      <RouterLink
        class="cabecalho__favoritos d-flex flex-column align-items-center justify-content-center shadow"
        :class="{ 'cabecalho__favoritos--ativo': route.name === 'receitas' && route.query.favoritos === '1' }"
        :to="{ name: 'receitas', query: { favoritos: '1' } }"
        :aria-label="`Ver favoritos: ${quantidadeFavoritos}`"
      >
        <div class="d-flex align-items-center gap-1">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5 4.1 13C-.5 8.7 2 3.5 6.4 3.5c2.4 0 4.1 1.5 5.6 3.2 1.5-1.7 3.2-3.2 5.6-3.2 4.4 0 6.9 5.2 2.3 9.5L12 20.5Z" /></svg>
          <strong>{{ quantidadeFavoritos }}</strong>
        </div>
        <small>favoritos</small>
      </RouterLink>

      <nav class="cabecalho__nav shadow-sm" aria-label="Navegação principal">
        <RouterLink
          v-for="link in links"
          :key="link.rota"
          :to="link.rota"
          class="cabecalho__nav-link"
          :class="{
            'cabecalho__nav-link--pokedex': link.destaque,
            'cabecalho__nav-link--ativo': rotaAtiva(link)
          }"
        >{{ link.nome }}</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.cabecalho {
  position: relative;
  z-index: 1;
  width: 100%;
  height: clamp(238px, 18vw, 282px);
  overflow: hidden;
  background: #08261b;
}

.cabecalho__fundo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 52%;
}

.cabecalho__sombra {
  position: absolute;
  inset: 0;
  background: linear-gradient(
      90deg,
      rgba(4, 20, 13, 0.82),
      rgba(4, 20, 13, 0.47) 44%,
      rgba(4, 20, 13, 0.08) 72%
    ),
    linear-gradient(0deg, rgba(5, 20, 14, 0.45), transparent 60%);
}

.cabecalho__grade {
  position: absolute;
  inset: 0;
  opacity: 0.12;
  background-image: radial-gradient(circle at 1px 1px, #fff 1px, transparent 0);
  background-size: 22px 22px;
  mask-image: linear-gradient(90deg, #000, transparent 70%);
}

.cabecalho__conteudo {
  position: relative;
  height: 100%;
}

.cabecalho__marca {
  position: absolute;
  z-index: 4;
  top: 30px;
  left: clamp(18px, 4vw, 70px);
  display: flex;
  max-width: 560px;
  flex-direction: column;
  color: #fff;
  text-decoration: none;
  text-shadow: 0 3px 18px rgba(0, 0, 0, 0.28);
}

.cabecalho__logo {
  width: clamp(290px, 27vw, 485px);
  height: auto;
  object-fit: contain;
  object-position: left center;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.18));
  transform-origin: left center;
  transition: transform 0.24s ease, filter 0.24s ease;
}

.cabecalho__marca:hover .cabecalho__logo {
  transform: translateY(-5px) rotate(-1.2deg) scale(1.025);
  filter: drop-shadow(0 9px 14px rgba(0, 0, 0, 0.25));
}

.cabecalho__mascote {
  position: absolute;
  right: clamp(80px, 8vw, 145px);
  top: -5px;
  width: min(38vw, 510px);
  height: calc(100% - 24px);
  object-fit: contain;
  object-position: right top;
  filter: drop-shadow(0 10px 14px rgba(0, 0, 0, 0.2));
}

.cabecalho__favoritos {
  position: absolute;
  z-index: 5;
  top: 22px;
  right: clamp(14px, 2.2vw, 36px);
  width: 78px;
  min-height: 70px;
  padding: 8px;
  color: #fff;
  text-decoration: none;
  background: rgba(8, 38, 27, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  backdrop-filter: blur(7px);
}

.cabecalho__favoritos svg {
  width: 17px;
  height: 17px;
  fill: #ff4052;
}

.cabecalho__favoritos strong {
  font-size: 16px;
}

.cabecalho__favoritos small {
  font-size: 9px;
}

.cabecalho__favoritos--ativo {
  background: #174f39;
}

.cabecalho__nav {
  position: absolute;
  z-index: 6;
  left: 50%;
  bottom: 78px;
  display: flex;
  align-items: center;
  gap: 4px;
  max-width: calc(100% - 28px);
  padding: 7px;
  background: rgba(8, 29, 19, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  backdrop-filter: blur(9px);
  transform: translateX(-50%);
}

.cabecalho__nav-link {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  padding: 7px 17px;
  color: rgba(255, 255, 255, 0.9);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
}

.cabecalho__nav-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.cabecalho__nav-link--pokedex {
  box-shadow: inset 0 0 0 3px rgba(198, 40, 40, 0.88);
}

.cabecalho__nav-link--ativo {
  color: #183326;
  background: #f4c542;
}

.cabecalho__nav-link--ativo:hover {
  color: #183326;
  background: #f4c542;
}

.cabecalho__nav-link--pokedex.cabecalho__nav-link--ativo {
  color: #fff;
  background: #c62828;
  box-shadow: inset 0 0 0 3px #ef5350;
}

.cabecalho__nav-link--pokedex.cabecalho__nav-link--ativo:hover {
  color: #fff;
  background: #b71c1c;
}

@media (max-width: 767.98px) {
  .cabecalho {
    height: 210px;
  }

  .cabecalho__marca {
    top: 14px;
    left: 12px;
    max-width: 49%;
  }

  .cabecalho__logo {
    width: min(190px, 48vw);
  }

  .cabecalho__mascote {
    top: 10px;
    right: 49px;
    width: min(25vw, 96px);
    height: 108px;
    opacity: 0.96;
  }

  .cabecalho__favoritos {
    top: 12px;
    right: 8px;
    width: 52px;
    min-height: 52px;
    padding: 5px;
    border-radius: 13px;
  }

  .cabecalho__favoritos svg {
    width: 14px;
    height: 14px;
  }

  .cabecalho__favoritos strong {
    font-size: 13px;
  }

  .cabecalho__favoritos small {
    font-size: 7px;
  }

  .cabecalho__nav {
    bottom: 50px;
    width: calc(100% - 18px);
    max-width: none;
    gap: 2px;
    padding: 5px;
    overflow: hidden;
  }

  .cabecalho__nav-link {
    flex: 1 1 0;
    min-width: 0;
    min-height: 36px;
    padding: 5px 2px;
    font-size: 8px;
  }

  .cabecalho__nav-link--pokedex {
    box-shadow: inset 0 0 0 2px rgba(198, 40, 40, 0.88);
  }

  .cabecalho__nav-link--pokedex.cabecalho__nav-link--ativo {
    box-shadow: inset 0 0 0 2px #ef5350;
  }
}

@media (max-width: 380px) {
  .cabecalho__logo {
    width: min(168px, 46vw);
  }

  .cabecalho__mascote {
    right: 43px;
    width: 23vw;
    height: 98px;
  }

  .cabecalho__nav-link {
    padding-right: 1px;
    padding-left: 1px;
    font-size: 7.2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cabecalho__logo {
    transition: none;
  }

  .cabecalho__marca:hover .cabecalho__logo {
    transform: none;
  }
}
</style>
