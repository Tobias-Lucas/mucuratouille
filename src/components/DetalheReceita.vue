<script setup>
import { ref } from 'vue'

const props = defineProps({
  receita: Object,
  favorita: Boolean,
})

const emit = defineEmits(['favoritar'])
const marcados = ref([])

function limparMarcacoes() {
  marcados.value = []
}

function tituloSelo(receita) {
  if (receita.cirio) return 'Especial Círio'
  if (receita.categoria === 'doces') return 'Doces e sobremesas'
  if (receita.categoria === 'casa') return 'Comida de casa'
  return 'Clássicos da terrinha'
}
</script>

<template>
  <article class="detalhe card border-0 shadow-sm">
    <template v-if="receita">
      <div class="detalhe__hero">
        <img
          :src="receita.imagemUrl || `/imagens/${receita.imagem}.webp`"
          :alt="`Imagem ilustrativa de ${receita.nome}`"
        />

        <div class="detalhe__hero-sombra" aria-hidden="true"></div>

        <div class="detalhe__hero-conteudo">
          <span class="detalhe__selo">
            {{ tituloSelo(receita) }}
          </span>
          <h2 id="titulo-receita">{{ receita.nome }}</h2>
          <p>{{ receita.descricao }}</p>
          <div class="detalhe__infos d-flex flex-wrap gap-2">
            <span class="badge rounded-pill detalhe__info-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5l3.5 2"/></svg>
              {{ receita.tempo }}
            </span>
            <span class="badge rounded-pill detalhe__info-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3.5 18c.5-3.3 2.3-5 5.5-5s5 1.7 5.5 5"/><path d="M15.5 7.2a2.6 2.6 0 0 1 0 4.9M16 13.3c2.5.4 3.9 2 4.3 4.7"/></svg>
              {{ receita.porcoes }} porções
            </span>
            <span class="badge rounded-pill detalhe__info-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 14.5h12l-1 6H7l-1-6Z"/><path d="M8 14.5V11a4 4 0 0 1 8 0v3.5M9 6.5h6"/></svg>
              {{ receita.dificuldade }}
            </span>
          </div>
        </div>

        <button
          class="detalhe__favorito"
          type="button"
          :aria-pressed="favorita"
          @click="emit('favoritar', receita)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20.5 4.1 13C-.5 8.7 2 3.5 6.4 3.5c2.4 0 4.1 1.5 5.6 3.2 1.5-1.7 3.2-3.2 5.6-3.2 4.4 0 6.9 5.2 2.3 9.5L12 20.5Z" />
          </svg>
          {{ favorita ? 'Favorito' : 'Favoritar' }}
        </button>
      </div>

      <aside v-if="receita.alerta" class="detalhe__seguranca">
        <strong>Antes de começar</strong>
        <p>{{ receita.alerta }}</p>
      </aside>

      <div class="detalhe__corpo row g-3">
        <section class="detalhe__ingredientes col-12 col-md-5" aria-labelledby="titulo-ingredientes">
          <div class="detalhe__titulo-secao">
            <svg class="detalhe__icone-secao" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 4.5C13 4.8 8.2 8.4 7.2 14.8c4.6.4 8.5-1.3 10.8-5.2-1.9 2.1-4.5 3.8-7.6 4.7"/><path d="M6.4 20c.2-4.1 1.7-7.8 4.5-10.6"/></svg>
            <h3 id="titulo-ingredientes">Ingredientes</h3>
          </div>

          <ul class="detalhe__lista">
            <li v-for="(ingrediente, indice) in receita.ingredientes" :key="indice">
              <label :class="{ 'detalhe__marcado': marcados.includes(indice) }">
                <input v-model="marcados" type="checkbox" :value="indice" />
                <span>{{ ingrediente }}</span>
              </label>
            </li>
          </ul>

          <div class="detalhe__progresso">
            <div
              class="progress detalhe__progress"
              role="progressbar"
              aria-label="Ingredientes separados"
              :aria-valuenow="marcados.length"
              aria-valuemin="0"
              :aria-valuemax="receita.ingredientes.length"
            >
              <div
                class="progress-bar detalhe__progress-bar"
                :style="{ width: `${receita.ingredientes.length ? Math.round((marcados.length / receita.ingredientes.length) * 100) : 0}%` }"
              ></div>
            </div>
            <div class="detalhe__progresso-info d-flex align-items-center justify-content-between gap-2">
              <span>{{ marcados.length }} de {{ receita.ingredientes.length }} ingredientes</span>
              <strong>
                {{ receita.ingredientes.length ? Math.round((marcados.length / receita.ingredientes.length) * 100) : 0 }}%
              </strong>
            </div>
          </div>

          <button
            v-if="marcados.length"
            class="detalhe__limpar"
            type="button"
            @click="limparMarcacoes"
          >
            Limpar marcações
          </button>
        </section>

        <section class="detalhe__preparo col-12 col-md-7" aria-labelledby="titulo-preparo">
          <div class="detalhe__titulo-secao">
            <svg class="detalhe__icone-secao" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 11h12v3.5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V11Z"/><path d="M8 8h8M9 5.5c0-1 .6-1.8 1.5-2.3M13 6c0-1.3.8-2.4 2-3"/></svg>
            <h3 id="titulo-preparo">Modo de preparo</h3>
          </div>

          <ol>
            <li v-for="(passo, indice) in receita.passos" :key="indice">
              <span class="detalhe__numero" aria-hidden="true">{{ indice + 1 }}</span>
              <p>{{ passo }}</p>
            </li>
          </ol>
        </section>
      </div>

      <div class="detalhe__dica">
        <img
          :src="'/imagens/mucura-dica.webp'"
          width="140"
          height="140"
          alt="Mucuratouille, a mascote do projeto"
        />
        <div>
          <strong class="detalhe__dica-titulo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M8.4 14.6A6 6 0 1 1 15.6 14.6C14.8 15.2 14.4 16 14.3 17h-4.6c-.1-1-.5-1.8-1.3-2.4Z"/></svg>Dica do Mucuratouille</strong>
          <p>“{{ receita.frase }}”</p>
        </div>
      </div>

      <details class="detalhe__referencias">
        <summary>Notas e referência da receita</summary>
        <p>{{ receita.notaTempo }}</p>
        <p><strong>Alergênicos:</strong> {{ receita.alergenos }}</p>
        <a :href="receita.fonte.url" target="_blank" rel="noopener noreferrer">
          {{ receita.fonte.nome }} ↗
        </a>
      </details>
    </template>

    <template v-else>
      <section class="detalhe__vitrine" aria-labelledby="titulo-vitrine">
        <div class="detalhe__vitrine-hero">
          <img
            :src="'/imagens/mucura-chef.webp'"
            alt="Mascote Mucuratouille com uma panela de comida paraense em Belém do Pará"
          />
          <div class="detalhe__hero-sombra" aria-hidden="true"></div>
          <div class="detalhe__vitrine-conteudo">
            <span class="detalhe__selo detalhe__selo--aberto">Receitas do Pará</span>
            <h2 id="titulo-vitrine">Escolha uma receita para ver os detalhes</h2>
            <p>
              Explore pratos clássicos da culinária paraense, descubra receitas especiais do
              período do Círio e marque seus favoritos para montar sua seleção.
            </p>
          </div>
        </div>

        <div class="detalhe__vitrine-corpo row g-3">
          <section class="detalhe__painel col-12 col-md-5">
            <div class="detalhe__titulo-secao">
              <svg class="detalhe__icone-secao" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="m14.8 9.2-1.7 3.9-3.9 1.7 1.7-3.9 3.9-1.7Z"/></svg>
              <h3>Como usar</h3>
            </div>
            <ul class="detalhe__lista detalhe__lista--guia">
              <li>Use a busca para localizar receitas por nome ou ingrediente.</li>
              <li>Filtre por categoria para navegar com mais facilidade.</li>
              <li>Clique em qualquer card para abrir ingredientes e modo de preparo.</li>
              <li>Marque favoritos no coração e acompanhe o contador no cabeçalho.</li>
            </ul>
          </section>

          <section class="detalhe__painel detalhe__painel--claro col-12 col-md-7">
            <div class="detalhe__titulo-secao">
              <svg class="detalhe__icone-secao" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21v-9M12 12c-1.1-3.8-4-6-8-6 0 4.3 2.9 7 8 6Zm0 0c1.1-4.2 4.2-6.6 8.3-6.3-.2 4.3-3.3 6.9-8.3 6.3ZM8.5 21h7"/></svg>
              <h3>Sobre o projeto</h3>
            </div>
            <p>
              O Mucuratouille é uma aplicação One Page em Vue 3 sobre culinária paraense,
              criada como trabalho acadêmico da turma do segundo semestre de ADS da UNAMA,
              em Belém do Pará.
            </p>
            <p>
              O projeto utiliza componentes .vue, props, ref(), eventos e diretivas básicas
              para demonstrar os conteúdos estudados em sala.
            </p>
          </section>
        </div>

        <div class="detalhe__dica detalhe__dica--aberta">
          <img
            :src="'/imagens/mucura-dica.webp'"
            width="140"
            height="140"
            alt="Mucuratouille, a mascote do projeto"
          />
          <div>
            <strong class="detalhe__dica-titulo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M8.4 14.6A6 6 0 1 1 15.6 14.6C14.8 15.2 14.4 16 14.3 17h-4.6c-.1-1-.5-1.8-1.3-2.4Z"/></svg>Dica do Mucuratouille</strong>
            <p>“Começa por uma receita clássica e depois te aventura no resto. A fama de chef nasce assim.”</p>
          </div>
        </div>
      </section>
    </template>
  </article>
