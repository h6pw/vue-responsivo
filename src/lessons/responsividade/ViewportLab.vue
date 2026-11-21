<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { responsiveLayout, viewportTag, wideViewportRem } from './viewportExample'

const devices = [
  { name: 'Celular', width: 390, mobile: true },
  { name: 'Tablet', width: 768, mobile: true },
  { name: 'Desktop', width: 1024, mobile: false },
]

const selected = ref(devices[0])
const viewportEnabled = ref(true)
const screen = ref(null)
const screenSize = ref({ width: 0, height: 0 })
let observer

const virtualWidth = computed(() =>
  !viewportEnabled.value && selected.value.mobile
    ? Math.max(980, selected.value.width)
    : selected.value.width,
)
const columns = computed(() => (virtualWidth.value >= wideViewportRem * 16 ? 3 : 1))
const scale = computed(() => screenSize.value.width / virtualWidth.value)
const frameStyle = computed(() => ({
  inlineSize: virtualWidth.value + 'px',
  blockSize: screenSize.value.height / scale.value + 'px',
  transform: 'scale(' + scale.value + ')',
}))

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

onMounted(() => {
  observer = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect
    screenSize.value = { width, height }
  })
  observer.observe(screen.value)
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="viewport-lab" aria-labelledby="titulo-laboratorio">
    <div class="viewport-lab-heading">
      <h3 id="titulo-laboratorio">Laboratório de viewport</h3>
      <p>
        Selecione Celular e desligue a meta viewport. Observe a largura, as colunas e o tamanho do
        texto.
      </p>
    </div>

    <div class="viewport-controls">
      <div class="viewport-devices" role="group" aria-label="Tamanho de tela">
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
      <label class="viewport-toggle">
        <input v-model="viewportEnabled" type="checkbox" />
        Meta viewport
      </label>
    </div>

    <dl class="viewport-readout" aria-live="polite">
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

    <div class="viewport-stage">
      <div
        ref="screen"
        class="viewport-screen"
        :style="{ '--screen-width': selected.width + 'px' }"
      >
        <iframe
          v-if="scale > 0"
          :srcdoc="documentHtml"
          :style="frameStyle"
          title="Prévia do catálogo de aulas"
          tabindex="-1"
          sandbox=""
        ></iframe>
      </div>
    </div>
    <p class="viewport-note">
      A largura virtual de 980 px é ilustrativa e pode variar entre navegadores móveis. A prévia é
      ajustada ao espaço disponível na sua tela.
    </p>
  </section>
</template>
