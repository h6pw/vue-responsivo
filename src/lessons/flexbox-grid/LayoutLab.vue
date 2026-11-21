<script setup>
import { computed, ref } from 'vue'
import LessonCode from '@/components/LessonCode.vue'
import LessonLabPreview from '@/components/LessonLabPreview.vue'
import {
  cards,
  defaultGap,
  flexBasis,
  gridMinimum,
  layoutCss,
  rootSize,
  twoColumnWidth,
} from './layoutRules'

const mode = ref('grid')
const width = ref(twoColumnWidth)
const gap = ref(defaultGap)
const wrap = ref(true)
const justify = ref('space-between')
const align = ref('flex-start')
const grid = computed(() => mode.value === 'grid')
const minimum = computed(() => (grid.value ? gridMinimum : flexBasis))
const perRow = computed(() =>
  Math.min(cards.length, Math.floor((width.value + gap.value) / (minimum.value + gap.value))),
)
const flexOverflow = computed(() =>
  Math.max(0, cards.length * flexBasis + (cards.length - 1) * gap.value - width.value),
)
const readout = computed(() => {
  if (grid.value) return perRow.value + (perRow.value === 1 ? ' coluna' : ' colunas')
  if (wrap.value) return perRow.value + ' por linha completa'
  return flexOverflow.value ? flexOverflow.value + ' px fora da área' : 'Todos na mesma linha'
})

function compareThreshold(nextWidth) {
  mode.value = 'grid'
  gap.value = defaultGap
  width.value = nextWidth
}

const activeCss = computed(() =>
  layoutCss({
    grid: grid.value,
    gap: gap.value,
    wrap: wrap.value,
    justify: justify.value,
    align: align.value,
  }),
)
const cardMarkup = cards
  .map(
    (card, index) =>
      `<article class="cartao" style="min-height: ${card.height}rem; --card: ${card.color}"><b>${String.fromCharCode(65 + index)}</b><span>${card.name}</span></article>`,
  )
  .join('')
const documentHtml = computed(
  () => `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; }
  html { font-size: ${rootSize}px; }
  body { margin: 0; overflow: hidden; background: #e7f4ef; color: #102824; font: 1rem/1.2 system-ui, sans-serif; }
  header { padding: .5rem .75rem; background: #173d35; color: white; font-weight: 750; }
  .regua { display: flex; justify-content: space-between; align-items: center; gap: .5rem; padding: .5rem; border-bottom: 1px dashed #467765; color: #254e42; font: .75rem/1.2 system-ui; }
  .catalogo { background-image: repeating-linear-gradient(90deg, #cce2d9 0 1px, transparent 1px 1rem); }
  .cartao { display: flex; align-items: center; gap: .5rem; padding: .5rem; border: 1px solid #91bdb0; background: var(--card); overflow-wrap: anywhere; }
  .cartao b { display: grid; place-items: center; flex: 0 0 1.5rem; min-height: 1.5rem; background: #173d35; color: white; }
  ${activeCss.value}
</style></head><body>
<header>Catálogo de aulas</header>
<div class="regua"><span>${grid.value ? 'Largura da grade' : 'Eixo principal →'}</span><b>${width.value} px</b></div>
<main class="catalogo">${cardMarkup}</main>
</body></html>`,
)
</script>

