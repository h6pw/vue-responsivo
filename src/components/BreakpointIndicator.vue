<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
const windowHeight = ref(typeof window !== 'undefined' ? window.innerHeight : 768)
const isMinimized = ref(false)

function handleResize() {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const widthInRem = computed(() => (windowWidth.value / 16).toFixed(1))

const currentBreakpoint = computed(() => {
  if (windowWidth.value < 768) {
    return { name: 'Mobile', query: '< 48rem', badgeClass: 'bp-mobile' }
  }
  if (windowWidth.value < 1024) {
    return { name: 'Tablet', query: '48rem - 64rem', badgeClass: 'bp-tablet' }
  }
  return { name: 'Desktop', query: '≥ 64rem', badgeClass: 'bp-desktop' }
})
</script>

<template>
  <aside
    class="breakpoint-indicator"
    :class="{ 'is-minimized': isMinimized }"
    aria-label="Indicador de largura de janela e breakpoint"
  >
    <button
      type="button"
      class="indicator-toggle"
      :title="isMinimized ? 'Expandir indicador de tela' : 'Minimizar indicador'"
      @click="isMinimized = !isMinimized"
    >
      <span class="indicator-pulse" aria-hidden="true"></span>
      <span class="indicator-summary">
        <strong>{{ windowWidth }}px</strong>
        <span class="indicator-bp">{{ currentBreakpoint.name }}</span>
      </span>
      <span class="indicator-icon">{{ isMinimized ? '▲' : '▼' }}</span>
    </button>

    <div v-show="!isMinimized" class="indicator-body">
      <div class="indicator-row">
        <span>Largura da tela:</span>
        <code>{{ windowWidth }} px ({{ widthInRem }} rem)</code>
      </div>
      <div class="indicator-row">
        <span>Altura da tela:</span>
        <code>{{ windowHeight }} px</code>
      </div>
      <div class="indicator-row">
        <span>Breakpoint ativo:</span>
        <span class="bp-badge" :class="currentBreakpoint.badgeClass">
          {{ currentBreakpoint.name }} ({{ currentBreakpoint.query }})
        </span>
      </div>
      <small class="indicator-note">Base 1rem = 16px</small>
    </div>
  </aside>
</template>

<style scoped>
.breakpoint-indicator {
  position: fixed;
  inset-block-end: var(--space-3);
  inset-inline-end: var(--space-3);
  z-index: 100;
  background: var(--night);
  border: var(--line) solid var(--slate-light);
  border-block-start: var(--stroke) solid var(--green);
  box-shadow: 0 4px 16px rgb(0 0 0 / 60%);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text);
  max-width: 17rem;
  backdrop-filter: blur(8px);
}
.indicator-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-2) var(--space-3);
  background: var(--panel);
  border: 0;
  cursor: pointer;
  color: var(--text);
  font: inherit;
}
.indicator-toggle:hover {
  background: var(--slate);
}
.indicator-pulse {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 6px var(--mint);
}
.indicator-summary {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.indicator-summary strong {
  color: var(--mint);
}
.indicator-bp {
  color: var(--muted);
  font-size: 0.7rem;
}
.indicator-icon {
  font-size: 0.65rem;
  color: var(--muted);
}
.indicator-body {
  padding: var(--space-2) var(--space-3);
  display: grid;
  gap: var(--space-1);
  background: var(--night);
  border-block-start: var(--line) solid var(--slate);
}
.indicator-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
}
.indicator-row span:first-child {
  color: var(--muted);
}
.indicator-row code {
  color: var(--mint);
  font-size: 0.75rem;
}
.bp-badge {
  padding: 0.1rem 0.35rem;
  font-weight: 750;
  font-size: 0.7rem;
}
.bp-mobile {
  background: rgb(233 196 106 / 20%);
  color: #e9c46a;
}
.bp-tablet {
  background: rgb(57 117 140 / 30%);
  color: #8ac4d0;
}
.bp-desktop {
  background: rgb(66 184 131 / 20%);
  color: var(--mint);
}
.indicator-note {
  color: var(--muted);
  font-size: 0.65rem;
  text-align: right;
  margin-block-start: var(--space-1);
}
</style>
