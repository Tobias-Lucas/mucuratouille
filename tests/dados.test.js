import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { dadosReceitas } from '../src/data/receitas.js'
import { filtrarReceitas, normalizar } from '../src/data/filtros.js'

const filtrar = (busca='', categoria='todas', fav=false, ids=[], rapidas=false, ordem='selecao') => filtrarReceitas(dadosReceitas,busca,categoria,fav,ids,rapidas,ordem)

const ler = (caminho) => fs.readFileSync(new URL(caminho, import.meta.url), 'utf8')

test('19 receitas completas, IDs unicos e referencias HTTPS', () => {
  assert.equal(dadosReceitas.length,19)
  assert.equal(new Set(dadosReceitas.map(r=>r.id)).size,19)
  for(const r of dadosReceitas) {
    for(const key of ['id','nome','categoria','tempo','dificuldade','descricao','frase','notaTempo','alergenos']) assert.ok(r[key])
    assert.ok(r.ingredientes.length>=2 && r.passos.length>=3)
    assert.ok(r.minutos>0 && r.porcoes>0)
    assert.equal(new URL(r.fonte.url).protocol,'https:')
  }
})

test('imagens principais e assets locais existem',()=>{
  assert.ok(fs.existsSync(new URL('../public/imagens/mucura-chef.webp',import.meta.url)))
  assert.ok(fs.existsSync(new URL('../public/imagens/mucura-avatar.webp',import.meta.url)))
  for(const r of dadosReceitas) if(r.imagem) assert.ok(fs.existsSync(new URL(`../public/imagens/${r.imagem}.webp`,import.meta.url)))
  for(const asset of ['mucura-rodape.png','equipe-ana.png','equipe-clayton.png','equipe-jonatas.png','equipe-lucas.png']) {
    assert.ok(fs.existsSync(new URL(`../public/imagens/${asset}`,import.meta.url)))
  }
})

test('normalizacao ignora acentos, caixa e espacos externos',()=>assert.equal(normalizar('  TACAC\u00c1  '),'tacaca'))
test('busca encontra nome sem acento',()=>assert.deepEqual(filtrar('manicoba').map(r=>r.id),['manicoba']))
test('busca encontra ingredientes',()=>assert.ok(filtrar('jambu').some(r=>r.id==='tacaca')))
test('busca combina palavras',()=>assert.ok(filtrar('jambu camarao').every(r=>normalizar(r.ingredientes.join(' ')).includes('camarao'))))
test('busca inexistente retorna vazio',()=>assert.equal(filtrar('zzzxxyy').length,0))
test('especial de Cirio possui quatro receitas',()=>assert.equal(filtrar('','cirio').length,4))
test('categoria doces possui tres receitas',()=>assert.equal(filtrar('','doces').length,3))
test('especial de Natal possui quatro receitas',()=>assert.equal(filtrar('','natal').length,4))
test('favoritos vazios nao retornam receitas',()=>assert.equal(filtrar('','todas',true).length,0))
test('favoritos retornam apenas os IDs marcados',()=>assert.deepEqual(filtrar('','todas',true,['tacaca','manicoba']).map(r=>r.id),['manicoba','tacaca']))
test('filtro rapido exclui tempos com espera adicional',()=>{
  const r=filtrar('','todas',false,[],true)
  assert.ok(r.length>0)
  assert.ok(r.every(r=>r.minutos<=45&&!r.tempo.includes('*')))
  assert.ok(!r.some(r=>r.id==='creme-cupuacu'))
})
test('ordenacao por tempo e crescente',()=>{
  const r=filtrar('','todas',false,[],false,'tempo')
  assert.ok(r.every((x,i)=>i===0||x.minutos>=r[i-1].minutos))
})
test('ordenacao nao modifica o catalogo original',()=>{
  const ids=dadosReceitas.map(r=>r.id)
  filtrar('','todas',false,[],false,'nome')
  assert.deepEqual(dadosReceitas.map(r=>r.id),ids)
})

test('fase 3 integra Vue Router e registra o plugin no main',()=>{
  const pkg=JSON.parse(ler('../package.json'))
  assert.equal(pkg.dependencies.vue, '^3.5.13')
  assert.equal(pkg.dependencies['vue-router'], '^4.6.4')
  assert.ok(fs.existsSync(new URL('../src/vendor/bootstrap.min.css',import.meta.url)))
  const main=ler('../src/main.js')
  assert.ok(main.includes("import router from './router/index.js'"))
  assert.ok(main.includes('.use(router).mount'))
  assert.ok(main.includes("./vendor/bootstrap.min.css"))
})

test('router possui rotas principais, dinamica e 404',()=>{
  const router=ler('../src/router/index.js')
  for(const path of ["path: '/'", "path: '/receitas'", "path: '/receita/:id'", "path: '/sobre'", "path: '/equipe'", "path: '/fontes'", "path: '/:pathMatch(.*)*'"]) {
    assert.ok(router.includes(path), `Rota ausente: ${path}`)
  }
  assert.ok(router.includes('createRouter'))
  assert.ok(router.includes('createWebHistory'))
})

