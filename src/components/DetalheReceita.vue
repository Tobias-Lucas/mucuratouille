<script setup>
import { computed, ref } from 'vue'
import PokemonInfo from './PokemonInfo.vue'
import { estiloTipos } from '../utils/pokemonTheme.js'

const props = defineProps({ receita: Object, favorita: Boolean, pokemon: Object, carregandoPokemon: Boolean, erroPokemon: String })
const emit = defineEmits(['favoritar'])
const marcados = ref([])
const tema = computed(() => estiloTipos(props.pokemon))
const percentual = computed(() => props.receita?.ingredientes?.length ? Math.round((marcados.value.length / props.receita.ingredientes.length) * 100) : 0)

function limparMarcacoes(){ marcados.value = [] }
function tituloCategoria(categoria){
  return ({ principais:'Prato principal', lanches:'Lanche / petisco', massas:'Massa / risoto', cafe:'Café da manhã', sobremesas:'Sobremesa', especial:'Especial da Mucura' })[categoria] || 'Receita'
}
</script>

<template>
  <article v-if="receita" class="detalhe card border-0 shadow-sm" :style="{ '--poke-accent': tema.corPrimaria, '--poke-accent-2': tema.corSecundaria }">
    <div class="detalhe__hero">
      <img :src="`/placeholders/receitas/${receita.imagem}.png`" :alt="`Imagem da receita ${receita.nome}`" />
      <div class="detalhe__hero-sombra" aria-hidden="true"></div>
      <div class="detalhe__hero-conteudo">
        <span class="detalhe__selo">{{ tituloCategoria(receita.categoria) }}</span>
        <h1>{{ receita.nome }}</h1>
        <p>{{ receita.descricao }}</p>
        <div class="detalhe__infos d-flex flex-wrap gap-2">
          <span>{{ receita.tempo }}</span><span>{{ receita.porcoes }} porções</span><span>{{ receita.dificuldade }}</span>
          <span v-if="pokemon">#{{ String(pokemon.id).padStart(4,'0') }} {{ pokemon.name }}</span>
        </div>
      </div>
      <button class="detalhe__favorito" type="button" :aria-pressed="favorita" @click="emit('favoritar', receita)">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5 4.1 13C-.5 8.7 2 3.5 6.4 3.5c2.4 0 4.1 1.5 5.6 3.2 1.5-1.7 3.2-3.2 5.6-3.2 4.4 0 6.9 5.2 2.3 9.5L12 20.5Z" /></svg>
        {{ favorita ? 'Favorito' : 'Favoritar' }}
      </button>
      <div class="detalhe__accent" aria-hidden="true"></div>
    </div>

    <aside v-if="receita.alerta" class="detalhe__seguranca"><strong>Antes de começar</strong><p>{{ receita.alerta }}</p></aside>

    <div class="detalhe__corpo row g-3 g-lg-4">
      <section class="detalhe__preparo col-12 col-lg-7" aria-labelledby="titulo-preparo">
        <div class="detalhe__titulo-secao"><span class="detalhe__icone" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 9h14v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z"/><path d="M8 9V7a4 4 0 0 1 8 0v2M3 12h2m14 0h2"/></svg></span><div><small>NA COZINHA</small><h2 id="titulo-preparo">Modo de preparo</h2></div></div>
        <ol>
          <li v-for="(passo, indice) in receita.passos" :key="indice">
            <span class="detalhe__numero" aria-hidden="true">{{ indice + 1 }}</span>
            <p>{{ passo }}</p>
          </li>
        </ol>
      </section>

      <div class="col-12 col-lg-5 d-flex flex-column gap-3">
        <PokemonInfo :pokemon="pokemon" :carregando="carregandoPokemon" :erro="erroPokemon" :receita="receita" />

        <section class="detalhe__ingredientes" aria-labelledby="titulo-ingredientes">
          <div class="detalhe__titulo-secao"><span class="detalhe__icone" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0M9 12h6M9 16h4"/></svg></span><div><small>ACOMPANHAMENTOS</small><h2 id="titulo-ingredientes">Demais ingredientes</h2></div></div>
          <ul class="detalhe__lista">
            <li v-for="(ingrediente, indice) in receita.ingredientes" :key="indice">
              <label :class="{ 'detalhe__marcado': marcados.includes(indice) }"><input v-model="marcados" type="checkbox" :value="indice" /><span>{{ ingrediente }}</span></label>
            </li>
          </ul>
          <div class="detalhe__progresso">
            <div class="progress detalhe__progress" :aria-valuenow="marcados.length" aria-valuemin="0" :aria-valuemax="receita.ingredientes.length" role="progressbar"><div class="progress-bar" :style="{ width: `${percentual}%` }"></div></div>
            <div class="d-flex align-items-center justify-content-between gap-2 mt-2"><span>{{ marcados.length }} de {{ receita.ingredientes.length }} ingredientes</span><strong>{{ percentual }}%</strong></div>
          </div>
          <button v-if="marcados.length" class="detalhe__limpar" type="button" @click="limparMarcacoes">Limpar marcações</button>
        </section>
      </div>
    </div>

    <div class="detalhe__dica">
      <img src="/imagens/mucura-dica.webp" width="110" height="110" alt="Mucuratouille" />
      <div><strong>Dica do Mucuratouille</strong><p>“{{ receita.frase }}”</p></div>
    </div>

    <details class="detalhe__referencias">
      <summary>Notas e referências</summary>
      <p>{{ receita.notaTempo }}</p>
      <p><strong>Alergênicos:</strong> {{ receita.alergenos }}</p>
      <p><strong>Pokémon e dados técnicos:</strong> PokéAPI.</p>
    </details>
  </article>
