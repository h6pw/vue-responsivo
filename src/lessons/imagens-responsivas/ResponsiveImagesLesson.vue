<script setup>
import LessonCode from '@/components/LessonCode.vue'
import LessonSections from '@/components/LessonSections.vue'
import ImagesLab from './ImagesLab.vue'
import { imageCssExample, imageHtmlExample } from './imagesExample'

defineProps({
  question: { type: String, required: true },
  routeName: { type: String, required: true },
})

const sources = [
  {
    title: 'MDN Web Docs · Responsive images',
    description: 'Uso de srcset, sizes, elemento picture e boas práticas de resolução.',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Images',
  },
  {
    title: 'MDN Web Docs · object-fit',
    description: 'Como imagens e vídeos se adaptam às dimensões de seus contêineres.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit',
  },
  {
    title: 'MDN Web Docs · aspect-ratio',
    description: 'Definição explícita de proporções de aspecto no CSS moderno.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio',
  },
  {
    title: 'web.dev · Cumulative Layout Shift (CLS)',
    description: 'Guia do Google para mensurar e evitar deslocamentos inesperados de layout.',
    url: 'https://web.dev/articles/cls',
  },
  {
    title: 'web.dev · Browser-level image lazy loading',
    description: 'Carregamento sob demanda com loading="lazy" e quando evitar no LCP.',
    url: 'https://web.dev/articles/browser-level-image-lazy-loading',
  },
]
</script>

<template>
  <LessonSections :route-name="routeName">
    <!-- 1. Explicação curta -->
    <template #explicacao>
      <div class="lesson-explanation">
        <div class="lesson-explanation-copy">
          <p>
            Imagens em páginas web não podem ter tamanho rígido, senão estouram a tela de celulares
            ou gastam a internet móvel do usuário sem necessidade. Tornar uma imagem responsiva
            significa garantir que ela <strong>se ajuste ao espaço disponível</strong>,
            <strong>preserve sua proporção</strong> e <strong>reserve seu lugar na tela</strong>
            antes de ser baixada.
          </p>

          <dl class="lesson-concepts">
            <div>
              <dt>max-width: 100% e height: auto</dt>
              <dd>
                A regra mais fundamental do design responsivo. Impede que a imagem ultrapasse a
                largura da tela e mantém a altura proporcional automaticamente, sem achatar.
              </dd>
            </div>
            <div>
              <dt>width e height no HTML</dt>
              <dd>
                Informam ao navegador as dimensões originais da imagem (proporção intrínseca). Com
                isso, o navegador reserva o espaço exato na tela <em>antes</em> do arquivo baixar,
                impedindo que o texto pule.
              </dd>
            </div>
            <div>
              <dt>loading="lazy" (e quando NÃO usar)</dt>
              <dd>
                Adia o download de imagens distantes até que a pessoa role perto delas.
                <strong>Cuidado:</strong> evite <code>loading="lazy"</code> na imagem principal
                visível ao abrir a página do topo da página (imagem principal / LCP), pois isso
                atrasaria a renderização do conteúdo principal.
              </dd>
            </div>
            <div>
              <dt>aspect-ratio e object-fit</dt>
              <dd>
                <code>aspect-ratio</code> trava uma proporção geométrica (ex.: <code>16 / 9</code>).
                <code>object-fit: cover</code> preenche o espaço cortando as sobras sem distorcer o
                conteúdo, enquanto <code>contain</code> exibe a imagem inteira.
              </dd>
            </div>
            <div>
              <dt>srcset e sizes</dt>
              <dd>
                Oferecem uma lista de resoluções diferentes para o navegador escolher a menor imagem
                possível que ainda pareça nítida na tela atual (economia real de banda e bateria).
              </dd>
            </div>
          </dl>
        </div>

        <figure class="lesson-figure">
          <figcaption>Como o navegador enquadra com object-fit</figcaption>
          <div class="fit-visual-comparison" aria-hidden="true">
            <div class="fit-visual-card">
              <span class="fit-visual-title">object-fit: cover</span>
              <div class="fit-visual-box fit-visual-cover">
                <i class="visual-circle"></i>
              </div>
              <small>Círculo perfeito, preenche tudo (corta topo e base)</small>
            </div>
            <div class="fit-visual-card">
              <span class="fit-visual-title">object-fit: contain</span>
              <div class="fit-visual-box fit-visual-contain">
                <i class="visual-circle"></i>
              </div>
              <small>Mostra tudo, sem corte (deixa barras laterais)</small>
            </div>
            <div class="fit-visual-card">
              <span class="fit-visual-title">object-fit: fill</span>
              <div class="fit-visual-box fit-visual-fill">
                <i class="visual-circle"></i>
              </div>
              <small>Distorce e achata o círculo em oval</small>
            </div>
          </div>
          <p>
            Com <code>cover</code> ou <code>contain</code>, o elemento preserva a proporção natural
            sem deformar.
          </p>
        </figure>
      </div>
    </template>

    <!-- 2. Exemplo de código comentado e Laboratório -->
    <template #exemplo>
      <p>
        Veja a sintaxe recomendada combinando boas práticas de HTML e CSS moderno. Abaixo, explore o
        laboratório para ver o salto de layout acontecendo ao vivo e como o navegador seleciona
        resoluções com <code>srcset</code>.
      </p>

      <div class="lesson-code-grid">
        <LessonCode
          title="HTML · Tag img com width, height, srcset e lazy"
          :source="imageHtmlExample"
        />
        <LessonCode
          title="CSS · Responsividade, aspect-ratio e object-fit"
          :source="imageCssExample"
        />
      </div>

      <ImagesLab />
    </template>

    <!-- 3. Pergunta-guia respondida visivelmente -->
    <template #pergunta-guia>
      <p class="lesson-question">{{ question }}</p>

      <div class="answer-box">
        <h3>Por que o texto é empurrado para baixo?</h3>
        <p>
          Se o HTML ou o CSS não informa o tamanho ou a proporção da imagem, o navegador pode exibir
          o texto sem reservar altura suficiente para ela. Quando descobre as dimensões do arquivo,
          recalcula o layout e pode deslocar o conteúdo abaixo.
        </p>

        <div class="lesson-viewport-comparison">
          <div class="lesson-viewport-case image-spacing-case">
            <div>
              <h3>Sem width e height</h3>
              <p class="lesson-case-width">Sem espaço antes do carregamento</p>
              <p>
                Se a imagem ganha altura quando carrega, o texto e os links abaixo mudam de posição.
              </p>
            </div>
          </div>
          <div class="lesson-viewport-case image-spacing-case">
            <div>
              <h3>Com width e height (ou aspect-ratio)</h3>
              <p class="lesson-case-width">Espaço reservado antes de a imagem aparecer</p>
              <p>
                Com <code>width="1200" height="800"</code>, o navegador pode reservar uma caixa na
                proporção 3:2. Se o arquivo tiver essa proporção, a imagem preenche a caixa sem
                deslocar o texto abaixo.
              </p>
            </div>
          </div>
        </div>

        <div class="metric-highlight">
          <div class="metric-badge">
            <span class="metric-title">Métrica do Google Core Web Vitals</span>
            <strong class="metric-name">CLS · Cumulative Layout Shift</strong>
            <span class="metric-sub">(Deslocamento Cumulativo de Layout)</span>
          </div>
          <p>
            O <strong>CLS</strong> mede a estabilidade visual. Ele considera o grupo de mudanças
            inesperadas de layout com a maior pontuação durante a visita. O laboratório ilustra uma
            mudança de posição.
          </p>
          <ul>
            <li><strong>Bom</strong> até <code>0.1</code>.</li>
            <li>
              <strong>Precisa melhorar</strong> acima de <code>0.1</code> e até <code>0.25</code>.
            </li>
            <li><strong>Ruim</strong> acima de <code>0.25</code>.</li>
          </ul>
        </div>
      </div>
    </template>

    <!-- 4. Fontes consultadas -->
    <template #fontes>
      <ul class="lesson-sources">
        <li v-for="source in sources" :key="source.url">
          <a :href="source.url" target="_blank" rel="noopener noreferrer">
            {{ source.title }} <span aria-hidden="true">↗</span>
          </a>
          <p>{{ source.description }}</p>
        </li>
      </ul>
    </template>
  </LessonSections>
