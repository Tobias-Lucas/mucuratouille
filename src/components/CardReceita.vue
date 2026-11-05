<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  receita: Object,
  favorita: Boolean,
  selecionada: Boolean,
})

const emit = defineEmits(['favoritar'])
</script>

<template>
  <article
    class="card card-receita h-100 border-0 shadow-sm rounded-4 overflow-hidden"
    :class="{ 'card-receita--selecionada': selecionada }"
    :data-receita="receita.id"
  >
    <div class="card-receita__visual">
      <RouterLink
        :to="{ name: 'receita', params: { id: receita.id } }"
        class="card-receita__imagem-link"
        tabindex="-1"
        aria-hidden="true"
      >
        <img
          v-if="receita.imagemUrl || receita.imagem"
          :src="receita.imagemUrl || `/imagens/${receita.imagem}.webp`"
          alt=""
          width="600"
          height="360"
          loading="lazy"
        />
        <div v-else class="card-receita__placeholder card-receita__placeholder--natal" aria-hidden="true">
          <img src="/imagens/mucura-avatar.webp" alt="" />
          <span>Especial Natal</span>
        </div>
      </RouterLink>

      <span
        class="badge rounded-pill card-receita__selo"
        :class="`card-receita__selo--${receita.cirio ? 'cirio' : receita.categoria}`"
      >
        {{ receita.cirio ? 'Especial Círio' : receita.categoria === 'natal' ? 'Especial Natal' : receita.categoria === 'doces' ? 'Doces e sobremesas' : receita.categoria === 'casa' ? 'Comida de casa' : 'Clássicos da terrinha' }}
      </span>

      <button
        class="btn btn-light rounded-circle shadow-sm card-receita__coracao"
        :class="{ 'card-receita__coracao--ativo': favorita }"
        type="button"
        :aria-label="`${favorita ? 'Remover' : 'Adicionar'} ${receita.nome} ${favorita ? 'dos' : 'aos'} favoritos`"
        :aria-pressed="favorita"
        @click="emit('favoritar', receita)"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20.5 4.1 13C-.5 8.7 2 3.5 6.4 3.5c2.4 0 4.1 1.5 5.6 3.2 1.5-1.7 3.2-3.2 5.6-3.2 4.4 0 6.9 5.2 2.3 9.5L12 20.5Z" />
        </svg>
      </button>
    </div>

    <div class="card-body d-flex flex-column p-3">
      <h2 class="card-title mb-2">
        <RouterLink :to="{ name: 'receita', params: { id: receita.id } }">
          {{ receita.nome }}
        </RouterLink>
      </h2>

      <div class="card-receita__meta d-flex flex-wrap gap-2 mt-auto">
        <span class="card-receita__meta-item">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5v5l3.5 2" />
          </svg>
          {{ receita.tempo }}
        </span>
        <span class="card-receita__meta-item">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="9" cy="8" r="3" />
            <path d="M3.5 18c.5-3.3 2.3-5 5.5-5s5 1.7 5.5 5" />
            <path d="M15.5 7.2a2.6 2.6 0 0 1 0 4.9M16 13.3c2.5.4 3.9 2 4.3 4.7" />
          </svg>
          {{ receita.porcoes }} porções
        </span>
        <span class="card-receita__meta-item">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 14.5h12l-1 6H7l-1-6Z" />
            <path d="M8 14.5V11a4 4 0 0 1 8 0v3.5M9 6.5h6" />
          </svg>
          {{ receita.dificuldade }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card-receita {
  min-width: 0;
  background: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease, outline-color 0.2s ease;
}

.card-receita:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(65, 43, 22, 0.14) !important;
}

.card-receita--selecionada {
  outline: 2px solid #c4510d;
  outline-offset: -2px;
  box-shadow: 0 12px 28px rgba(177, 72, 11, 0.18) !important;
}

.card-receita__visual {
  position: relative;
  height: 154px;
  overflow: hidden;
  background: #e5e7d9;
}

.card-receita__imagem-link {
  display: block;
  height: 100%;
}

.card-receita__visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.28s ease;
}

.card-receita:hover .card-receita__visual img {
  transform: scale(1.045);
}


.card-receita__placeholder {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: flex-end;
  justify-content: space-between;
  padding: 12px 15px;
}

.card-receita__placeholder--natal {
  color: #fff;
  background:
    radial-gradient(circle at 24% 20%, rgba(246, 202, 118, 0.28), transparent 28%),
    linear-gradient(135deg, #8f2631, #173b28 72%);
}

.card-receita__placeholder img {
  width: 74px !important;
  height: 74px !important;
  object-fit: contain !important;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.18));
}

.card-receita__placeholder span {
  max-width: 90px;
  padding-bottom: 6px;
  font: 800 15px/1.05 Georgia, 'Times New Roman', serif;
  text-align: right;
}

.card-receita__selo {
  position: absolute;
  top: 11px;
  left: 11px;
  max-width: calc(100% - 62px);
  overflow: hidden;
  padding: 7px 10px;
  color: #fff;
  background: #256341;
  font-size: 9px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-receita__selo--cirio,
.card-receita__selo--doces {
  background: #a40b52;
}

.card-receita__selo--natal {
  background: #9d2634;
}

.card-receita__selo--casa {
  background: #bd4a0a;
}

.card-receita__coracao {
  position: absolute;
  top: 9px;
  right: 9px;
  display: grid;
  width: 39px;
  height: 39px;
  place-items: center;
  padding: 0;
  color: #365142;
  border: 0;
}

.card-receita__coracao svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linejoin: round;
}

.card-receita__coracao--ativo {
  color: #ef2637;
}

.card-receita__coracao--ativo svg {
  fill: currentColor;
  stroke: currentColor;
}

.card-receita h2 {
  font: 800 17px / 1.2 Arial, Helvetica, sans-serif;
}

.card-receita h2 a {
  color: #1f211c;
  text-decoration: none;
}

.card-receita h2 a:hover {
  color: #9e3d08;
}

.card-receita__meta {
  color: #64675f;
  font-size: 9px;
}

.card-receita__meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  background: #f7f4ee;
  border-radius: 999px;
  white-space: nowrap;
}

.card-receita__meta-item svg {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: #3b5b48;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (max-width: 575.98px) {
  .card-receita {
    border-radius: 16px !important;
  }

  .card-receita__visual {
    height: 116px;
  }

  .card-receita__selo {
    top: 7px;
    left: 7px;
    max-width: calc(100% - 48px);
    padding: 5px 7px;
    font-size: 7px;
  }

  .card-receita__coracao {
    top: 6px;
    right: 6px;
    width: 31px;
    height: 31px;
  }

  .card-receita__coracao svg {
    width: 16px;
    height: 16px;
  }

  .card-receita .card-body {
    padding: 9px !important;
  }

  .card-receita h2 {
    display: -webkit-box;
    min-height: 31px;
    margin-bottom: 7px !important;
    overflow: hidden;
    font-size: 13px;
    line-height: 1.2;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .card-receita__meta {
    gap: 4px !important;
    font-size: 7px;
  }

  .card-receita__meta-item {
    gap: 3px;
    padding: 3px 5px;
  }

  .card-receita__meta-item svg {
    width: 9px;
    height: 9px;
  }
}
</style>