<template>
  <section class="lesson-lab layout-lab" aria-labelledby="layout-lab-title">
    <div class="lesson-lab-heading">
      <h3 id="layout-lab-title">Laboratório de montagem do catálogo</h3>
      <p v-if="grid">
        Compare 463 e 464 px para encontrar a virada da grade. Depois aumente a largura até os três
        cartões ficarem lado a lado.
      </p>
      <p v-else>
        Compare o alinhamento dos cartões de alturas diferentes. Reduza a largura e desligue a
        quebra de linha para ver o que deixa de caber.
      </p>
    </div>

    <div class="lesson-lab-controls">
      <div class="lesson-lab-devices" role="group" aria-label="Tipo de layout">
        <button type="button" :aria-pressed="!grid" @click="mode = 'flex'">Flexbox</button>
        <button type="button" :aria-pressed="grid" @click="mode = 'grid'">Grid</button>
      </div>
      <div
        v-if="grid"
        class="lesson-lab-devices"
        role="group"
        aria-label="Larguras da pergunta-guia, com gap de 16 pixels"
      >
        <button
          v-for="preset in [twoColumnWidth - 1, twoColumnWidth]"
          :key="preset"
          type="button"
          :aria-pressed="width === preset && gap === defaultGap"
          @click="compareThreshold(preset)"
        >
          {{ preset }} px
        </button>
      </div>
      <label v-else class="lesson-lab-toggle">
        <input v-model="wrap" type="checkbox" /> Quebra de linha
      </label>
    </div>

    <div class="layout-controls">
      <label class="layout-width">
        Largura do catálogo · {{ width }} px
        <input v-model.number="width" type="range" min="240" max="768" step="1" />
      </label>
      <label>
        Espaço entre cartões
        <select v-model="gap">
          <option v-for="size in [8, defaultGap, 24]" :key="size" :value="size">
            {{ size }} px
          </option>
        </select>
      </label>
      <template v-if="!grid">
        <label>
          Eixo principal
          <select v-model="justify">
            <option value="flex-start">Início</option>
            <option value="center">Centro</option>
            <option value="space-between">Distribuído</option>
          </select>
        </label>
        <label>
          Eixo transversal
          <select v-model="align">
            <option value="flex-start">Topo</option>
            <option value="center">Centro</option>
            <option value="stretch">Esticar</option>
          </select>
        </label>
      </template>
    </div>

    <dl class="lesson-lab-readout" aria-live="polite">
      <div>
        <dt>Largura interna</dt>
        <dd>{{ width }} px</dd>
      </div>
      <div>
        <dt>Gap</dt>
        <dd>{{ gap }} px</dd>
      </div>
      <div>
        <dt>{{ grid ? 'Grade' : 'Fluxo dos cartões' }}</dt>
        <dd>{{ readout }}</dd>
      </div>
    </dl>

    <LessonLabPreview
      title="Prévia do catálogo no laboratório de Flexbox e Grid"
      :document-html="documentHtml"
      :display-width="width"
      :viewport-width="width"
    />

    <p v-if="grid" class="lesson-lab-note">
      Com o gap atual, duas colunas precisam de {{ gridMinimum }} + {{ gap }} + {{ gridMinimum }} =
      <strong>{{ 2 * gridMinimum + gap }} px</strong>. Os cartões da mesma coluna compartilham a
      largura.
    </p>
    <p v-else class="lesson-lab-note">
      Neste Flexbox, cada cartão mantém 9rem (144 px). O alinhamento principal distribui espaço
      dentro de cada linha. O transversal alinha os cartões que dividem a linha.
    </p>

    <div class="lesson-code-grid lab-code">
      <LessonCode title="CSS aplicado à prévia" :source="activeCss" />
    </div>
  </section>
</template>

<style scoped>
.layout-controls {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: end;
}
.layout-controls label {
  display: grid;
  gap: var(--space-1);
  min-inline-size: 0;
  color: var(--muted);
  font-size: 0.875rem;
}
.layout-width {
  flex: 1 1 min(100%, 15rem);
}
.layout-width input {
  inline-size: 100%;
  margin: 0;
  min-block-size: 1.75rem;
  accent-color: var(--green);
}
.layout-controls select {
  min-block-size: 2.25rem;
  max-inline-size: 100%;
  padding: var(--space-1) var(--space-2);
  border: var(--line) solid var(--slate-light);
  background: var(--panel);
  color: var(--text);
  font: inherit;
}
.lab-code {
  grid-template-columns: minmax(0, 1fr);
}
</style>
