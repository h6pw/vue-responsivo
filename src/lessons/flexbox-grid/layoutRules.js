export const rootSize = 16
export const gridMinimum = 14 * rootSize
export const defaultGap = rootSize
export const twoColumnWidth = 2 * gridMinimum + defaultGap

export const cards = [
  { name: 'Introdução', height: 3, color: '#d6eee4' },
  { name: 'Layout', height: 3.75, color: '#dcebf3' },
  { name: 'Prática', height: 3.25, color: '#f1ead2' },
]

export const flexBasis = 9 * rootSize

export function layoutCss({ grid, gap, wrap, justify, align }) {
  const gapRule = `  /* O controle de espaço altera o vão entre os cartões. */
  gap: ${gap / rootSize}rem;`
  return grid
    ? `.catalogo {
  display: grid;
  /* auto-fit cria as colunas que cabem e recolhe as vazias.
     minmax usa 14rem como mínimo e 1fr para dividir a sobra. */
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
${gapRule}
}`
    : `.catalogo {
  display: flex;
  /* Organize cada linha no eixo principal, da esquerda para a direita. */
  justify-content: ${justify};
  /* Compare a altura dos cartões no eixo transversal. */
  align-items: ${align};
  /* Desligue a quebra para ver os cartões saírem da área do catálogo. */
  flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
${gapRule}
}

/* Cada cartão tem base de 9rem e mantém sua largura. */
.cartao { flex: 0 0 9rem; }`
}
