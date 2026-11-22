<script setup>
import { computed, ref, nextTick } from 'vue'

const activeTab = ref('key-bug') // 'key-bug' | 'vitals' | 'tokens'

// --- ABA 1: O BUG DO :key NO v-for ---
const useKey = ref(false)
const initialAnimals = () => [
  { id: 'c1', nome: 'Cachorro 🐕', cor: '#39758c' },
  { id: 'g2', nome: 'Gato 🐱', cor: '#42b883' },
  { id: 'p3', nome: 'Papagaio 🦜', cor: '#e9c46a' },
]
const animalList = ref(initialAnimals())
const revision = ref(0)
const removedAnimalName = ref('')
const bugNotice = ref('')

function resetAnimals() {
  revision.value++
  animalList.value = initialAnimals()
  removedAnimalName.value = ''
  bugNotice.value = ''
}

function removeFirstAnimal() {
  if (animalList.value.length === 0) return
  const removed = animalList.value[0]
  removedAnimalName.value = removed.nome
  animalList.value.splice(0, 1)

  if (!useKey.value) {
    bugNotice.value =
      'Sem chave, os campos continuam nas mesmas posições. Se você digitou no segundo campo antes de remover o Cachorro, o texto aparece agora na linha do Papagaio.'
  } else {
    bugNotice.value =
      'Com uma chave estável, o texto acompanha o animal mesmo quando ele muda de posição.'
  }
}

// --- ABA 2: CORE WEB VITALS ---
const simulatedLcp = ref(1.4) // segundos
const simulatedInp = ref(45) // milissegundos
const simulatedCls = ref(0.04) // score

const lcpStatus = computed(() => {
  if (simulatedLcp.value <= 2.5) return { label: 'Bom (≤ 2.5s)', class: 'status-good' }
  if (simulatedLcp.value <= 4.0)
    return { label: 'Precisa melhorar (2.5s - 4.0s)', class: 'status-warn' }
  return { label: 'Ruim (> 4.0s)', class: 'status-bad' }
})

const inpStatus = computed(() => {
  if (simulatedInp.value <= 200) return { label: 'Bom (≤ 200ms)', class: 'status-good' }
  if (simulatedInp.value <= 500)
    return { label: 'Precisa melhorar (200ms - 500ms)', class: 'status-warn' }
  return { label: 'Ruim (> 500ms)', class: 'status-bad' }
})

const clsStatus = computed(() => {
  if (simulatedCls.value <= 0.1) return { label: 'Bom (≤ 0.10)', class: 'status-good' }
  if (simulatedCls.value <= 0.25)
    return { label: 'Precisa melhorar (0.10 - 0.25)', class: 'status-warn' }
  return { label: 'Ruim (> 0.25)', class: 'status-bad' }
})

function triggerHeavyTask() {
  const start = performance.now()
  // Simulação de cálculo pesado que trava a main thread
  let count = 0
  for (let i = 0; i < 40000000; i++) {
    count += i
  }
  const elapsed = Math.round(performance.now() - start)
  simulatedInp.value = Math.max(elapsed, 280)
}

function triggerLightTask() {
  simulatedInp.value = Math.floor(Math.random() * 25) + 30
}

// --- ABA 3: DESIGN TOKENS ---
const themeBrandColor = ref('#42b883')
const tokenSpacing = ref(1) // rem

const demoStyles = computed(() => ({
  '--custom-brand': themeBrandColor.value,
  '--custom-spacing': `${tokenSpacing.value}rem`,
}))
</script>

