<script setup>
import { RouterLink } from 'vue-router'
import CardReceita from '../components/CardReceita.vue'
import { dadosReceitas } from '../data/receitas.js'
import { eFavorita, favoritar } from '../state/favoritos.js'

const destaques = dadosReceitas.filter((receita) => ['pato-no-tucupi', 'tacaca', 'creme-cupuacu'].includes(receita.id))
const cirio = dadosReceitas.filter((receita) => receita.cirio).slice(0, 4)
const natal = dadosReceitas.filter((receita) => receita.categoria === 'natal')
const baseReceitaDoDia = dadosReceitas.filter((receita) => receita.categoria !== 'natal')
const receitaDoDia = baseReceitaDoDia[new Date().getDate() % baseReceitaDoDia.length]
</script>

<template>
  <div class="home-view">
    <section class="home-apresentacao container-fluid px-3 px-lg-4">
      <div class="home-apresentacao__card shadow-sm">
        <img
          class="home-apresentacao__imagem"
          src="/imagens/mucura-chef.webp"
          alt="Mascote Mucuratouille apresentando a culinária paraense em Belém do Pará"
        />
        <div class="home-apresentacao__sombra" aria-hidden="true"></div>
        <div class="home-apresentacao__conteudo">
          <span class="home-apresentacao__selo">Cozinha paraense</span>
          <h1>Sabores do Pará com a personalidade da Mucuratouille.</h1>
          <p>
            Explore receitas tradicionais, descubra os sabores do Círio e escolha o prato que vai para a sua mesa.
          </p>
          <div class="d-flex flex-wrap gap-2 gap-md-3 mt-4">
            <RouterLink class="btn btn-mucura btn-acao rounded-pill px-4" to="/receitas">
              Ver todas as receitas
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="home-secao container-fluid px-3 px-lg-4" aria-labelledby="titulo-destaques">
      <div class="home-secao__cabeca d-flex align-items-end justify-content-between gap-3">
        <div>
          <span class="sobretitulo">COMECE POR AQUI</span>
          <h2 id="titulo-destaques">Receitas em destaque</h2>
        </div>
        <RouterLink class="home-secao__link" to="/receitas">Ver catálogo completo</RouterLink>
      </div>

      <div class="row g-3 g-lg-4">
        <div v-for="receita in destaques" :key="receita.id" class="col-12 col-md-4">
          <CardReceita
            :receita="receita"
            :favorita="eFavorita(receita.id)"
            :selecionada="false"
            @favoritar="favoritar"
          />
        </div>
      </div>
    </section>

    <section class="home-secao home-dia container-fluid px-3 px-lg-4" aria-labelledby="titulo-receita-dia">
      <div class="home-dia__card rounded-4 shadow-sm overflow-hidden">
        <div class="row g-0 align-items-stretch">
          <div class="col-12 col-md-5 home-dia__visual">
            <img
              :src="receitaDoDia.imagemUrl || `/imagens/${receitaDoDia.imagem}.webp`"
              :alt="receitaDoDia.nome"
            />
            <span class="home-dia__selo badge rounded-pill">Receita do dia</span>
          </div>
          <div class="col-12 col-md-7 home-dia__conteudo">
            <span class="sobretitulo">UMA ESCOLHA DA MUCURA</span>
            <h2 id="titulo-receita-dia">{{ receitaDoDia.nome }}</h2>
            <p>{{ receitaDoDia.descricao }}</p>
            <div class="home-dia__meta d-flex flex-wrap gap-2">
              <span>{{ receitaDoDia.tempo }}</span>
              <span>{{ receitaDoDia.porcoes }} porções</span>
              <span>{{ receitaDoDia.dificuldade }}</span>
            </div>
            <p class="home-dia__frase">“{{ receitaDoDia.frase }}”</p>
            <RouterLink
              class="btn btn-mucura btn-acao rounded-pill px-4"
              :to="{ name: 'receita', params: { id: receitaDoDia.id } }"
            >
              Ver receita do dia
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="home-secao home-cirio container-fluid px-3 px-lg-4" aria-labelledby="titulo-cirio">
      <div class="home-cirio__painel rounded-4 shadow-sm">
        <div class="home-secao__cabeca d-flex align-items-end justify-content-between gap-3">
          <div>
            <span class="sobretitulo">TRADIÇÃO À MESA</span>
            <h2 id="titulo-cirio">Especial Círio</h2>
          </div>
          <RouterLink class="home-secao__link" :to="{ name: 'receitas', query: { categoria: 'cirio' } }">
            Ver especial
          </RouterLink>
        </div>
        <div class="row g-2 g-md-3">
          <div v-for="receita in cirio" :key="receita.id" class="col-6 col-lg-3">
            <RouterLink class="home-especial__item" :to="{ name: 'receita', params: { id: receita.id } }">
              <img :src="`/imagens/${receita.imagem}.webp`" :alt="receita.nome" />
              <span>{{ receita.nome }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="home-secao home-natal container-fluid px-3 px-lg-4" aria-labelledby="titulo-natal">
      <div class="home-natal__painel rounded-4 shadow-sm">
        <div class="home-secao__cabeca d-flex align-items-end justify-content-between gap-3">
          <div>
            <span class="sobretitulo home-natal__sobretitulo">SABORES DE FIM DE ANO</span>
            <h2 id="titulo-natal">Especial Natal</h2>
          </div>
          <RouterLink class="home-secao__link home-natal__link" :to="{ name: 'receitas', query: { categoria: 'natal' } }">
            Ver especial
          </RouterLink>
        </div>
        <div class="row g-2 g-md-3">
          <div v-for="receita in natal" :key="receita.id" class="col-6 col-lg-3">
            <RouterLink class="home-especial__item home-especial__item--natal" :to="{ name: 'receita', params: { id: receita.id } }">
              <img :src="`/imagens/${receita.imagem}.webp`" :alt="receita.nome" />
              <span>{{ receita.nome }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  padding: 80px 0 40px;
}

.home-apresentacao,
.home-secao {
  width: min(1380px, 100%);
  margin: 0 auto;
}

.home-apresentacao__card {
  position: relative;
  min-height: 338px;
  overflow: hidden;
  color: #fff;
  background: #173b28;
  border: 1px solid rgba(199, 184, 158, 0.55);
  border-radius: 28px;
}

.home-apresentacao__imagem,
.home-apresentacao__sombra {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.home-apresentacao__imagem {
  object-fit: cover;
  object-position: center 48%;
}

.home-apresentacao__sombra {
  background:
    linear-gradient(90deg, rgba(10, 18, 13, 0.92) 0%, rgba(10, 18, 13, 0.78) 38%, rgba(10, 18, 13, 0.28) 70%, rgba(10, 18, 13, 0.08) 100%),
    linear-gradient(0deg, rgba(8, 20, 13, 0.2), transparent 50%);
}

.home-apresentacao__conteudo {
  position: relative;
  z-index: 2;
  width: min(720px, 62%);
  padding: clamp(30px, 4.4vw, 58px);
}

.home-apresentacao__selo {
  display: inline-flex;
  padding: 7px 11px;
  color: #fff;
  background: #28724b;
  border-radius: 9px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.home-apresentacao h1,
.home-secao h2 {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 800;
}

.home-apresentacao h1 {
  max-width: 660px;
  margin: 14px 0 14px;
  color: #fff;
  font-size: clamp(32px, 4.2vw, 56px);
  line-height: 1.02;
  text-shadow: 0 3px 18px rgba(0, 0, 0, 0.2);
}

.home-apresentacao p {
  max-width: 620px;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  line-height: 1.65;
}

.btn-mucura {
  color: #fff;
  background: #bd4a0a;
  border-color: #bd4a0a;
  font-size: 12px;
  font-weight: 800;
}

.btn-mucura:hover {
  color: #fff;
  background: #9f3d08;
  border-color: #9f3d08;
}

.home-secao {
  margin-top: 42px;
}

.home-secao__cabeca {
  margin-bottom: 16px;
}

.home-secao h2 {
  margin: 4px 0 0;
  color: #24261f;
  font-size: clamp(24px, 3vw, 34px);
}

.home-secao__link {
  color: #8f3b0d;
  font-size: 11px;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
}

.home-secao__link:hover {
  color: #bd4a0a;
  text-decoration: underline;
}

.home-dia__card {
  background: #fffdf8;
  border: 1px solid #dfd0b8;
}

.home-dia__visual {
  position: relative;
  min-height: 300px;
  background: #e5e7d9;
}

.home-dia__visual img {
  width: 100%;
  height: 100%;
  min-height: 300px;
  object-fit: cover;
}

.home-dia__selo {
  position: absolute;
  top: 18px;
  left: 18px;
  padding: 8px 12px;
  color: #fff;
  background: #bd4a0a;
  font-size: 10px;
  font-weight: 800;
}

.home-dia__conteudo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(26px, 4vw, 48px);
}

.home-dia__conteudo h2 {
  margin-top: 6px;
  font-size: clamp(30px, 3.8vw, 42px);
}

.home-dia__conteudo > p {
  max-width: 650px;
  color: #5d6058;
  font-size: 13px;
  line-height: 1.65;
}

.home-dia__meta {
  margin: 4px 0 14px;
}

.home-dia__meta span {
  padding: 6px 9px;
  color: #365142;
  background: #edf2e9;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 800;
}

.home-dia__frase {
  margin-bottom: 18px !important;
  color: #8a4a1d !important;
  font-style: italic;
}

.home-cirio__painel,
.home-natal__painel {
  padding: clamp(18px, 3vw, 30px);
  border: 1px solid #dfd0b8;
}

.home-cirio__painel {
  background: linear-gradient(135deg, rgba(255, 252, 245, 0.96), rgba(244, 232, 211, 0.94));
}

.home-natal__painel {
  background:
    radial-gradient(circle at 93% 10%, rgba(196, 50, 63, 0.11), transparent 25%),
    linear-gradient(135deg, rgba(255, 252, 245, 0.98), rgba(236, 242, 232, 0.96));
  border-color: #d5cbb8;
}

.home-natal__sobretitulo {
  color: #8f2631;
}

.home-natal__link {
  color: #7e2630;
}

.home-especial__item {
  display: block;
  overflow: hidden;
  color: #282a24;
  background: #fff;
  border-radius: 16px;
  text-decoration: none;
  box-shadow: 0 6px 16px rgba(72, 46, 23, 0.08);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.home-especial__item:hover {
  color: #9f3d08;
  transform: translateY(-3px);
  box-shadow: 0 10px 22px rgba(72, 46, 23, 0.14);
}

.home-especial__item--natal:hover {
  color: #8f2631;
}

.home-especial__item img {
  width: 100%;
  height: 115px;
  object-fit: cover;
}

.home-especial__item span {
  display: block;
  padding: 10px 12px;
  font-size: 11px;
  font-weight: 800;
}

@media (max-width: 767.98px) {
  .home-view {
    padding-top: 60px;
  }

  .home-apresentacao__card {
    min-height: 340px;
    border-radius: 22px;
  }

  .home-apresentacao__imagem {
    object-position: 60% center;
  }

  .home-apresentacao__sombra {
    background: linear-gradient(90deg, rgba(10, 18, 13, 0.92) 0%, rgba(10, 18, 13, 0.75) 62%, rgba(10, 18, 13, 0.25) 100%);
  }

  .home-apresentacao__conteudo {
    width: 82%;
    padding: 28px 24px;
  }

  .home-secao {
    margin-top: 30px;
  }

  .home-dia__visual,
  .home-dia__visual img {
    min-height: 230px;
  }
}

@media (max-width: 575.98px) {
  .home-apresentacao__card {
    min-height: 390px;
  }

  .home-apresentacao__imagem {
    object-position: 67% center;
  }

  .home-apresentacao__sombra {
    background: linear-gradient(180deg, rgba(10, 18, 13, 0.35) 0%, rgba(10, 18, 13, 0.78) 44%, rgba(10, 18, 13, 0.94) 100%);
  }

  .home-apresentacao__conteudo {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 22px;
  }

  .home-apresentacao h1 {
    font-size: 32px;
  }

  .home-apresentacao p {
    font-size: 12px;
  }

  .home-dia__conteudo {
    padding: 24px 20px 28px;
  }

  .home-dia__conteudo h2 {
    font-size: 29px;
  }

  .home-especial__item img {
    height: 100px;
  }
}
</style>