</template>

<style scoped>
.detalhe {
  overflow: hidden;
  background: #fffdf8;
  border: 1px solid #d8d0c3;
  border-radius: 20px;
  box-shadow: 0 10px 26px rgba(75, 49, 24, 0.1);
}

.detalhe__hero,
.detalhe__vitrine-hero {
  position: relative;
  min-height: 212px;
  overflow: hidden;
  color: #fff;
}

.detalhe__hero > img,
.detalhe__vitrine-hero > img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detalhe__hero-sombra {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(16, 12, 8, 0.9) 0%, rgba(16, 12, 8, 0.58) 44%, rgba(16, 12, 8, 0.1) 100%);
}

.detalhe__hero-conteudo,
.detalhe__vitrine-conteudo {
  position: relative;
  z-index: 1;
  width: 62%;
  padding: 20px 20px 16px;
}

.detalhe__selo {
  display: inline-block;
  padding: 6px 10px;
  background: #a40b52;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 800;
}

.detalhe__selo--aberto {
  background: #256341;
}

.detalhe__hero h2,
.detalhe__vitrine h2 {
  margin: 11px 0 4px;
  font: 800 29px / 1.05 Georgia, 'Times New Roman', serif;
  letter-spacing: -0.8px;
}

.detalhe__hero p,
.detalhe__vitrine-conteudo p {
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
}