<template>
  <section class="lesson-lab vue-lab" aria-labelledby="vue-lab-title">
    <div class="lesson-lab-heading">
      <h3 id="vue-lab-title">Laboratório de boas práticas em Vue</h3>
      <p>
        Experimente os efeitos reais de decisões arquiteturais: chaves de renderização, métricas de
        desempenho e tokens de design.
      </p>
    </div>

    <!-- Navegação de abas -->
    <div class="lesson-lab-devices" role="tablist" aria-label="Experimentos de Boas Práticas">
      <button
        type="button"
        role="tab"
        :aria-selected="activeTab === 'key-bug'"
        :aria-pressed="activeTab === 'key-bug'"
        @click="activeTab = 'key-bug'"
      >
        <span>1. O enigma do :key no v-for</span>
      </button>
      <button
        type="button"
        role="tab"
        :aria-selected="activeTab === 'vitals'"
        :aria-pressed="activeTab === 'vitals'"
        @click="activeTab = 'vitals'"
      >
        <span>2. Core Web Vitals (LCP, INP, CLS)</span>
      </button>
      <button
        type="button"
        role="tab"
        :aria-selected="activeTab === 'tokens'"
        :aria-pressed="activeTab === 'tokens'"
        @click="activeTab = 'tokens'"
      >
        <span>3. Design Tokens & Rotas Lazy</span>
      </button>
    </div>

    <!-- ABA 1: O BUG DO :key NO v-for -->
    <div v-if="activeTab === 'key-bug'" class="lab-view">
      <div class="lab-instruction-card">
        <h4>🧪 Roteiro do teste da pergunta-guia:</h4>
        <ol>
          <li>
            Digite uma frase no campo do <strong>2º animal (Gato 🐱)</strong>, por exemplo:
            <code>Gato gosta de dormir</code>.
          </li>
          <li>Clique no botão <strong>"Remover primeiro animal (Cachorro)"</strong>.</li>
          <li>
            Compare o comportamento com <strong>Sem :key</strong> versus <strong>Com :key</strong>.
          </li>
        </ol>
      </div>

      <div class="lab-toolbar">
        <label class="lesson-lab-toggle">
          <input v-model="useKey" type="checkbox" @change="resetAnimals" />
          <span>Ativar <code>:key="animal.id"</code> (Chave única estável)</span>
        </label>

        <div class="action-buttons-group">
          <button
            type="button"
            class="action-btn danger-btn"
            :disabled="animalList.length === 0"
            @click="removeFirstAnimal"
          >
            ❌ Remover 1º animal ({{ animalList[0]?.nome || 'Nenhum' }})
          </button>
          <button type="button" class="action-btn secondary-btn" @click="resetAnimals">
            ↻ Restaurar lista
          </button>
        </div>
      </div>

      <dl class="lesson-lab-readout">
        <div>
          <dt>Estratégia do Vue</dt>
          <dd :class="useKey ? 'text-good' : 'text-bad'">
            {{ useKey ? 'Identidade por Chave Única (:key)' : 'Atualização In-place (sem :key)' }}
          </dd>
        </div>
        <div>
          <dt>Itens na lista</dt>
          <dd>{{ animalList.length }} animais</dd>
        </div>
        <div>
          <dt>Integridade do DOM</dt>
          <dd :class="useKey ? 'text-good' : 'text-bad'">
            {{ useKey ? 'Nós preservados com perfeição' : 'Reaproveitamento cego de nós' }}
          </dd>
        </div>
      </dl>

      <!-- Lista interativa de animais -->
      <div :key="revision" class="animals-stage">
        <div v-if="animalList.length === 0" class="empty-state">
          <p>
            Todos os animais foram removidos. Clique em "Restaurar lista" para recomeçar o teste.
          </p>
        </div>

        <!-- RENDERIZAÇÃO SEM :KEY -->
        <ul v-if="!useKey" class="animals-list list-without-key">
          <li
            v-for="(animal, index) in animalList"
            class="animal-row"
            :style="{ borderLeftColor: animal.cor }"
          >
            <div class="animal-info">
              <span class="animal-pos">#{{ index + 1 }}</span>
              <strong>{{ animal.nome }}</strong>
              <small class="key-badge badge-warning">sem :key (DOM nó #{{ index }})</small>
            </div>
            <div class="animal-input-wrap">
              <label :for="'input-nokey-' + index">Anotação pessoal:</label>
              <!-- Campo nativo sem v-model para evidenciar o estado interno do DOM -->
              <input
                :id="'input-nokey-' + index"
                type="text"
                placeholder="Digite algo sobre este animal..."
                class="animal-input"
              />
            </div>
          </li>
        </ul>

        <!-- RENDERIZAÇÃO COM :KEY -->
        <ul v-else class="animals-list list-with-key">
          <li
            v-for="(animal, index) in animalList"
            :key="animal.id"
            class="animal-row"
            :style="{ borderLeftColor: animal.cor }"
          >
            <div class="animal-info">
              <span class="animal-pos">#{{ index + 1 }}</span>
              <strong>{{ animal.nome }}</strong>
              <small class="key-badge badge-success">:key="{{ animal.id }}"</small>
            </div>
            <div class="animal-input-wrap">
              <label :for="'input-key-' + animal.id">Anotação pessoal:</label>
              <input
                :id="'input-key-' + animal.id"
                type="text"
                placeholder="Digite algo sobre este animal..."
                class="animal-input"
              />
            </div>
          </li>
        </ul>
      </div>

      <div
        v-if="bugNotice"
        class="explanation-callout"
        :class="useKey ? 'callout-success' : 'callout-warning'"
      >
        <p>
          <strong>{{ useKey ? '✓ Comportamento Correto:' : '⚠️ Diagnóstico do Bug:' }}</strong>
        </p>
        <p>{{ bugNotice }}</p>
      </div>
    </div>

    <!-- ABA 2: CORE WEB VITALS -->
    <div v-else-if="activeTab === 'vitals'" class="lab-view">
      <div class="vitals-grid">
        <!-- LCP -->
        <div class="vital-card">
          <header class="vital-header">
            <span class="vital-tag">Carregamento</span>
            <h4>LCP · Largest Contentful Paint</h4>
          </header>
          <div class="vital-metric">
            <span class="vital-val" :class="lcpStatus.class">{{ simulatedLcp.toFixed(2) }} s</span>
            <span class="vital-status" :class="lcpStatus.class">{{ lcpStatus.label }}</span>
          </div>
          <p class="vital-desc">
            Mede quando o maior elemento visível (hero image ou bloco de título) foi pintado na
            tela.
          </p>
          <div class="vital-controls">
            <label>Simular tempo de pintura:</label>
            <input v-model.number="simulatedLcp" type="range" min="0.8" max="5.5" step="0.2" />
          </div>
          <ul class="vital-tips">
            <li>✓ Use imagens compactas em WebP/AVIF.</li>
            <li>✓ Evite <code>loading="lazy"</code> no elemento do LCP.</li>
          </ul>
        </div>

        <!-- INP -->
        <div class="vital-card">
          <header class="vital-header">
            <span class="vital-tag">Interatividade</span>
            <h4>INP · Interaction to Next Paint</h4>
          </header>
          <div class="vital-metric">
            <span class="vital-val" :class="inpStatus.class">{{ simulatedInp }} ms</span>
            <span class="vital-status" :class="inpStatus.class">{{ inpStatus.label }}</span>
          </div>
          <p class="vital-desc">
            Mede o atraso entre o clique/toque do usuário e a resposta visual na interface.
          </p>
          <div class="vital-actions">
            <button type="button" class="btn-sm action-btn" @click="triggerLightTask">
              ⚡ Clique Rápido (40ms)
            </button>
            <button type="button" class="btn-sm action-btn danger-btn" @click="triggerHeavyTask">
              🐢 Tarefa Pesada Travando CPU
            </button>
          </div>
          <ul class="vital-tips">
            <li>✓ Evite loops síncronos gigantes na thread principal.</li>
            <li>✓ Quebre tarefas longas com <code>setTimeout</code> ou Web Workers.</li>
          </ul>
        </div>

        <!-- CLS -->
        <div class="vital-card">
          <header class="vital-header">
            <span class="vital-tag">Estabilidade</span>
            <h4>CLS · Cumulative Layout Shift</h4>
          </header>
          <div class="vital-metric">
            <span class="vital-val" :class="clsStatus.class">{{ simulatedCls.toFixed(2) }}</span>
            <span class="vital-status" :class="clsStatus.class">{{ clsStatus.label }}</span>
          </div>
          <p class="vital-desc">
            Mede se elementos da tela se movem de forma inesperada enquanto o usuário lê.
          </p>
          <div class="vital-controls">
            <label>Simular deslocamentos:</label>
            <input v-model.number="simulatedCls" type="range" min="0.0" max="0.45" step="0.02" />
          </div>
          <ul class="vital-tips">
            <li>✓ Defina sempre <code>width</code> e <code>height</code> no HTML das imagens.</li>
            <li>✓ Reserve espaço prévio para anúncios ou banners dinâmicos.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- ABA 3: DESIGN TOKENS & ROTAS LAZY -->
    <div v-else class="lab-view">
      <div class="tokens-demo-layout" :style="demoStyles">
        <div class="tokens-control-panel">
          <h4>🎨 Variáveis CSS como Design Tokens</h4>
          <p>
            Altere as variáveis em tempo real e veja todos os componentes da amostra reagirem
            instantaneamente sem reescrever regras CSS individuais.
          </p>

          <div class="control-row">
            <label for="color-picker">Cor principal (<code>--custom-brand</code>):</label>
            <input id="color-picker" v-model="themeBrandColor" type="color" />
          </div>

          <div class="control-row">
            <label for="space-slider"
              >Espaçamento base (<code>--custom-spacing</code>):
              <strong>{{ tokenSpacing }} rem</strong></label
            >
            <input
              id="space-slider"
              v-model.number="tokenSpacing"
              type="range"
              min="0.5"
              max="2.0"
              step="0.25"
            />
          </div>

          <div class="code-token-preview">
            <pre><code>:root {
  --brand: {{ themeBrandColor }};
  --space-unit: {{ tokenSpacing }}rem;
}</code></pre>
          </div>
        </div>

        <div class="tokens-live-preview">
          <div class="demo-card">
            <h5 class="demo-card-title">Card Alimentado por Tokens</h5>
            <p class="demo-card-text">
              Este card lê <code>var(--custom-brand)</code> para a borda e o botão, e
              <code>var(--custom-spacing)</code> para seus espaçamentos internos.
            </p>
            <button type="button" class="demo-btn">Botão com Token</button>
          </div>
        </div>
      </div>

      <!-- Comparativo Lazy Loading -->
      <div class="lazy-comparison-card">
        <h4>⚡ Carregamento de Rotas sob Demanda (Lazy Loading no Vue Router)</h4>
        <div class="routes-flow">
          <div class="flow-item">
            <strong>❌ Import Estático Tradicional:</strong>
            <code>import LessonView from './LessonView.vue'</code>
            <p>
              O navegador baixa todo o código de todas as 6 lições de uma vez logo no primeiro
              acesso ao site (Bundle grande de ~450 KB, atrasando o LCP inicial).
            </p>
          </div>
          <div class="flow-item is-recommended">
            <strong>✓ Import Dinâmico (Sob Demanda):</strong>
            <code>component: () => import('./LessonView.vue')</code>
            <p>
              O Vite cria pedaços separados (chunks). Ao entrar na home, baixa apenas ~80 KB. Cada
              lição só é transferida pela rede quando a pessoa realmente clica para abri-la!
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vue-lab {
  overflow-wrap: anywhere;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-4);
}
.lab-view {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-4);
}
.lab-instruction-card {
  padding: var(--space-3) var(--space-4);
  background: var(--night);
  border-inline-start: var(--space-1) solid var(--mint);
  border: var(--line) solid var(--slate);
  border-inline-start-width: var(--space-1);
}
.lab-instruction-card h4 {
  margin: 0 0 var(--space-2);
  color: var(--mint);
  font-size: 1rem;
}
.lab-instruction-card ol {
  margin: 0;
  padding-inline-start: var(--space-4);
  display: grid;
  gap: var(--space-1);
  font-size: 0.9rem;
  color: var(--text);
}
.lab-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--panel);
  border: var(--line) solid var(--slate);
}
.action-buttons-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.action-btn {
  padding: var(--space-2) var(--space-3);
  border: 0;
  cursor: pointer;
  font-weight: 750;
  font-size: 0.875rem;
}
.danger-btn {
  background: #e76f51;
  color: white;
}
.danger-btn:hover:not(:disabled) {
  background: #f4a261;
}
.danger-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.secondary-btn {
  background: var(--slate-light);
  color: var(--text);
}
.secondary-btn:hover {
  background: var(--slate);
}

