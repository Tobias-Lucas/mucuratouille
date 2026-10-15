<script setup>
defineProps({
  receitas: Array,
})
</script>

<template>
  <footer class="rodape">
    <div class="rodape__alvos" aria-hidden="true">
      <span id="sobre-o-projeto"></span>
      <span id="equipe"></span>
      <span id="fontes"></span>
    </div>

    <div class="rodape__faixa">
      <div class="rodape__conteudo container">
        <div class="rodape__marca">
          <div class="rodape__logo" aria-hidden="true">👨‍🍳</div>
          <div>
            <strong class="rodape__titulo">Mucuratouille</strong>
            <small class="rodape__subtitulo">Receitas boas. Conselhos duvidosos.</small>
          </div>
        </div>

        <nav class="rodape__nav" aria-label="Navegação do rodapé">
          <a href="#sobre-o-projeto">Sobre o projeto</a>
          <span aria-hidden="true">|</span>
          <a href="#equipe">Equipe</a>
          <span aria-hidden="true">|</span>
          <a href="#fontes">Fontes das receitas</a>
        </nav>

        <div class="rodape__credito">
          <span class="rodape__icone" aria-hidden="true">🌴</span>
          <span class="rodape__icone" aria-hidden="true">🍴</span>
          <span>Feito com <b>❤</b> em Belém do Pará</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.rodape {
  margin-top: 24px;
  color: #f6f0dd;
  background: #0e1f15;
}

.rodape__alvos {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.rodape__faixa {
  background-image:
    linear-gradient(rgba(8, 18, 12, 0.16), rgba(8, 18, 12, 0.16)),
    url('./imagens/rodape-fundo.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.rodape__conteudo {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 20px;
  min-height: 72px;
  padding: 10px 16px;
}

.rodape__marca {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.rodape__logo {
  display: grid;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  place-items: center;
  font-size: 21px;
  background: rgba(234, 220, 177, 0.12);
  border: 1px solid rgba(234, 220, 177, 0.28);
  border-radius: 999px;
}

.rodape__titulo {
  display: block;
  color: #f3d07a;
  font-size: 22px;
  line-height: 1;
}

.rodape__subtitulo {
  display: block;
  margin-top: 2px;
  color: #f5e9c7;
  font-size: 10px;
  line-height: 1.2;
  opacity: 0.94;
}

.rodape__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 0;
  color: #f8f1dc;
  font-size: 12px;
  font-weight: 600;
}

.rodape__nav a {
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
}

.rodape__nav a:hover {
  text-decoration: underline;
}

.rodape__credito {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  color: #f5e9c7;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.rodape__credito b {
  color: #ff4a59;
}

.rodape__icone {
  font-size: 14px;
}

@media (max-width: 960px) {
  .rodape__conteudo {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 8px;
    padding: 12px 14px;
    text-align: center;
  }

  .rodape__nav {
    flex-wrap: wrap;
  }

  .rodape__credito {
    justify-content: center;
    white-space: normal;
  }
}

@media (max-width: 560px) {
  .rodape__titulo {
    font-size: 18px;
  }

  .rodape__subtitulo,
  .rodape__nav,
  .rodape__credito {
    font-size: 10px;
  }
}
</style>