.detalhe__infos {
  margin-top: 17px;
  font-size: 11px;
  font-weight: 700;
}

.detalhe__info-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 9px;
  color: #fff;
  background: rgba(25, 47, 34, 0.82);
  font-size: 10px;
  font-weight: 700;
  backdrop-filter: blur(4px);
}

.detalhe__infos svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.detalhe__favorito {
  position: absolute;
  z-index: 2;
  top: 14px;
  right: 14px;
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  gap: 7px;
  padding: 9px 13px;
  color: #2e2d28;
  background: rgba(255, 255, 255, 0.96);
  border: 0;
  border-radius: 10px;
  font: inherit;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
}

.detalhe__favorito svg {
  width: 21px;
  height: 21px;
  fill: none;
  stroke: #f12e3f;
  stroke-width: 1.7;
  stroke-linejoin: round;
}

.detalhe__favorito[aria-pressed="true"] svg {
  fill: #f12e3f;
}

.detalhe__seguranca {
  margin: 14px 16px 0;
  padding: 11px 13px;
  color: #69490f;
  background: #fff5d9;
  border-left: 4px solid #bd7c1a;
  border-radius: 7px;
  font-size: 10px;
  line-height: 1.5;
}

.detalhe__seguranca strong {
  display: block;
  margin-bottom: 3px;
}

.detalhe__seguranca p {
  margin: 0;
}

.detalhe__corpo,
.detalhe__vitrine-corpo {
  margin: 0;
  padding: 18px 10px 10px;
}

.detalhe__ingredientes,
.detalhe__painel {
  padding: 13px;
  background: #f6f1e7;
  border-radius: 10px;
}

.detalhe__painel--claro {
  background: #faf6ee;
  color: #505147;
  font-size: 11px;
  line-height: 1.55;
}

.detalhe__painel p {
  margin: 0 0 10px;
}

.detalhe__painel p:last-child {
  margin-bottom: 0;
}

.detalhe__titulo-secao {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 9px;
}

