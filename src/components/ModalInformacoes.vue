<script setup>
defineProps({
  tipo: String,
  receitas: Array,
})

const emit = defineEmits(['fechar'])

const integrantes = [
  { nome: 'Ana Paula Silva Amorim', matricula: '04218364', imagem: 'equipe-ana' },
  { nome: 'Clayton China Simões', matricula: '04153200', imagem: 'equipe-clayton' },
  { nome: 'Jônatas Tiago Albuquerque de Moraes', matricula: '04214380', imagem: 'equipe-jonatas' },
  { nome: 'Lucas Jatene Tobias', matricula: '04217989', imagem: 'equipe-lucas' },
]
</script>

<template>
  <div
    class="modal d-block modal-mucura"
    tabindex="-1"
    role="dialog"
    aria-modal="true"
    @click.self="emit('fechar')"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header modal-mucura__cabeca">
          <div>
            <span class="modal-mucura__sobretitulo">MUCURATOUILLE</span>
            <h2 v-if="tipo === 'sobre'" class="modal-title">Sobre o projeto</h2>
            <h2 v-else-if="tipo === 'equipe'" class="modal-title">Equipe</h2>
            <h2 v-else class="modal-title">Fontes das receitas</h2>
          </div>
          <button type="button" class="btn-close" aria-label="Fechar" @click="emit('fechar')"></button>
        </div>

        <div class="modal-body p-4 p-md-5">
          <section v-if="tipo === 'sobre'" class="modal-mucura__texto bg-white rounded-4 shadow-sm p-4 p-md-5">
            <p>
              O <strong>Mucuratouille</strong> é uma aplicação One Page de receitas da culinária
              paraense, desenvolvida pela turma do segundo semestre de Análise e Desenvolvimento
              de Sistemas da UNAMA, em Belém do Pará.
            </p>
            <p>
              A proposta valoriza pratos tradicionais da região, incluindo receitas ligadas ao
              período do Círio de Nazaré, combinando identidade amazônica, humor e fundamentos de
              desenvolvimento front-end com Vue.js.
            </p>
            <p class="mb-0">
              Nesta segunda etapa, a interface foi evoluída com <strong>Bootstrap</strong>, mantendo
              a componentização, as props, os eventos, as diretivas e a reatividade já presentes no
              projeto original.
            </p>
          </section>

          <section v-else-if="tipo === 'equipe'">
            <div class="row g-4">
              <div v-for="integrante in integrantes" :key="integrante.matricula" class="col-12 col-lg-6">
                <article class="card h-100 border-0 shadow-sm rounded-4 modal-mucura__integrante">
                  <div class="card-body d-flex align-items-center gap-3 gap-md-4 p-3 p-md-4">
                    <div class="modal-mucura__personagem">
                      <img
                        :src="`./imagens/${integrante.imagem}.png`"
                        :alt="`Personagem Mucura representando ${integrante.nome}`"
                      />
                    </div>
                    <div class="modal-mucura__dados">
                      <h3 class="card-title h6 mb-2">{{ integrante.nome }}</h3>
                      <p class="card-text mb-0">
                        Matrícula: <strong>{{ integrante.matricula }}</strong>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section v-else>
            <p class="text-secondary mb-4">
              As referências culinárias utilizadas no projeto estão organizadas por receita.
            </p>
            <div class="list-group rounded-4 overflow-hidden shadow-sm">
              <a
                v-for="receita in receitas"
                :key="receita.id"
                :href="receita.fonte.url"
                target="_blank"
                rel="noopener noreferrer"
                class="list-group-item list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-1 gap-md-3 py-3 px-4"
              >
                <strong>{{ receita.nome }}</strong>
                <span class="text-secondary text-md-end">{{ receita.fonte.nome }} ↗</span>
              </a>
            </div>
          </section>
        </div>

        <div class="modal-footer border-0 pt-0 px-4 px-md-5 pb-4">
          <button type="button" class="btn btn-mucura rounded-pill px-4" @click="emit('fechar')">
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop show"></div>
</template>

<style scoped>
.modal-mucura {
  z-index: 1060;
}

.modal-backdrop {
  z-index: 1050;
  background: #101913;
}

.modal-content {
  overflow: hidden;
  color: #35372f;
  background: #efe6d7;
  border-radius: 26px;
}

.modal-mucura__cabeca {
  min-height: 126px;
  padding: 28px 30px;
  color: #fff;
  background-image:
    linear-gradient(90deg, rgba(8, 28, 18, 0.88), rgba(8, 28, 18, 0.58)),
    url('./imagens/rodape-fundo.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-bottom: 0;
}

.modal-mucura__cabeca .btn-close {
  filter: invert(1) grayscale(1) brightness(2);
}

.modal-mucura__sobretitulo {
  display: block;
  margin-bottom: 4px;
  color: #f4ca76;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.modal-title {
  font: 800 30px / 1.1 Georgia, 'Times New Roman', serif;
}

.modal-mucura__texto {
  color: #4f5149;
  font-size: 15px;
  line-height: 1.75;
}

.modal-mucura__integrante {
  min-height: 178px;
  background: #fff;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.modal-mucura__integrante:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 26px rgba(58, 43, 25, 0.13) !important;
}

.modal-mucura__personagem {
  display: flex;
  width: 88px;
  height: 100px;
  flex: 0 0 88px;
  align-items: center;
  justify-content: center;
  align-self: center;
}

.modal-mucura__personagem img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
}

.modal-mucura__dados {
  min-width: 0;
}

.modal-mucura__dados h3 {
  color: #262922;
  font-size: 17px;
  line-height: 1.35;
}

.modal-mucura__dados p {
  color: #5d6057;
  font-size: 14px;
}

.list-group-item {
  border-color: #ece4d7;
}

.btn-mucura {
  color: #fff;
  background: #bd4a0a;
  border-color: #bd4a0a;
}

.btn-mucura:hover {
  color: #fff;
  background: #9f3d08;
  border-color: #9f3d08;
}

@media (max-width: 575.98px) {
  .modal-dialog {
    margin: 12px;
  }

  .modal-mucura__cabeca {
    min-height: 108px;
    padding: 22px 20px;
  }

  .modal-title {
    font-size: 25px;
  }

  .modal-mucura__integrante .card-body {
    flex-direction: column;
    text-align: center;
  }

  .modal-mucura__personagem {
    width: 68px;
    height: 80px;
    flex-basis: 68px;
  }
}
</style>
