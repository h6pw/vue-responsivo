<script setup>
import { computed, ref } from 'vue'
import LessonLabPreview from '@/components/LessonLabPreview.vue'
import { responsiveLayout, viewportTag, wideViewportRem } from './viewportExample'

const devices = [
  { name: 'Celular', width: 390, mobile: true },
  { name: 'Tablet', width: 768, mobile: true },
  { name: 'Desktop', width: 1024, mobile: false },
]

const selected = ref(devices[0])
const viewportEnabled = ref(true)

const virtualWidth = computed(() =>
  !viewportEnabled.value && selected.value.mobile
    ? Math.max(980, selected.value.width)
    : selected.value.width,
)
const columns = computed(() => (virtualWidth.value >= wideViewportRem * 16 ? 3 : 1))
const documentHtml = computed(
  () => `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  ${viewportEnabled.value ? viewportTag : ''}
  <style>
    * { box-sizing: border-box; }
    html { font-size: 16px; scrollbar-width: none; }
    body { margin: 0; background: #e7f4ef; color: #102824; font: 1rem/1.4 system-ui, sans-serif; }
    main { padding: .75rem; }
    header { padding: .45rem .75rem; background: #173d35; color: white; font-weight: 750; }
    h1 { font-size: 1.3rem; margin: 0 0 .5rem; }
    article { padding: .4rem .65rem; border: 1px solid #91bdb0; background: #fff; }
    article b { display: block; }
    article small { color: #3b574f; }
    ${responsiveLayout}
  </style>
</head>
<body>
  <header>Catálogo de aulas</header>
  <main>
    <h1>Trilha de estudos</h1>
    <div class="catalogo">
      <article><b>Introdução</b><small>Comece pelos conceitos</small></article>
      <article><b>Layout</b><small>Organize a página</small></article>
      <article><b>Prática</b><small>Teste o que aprendeu</small></article>
    </div>
  </main>
</body>
</html>`,
)
</script>

<template>
  <section class="lesson-lab" aria-labelledby="titulo-laboratorio">
    <div class="lesson-lab-heading">
      <h3 id="titulo-laboratorio">Laboratório de viewport</h3>
      <p>
        Selecione Celular e desligue a meta viewport. Observe a largura, as colunas e o tamanho do
        texto.
      </p>
    </div>

    <div class="lesson-lab-controls">
      <div class="lesson-lab-devices" role="group" aria-label="Tamanho de tela">
        <button
          v-for="device in devices"
          :key="device.name"
          type="button"
          :aria-pressed="selected.name === device.name"
          @click="selected = device"
        >
          {{ device.name }} <span>{{ device.width }} px</span>
        </button>
      </div>
      <label class="lesson-lab-toggle">
        <input v-model="viewportEnabled" type="checkbox" />
        Meta viewport
      </label>
    </div>

    <dl class="lesson-lab-readout" aria-live="polite">
      <div>
        <dt>Tela simulada</dt>
        <dd>{{ selected.width }} px</dd>
      </div>
      <div>
        <dt>Viewport CSS</dt>
        <dd>{{ virtualWidth }} px</dd>
      </div>
      <div>
        <dt>Catálogo</dt>
        <dd>{{ columns }} {{ columns === 1 ? 'coluna' : 'colunas' }}</dd>
      </div>
    </dl>

    <LessonLabPreview
      title="Prévia do catálogo de aulas"
      :document-html="documentHtml"
      :display-width="selected.width"
      :viewport-width="virtualWidth"
    />
    <p class="lesson-lab-note">
      A largura virtual de 980 px é ilustrativa e pode variar entre navegadores móveis. A prévia é
      ajustada ao espaço disponível na sua tela.
    </p>
  </section>
</template>
