export const lessons = [
  {
    slug: 'responsividade',
    title: 'Responsividade',
    topic: 'Meta viewport e mobile-first',
    mission: 'Uma página, várias telas.',
    description:
      'Descubra por que uma página pode parecer minúscula no celular e como adaptar o layout à tela de quem está lendo.',
    question:
      'Por que um site com media queries corretas pode parecer uma versão minúscula do desktop quando a meta viewport está ausente?',
    visual: 'viewport',
  },
  {
    slug: 'unidades-css',
    title: 'Unidades CSS',
    topic: 'Unidades absolutas e relativas',
    mission: 'Escolha o que muda de tamanho.',
    description:
      'Compare medidas que seguem a fonte, o contêiner ou a janela e descubra quando usar cada uma.',
    question:
      'Por que um texto em rem cresce quando a pessoa aumenta a fonte padrão do navegador, enquanto o mesmo texto em px mantém o tamanho?',
    visual: 'units',
  },
  {
    slug: 'flexbox-grid',
    title: 'Flexbox e Grid',
    topic: 'Fluxo, espaços e colunas',
    mission: 'Dê forma ao espaço.',
    description: 'Veja o que muda quando os elementos seguem uma linha ou se alinham em uma grade.',
    question:
      'Com repeat(auto-fit, minmax(14rem, 1fr)), gap de 1rem e 1rem = 16px, a partir de qual largura interna cabem duas colunas?',
    visual: 'layout',
  },
  {
    slug: 'imagens-responsivas',
    title: 'Imagens responsivas',
    topic: 'Proporção, recorte e carregamento',
    mission: 'Enquadre sem perder o foco.',
    description:
      'Explore como uma imagem se encaixa na tela e como reservar espaço para ela antes do carregamento.',
    question:
      'Por que o carregamento de uma imagem sem width e height pode empurrar o texto? Qual métrica do Google mede esse deslocamento?',
    visual: 'image',
  },
  {
    slug: 'boas-praticas-vue',
    title: 'Boas práticas em Vue',
    topic: 'Componentes e desempenho',
    mission: 'Organize o que vai crescer.',
    description:
      'Entenda como a organização dos componentes e a identidade dos itens de uma lista afetam o comportamento da interface.',
    question:
      'Numa lista de animais feita com v-for sem :key, o que pode acontecer com o texto digitado no segundo item se o primeiro for removido?',
    visual: 'vue',
  },
]