.detalhe__icone-secao {
  width: 21px;
  height: 21px;
  flex-shrink: 0;
  fill: none;
  stroke: #39714f;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.detalhe h3 {
  margin: 0;
  color: #25261f;
  font: 800 18px / 1.15 Arial, Helvetica, sans-serif;
}

.detalhe__lista {
  margin: 0;
  padding: 0;
  list-style: none;
}

.detalhe__lista label {
  display: flex;
  min-height: 32px;
  align-items: flex-start;
  gap: 9px;
  padding: 6px 0;
  color: #4e5049;
  font-size: 10px;
  line-height: 1.35;
  cursor: pointer;
}

.detalhe__lista input {
  width: 17px;
  height: 17px;
  margin: 0;
  flex-shrink: 0;
  accent-color: var(--verde);
}

.detalhe__lista--guia li {
  color: #4e5049;
  font-size: 11px;
  line-height: 1.55;
  padding: 0 0 8px 18px;
  position: relative;
}

.detalhe__lista--guia li::before {
  content: '•';
  position: absolute;
  left: 4px;
  color: var(--laranja);
  font-weight: 900;
}

.detalhe__marcado span {
  color: #777a72;
  text-decoration: line-through;
}

.detalhe__progresso {
  display: grid;
  gap: 7px;
  margin-top: 9px;
  color: #5e625a;
  font-size: 9px;
}

.detalhe__progress {
  height: 8px;
  overflow: hidden;
  background: #e2ddd2;
  border-radius: 999px;
}

.detalhe__progress-bar {
  background: linear-gradient(90deg, #2d6647, #5b8c66);
  border-radius: 999px;
  transition: width 0.2s ease;
}

.detalhe__progresso-info strong {
  color: #2d6647;
  font-size: 9px;
}

.detalhe__limpar {
  margin-top: 8px;
  padding: 5px 0;
  color: var(--verde);
  background: transparent;
  border: 0;
  font: inherit;
  font-size: 9px;
  text-decoration: underline;
  cursor: pointer;
}

.detalhe__preparo ol {
  margin: 11px 0 0;
  padding: 0;
  list-style: none;
}

.detalhe__preparo li {
  display: flex;
  gap: 10px;
  padding-bottom: 11px;
}

.detalhe__numero {
  display: grid;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  place-items: center;
  color: #fff;
  background: #c94f07;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 800;
}

.detalhe__preparo li p {
  margin: 2px 0 0;
  color: #4b4e47;
  font-size: 10px;
  line-height: 1.42;
}

.detalhe__dica {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 4px 18px 18px;
  padding: 4px 12px 4px 4px;
  background: #fff8e8;
  border: 1px solid #e7bd62;
  border-radius: 12px;
}

.detalhe__dica img {
  width: 110px;
  height: 80px;
  flex-shrink: 0;
  object-fit: contain;
}

.detalhe__dica strong {
  color: #dc6d0e;
  font-size: 11px;
}

.detalhe__dica-titulo {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.detalhe__dica-titulo svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.detalhe__dica p {
  margin: 5px 0 0;
  color: #4c4c45;
  font-size: 10px;
  line-height: 1.45;
}

.detalhe__dica--aberta {
  margin-top: 6px;
}

.detalhe__referencias {
  border-top: 1px solid #e2d9cb;
  padding: 10px 18px 14px;
  color: #696b63;
  font-size: 9px;
  line-height: 1.5;
}

.detalhe__referencias summary {
  min-height: 32px;
  padding: 7px 0;
  color: var(--verde);
  font-weight: 700;
  cursor: pointer;
}

.detalhe__referencias a {
  color: var(--verde);
}

@media (max-width: 1180px) {
  .detalhe__hero-conteudo,
  .detalhe__vitrine-conteudo {
    width: 72%;
  }
}

@media (max-width: 640px) {
  .detalhe__hero,
  .detalhe__vitrine-hero {
    min-height: 208px;
  }

  .detalhe__hero-conteudo,
  .detalhe__vitrine-conteudo {
    width: 78%;
    padding: 18px;
  }

  .detalhe__hero h2,
  .detalhe__vitrine h2 {
    font-size: 25px;
  }

  .detalhe__favorito {
    top: 10px;
    right: 10px;
    padding: 8px;
    font-size: 0;
  }

  .detalhe__favorito svg {
    width: 22px;
    height: 22px;
  }

  .detalhe__dica {
    align-items: flex-start;
    padding-right: 10px;
  }

  .detalhe__dica img {
    width: 92px;
    height: 72px;
  }
}
</style>
