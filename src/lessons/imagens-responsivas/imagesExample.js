const base = import.meta.env.BASE_URL
export const imageSources = [400, 800, 1200].map((width) => {
  const file = 'paisagem-' + width + '.png'
  return { width, file, url: base + 'imagens/' + file }
})
export const imageSizes = '(min-width: 48rem) min(50vw, 32rem), 100vw'

export const imageHtmlExample = `<!-- 1. width e height informam a proporção original da imagem (1200x800).
     Com isso, o navegador reserva o espaço antes de baixar o arquivo,
     evitando que o texto abaixo seja empurrado (evita CLS).
     2. srcset e sizes entregam a resolução ideal para cada tela.
     3. loading="lazy" carrega apenas quando a imagem se aproxima da tela. -->
<img
  src="./imagens/paisagem-800.png"
  srcset="./imagens/paisagem-400.png 400w,
          ./imagens/paisagem-800.png 800w,
          ./imagens/paisagem-1200.png 1200w"
  sizes="${imageSizes}"
  width="1200"
  height="800"
  alt="Cordilheira ao entardecer sob céu límpido"
  loading="lazy"
  class="foto-responsiva"
/>`

export const imageCssExample = `/* Regra de ouro da responsividade de imagens:
   - max-width: 100% impede que a imagem transborde a largura do pai.
   - height: auto preserva a proporção natural da imagem. */
.foto-responsiva {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Quando precisamos de um formato fixo (ex: cartão 16:9):
   - aspect-ratio define a proporção desejada.
   - object-fit: cover preenche toda a área sem distorcer o conteúdo. */
.foto-cartao {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: center;
}
`
