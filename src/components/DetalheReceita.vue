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
  <article class="detalhe">
    <template v-if="receita">
      <div class="detalhe__hero">
        <img
          :src="receita.imagemUrl || `./imagens/${receita.imagem}.webp`"
          :alt="`Imagem ilustrativa de ${receita.nome}`"
        />

        <div class="detalhe__hero-sombra" aria-hidden="true"></div>

        <div class="detalhe__hero-conteudo">
          <span class="detalhe__selo">
            {{ tituloSelo(receita) }}
          </span>
          <h2 id="titulo-receita">{{ receita.nome }}</h2>
          <p>{{ receita.descricao }}</p>
          <div class="detalhe__infos">
            <span>◷ {{ receita.tempo }}</span>
            <span>♙ {{ receita.porcoes }} porções</span>
            <span>♨ {{ receita.dificuldade }}</span>
          </div>
        </div>

        <button
          class="detalhe__favorito"
          type="button"
          :aria-pressed="favorita"
          @click="emit('favoritar', receita)"
        >
          <span aria-hidden="true">{{ favorita ? '♥' : '♡' }}</span>
          {{ favorita ? 'Favorito' : 'Favoritar' }}
        </button>
      </div>

      <aside v-if="receita.alerta" class="detalhe__seguranca">
        <strong>Antes de começar</strong>
        <p>{{ receita.alerta }}</p>
      </aside>

      <div class="detalhe__corpo">
        <section class="detalhe__ingredientes" aria-labelledby="titulo-ingredientes">
          <div class="detalhe__titulo-secao">
            <span aria-hidden="true">🌿</span>
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
            <progress
              :value="marcados.length"
              :max="receita.ingredientes.length"
              aria-label="Ingredientes separados"
            ></progress>
            <span>{{ marcados.length }} de {{ receita.ingredientes.length }} ingredientes</span>
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

        <section class="detalhe__preparo" aria-labelledby="titulo-preparo">
          <div class="detalhe__titulo-secao">
            <span aria-hidden="true">♨</span>
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
          :src="'./imagens/mucura-dica.webp'"
          width="140"
          height="140"
          alt="Mucuratouille, a mascote do projeto"
        />
        <div>
          <strong>💡 Dica do Mucuratouille</strong>
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
            :src="'./imagens/mucura-chef.webp'"
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

        <div class="detalhe__vitrine-corpo">
          <section class="detalhe__painel">
            <div class="detalhe__titulo-secao">
              <span aria-hidden="true">🧭</span>
              <h3>Como usar</h3>
            </div>
            <ul class="detalhe__lista detalhe__lista--guia">
              <li>Use a busca para localizar receitas por nome ou ingrediente.</li>
              <li>Filtre por categoria para navegar com mais facilidade.</li>
              <li>Clique em qualquer card para abrir ingredientes e modo de preparo.</li>
              <li>Marque favoritos no coração e acompanhe o contador no cabeçalho.</li>
            </ul>
          </section>

          <section class="detalhe__painel detalhe__painel--claro">
            <div class="detalhe__titulo-secao">
              <span aria-hidden="true">🌴</span>
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
            :src="'./imagens/mucura-dica.webp'"
            width="140"
            height="140"
            alt="Mucuratouille, a mascote do projeto"
          />
          <div>
            <strong>💡 Dica do Mucuratouille</strong>
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
  border-radius: 12px;
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
  display: flex;
  flex-wrap: wrap;
  gap: 17px;
  margin-top: 17px;
  font-size: 11px;
  font-weight: 700;
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

.detalhe__favorito span {
  color: #f12e3f;
  font-size: 22px;
  line-height: 1;
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
  display: grid;
  grid-template-columns: 0.9fr 1.15fr;
  gap: 18px;
  padding: 18px 18px 10px;
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

.detalhe__titulo-secao > span {
  font-size: 20px;
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
  gap: 5px;
  margin-top: 7px;
  color: #5e625a;
  font-size: 9px;
}

.detalhe progress {
  width: 100%;
  height: 6px;
  accent-color: var(--verde);
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
  .detalhe__corpo,
  .detalhe__vitrine-corpo {
    grid-template-columns: 1fr;
  }

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

  .detalhe__favorito span {
    font-size: 22px;
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
