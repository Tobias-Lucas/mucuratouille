import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')
const names = ['Cabecalho', 'BuscaReceitas', 'FiltroCategorias', 'CardReceita', 'DetalheReceita', 'Rodape', 'App']
const imagens = {}
for (const file of fs.readdirSync(path.join(root, 'public/imagens'))) {
  const ext = path.extname(file).toLowerCase()
  if (!['.webp', '.png', '.jpg', '.jpeg'].includes(ext)) continue
  const mime = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/webp'
  imagens[path.basename(file, ext)] = `data:${mime};base64,` + fs.readFileSync(path.join(root, 'public/imagens', file)).toString('base64')
}
let css = read('src/style.css')
let output = 'const { ref, watch } = Vue;\nconst imagens = ' + JSON.stringify(imagens) + ';\n'
for (const module of ['receitas.js', 'filtros.js']) output += read('src/data/' + module).replace(/^export /gm, '') + '\n'

for (const name of names) {
  const file = name === 'App' ? 'src/App.vue' : `src/components/${name}.vue`
  const source = read(file)
  let script = source.match(/<script setup>([\s\S]*?)<\/script>/)?.[1]
  let template = source.match(/<template>([\s\S]*?)<\/template>/)?.[1]
  if (script === undefined || template === undefined) throw new Error('SFC invalido: ' + file)
  css += '\n' + (source.match(/<style(?: scoped)?>([\s\S]*?)<\/style>/)?.[1] || '')
  const children = [...script.matchAll(/^import (\w+) from ['"].*?\.vue['"]/gm)].map((m) => m[1])
  script = script.replace(/^import .*? from .*?\r?\n/gm, '')
  let props = '{}', emits = '[]'
  script = script.replace(/(?:const (\w+) = )?defineProps\((\{[^]*?\})\)/, (_, binding, obj) => {
    props = obj
    return binding ? `const ${binding} = __props` : ''
  })
  script = script.replace(/const (\w+) = defineEmits\((\[[^]*?\])\)/, (_, binding, arr) => {
    emits = arr
    return `const ${binding} = __emit`
  })
  template = template.replace(/:src="'\.\/imagens\/([\w-]+)\.(?:webp|png|jpg|jpeg)'"/g, (_, key) => `:src="imagens['${key}']"`)
  const bindings = [...script.matchAll(/^(?:const|let|function) (\w+)/gm)].map((m) => m[1])
  template = template.replace(/src="\.\/imagens\/([\w-]+)\.(?:webp|png|jpg|jpeg)"/g, (_, key) => `:src="imagens['${key}']"`)
  template = template.replace(/:src="receita\.imagemUrl \|\| `\.\/imagens\/\$\{receita\.imagem\}\.webp`"/g, ':src="receita.imagemUrl || imagens[receita.imagem]"')
  template = template.replace(/:src="`\.\/imagens\/\$\{receita\.imagem\}\.webp`"/g, ':src="imagens[receita.imagem]"')
  output += `\nconst ${name} = { name: '${name}', props: ${props}, emits: ${emits}, components: { ${children.join(', ')} }, setup(__props, { emit: __emit }) {\n${script}\nreturn { ${[...new Set([...bindings, 'imagens'])].join(', ')} };\n}, template: ${JSON.stringify(template)} };\n`
}
output += "\nVue.createApp(App).mount('#app');\n"
const runtime = read('scripts/vue.global.prod.js')
const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="theme-color" content="#234b38"><title>Mucuratouille - Receitas do Par&#225;</title><link rel="icon" href="${imagens['mucura-avatar']}"><style>${css}</style></head>
<body><div id="app"></div><script>${runtime}</script><script>${output.replace(/<\/script/gi, '<\\/script')}</script></body></html>`
fs.writeFileSync(path.join(root, 'demo.html'), html)
console.log(`demo.html criada: ${(Buffer.byteLength(html)/1024/1024).toFixed(2)} MB. ${names.length-1} componentes + App, ${Object.keys(imagens).length} imagens locais.`)
