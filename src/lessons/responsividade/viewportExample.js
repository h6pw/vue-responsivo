export const viewportTag = `<meta
  name="viewport"
  content="width=device-width, initial-scale=1"
>`
export const wideViewportRem = 40

export const responsiveLayout = `/* Celular com Meta viewport: a largura fica abaixo de 40rem.
   O catálogo começa com os cartões empilhados em uma coluna. */
.catalogo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

/* A regra usa a leitura “Viewport CSS” do laboratório.
   A partir de 40rem, a leitura “Catálogo” mostra 3 colunas. */
@media (min-width: ${wideViewportRem}rem) {
  .catalogo {
    grid-template-columns: repeat(3, 1fr);
  }
}`