</template>

<style scoped>
.detalhe {
  overflow: hidden;
  background: #fffdf8;
  border: 1px solid #dcd3c5 !important;
  border-radius: 22px !important;
}

.detalhe__hero {
  position: relative;
  min-height: 285px;
  overflow: hidden;
  color: #fff;
}

.detalhe__hero>img,.detalhe__hero-sombra {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.detalhe__hero>img {
  object-fit: cover;
}

.detalhe__hero-sombra {
  background: linear-gradient(90deg,rgba(10,13,11,.86),rgba(10,13,11,.56) 55%,rgba(10,13,11,.16));
}

.detalhe__hero-conteudo {
  position: relative;
  z-index: 2;
  max-width: 720px;
  padding: 30px 30px 34px;
}

.detalhe__selo {
  display: inline-flex;
  padding: 7px 10px;
  color: #fff;
  background: #123c2c;
  border-radius: 999px;
  font-size: 8px;
  font-weight: 900;
  text-transform: uppercase;
}

.detalhe__hero h1 {
  margin: 11px 0 8px;
  font: 800 clamp(28px,4vw,45px)/1 Georgia,'Times New Roman',serif;
}

.detalhe__hero p {
  max-width: 680px;
  margin: 0 0 14px;
  color: rgba(255,255,255,.92);
  font-size: 12px;
}

.detalhe__infos span {
  padding: 6px 9px;
  background: rgba(8,38,27,.85);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 999px;
  font-size: 8px;
  font-weight: 800;
}

.detalhe__favorito {
  position: absolute;
  z-index: 3;
  top: 18px;
  right: 18px;
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  color: #292a24;
  background: #fffdf8;
  border: 0;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 900;
}

.detalhe__favorito svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: #ef4050;
  stroke-width: 1.8;
}

.detalhe__accent {
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 0;
  left: 0;
  height: 7px;
  background: linear-gradient(90deg,var(--poke-accent),var(--poke-accent-2));
}

.detalhe__seguranca {
  display: flex;
  min-height: 72px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 14px 16px 0;
  padding: 14px 18px;
  background: #fff3d7;
  border-left: 4px solid #d58d18;
  border-radius: 10px;
  text-align: center;
}

.detalhe__seguranca strong {
  font-size: 11.5px;
}

