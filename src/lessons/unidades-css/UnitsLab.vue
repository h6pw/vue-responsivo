<script setup>
import { computed, ref } from 'vue'
import LessonCode from '@/components/LessonCode.vue'
import LessonLabPreview from '@/components/LessonLabPreview.vue'

const mode = ref('type')
const rootSize = ref(16)
const viewport = ref(400)
const containerShare = ref(60)
const typeMode = computed(() => mode.value === 'type')
const previewWidth = computed(() => (typeMode.value ? 520 : viewport.value))
const containerWidth = computed(() => (viewport.value * containerShare.value) / 100)
const scaleTitle = computed(() => rootSize.value * 1.5)

const typographyCss = computed(
  () => `/* O controle Fonte raiz simula a preferência do navegador. */
html { font-size: ${rootSize.value}px; }

/* O título de 24px fica fixo. O de 1.5rem acompanha a raiz. */
.titulo-fixo { font-size: 24px; }
.titulo-relativo { font-size: 1.5rem; }

/* Dentro de cada cartão, o selo herda a fonte do título.
   O espaço de cada lado do selo acompanha essa fonte. */
.selo { padding-inline: 1em; }`,
)

const layoutCss = computed(
  () => `/* Mude a largura da janela e, separadamente, a do painel. */
.painel { width: ${containerShare.value}%; }

/* A faixa usa metade da janela. A miniatura usa metade do painel. */
.faixa { width: 50vw; }
.miniatura { width: 50%; }

/* O vão vem primeiro. Das 3 partes que sobram, B ocupa 2. */
.grade {
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
}`,
)

const activeCss = computed(() => (typeMode.value ? typographyCss.value : layoutCss.value))
const readout = computed(() =>
  typeMode.value
    ? [
        { label: 'Fonte raiz', value: rootSize.value + ' px' },
        { label: 'Título em px', value: '24 px' },
        { label: 'Título em rem', value: `${rootSize.value} × 1,5 = ${scaleTitle.value} px` },
      ]
    : [
        { label: 'Janela simulada', value: viewport.value + ' px' },
        { label: 'Faixa de 50vw', value: viewport.value / 2 + ' px' },
        { label: 'Painel', value: containerWidth.value + ' px' },
        { label: 'Miniatura de 50%', value: containerWidth.value / 2 + ' px' },
      ],
)

const typeHtml = `<main class="amostras">
  <article class="titulo-fixo">
    <b>Guia de estudos</b><small>24px</small><span class="selo">Aula</span>
  </article>
  <article class="titulo-relativo">
    <b>Guia de estudos</b><small>1.5rem</small><span class="selo">Aula</span>
  </article>
</main>`

const layoutHtml = `<main class="medidas">
  <p>Faixa da janela</p>
  <div class="faixa" aria-hidden="true"></div>
  <section class="painel">
    <p>Painel</p>
    <div class="miniatura" aria-hidden="true"></div>
    <small>Miniatura</small>
    <div class="grade"><span>A · 1fr</span><span>B · 2fr</span></div>
  </section>
</main>`

const documentHtml = computed(
  () => `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; }
  html { font-size: 16px; }
  body { margin: 0; background: #e7f4ef; color: #102824; font: 1rem/1.25 system-ui, sans-serif; }
  header { padding: 8px 12px; background: #173d35; color: white; font: 750 16px/1.2 system-ui; }
  .amostras { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; padding: 12px; }
  article { display: grid; justify-items: start; align-content: start; gap: 6px; padding: 10px; border: 1px solid #91bdb0; background: white; overflow-wrap: anywhere; }
  small, .medidas p { font-size: 14px; }
  .selo { display: inline-block; background: #c5e9db; }
  .medidas { padding-block: 8px; }
  .medidas p { margin: 0; padding: 4px 8px; }
  .medidas small { display: block; padding: 4px 8px; }
  .faixa, .miniatura { height: 14px; background: #28775d; }
  .painel { margin-block-start: 8px; background: white; outline: 1px solid #91bdb0; }
  .miniatura { background: #39758c; }
  .grade > span { padding: 8px 4px; background: #d7eee5; text-align: center; font-size: 14px; }
  ${activeCss.value}
</style></head><body><header>Catálogo de aulas</header>
${typeMode.value ? typeHtml : layoutHtml}
</body></html>`,
)
</script>

<template>
  <section class="lesson-lab" aria-labelledby="units-lab-title">
    <div class="lesson-lab-heading">
      <h3 id="units-lab-title">Laboratório de unidades CSS</h3>
      <p v-if="typeMode">
        Aumente a fonte raiz para 24 px e compare os títulos e o espaço dentro dos selos.
      </p>
      <p v-else>
        Mantenha a janela em 400 px e mude o painel de 60% para 80%. Compare a faixa com a
        miniatura.
      </p>
    </div>

    <div class="lesson-lab-controls">
      <div class="lesson-lab-devices" role="group" aria-label="Experimento">
        <button type="button" :aria-pressed="typeMode" @click="mode = 'type'">Tipografia</button>
        <button type="button" :aria-pressed="!typeMode" @click="mode = 'layout'">
          Larguras e Grid
        </button>
      </div>
      <label v-if="typeMode" class="lesson-lab-toggle">
        Fonte raiz
        <select v-model="rootSize">
          <option v-for="size in [16, 20, 24]" :key="size" :value="size">{{ size }} px</option>
        </select>
      </label>
      <div v-else class="lesson-lab-devices">
        <label class="lesson-lab-toggle">
          Janela simulada
          <select v-model="viewport">
            <option v-for="size in [400, 640]" :key="size" :value="size">{{ size }} px</option>
          </select>
        </label>
        <label class="lesson-lab-toggle">
          Largura do painel
          <select v-model="containerShare">
            <option v-for="share in [60, 80]" :key="share" :value="share">{{ share }}%</option>
          </select>
        </label>
      </div>
    </div>

    <dl class="lesson-lab-readout" aria-live="polite">
      <div v-for="item in readout" :key="item.label">
        <dt>{{ item.label }}</dt>
        <dd>{{ item.value }}</dd>
      </div>
    </dl>

    <LessonLabPreview
      :title="
        typeMode ? 'Comparação de títulos e selos' : 'Comparação das larguras da janela e do painel'
      "
      :document-html="documentHtml"
      :display-width="previewWidth"
      :viewport-width="previewWidth"
    />

    <p v-if="typeMode" class="lesson-lab-note">
      Cada lado do selo tem <code>1em</code> de espaço. São 24 px no cartão fixo e
      {{ scaleTitle }} px no cartão que acompanha a raiz.
    </p>
    <p v-else class="lesson-lab-note">
      A grade A/B usa a largura do painel. Depois de descontar o vão de 16 px, B recebe o dobro do
      espaço de A.
    </p>

    <div class="lesson-code-grid lab-code">
      <LessonCode title="CSS aplicado à prévia" :source="activeCss" />
    </div>
  </section>
</template>

<style scoped>
.lesson-lab-toggle {
  flex-wrap: wrap;
}
.lesson-lab-toggle select {
  max-inline-size: 100%;
  border: var(--line) solid var(--slate-light);
  padding: var(--space-1) var(--space-2);
  background: var(--night);
  color: var(--text);
  font: inherit;
}
.lab-code {
  grid-template-columns: minmax(0, 1fr);
}
</style>
