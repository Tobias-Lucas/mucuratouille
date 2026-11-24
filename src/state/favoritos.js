import { ref, watch } from 'vue'
import { dadosReceitas } from '../data/receitas.js'

const CHAVE_FAVORITOS = 'mucuratouille:favoritos:v1'
const IDS_RECEITAS = new Set(dadosReceitas.map((receita) => receita.id))

function carregarFavoritos() {
  if (typeof window === 'undefined') return []

  try {
    const armazenados = JSON.parse(window.localStorage.getItem(CHAVE_FAVORITOS) || '[]')

    if (!Array.isArray(armazenados)) return []

    return [...new Set(armazenados.filter((id) => typeof id === 'string' && IDS_RECEITAS.has(id)))]
  } catch {
    return []
  }
}

function salvarFavoritos(ids) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(ids))
  } catch {
    aviso.value = 'Não foi possível salvar os favoritos neste navegador.'
  }
}

export const favoritos = ref(carregarFavoritos())
export const aviso = ref('')

watch(favoritos, salvarFavoritos, { deep: true })

export function eFavorita(id) {
  return favoritos.value.includes(id)
}

export function favoritar(receita) {
  if (!receita?.id || !IDS_RECEITAS.has(receita.id)) return

  if (eFavorita(receita.id)) {
    favoritos.value = favoritos.value.filter((id) => id !== receita.id)
    aviso.value = `${receita.nome} saiu dos favoritos. A mucura fingiu que não sentiu.`
    return
  }

  favoritos.value.push(receita.id)
  aviso.value = `${receita.nome} foi para os favoritos. Escolha respeitável.`
}

export function limparAviso() {
  aviso.value = ''
}
