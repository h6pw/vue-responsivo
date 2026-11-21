<script setup>
import LessonSections from '@/components/LessonSections.vue'
import ViewportDiagram from './ViewportDiagram.vue'
import ViewportLab from './ViewportLab.vue'
import { viewportTag, responsiveLayout } from './viewportExample'

defineProps({
  question: { type: String, required: true },
  routeName: { type: String, required: true },
})

const htmlExample = `<!-- No <head>, ajuste o viewport. -->
${viewportTag}

<!-- No <body>, use o mesmo HTML em qualquer largura. -->
<div class="catalogo">
  <article>Introdução</article>
  <article>Layout</article>
  <article>Prática</article>
</div>`

const sources = [
  {
    title: 'MDN Web Docs · Meta viewport',
    description: 'Largura do viewport, escala inicial e comportamento em telas móveis.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport',
  },
  {
    title: 'MDN Web Docs · Responsive web design',
    description: 'Layouts flexíveis, media queries e a abordagem mobile-first.',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design',
  },
]
</script>

<template>
  <LessonSections :route-name="routeName">
    <template #explicacao>
      <div class="lesson-explanation">
        <div class="lesson-explanation-copy">
          <p>
            Uma página responsiva reorganiza o mesmo conteúdo conforme o espaço disponível. No
            celular, empilhar os cartões ajuda a manter o texto legível. Com mais espaço, eles podem
            ficar lado a lado.
          </p>
          <dl class="lesson-concepts">
            <div>
              <dt>Viewport</dt>
              <dd>É a área da janela que exibe a página. Sua largura orienta o layout.</dd>
            </div>
            <div>
              <dt>Media query</dt>
              <dd>Aplica estilos quando uma condição é atendida, como uma largura mínima.</dd>
            </div>
            <div>
              <dt>Mobile-first</dt>
              <dd>Parte do layout para telas estreitas e adiciona colunas quando há espaço.</dd>
            </div>
          </dl>
        </div>
        <figure class="lesson-figure">
          <div class="lesson-layout-diagrams">
            <ViewportDiagram layout="narrow" />
            <ViewportDiagram layout="wide" />
            <span>Celular · 1 coluna</span>
            <span>Tela larga · 3 colunas</span>
          </div>
          <figcaption>Os mesmos cartões A, B e C mudam de posição.</figcaption>
        </figure>
      </div>
    </template>
    <template #exemplo>
      <p>
        O exemplo começa com uma coluna. A partir de <code>40rem</code>, o catálogo ganha três
        colunas.
      </p>
      <div class="lesson-code-grid">
        <figure>
          <figcaption>HTML</figcaption>
          <pre><code>{{ htmlExample }}</code></pre>
        </figure>
        <figure>
          <figcaption>CSS</figcaption>
          <pre><code>{{ responsiveLayout }}</code></pre>
        </figure>
      </div>
      <ViewportLab />
    </template>
    <template #pergunta-guia>
      <p class="lesson-question">{{ question }}</p>
      <p>
        A media query compara o breakpoint com a largura do <strong>viewport CSS</strong>. Veja o
        que acontece na mesma tela de 390 px quando essa largura muda.
      </p>
      <div class="lesson-viewport-comparison">
        <div class="lesson-viewport-case">
          <ViewportDiagram layout="scaled" />
          <div>
            <h3>Sem meta viewport</h3>
            <p class="lesson-case-width">Viewport CSS de 980 px*</p>
            <p>
              A regra de tela larga pode ativar as três colunas. O navegador encolhe a página para
              caber na tela, deixando texto e controles menores.
            </p>
          </div>
        </div>
        <div class="lesson-viewport-case">
          <ViewportDiagram layout="narrow" />
          <div>
            <h3>Com meta viewport</h3>
            <p class="lesson-case-width">Viewport CSS de 390 px</p>
            <p>
              <code>width=device-width</code> acompanha a largura da tela e
              <code>initial-scale=1</code> define a escala inicial. A 390 px, o catálogo fica em uma
              coluna com o breakpoint de <code>40rem</code> (640 px se a fonte padrão for 16 px).
            </p>
          </div>
        </div>
      </div>
      <small>* 980 px é um exemplo de largura virtual, que pode variar entre navegadores.</small>
    </template>
    <template #fontes>
      <ul class="lesson-sources">
        <li v-for="source in sources" :key="source.url">
          <a :href="source.url">{{ source.title }} <span aria-hidden="true">↗</span></a>
          <p>{{ source.description }}</p>
        </li>
      </ul>
    </template>
  </LessonSections>
</template>
