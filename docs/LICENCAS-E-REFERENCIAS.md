# Créditos, fontes e materiais

## Materiais da disciplina

Aulas 01 a 05 fornecidas nesta conversa, de Front-End Frameworks, professor André Neto. Foram usadas como referência para delimitar a estrutura e o nível de Vue. Os PDFs originais não foram redistribuídos neste pacote.

## Identidade e imagens

A marca Mucuratouille e a mascote foram criadas para o projeto. A imagem principal da mucura chef, o avatar e parte das imagens culinárias foram produzidos com apoio de IA e utilizados apenas com finalidade acadêmica e ilustrativa.

As receitas de caruru paraense e caldeirada paraense receberam novas imagens ilustrativas geradas para o projeto. Quatro receitas utilizam imagens externas por URL e dependem de conexão com a internet: Bolinho de piracuí (Receitas Nestlé), Farofa de camarão (Sabores Ajinomoto), Chibé (Receitas Nestlé) e Doce cremoso de bacuri (Comida e Receitas). Os respectivos créditos também aparecem no README.

Não há arquivos de fontes tipográficas no projeto: a interface utiliza fontes disponíveis no dispositivo.

## Referências culinárias

Cada receita guarda nome e URL de consulta em `src/data/receitas.js`, visíveis no detalhe e no rodapé. Os textos foram adaptados, com quantidades e rendimentos sugeridos para a demonstração. As fontes variam entre receitas de autores, publicações culinárias e uma referência cultural de turismo. Uma fonte cultural não é apresentada como validação das quantidades do prato.

Referências complementares consultadas em 11/10/2026:

- [Diretoria da Festa de Nazaré: programação do Círio 2026](https://www.ciriodenazare.com.br/noticias/diretoria-da-festa-de-nazare-apresenta-o-roteiro-das-14-procissoes-do-cirio-2026).
- [Embrapa: protocolo de segurança do tucupi](https://www.embrapa.br/busca-de-noticias/-/noticia/25540013/pesquisa-estabelece-protocolo-de-seguranca-para-a-fabricacao-de-tucupi/?link=agencia).
- [Embrapa: avaliação do processamento de maniva cozida](https://www.embrapa.br/busca-de-publicacoes/-/publicacao/1163289/avaliacao-dos-processos-utilizados-na-producao-de-maniva-cozida-na-regiao-norte-do-brasil).
- [Governo do Pará: consumo seguro do açaí](https://agenciapara.com.br/noticia/78887/governo-reforca-orientacoes-para-o-consumo-seguro-de-acai-na-safra).
- [FoodSafety.gov: temperaturas internas mínimas seguras](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures).
- [Vue: documentação oficial de script setup](https://vuejs.org/api/sfc-script-setup.html).
- [Vite: guia oficial](https://vite.dev/guide/).

## Runtime da demonstração

`scripts/vue.global.prod.js` contém o runtime oficial Vue **3.5.13**, distribuído sob licença MIT. O cabeçalho original foi preservado. Ele é usado somente na exportação autônoma; o projeto Vite utiliza a dependência declarada no `package.json`.

### Vue — MIT License

Copyright (c) 2018-present, Yuxi (Evan) You and Vue contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
