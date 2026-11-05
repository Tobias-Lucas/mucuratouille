import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReceitasView from '../views/ReceitasView.vue'
import ReceitaView from '../views/ReceitaView.vue'
import SobreView from '../views/SobreView.vue'
import EquipeView from '../views/EquipeView.vue'
import FontesView from '../views/FontesView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'inicio', component: HomeView },
    { path: '/receitas', name: 'receitas', component: ReceitasView },
    { path: '/receita/:id', name: 'receita', component: ReceitaView },
    { path: '/sobre', name: 'sobre', component: SobreView },
    { path: '/equipe', name: 'equipe', component: EquipeView },
    { path: '/fontes', name: 'fontes', component: FontesView },
    { path: '/:pathMatch(.*)*', name: 'nao-encontrada', component: NotFoundView },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
