export const viewportTag = `<meta
  name="viewport"
  content="width=device-width, initial-scale=1"
>`
export const wideViewportRem = 40

export const responsiveLayout = `/* Mobile-first: uma coluna é o padrão. */
.catalogo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

/* Se o viewport for largo, use três colunas. */
@media (min-width: ${wideViewportRem}rem) {
  .catalogo {
    grid-template-columns: repeat(3, 1fr);
  }
}`