.animals-stage {
  padding: var(--space-3);
  background: var(--night);
  border: var(--line) solid var(--slate);
  min-height: 12rem;
}
.animals-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-3);
}
.animal-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--panel);
  border: var(--line) solid var(--slate);
  border-inline-start: var(--stroke) solid var(--green);
  transition: all 0.3s ease;
}
.animal-info {
  display: flex;
  flex-wrap: wrap;
  min-inline-size: 0;
  align-items: center;
  gap: var(--space-2);
}
.animal-pos {
  font-family: var(--font-mono);
  color: var(--muted);
  font-size: 0.85rem;
}
.key-badge {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 0.15rem 0.4rem;
}
.badge-warning {
  background: rgb(233 196 106 / 20%);
  color: #e9c46a;
}
.badge-success {
  background: rgb(66 184 131 / 20%);
  color: var(--mint);
}
.animal-input-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  flex: 1;
  min-inline-size: 0;
  flex-basis: min(100%, 16rem);
}
.animal-input-wrap label {
  font-size: 0.8rem;
  color: var(--muted);
  white-space: nowrap;
}
.animal-input {
  min-inline-size: 0;
  max-inline-size: 100%;
  flex: 1;
  padding: var(--space-2);
  background: var(--night);
  color: var(--text);
  border: var(--line) solid var(--slate-light);
  font: inherit;
}
.animal-input:focus {
  border-color: var(--mint);
  outline: none;
}
.empty-state {
  display: grid;
  place-items: center;
  padding: var(--space-6);
  color: var(--muted);
}

