import { ref } from 'vue'

export const favoritos = ref([])
export const aviso = ref('')

export function eFavorita(id) {
  return favoritos.value.includes(id)
}

export function favoritar(receita) {
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
