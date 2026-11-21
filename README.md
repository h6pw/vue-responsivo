# Guia de responsividade com Vue

Projeto acadêmico em dupla, desenvolvido com Vue 3, Vue Router, Pinia e Vite.

## Estado atual

A trilha inicial está navegável. O menu mostra uma prévia animada de cada lição e registra no navegador quais lições foram visitadas. A lição de Responsividade está completa e inclui um laboratório sobre a meta viewport. A lição de Unidades CSS inclui um laboratório de tipografia e layout, com o CSS aplicado à prévia. A lição de Flexbox e Grid inclui um laboratório para comparar os dois layouts. As demais lições e o Desafio estão em desenvolvimento.

## Executar localmente

Use Node.js 22 a partir da versão 22.18 ou Node.js 24.12 ou superior. Na pasta do projeto, execute:

```bash
npm ci
npm run dev
```

Abra o endereço indicado pelo Vite no terminal. Para gerar a versão de produção, execute `npm run build`.

## Rotas

| Rota                   | Conteúdo                               |
| ---------------------- | -------------------------------------- |
| `/`                    | Índice do guia                         |
| `/responsividade`      | Por que responsividade importa         |
| `/unidades-css`        | Unidades CSS                           |
| `/flexbox-grid`        | Flexbox e Grid                         |
| `/imagens-responsivas` | Imagens responsivas                    |
| `/boas-praticas-vue`   | Boas práticas em projetos Vue          |
| `/desafio`             | Pergunta final baseada no próprio guia |

Cada uma das cinco lições terá uma explicação curta, um exemplo de código comentado, a resposta à pergunta-guia e as fontes consultadas. Pelo menos três laboratórios serão incorporados às lições.

O enunciado menciona seis seções, enumera cinco temas e pede a página Desafio separadamente. O projeto considera as cinco lições e a página Desafio como as seis telas exigidas. O índice facilita a navegação.

## Organização do código

- `src/views/` — páginas do guia.
- `src/router/` — rotas e carregamento sob demanda.
- `src/components/` reúne os componentes reutilizáveis, incluindo a navegação das lições, os ícones e as ilustrações das prévias.
- `src/lessons/` agrupa cada tema em sua própria pasta, com exemplos, diagramas e laboratórios.
- `src/data/` reúne os dados usados na trilha e nas rotas das lições.
- `src/stores/` controla o progresso com Pinia.
- `src/assets/` reúne os estilos, as variáveis CSS e as imagens.

## Regras de implementação

- Gerar o projeto com `npm create vue@latest`, usando Vue 3, Vite e Vue Router.
- Usar CSS mobile-first, media queries com `min-width`, fontes e espaçamentos em `rem`, e cores e espaçamentos como variáveis CSS em `:root`.
- Exibir um botão de menu no celular e conferir o layout sem rolagem horizontal.
- Publicar o guia e validar a navegação em um celular.

## Entrega

- Apresentação em 01/12/2026.
- Entrega em 22/12/2026, às 23h59, pelos dois integrantes.
- Entregar os links do site e do GitHub, mais uma captura do site aberto no celular da dupla.
