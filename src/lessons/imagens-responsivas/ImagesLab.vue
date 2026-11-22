<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { imageSources, imageSizes } from './imagesExample'

const activeTab = ref('cls') // 'cls' | 'object-fit' | 'srcset'

// --- ABA 1: CLS / Salto de Layout ---
const hasDimensions = ref(false)
const delayMs = ref(1200)
const imageLoaded = ref(false)
const isLoading = ref(false)
const shiftDetected = ref(false)
let timerId = null

function reloadClsSimulation() {
  if (timerId) clearTimeout(timerId)
  imageLoaded.value = false
  shiftDetected.value = false
  isLoading.value = true

  timerId = setTimeout(() => {
    imageLoaded.value = true
    isLoading.value = false
    if (!hasDimensions.value) {
      shiftDetected.value = true
    }
  }, delayMs.value)
}

onMounted(() => {
  reloadClsSimulation()
})

onUnmounted(() => clearTimeout(timerId))

// --- ABA 2: Object-fit & Aspect-ratio ---
const selectedObjectFit = ref('cover')
const selectedAspectRatio = ref('16 / 9')
const containerWidth = ref(85) // porcentagem

const objectFitOptions = [
  { value: 'cover', label: 'cover', hint: 'Preenche cortando sobras, sem distorcer' },
  { value: 'contain', label: 'contain', hint: 'Mostra a imagem inteira, com barras' },
  { value: 'fill', label: 'fill', hint: 'Estica e distorce para forçar o tamanho' },
  { value: 'scale-down', label: 'scale-down', hint: 'O menor entre none e contain' },
]

const aspectRatioOptions = [
  { value: '16 / 9', label: '16:9 (Widescreen)' },
  { value: '4 / 3', label: '4:3 (Fotografia)' },
  { value: '1 / 1', label: '1:1 (Quadrado)' },
  { value: '21 / 9', label: '21:9 (Ultrawide)' },
]

// --- ABA 3: Srcset & Sizes ---
const simulatedViewport = ref(420) // px
const displayDensity = ref(1) // 1x ou 2x

const effectiveTargetWidth = computed(() => {
  // Se viewport >= 768px (48rem), imagem ocupa 50vw; senão 100vw
  const containerFraction = simulatedViewport.value >= 768 ? 0.5 : 1.0
  const renderedPixels =
    simulatedViewport.value >= 768
      ? Math.min(simulatedViewport.value * containerFraction, 512)
      : simulatedViewport.value
  return Math.round(renderedPixels * displayDensity.value)
})

const selectedSource = computed(
  () =>
    imageSources.find(({ width }) => width >= effectiveTargetWidth.value) ?? imageSources.at(-1),
)
</script>