test('App usa RouterView e componentes globais permanecem na moldura',()=>{
  const app=ler('../src/App.vue')
  assert.ok(app.includes('<RouterView'))
  assert.ok(app.includes('<Cabecalho'))
  assert.ok(app.includes('<Rodape'))
  assert.ok(app.includes('class="toast show aviso'))
})

test('cabecalho e rodape usam RouterLink para navegacao SPA',()=>{
  const cabecalho=ler('../src/components/Cabecalho.vue')
  const rodape=ler('../src/components/Rodape.vue')
  assert.ok(cabecalho.includes('RouterLink'))
  assert.ok(rodape.includes('RouterLink'))
  for(const rota of ['/receitas','/sobre','/equipe','/fontes']) assert.ok(cabecalho.includes(rota))
})

test('views estao separadas em componentes Vue',()=>{
  const dir=new URL('../src/views/',import.meta.url)
  const files=fs.readdirSync(dir).filter(f=>f.endsWith('.vue')).sort()
  assert.deepEqual(files, ['EquipeView.vue','FontesView.vue','HomeView.vue','NotFoundView.vue','ReceitaView.vue','ReceitasView.vue','SobreView.vue'])
  for(const f of files) assert.ok(fs.readFileSync(new URL(f,dir),'utf8').includes('<script setup>'))
})

test('rota dinamica usa useRoute e reaproveita DetalheReceita',()=>{
  const view=ler('../src/views/ReceitaView.vue')
  assert.ok(view.includes('useRoute'))
  assert.ok(view.includes('route.params.id'))
  assert.ok(view.includes('<DetalheReceita'))
})

test('Bootstrap, progress, toast e badges foram preservados',()=>{
  const detalhe=ler('../src/components/DetalheReceita.vue')
  const app=ler('../src/App.vue')
  assert.ok(detalhe.includes('class="progress detalhe__progress"'))
  assert.ok(detalhe.includes('class="progress-bar detalhe__progress-bar"'))
  assert.ok(detalhe.includes('badge rounded-pill detalhe__info-badge'))
  assert.ok(app.includes('class="toast show aviso'))
})

test('Vercel possui fallback para historico da SPA',()=>{
  const vercel=JSON.parse(ler('../vercel.json'))
  assert.deepEqual(vercel.rewrites,[{source:'/(.*)',destination:'/index.html'}])
})


test('fase 3.1 preserva Router e adiciona melhorias solicitadas',()=>{
  const home=ler('../src/views/HomeView.vue')
  const receita=ler('../src/views/ReceitaView.vue')
  const detalhe=ler('../src/components/DetalheReceita.vue')
  const filtros=ler('../src/components/FiltroCategorias.vue')
  const internas=ler('../src/styles/paginas-internas.css')
  assert.ok(home.includes('Receita do dia'))
  assert.ok(home.includes('home-apresentacao__imagem'))
  assert.ok(receita.includes('Voltar às receitas'))
  assert.ok(detalhe.includes('font-size: 13px'))
  assert.ok(filtros.includes("id: 'natal'"))
  assert.ok(internas.includes('rgba(8, 28, 18, 0.72)'))
})


test('fase 3.2 usa busca global com botao Buscar e Enter pelo submit',()=>{
  const app=ler('../src/App.vue')
  assert.ok(app.includes('<BuscaReceitas'))
  assert.ok(app.includes('@submit.prevent="executarBusca"'))
  assert.ok(app.includes('>Buscar</button>'))
  assert.ok(app.includes("name: 'receitas'"))
  assert.ok(app.includes("query: termo ? { q: termo } : {}"))
})

test('Surpreenda-me fica ao lado das categorias e usa destaque verde',()=>{
  const view=ler('../src/views/ReceitasView.vue')
  const css=ler('../src/style.css')
  assert.ok(view.includes('controles__categorias'))
  assert.ok(view.includes('botao-surpresa--verde'))
  assert.ok(view.includes('<FiltroCategorias'))
  assert.ok(css.includes('.botao-surpresa--verde'))
  assert.ok(view.includes('justify-content-between'))
})

test('Home possui Especial Natal abaixo do Especial Cirio e quatro imagens natalinas',()=>{
  const home=ler('../src/views/HomeView.vue')
  assert.ok(home.indexOf('id="titulo-cirio"') < home.indexOf('id="titulo-natal"'))
  assert.ok(home.includes("const natal = dadosReceitas.filter((receita) => receita.categoria === 'natal')"))
  const natal = dadosReceitas.filter(r=>r.categoria==='natal')
  assert.equal(natal.length,4)
  assert.ok(natal.every(r=>r.imagem))
  for(const r of natal) assert.ok(fs.existsSync(new URL(`../public/imagens/${r.imagem}.webp`,import.meta.url)))
})
