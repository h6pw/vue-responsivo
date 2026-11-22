# Guia interativo de responsividade com Vue 3

Projeto acadêmico em dupla para estudar como páginas web se adaptam a diferentes telas. Cada lição reúne explicações visuais, exemplos comentados, um laboratório interativo, uma pergunta-guia respondida e referências.

[**Acessar o guia**](https://h6pw.github.io/vue-responsivo/)

## O que você pode explorar

| Módulo               | Prática                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Responsividade       | Compare telas com e sem a meta viewport e observe quando o catálogo muda de coluna.                                         |
| Unidades CSS         | Altere a fonte raiz e as dimensões do painel para comparar unidades como `px`, `rem`, `em`, `%`, `vw` e `fr`.               |
| Flexbox e Grid       | Ajuste alinhamento, quebra de linha, largura e espaçamento enquanto acompanha o CSS aplicado.                               |
| Imagens responsivas  | Compare a reserva de espaço, explore recortes e teste como `srcset` oferece diferentes resoluções.                          |
| Boas práticas em Vue | Veja o efeito de `:key` nos campos de uma lista, explore Core Web Vitals e experimente os efeitos de alterar design tokens. |
| Desafio final        | Responda a três questões dos laboratórios e confira a pontuação e as explicações.                                           |

## Tecnologias

Vue 3, Vue Router, Pinia, Vite e CSS. A navegação usa rotas com hash para que links diretos funcionem no GitHub Pages. O progresso das lições fica no navegador.

## Como executar localmente

Use Node.js 22.18 ou mais recente da série 22, ou Node.js 24.12 ou superior.

```bash
npm ci
npm run dev
```

Abra a URL exibida pelo Vite. Para gerar e conferir o build de produção, execute `npm run build` e `npm run preview`.

## Organização do código

- `src/lessons/` reúne o conteúdo e os laboratórios por tema.
- `src/components/` guarda os componentes compartilhados, incluindo a navegação das lições e os blocos de código.
- `src/views/` contém a abertura do guia, o contêiner das lições e o Desafio.
- `src/router/` define as rotas, e `src/stores/` guarda o progresso da trilha.
- `public/imagens/` contém as versões da paisagem usadas no exemplo de `srcset`.