<template>
  <section class="lesson-lab images-lab" aria-labelledby="images-lab-title">
    <div class="lesson-lab-heading">
      <h3 id="images-lab-title">Laboratório de imagens responsivas</h3>
      <p>Teste na prática como o navegador carrega, enquadra e escolhe a resolução das imagens.</p>
    </div>

    <!-- Navegação de abas do laboratório -->
    <div class="lesson-lab-devices" role="tablist" aria-label="Experimentos com imagens">
      <button
        type="button"
        role="tab"
        :aria-selected="activeTab === 'cls'"
        :aria-pressed="activeTab === 'cls'"
        @click="activeTab = 'cls'"
      >
        <span>1. Salto de Layout (CLS)</span>
      </button>
      <button
        type="button"
        role="tab"
        :aria-selected="activeTab === 'object-fit'"
        :aria-pressed="activeTab === 'object-fit'"
        @click="activeTab = 'object-fit'"
      >
        <span>2. object-fit & aspect-ratio</span>
      </button>
      <button
        type="button"
        role="tab"
        :aria-selected="activeTab === 'srcset'"
        :aria-pressed="activeTab === 'srcset'"
        @click="activeTab = 'srcset'"
      >
        <span>3. srcset & sizes</span>
      </button>
    </div>

    <!-- EXPERIMENTO 1: CLS / Salto de Layout -->
    <div v-if="activeTab === 'cls'" class="lab-view">
      <div class="lab-toolbar">
        <label class="lesson-lab-toggle">
          <input v-model="hasDimensions" type="checkbox" @change="reloadClsSimulation" />
          <span>Informar width e height no HTML (reservar espaço)</span>
        </label>

        <div class="delay-control">
          <label for="delay-select">Atraso de rede simulado:</label>
          <select id="delay-select" v-model.number="delayMs" @change="reloadClsSimulation">
            <option :value="500">500 ms (Rápido)</option>
            <option :value="1200">1.200 ms (4G Médio)</option>
            <option :value="2400">2.400 ms (3G Lento)</option>
          </select>
        </div>

        <button type="button" class="action-btn" :disabled="isLoading" @click="reloadClsSimulation">
          {{ isLoading ? 'Carregando...' : '↻ Recarregar página' }}
        </button>
      </div>

      <!-- Métricas em destaque -->
      <dl class="lesson-lab-readout">
        <div>
          <dt>Reserva de espaço</dt>
          <dd :class="hasDimensions ? 'text-good' : 'text-bad'">
            {{ hasDimensions ? 'Proporção 3:2 reservada' : 'Nenhuma (0px inicial)' }}
          </dd>
        </div>
        <div>
          <dt>Comportamento do texto</dt>
          <dd>
            {{
              hasDimensions
                ? 'Permanece fixo'
                : shiftDetected
                  ? 'Empurrado para baixo!'
                  : 'Aguardando imagem...'
            }}
          </dd>
        </div>
      </dl>

      <!-- Palco de simulação do navegador -->
      <div class="browser-mockup">
        <div class="browser-mockup-bar">
          <span class="browser-dots"><i></i><i></i><i></i></span>
          <span class="browser-url">simulador://artigo-com-imagem</span>
          <span v-if="isLoading" class="browser-spinner" title="Baixando imagem..."
            >Baixando...</span
          >
        </div>

        <div class="browser-viewport">
          <article class="mock-article">
            <header class="mock-header">
              <h4>Expedição à Montanha Nebulosa</h4>
              <p class="mock-meta">Por Redação Aventuras · Publicado há 10 minutos</p>
            </header>

            <!-- Container da imagem -->
            <div
              class="mock-image-slot"
              :class="{
                'has-reservation': hasDimensions,
                'no-reservation': !hasDimensions,
                'is-loaded': imageLoaded,
              }"
            >
              <!-- Placeholder visível quando há dimensões reservadas -->
              <div v-if="hasDimensions && !imageLoaded" class="reservation-ghost">
                <span class="ghost-icon">🖼️</span>
                <span>Espaço reservado na proporção 3:2</span>
              </div>

              <!-- A imagem simulada (aparece após o atraso de rede) -->
              <div v-if="imageLoaded" class="simulated-image" :class="{ 'loaded-fade': true }">
                <svg viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#193948" />
                      <stop offset="100%" stop-color="#345a6c" />
                    </linearGradient>
                    <linearGradient id="mntGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#42b883" />
                      <stop offset="100%" stop-color="#192b3a" />
                    </linearGradient>
                  </defs>
                  <rect width="600" height="400" fill="url(#skyGrad)" />
                  <circle cx="500" cy="90" r="45" fill="#aff3d3" opacity="0.8" />
                  <polygon points="50,400 240,140 420,400" fill="url(#mntGrad)" />
                  <polygon points="260,400 440,180 580,400" fill="#2c4d44" />
                  <text
                    x="300"
                    y="360"
                    text-anchor="middle"
                    fill="#ffffff"
                    font-family="system-ui"
                    font-size="22"
                    font-weight="bold"
                  >
                    [ Imagem Carregada: 600 x 400 ]
                  </text>
                </svg>
              </div>
            </div>

            <!-- Alerta visual de salto quando acontece -->
            <div v-if="shiftDetected && !hasDimensions" class="shift-banner" role="alert">
              <span class="shift-arrow">⬇ O texto mudou de posição quando a imagem apareceu!</span>
              <small>Isso causa cliques acidentais e frustração em quem estava lendo.</small>
            </div>

            <!-- Texto que corre o risco de pular -->
            <div class="mock-text">
              <p>
                <strong>Início da leitura:</strong> A cordilheira se ergue a mais de quatro mil
                metros de altitude. Os exploradores iniciaram a subida antes do amanhecer para
                aproveitar a estabilidade do tempo e registrar a luz dourada refletida sobre o vale.
              </p>
              <p>
                Repare como este parágrafo se comporta. Se a imagem acima não tinha largura e altura
                declaradas no HTML, o navegador começou desenhando este texto colado no título.
                Quando a imagem chegou, ela empurrou tudo abruptamente.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- EXPERIMENTO 2: Object-fit & Aspect-ratio -->
    <div v-else-if="activeTab === 'object-fit'" class="lab-view">
      <div class="lab-toolbar">
        <div class="control-cluster">
          <label for="fit-select"><strong>object-fit:</strong></label>
          <select id="fit-select" v-model="selectedObjectFit">
            <option v-for="opt in objectFitOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </div>

        <div class="control-cluster">
          <label for="ratio-select"><strong>aspect-ratio:</strong></label>
          <select id="ratio-select" v-model="selectedAspectRatio">
            <option v-for="ratio in aspectRatioOptions" :key="ratio.value" :value="ratio.value">
              {{ ratio.label }}
            </option>
          </select>
        </div>

        <div class="control-cluster slider-cluster">
          <label for="width-slider"
            >Largura do contêiner: <strong>{{ containerWidth }}%</strong></label
          >
          <input
            id="width-slider"
            v-model.number="containerWidth"
            type="range"
            min="40"
            max="100"
            step="5"
          />
        </div>
      </div>

      <div class="fit-explanation-bar">
        <code>object-fit: {{ selectedObjectFit }}; aspect-ratio: {{ selectedAspectRatio }};</code>
        <span>{{ objectFitOptions.find((o) => o.value === selectedObjectFit)?.hint }}</span>
      </div>

      <div class="stage-container">
        <div class="fit-box-wrapper" :style="{ width: containerWidth + '%' }">
          <div
            class="fit-frame"
            :style="{
              aspectRatio: selectedAspectRatio,
            }"
          >
            <!-- Imagem SVG com formato original 4:3 (800x600) contendo desenho e círculo de referência -->
            <img
              class="fit-image"
              :style="{ objectFit: selectedObjectFit }"
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' width='800' height='600'><rect width='800' height='600' fill='%23192b3a'/><circle cx='400' cy='300' r='180' fill='%2342b883'/><circle cx='400' cy='300' r='60' fill='%23aff3d3'/><line x1='0' y1='0' x2='800' y2='600' stroke='%23aff3d3' stroke-width='4'/><line x1='800' y1='0' x2='0' y2='600' stroke='%23aff3d3' stroke-width='4'/><text x='400' y='310' font-family='sans-serif' font-size='32' font-weight='bold' text-anchor='middle' fill='%23101c28'>CÍRCULO PERFEITO</text><text x='400' y='550' font-family='sans-serif' font-size='26' text-anchor='middle' fill='%23ffffff'>Original: 800 x 600 (4:3)</text></svg>"
              alt="Geometria de teste de proporção"
            />
          </div>
        </div>
      </div>

      <p class="lesson-lab-note">
        💡 <strong>Dica de ouro:</strong> Note que com <code>object-fit: cover</code> o círculo
        continua perfeitamente redondo, mesmo mudando a proporção para 16:9 ou 21:9. Com
        <code>fill</code>, o círculo é achatado e ovalado!
      </p>
    </div>

    <!-- EXPERIMENTO 3: Srcset & Sizes -->
    <div v-else class="lab-view">
      <div class="lab-toolbar">
        <div class="control-cluster slider-cluster">
          <label for="vp-slider"
            >Largura da tela simulada: <strong>{{ simulatedViewport }} px</strong></label
          >
          <input
            id="vp-slider"
            v-model.number="simulatedViewport"
            type="range"
            min="320"
            max="1200"
            step="20"
          />
        </div>

        <div class="lesson-lab-devices" role="group" aria-label="Densidade de tela">
          <button type="button" :aria-pressed="displayDensity === 1" @click="displayDensity = 1">
            Tela Padrão 1x
          </button>
          <button type="button" :aria-pressed="displayDensity === 2" @click="displayDensity = 2">
            Tela HiDPI / Retina 2x
          </button>
        </div>
      </div>

      <dl class="lesson-lab-readout">
        <div>
          <dt>Regra do sizes</dt>
          <dd>{{ simulatedViewport >= 768 ? '50vw, até 32rem' : '100vw (tela cheia)' }}</dd>
        </div>
        <div>
          <dt>Largura estimada para a densidade</dt>
          <dd>{{ effectiveTargetWidth }} px ({{ displayDensity }}x)</dd>
        </div>
        <div>
          <dt>Candidato na simulação</dt>
          <dd class="text-mint">
            <strong>{{ selectedSource.file }}</strong>
          </dd>
        </div>
      </dl>

      <p class="lesson-lab-note">
        O simulador indica a menor largura que atende à estimativa, ou a maior disponível. Na prévia
        abaixo, o navegador escolhe de verdade para a janela e a densidade do seu aparelho. Ele
        também pode considerar condições como cache.
      </p>
      <div class="lesson-lab-stage">
        <img
          class="actual-srcset"
          :src="imageSources[1].url"
          :srcset="imageSources.map(({ url, width }) => url + ' ' + width + 'w').join(', ')"
          :sizes="imageSizes"
          width="1200"
          height="800"
          alt="Ilustração de montanhas ao entardecer"
          loading="lazy"
        />
      </div>
      <div class="srcset-cards-grid">
        <div
          v-for="source in imageSources"
          :key="source.width"
          class="srcset-card"
          :class="{ 'is-chosen': selectedSource.width === source.width }"
        >
          <header>
            <span class="file-tag">{{ source.width }}w</span><strong>{{ source.file }}</strong>
          </header>
          <span v-if="selectedSource.width === source.width" class="badge-active"
            >Candidato na simulação</span
          >
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.images-lab {
  gap: var(--space-4);
}
.lab-view {
  display: grid;
  gap: var(--space-4);
}
.lab-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3);
  background: var(--panel);
  border: var(--line) solid var(--slate);
}
.delay-control {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.875rem;
}
.delay-control select,
.control-cluster select {
  padding: var(--space-1) var(--space-2);
  background: var(--night);
  color: var(--text);
  border: var(--line) solid var(--slate-light);
  font: inherit;
  border-radius: 0;
}
.action-btn {
  padding: var(--space-2) var(--space-3);
  background: var(--green);
  color: var(--ink);
  font-weight: 750;
  border: 0;
  cursor: pointer;
}
.action-btn:hover:not(:disabled) {
  background: var(--mint);
}
.action-btn:disabled {
  opacity: 0.6;
  cursor: wait;
}

