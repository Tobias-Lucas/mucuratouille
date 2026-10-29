import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { dadosReceitas } from '../src/data/receitas.js'
import { filtrarReceitas, normalizar } from '../src/data/filtros.js'
const filtrar = (busca='', categoria='todas', fav=false, ids=[], rapidas=false, ordem='selecao') => filtrarReceitas(dadosReceitas,busca,categoria,fav,ids,rapidas,ordem)

test('15 receitas completas, IDs unicos e referencias HTTPS', () => {
  assert.equal(dadosReceitas.length,15)
  assert.equal(new Set(dadosReceitas.map(r=>r.id)).size,15)
  for(const r of dadosReceitas) {
    for(const key of ['id','nome','categoria','tempo','dificuldade','descricao','frase','notaTempo','alergenos']) assert.ok(r[key])
    assert.ok(r.ingredientes.length>=2 && r.passos.length>=3)
    assert.ok(r.minutos>0 && r.porcoes>0)
    assert.equal(new URL(r.fonte.url).protocol,'https:')
  }
})
test('imagens principais e novos assets locais existem',()=>{
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
test('sete componentes distintos e App usam script setup',()=>{
  const dir=new URL('../src/components/',import.meta.url)
  const files=fs.readdirSync(dir).filter(f=>f.endsWith('.vue'))
  assert.equal(files.length,7)
  for(const f of files) assert.ok(!/(?<!:)src="\.\/imagens\//.test(fs.readFileSync(new URL(f,dir),'utf8')),'Imagens publicas devem usar binding, nao imports relativos implicitos')
  for(const f of files) assert.ok(fs.readFileSync(new URL(f,dir),'utf8').includes('<script setup>'))
  const app=fs.readFileSync(new URL('../src/App.vue',import.meta.url),'utf8')
  for(const f of files) assert.ok(app.includes(`<${f.replace('.vue','')}`))
})
test('fase 2 usa Bootstrap local e continua sem roteamento ou estado externo',()=>{
  const pkg=JSON.parse(fs.readFileSync(new URL('../package.json',import.meta.url),'utf8'))
  assert.deepEqual(Object.keys(pkg.dependencies),['vue'])
  assert.deepEqual(Object.keys(pkg.devDependencies).sort(),['@vitejs/plugin-vue','vite'])
  assert.ok(fs.existsSync(new URL('../src/vendor/bootstrap.min.css',import.meta.url)))
  const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8')
  assert.ok(main.includes("./vendor/bootstrap.min.css"))
  assert.ok(!main.includes('vue-router'))
  const app=fs.readFileSync(new URL('../src/App.vue',import.meta.url),'utf8')
  const detalhe=fs.readFileSync(new URL('../src/components/DetalheReceita.vue',import.meta.url),'utf8')
  assert.ok(app.includes('class="toast show aviso'))
  assert.ok(detalhe.includes('class="progress detalhe__progress"'))
  assert.ok(detalhe.includes('class="progress-bar detalhe__progress-bar"'))
  assert.ok(detalhe.includes('badge rounded-pill detalhe__info-badge'))
})
