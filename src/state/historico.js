import { ref, watch } from 'vue'
import { dadosReceitas } from '../data/receitas.js'

const CHAVE_HISTORICO = 'mucuratouille:historico:v1'
const LIMITE_HISTORICO = 5
const IDS_RECEITAS = new Set(dadosReceitas.map((receita) => receita.id))

function carregarHistorico() {
  if (typeof window === 'undefined') return []

  try {
    const armazenados = JSON.parse(window.localStorage.getItem(CHAVE_HISTORICO) || '[]')

    if (!Array.isArray(armazenados)) return []

    return [...new Set(armazenados.filter((id) => typeof id === 'string' && IDS_RECEITAS.has(id)))]
      .slice(0, LIMITE_HISTORICO)
  } catch {
    return []
  }
}

function salvarHistorico(ids) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(ids))
  } catch {
    return
  }
}

export const historicoReceitas = ref(carregarHistorico())

watch(historicoReceitas, salvarHistorico, { deep: true })

export function registrarVisualizacao(receita) {
  if (!receita?.id || !IDS_RECEITAS.has(receita.id)) return

  historicoReceitas.value = [
    receita.id,
    ...historicoReceitas.value.filter((id) => id !== receita.id),
  ].slice(0, LIMITE_HISTORICO)
}

export function limparHistorico() {
  historicoReceitas.value = []
}
