<script setup>
defineProps({
  layout: { type: String, required: true },
})
</script>

<template>
  <div class="viewport-diagram" :class="'viewport-diagram--' + layout" aria-hidden="true">
    <div class="diagram-bar"><i></i><i></i><i></i></div>
    <div class="diagram-page">
      <span class="diagram-title"></span>
      <div class="diagram-grid">
        <span v-for="letter in ['A', 'B', 'C']" :key="letter">{{ letter }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.viewport-diagram {
  display: grid;
  align-content: start;
  align-self: end;
  inline-size: min(100%, 8rem);
  margin-inline: auto;
  min-block-size: 8rem;
  overflow: hidden;
  background: var(--panel);
  border: var(--stroke) solid var(--mint);
}
.viewport-diagram--wide {
  inline-size: min(100%, 18rem);
  min-block-size: 6.5rem;
}
.diagram-bar {
  display: flex;
  gap: 0.23rem;
  padding: 0.31rem 0.45rem;
  background: var(--mint);
}
.diagram-bar i {
  inline-size: 0.22rem;
  block-size: 0.22rem;
  border-radius: 50%;
  background: var(--ink);
}
.diagram-page {
  display: grid;
  gap: 0.35rem;
  padding: 0.45rem;
}
.diagram-title {
  inline-size: 50%;
  block-size: 0.23rem;
  background: var(--muted);
}
.diagram-grid {
  display: grid;
  gap: 0.22rem;
}
.diagram-grid span {
  display: grid;
  place-items: center;
  min-block-size: 1.68rem;
  background: var(--mint);
  color: var(--ink);
  font: 750 0.75rem / 1 var(--font-mono);
}
.diagram-grid span:nth-child(2) {
  background: var(--green);
}
.diagram-grid span:nth-child(3) {
  background: var(--slate-light);
  color: var(--text);
}
:is(.viewport-diagram--wide, .viewport-diagram--scaled) .diagram-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.viewport-diagram--wide .diagram-grid span {
  min-block-size: 3.2rem;
}
.viewport-diagram--scaled .diagram-page {
  gap: 0.16rem;
  padding: 0.2rem;
}
.viewport-diagram--scaled .diagram-grid span {
  min-block-size: 0.75rem;
  font-size: 0.42rem;
}
</style>