.browser-mockup {
  border: var(--line) solid var(--slate-light);
  background: var(--night);
}
.browser-mockup-bar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  background: var(--panel);
  border-block-end: var(--line) solid var(--slate);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}
.browser-dots {
  display: flex;
  gap: 0.35rem;
}
.browser-dots i {
  display: inline-block;
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  background: var(--slate-light);
}
.browser-dots i:first-child {
  background: #e76f51;
}
.browser-dots i:nth-child(2) {
  background: #e9c46a;
}
.browser-dots i:nth-child(3) {
  background: #2a9d8f;
}
.browser-url {
  color: var(--muted);
  flex: 1;
}
.browser-spinner {
  color: var(--mint);
  font-weight: bold;
}
.browser-viewport {
  padding: var(--space-4);
  max-width: 44rem;
  margin-inline: auto;
}
.mock-article {
  display: grid;
  gap: var(--space-3);
}
.mock-header h4 {
  margin: 0;
  color: var(--text);
  font-size: 1.25rem;
}
.mock-meta {
  color: var(--muted);
  font-size: 0.8rem;
  margin-block-start: var(--space-1);
}
.mock-image-slot {
  position: relative;
  width: 100%;
  transition: all 0.25s ease-out;
}
.mock-image-slot.has-reservation {
  aspect-ratio: 3 / 2;
  background: var(--panel);
  border: var(--line) dashed var(--mint);
}
.mock-image-slot.no-reservation {
  min-height: 0;
  height: auto;
}
.reservation-ghost {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  color: var(--muted);
  font-size: 0.875rem;
  text-align: center;
  padding: var(--space-2);
}
.ghost-icon {
  font-size: 1.75rem;
}
.simulated-image {
  width: 100%;
  display: block;
}
.simulated-image svg {
  width: 100%;
  height: auto;
  display: block;
  border: var(--line) solid var(--slate);
}
.loaded-fade {
  animation: fadeIn 0.3s ease-in;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.shift-banner {
  padding: var(--space-2) var(--space-3);
  background: rgb(231 111 81 / 20%);
  border-inline-start: var(--space-1) solid #e76f51;
  color: #f4a261;
  display: grid;
  gap: var(--space-1);
  animation: shake 0.4s ease-out;
}
@keyframes shake {
  0%,
  100% {
    transform: translateY(0);
  }
  20%,
  60% {
    transform: translateY(-4px);
  }
  40%,
  80% {
    transform: translateY(4px);
  }
}
.shift-arrow {
  font-weight: 750;
  font-size: 0.9rem;
}
.mock-text {
  display: grid;
  gap: var(--space-2);
  line-height: 1.6;
  color: var(--text);
  font-size: 0.95rem;
}

.text-good {
  color: var(--mint) !important;
}
.text-bad {
  color: #e76f51 !important;
}
.text-mint {
  color: var(--mint);
}

/* ABA 2 */
.control-cluster {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.875rem;
}
.slider-cluster {
  flex: 1;
  min-width: min(100%, 15rem);
}
.slider-cluster input[type='range'] {
  flex: 1;
  accent-color: var(--green);
}
.fit-explanation-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--night);
  border-inline-start: var(--space-1) solid var(--green);
  font-size: 0.875rem;
}
.fit-explanation-bar code {
  font-family: var(--font-mono);
  color: var(--mint);
}
.stage-container {
  display: flex;
  justify-content: center;
  padding: var(--space-5) var(--space-2);
  background: repeating-linear-gradient(
    135deg,
    var(--panel) 0 var(--space-2),
    var(--night) var(--space-2) var(--space-4)
  );
  border: var(--line) solid var(--slate);
  overflow: hidden;
}
.fit-box-wrapper {
  transition: width 0.2s ease;
  max-width: 50rem;
}
.fit-frame {
  width: 100%;
  background: #000;
  border: var(--stroke) solid var(--mint);
  overflow: hidden;
  box-shadow: 0 4px 20px rgb(0 0 0 / 50%);
}
.fit-image {
  width: 100%;
  height: 100%;
  display: block;
}

/* ABA 3 */
.actual-srcset {
  display: block;
  width: min(100%, 32rem);
  height: auto;
}
@media (min-width: 48rem) {
  .actual-srcset {
    width: min(100%, 50vw, 32rem);
  }
}
.srcset-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  gap: var(--space-3);
}
.srcset-card {
  padding: var(--space-3);
  background: var(--night);
  border: var(--line) solid var(--slate);
  display: grid;
  gap: var(--space-2);
  position: relative;
  transition:
    border-color 0.2s,
    background 0.2s;
}
.srcset-card.is-chosen {
  border-color: var(--green);
  background: rgb(66 184 131 / 10%);
  outline: var(--line) solid var(--mint);
}
.srcset-card header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.file-tag {
  background: var(--panel);
  color: var(--mint);
  padding: var(--space-1) var(--space-2);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
}
.file-info {
  font-size: 0.85rem;
  color: var(--muted);
  display: grid;
  gap: var(--space-1);
}
.badge-active {
  color: var(--mint);
  font-size: 0.8rem;
  font-weight: 750;
  margin-block-start: var(--space-1);
}
</style>