.detalhe__seguranca p {
  max-width: 900px;
  margin: 5px auto 0;
  color: #645c50;
  font-size: 10.5px;
  line-height: 1.6;
}

.detalhe__corpo {
  padding: 18px 18px 12px;
}

.detalhe__preparo,.detalhe__ingredientes {
  padding: 18px;
  background: #f7f1e7;
  border-radius: 18px;
}

.detalhe__preparo {
  background: #fffdf8;
  border: 1px solid #ece3d5;
}

.detalhe__titulo-secao {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.detalhe__titulo-secao small {
  display: block;
  color: var(--poke-accent);
  font-size: 7px;
  font-weight: 900;
  letter-spacing: .8px;
}

.detalhe__titulo-secao h2 {
  margin: 2px 0 0;
  color: #292a24;
  font: 800 23px/1.05 Georgia,'Times New Roman',serif;
}

.detalhe__icone {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  color: #fff;
  background: var(--poke-accent);
  border-radius: 11px;
}

.detalhe__icone svg {
  width: 21px;
  height: 21px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.detalhe__preparo ol {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.detalhe__preparo li {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 10px;
  align-items: start;
}

.detalhe__numero {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  color: var(--poke-accent);
  background: transparent;
  border: 2px solid var(--poke-accent);
  border-radius: 50%;
  font-size: 11.5px;
  font-weight: 900;
  box-shadow: none;
}

.detalhe__preparo p {
  margin: 2px 0 0;
  color: #55544e;
  font-size: 12.5px;
  line-height: 1.68;
}

.detalhe__lista {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.detalhe__lista label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #55544e;
  font-size: 11.5px;
  line-height: 1.55;
  cursor: pointer;
}

.detalhe__lista input {
  width: 18px;
  height: 18px;
  margin-top: 0;
  accent-color: var(--poke-accent);
}

.detalhe__marcado span {
  text-decoration: line-through;
  opacity: .58;
}

.detalhe__progresso {
  margin-top: 16px;
  color: #6a665d;
  font-size: 9.5px;
}

.detalhe__progress {
  height: 7px;
  background: #e1dbd1;
}

.detalhe__progress .progress-bar {
  background: var(--poke-accent);
}

.detalhe__limpar {
  margin-top: 8px;
  padding: 0;
  color: var(--poke-accent);
  background: none;
  border: 0;
  font-size: 9.5px;
  font-weight: 900;
}

.detalhe__dica {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 18px 14px;
  padding: 12px 18px;
  background: #fff7e7;
  border: 1px solid #e6b55f;
  border-radius: 16px;
}

.detalhe__dica img {
  width: 72px;
  height: 72px;
  object-fit: contain;
}

.detalhe__dica strong {
  color: #c94c08;
  font-size: 10.5px;
}

.detalhe__dica p {
  margin: 5px 0 0;
  color: #5f594f;
  font-size: 10.5px;
  line-height: 1.5;
}

.detalhe__referencias {
  padding: 11px 18px 18px;
  border-top: 1px solid #ece4d8;
  color: #6d685f;
  font-size: 9.5px;
}

.detalhe__referencias summary {
  color: #123c2c;
  font-weight: 900;
  cursor: pointer;
}

.detalhe__referencias p {
  margin: 7px 0 0;
}

@media (max-width:767.98px) {
  .detalhe__hero {
    min-height: 250px;
  }

  .detalhe__hero-conteudo {
    padding: 28px 18px 30px;
  }

  .detalhe__favorito {
    top: 12px;
    right: 12px;
  }

  .detalhe__corpo {
    padding: 12px;
  }

  .detalhe__preparo,.detalhe__ingredientes {
    padding: 14px;
  }

  .detalhe__preparo p {
    font-size: 11.5px;
  }

  .detalhe__lista label {
    font-size: 10.5px;
  }

  .detalhe__dica {
    margin: 0 12px 12px;
    padding: 10px 12px;
  }

  .detalhe__dica img {
    width: 58px;
    height: 58px;
  }
}
</style>
