# Guia de responsividade com Vue

Projeto acadêmico em dupla. O guia ensina responsividade com exemplos comentados, perguntas respondidas e experimentos interativos.

## Estrutura prevista

| Rota | Conteúdo |
| --- | --- |
| `/` | Índice do guia |
| `/responsividade` | Por que responsividade importa |
| `/unidades-css` | Unidades CSS |
| `/flexbox-grid` | Flexbox e Grid |
| `/imagens-responsivas` | Imagens responsivas |
| `/boas-praticas-vue` | Boas práticas em projetos Vue |
| `/desafio` | Pergunta final baseada no próprio guia |

Cada uma das cinco lições tem uma explicação curta, um exemplo de código comentado, a resposta à pergunta-guia e fontes consultadas ao final. Pelo menos três laboratórios serão incorporados às lições.

O enunciado menciona seis seções, enumera cinco temas e pede a página Desafio separadamente. O projeto considera as cinco lições e a página Desafio como as seis telas exigidas. O índice facilita a navegação.

## Organização do código

- `src/views/` — páginas do guia.
- `src/router/` — rotas e carregamento sob demanda.
- `src/components/` — navegação, estrutura das lições e código comentado.
- `src/components/labs/` — experimentos interativos.
- `src/assets/` — estilos globais, variáveis CSS e imagens.

## Regras de implementação

- Gerar o projeto com `npm create vue@latest`, usando Vue 3, Vite e Vue Router.
- Usar CSS mobile-first, media queries com `min-width`, fontes e espaçamentos em `rem`, e cores e espaçamentos como variáveis CSS em `:root`.
- Exibir um botão de menu no celular e conferir o layout sem rolagem horizontal.
- Publicar o guia e validar a navegação em um celular.

## Entrega

- Apresentação em 01/12/2026.
- Entrega em 22/12/2026, às 23h59, pelos dois integrantes.
- Entregar os links do site e do GitHub, mais uma captura do site aberto no celular da dupla.