.explanation-callout {
  padding: var(--space-3) var(--space-4);
  border: var(--line) solid transparent;
  display: grid;
  gap: var(--space-1);
  font-size: 0.9rem;
  line-height: 1.5;
}
.callout-warning {
  background: rgb(231 111 81 / 15%);
  border-color: #e76f51;
  color: #f4a261;
}
.callout-success {
  background: rgb(66 184 131 / 15%);
  border-color: var(--green);
  color: var(--mint);
}

/* VITALS */
.vitals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: var(--space-3);
}
.vital-card {
  padding: var(--space-4);
  background: var(--night);
  border: var(--line) solid var(--slate);
  display: grid;
  gap: var(--space-3);
  align-content: start;
}
.vital-header {
  display: grid;
  gap: var(--space-1);
}
.vital-tag {
  font-size: 0.75rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.vital-header h4 {
  margin: 0;
  color: var(--text);
  font-size: 1.1rem;
}
.vital-metric {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: var(--space-2) var(--space-3);
  background: var(--panel);
}
.vital-val {
  font-family: var(--font-mono);
  font-size: 1.75rem;
  font-weight: 750;
}
.vital-status {
  font-size: 0.8rem;
  font-weight: 700;
}
.status-good {
  color: var(--mint);
}
.status-warn {
  color: #e9c46a;
}
.status-bad {
  color: #e76f51;
}
.vital-desc {
  font-size: 0.85rem;
  color: var(--muted);
  line-height: 1.5;
  margin: 0;
}
.vital-controls {
  display: grid;
  gap: var(--space-1);
  font-size: 0.8rem;
}
.vital-controls input[type='range'] {
  accent-color: var(--green);
}
.vital-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.btn-sm {
  font-size: 0.8rem;
  padding: var(--space-1) var(--space-2);
}
.vital-tips {
  margin: 0;
  padding-inline-start: var(--space-3);
  list-style: none;
  display: grid;
  gap: var(--space-1);
  font-size: 0.8rem;
  color: var(--muted);
}
.vital-tips li code {
  color: var(--mint);
}

/* TOKENS */
.tokens-demo-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--night);
  border: var(--line) solid var(--slate);
}
.tokens-control-panel {
  display: grid;
  gap: var(--space-3);
}
.tokens-control-panel h4 {
  margin: 0;
  color: var(--mint);
}
.tokens-control-panel p {
  color: var(--muted);
  font-size: 0.85rem;
  line-height: 1.5;
}
.control-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  font-size: 0.85rem;
}
.control-row input[type='range'] {
  accent-color: var(--custom-brand, var(--green));
}
.code-token-preview pre {
  margin: 0;
  padding: var(--space-2);
  background: var(--panel);
  border: var(--line) solid var(--slate);
  font-size: 0.8rem;
  color: var(--mint);
}
.tokens-live-preview {
  display: grid;
  place-items: center;
}
.demo-card {
  padding: var(--custom-spacing, 1rem);
  background: var(--panel);
  border: var(--stroke) solid var(--custom-brand, var(--green));
  display: grid;
  gap: var(--custom-spacing, 1rem);
  transition: all 0.2s ease;
  max-width: 20rem;
  width: 100%;
}
.demo-card-title {
  margin: 0;
  color: var(--custom-brand, var(--green));
  font-size: 1.1rem;
}
.demo-card-text {
  font-size: 0.85rem;
  color: var(--text);
  line-height: 1.5;
}
.demo-btn {
  padding: calc(var(--custom-spacing, 1rem) * 0.5) var(--custom-spacing, 1rem);
  background: var(--custom-brand, var(--green));
  color: var(--night);
  font-weight: 750;
  border: 0;
  cursor: pointer;
}

.lazy-comparison-card {
  padding: var(--space-4);
  background: var(--night);
  border: var(--line) solid var(--slate);
  display: grid;
  gap: var(--space-3);
}
.lazy-comparison-card h4 {
  margin: 0;
  color: var(--mint);
}
.routes-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: var(--space-3);
}
.flow-item {
  padding: var(--space-3);
  background: var(--panel);
  border: var(--line) solid var(--slate);
  display: grid;
  gap: var(--space-2);
  font-size: 0.85rem;
  line-height: 1.5;
}
.flow-item code {
  color: var(--mint);
  font-family: var(--font-mono);
  background: var(--night);
  padding: var(--space-1);
}
.flow-item.is-recommended {
  border-color: var(--green);
  outline: var(--line) solid var(--mint);
}

.text-good {
  color: var(--mint) !important;
}
.text-bad {
  color: #e76f51 !important;
}
</style>
