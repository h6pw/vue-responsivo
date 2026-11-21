<script setup>
import LessonSections from '@/components/LessonSections.vue'
import LayoutLab from './LayoutLab.vue'
import { defaultGap, gridMinimum, twoColumnWidth } from './layoutRules'

defineProps({
  question: { type: String, required: true },
  routeName: { type: String, required: true },
})
</script>

<template>
  <LessonSections :route-name="routeName">
    <template #explicacao>
      <p class="lesson-intro">
        Pense no que precisa ficar alinhado. No <strong>Flexbox</strong>, você organiza os itens ao
        longo de um eixo. No <strong>Grid</strong>, você define linhas e colunas que os itens
        compartilham.
      </p>

      <div class="lesson-explanation lesson-explanation--separated">
        <div class="lesson-explanation-copy">
          <h3>Flexbox · uma dimensão por vez</h3>
          <p>
            Use para menus, grupos de botões e elementos que devem seguir uma linha ou uma coluna.
            Em <code>flex-direction: row</code>, o eixo principal é horizontal.
          </p>
          <ul class="layout-points">
            <li>
              <code>justify-content</code> distribui o espaço livre ao longo do eixo principal.
            </li>
            <li>
              <code>align-items</code> alinha os itens no eixo transversal. Em uma linha, ele
              controla o alinhamento vertical.
            </li>
            <li>
              <code>flex-wrap: wrap</code> permite quebrar em novas linhas. Cada linha distribui seu
              espaço de forma independente.
            </li>
          </ul>
        </div>
        <figure class="lesson-figure">
          <figcaption>Cada linha centraliza seus próprios cartões</figcaption>
          <div class="diagram-cards diagram-flex" aria-hidden="true">
            <span>A</span><span>B</span><span>C</span>
          </div>
          <p>
            Com <code>justify-content: center</code>, o cartão C fica no centro da segunda linha.
          </p>
        </figure>
      </div>

      <div class="lesson-explanation lesson-explanation--separated">
        <div class="lesson-explanation-copy">
          <h3>Grid · linhas e colunas em conjunto</h3>
          <p>
            Use quando itens de linhas diferentes precisam compartilhar as mesmas colunas, como em
            catálogos e painéis. Com <code>repeat(auto-fit, minmax(14rem, 1fr))</code>, a grade
            repete colunas de pelo menos 14rem enquanto houver espaço.
          </p>
          <p>
            <code>auto-fit</code> recolhe colunas vazias. O espaço extra é dividido igualmente entre
            as colunas ocupadas, pois todas têm o mesmo limite flexível de <code>1fr</code>.
          </p>
        </div>
        <figure class="lesson-figure">
          <figcaption>As colunas continuam de uma linha para a outra</figcaption>
          <div class="diagram-cards diagram-grid" aria-hidden="true">
            <span>A</span><span>B</span><span>C</span>
          </div>
          <p>O cartão C começa na primeira coluna, alinhada com a do cartão A.</p>
        </figure>
      </div>

      <p>
        Nos dois layouts, <code>gap</code> cria espaço <strong>entre</strong> os itens. Ele não
        adiciona margem nas bordas do contêiner.
      </p>
    </template>

    <template #exemplo>
      <LayoutLab />
    </template>

    <template #pergunta-guia>
      <p class="lesson-question">{{ question }}</p>
      <p>
        A partir de <strong>{{ twoColumnWidth }} px de largura interna</strong>. Cada coluna precisa
        de pelo menos <code>14rem</code> (14 × 16 = {{ gridMinimum }} px), e há um único
        <code>gap</code> de {{ defaultGap }} px entre as duas.
      </p>
      <figure class="lesson-figure threshold">
        <figcaption>Largura mínima para duas colunas</figcaption>
        <p class="threshold-calc">
          {{ gridMinimum }} + {{ defaultGap }} + {{ gridMinimum }} =
          <strong>{{ twoColumnWidth }} px</strong>
        </p>
        <div class="threshold-width" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <p>
          Coluna de {{ gridMinimum }} px + vão de {{ defaultGap }} px + coluna de
          {{ gridMinimum }} px
        </p>
      </figure>
      <div class="threshold-cases">
        <figure v-for="columns in [1, 2]" :key="columns" class="lesson-figure">
          <figcaption>
            {{ twoColumnWidth - (2 - columns) }} px · {{ columns === 1 ? '1 coluna' : '2 colunas' }}
          </figcaption>
          <div class="diagram-cards" :class="{ 'diagram-grid': columns === 2 }" aria-hidden="true">
            <span>A</span><span>B</span>
          </div>
          <p>
            {{
              columns === 1
                ? 'Falta 1 px para acomodar a segunda coluna e o vão.'
                : 'Os dois cartões cabem lado a lado com o vão entre eles.'
            }}
          </p>
        </figure>
      </div>
      <p>
        Use os botões <strong>463 px</strong> e <strong>464 px</strong> do
        <RouterLink :to="{ name: routeName, hash: '#exemplo' }">laboratório</RouterLink> para
        reproduzir a conta com o mesmo gap.
      </p>
    </template>

    <template #fontes>
      <ul class="lesson-sources">
        <li>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Aligning_items"
            >MDN Web Docs · Alinhamento no Flexbox</a
          >
          <p>Eixos principal e transversal, além do uso de <code>gap</code>.</p>
        </li>
        <li>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Wrapping_items"
            >MDN Web Docs · Quebra de linha no Flexbox</a
          >
          <p>Como as linhas se formam e distribuem o espaço.</p>
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/repeat"
            >MDN Web Docs · repeat()</a
          >
          <p>Repetição de trilhas e comportamento de <code>auto-fit</code>.</p>
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/minmax"
            >MDN Web Docs · minmax()</a
          >
          <p>Como definir os limites mínimo e máximo de cada trilha.</p>
        </li>
      </ul>
    </template>
  </LessonSections>
</template>

<style scoped>
.layout-points {
  display: grid;
  gap: var(--space-2);
  margin: 0;
  padding-inline-start: var(--space-4);
}
.lesson-explanation-copy {
  gap: var(--space-2);
}
.lesson-explanation-copy h3 {
  margin: 0;
}
.lesson-figure {
  gap: var(--space-2);
  padding: var(--space-3);
  align-content: start;
}
.lesson-figure figcaption {
  color: var(--text);
  font-weight: 750;
}
.diagram-cards {
  display: grid;
  gap: var(--space-2);
}
.diagram-cards span {
  display: grid;
  min-block-size: 1.75rem;
  place-items: center;
  color: var(--ink);
  background: var(--mint);
  font-weight: 750;
}
.diagram-cards span:nth-child(2) {
  background: var(--green);
}
.diagram-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.diagram-flex span {
  flex: 0 0 40%;
}
.diagram-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.threshold-calc {
  font-family: var(--font-mono);
  color: var(--mint);
}
.threshold-width {
  display: grid;
  grid-template-columns: 14fr 1fr 14fr;
  min-block-size: 1.25rem;
}
.threshold-width span {
  background: var(--mint);
}
.threshold-width span:nth-child(2) {
  background: var(--slate-light);
}
.threshold-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: var(--space-3);
}
</style>