</template>

<style scoped>
.image-spacing-case {
  grid-template-columns: minmax(0, 1fr);
}
.fit-visual-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 8.5rem), 1fr));
  gap: var(--space-3);
  margin-block: var(--space-2);
}
.fit-visual-card {
  display: grid;
  gap: var(--space-1);
  padding: var(--space-2);
  background: var(--night);
  border: var(--line) solid var(--slate);
}
.fit-visual-title {
  color: var(--mint);
  font: 700 0.75rem / 1.2 var(--font-mono);
}
.fit-visual-box {
  width: 100%;
  height: 4.5rem;
  background: var(--panel);
  border: var(--line) solid var(--slate-light);
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.visual-circle {
  display: block;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: var(--green);
  border: var(--stroke) solid var(--mint);
}
.fit-visual-cover .visual-circle {
  width: 5rem;
  height: 5rem;
  flex-shrink: 0;
}
.fit-visual-contain .visual-circle {
  width: 3.2rem;
  height: 3.2rem;
}
.fit-visual-fill .visual-circle {
  width: 100%;
  height: 100%;
  border-radius: 0;
  clip-path: ellipse(50% 50% at 50% 50%);
}
.fit-visual-card small {
  color: var(--muted);
  font-size: 0.75rem;
  line-height: 1.3;
}

.answer-box {
  display: grid;
  gap: var(--space-3);
  margin-block-start: var(--space-2);
}
.answer-box h3 {
  margin: 0;
  color: var(--mint);
  font-size: 1.15rem;
}
.answer-box p {
  line-height: 1.6;
}

.metric-highlight {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--night);
  border-inline-start: var(--space-1) solid var(--green);
  margin-block-start: var(--space-3);
}
.metric-badge {
  display: grid;
  gap: var(--space-1);
}
.metric-title {
  color: var(--muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.metric-name {
  color: var(--mint);
  font-size: 1.35rem;
  font-family: var(--font-mono);
}
.metric-sub {
  color: var(--muted);
  font-size: 0.85rem;
}
.metric-highlight ul {
  display: grid;
  gap: var(--space-1);
  margin: 0;
  padding-inline-start: var(--space-4);
  color: var(--text);
  font-size: 0.9rem;
}
</style>
