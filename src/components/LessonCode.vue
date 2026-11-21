<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  source: { type: String, required: true },
})

const segments = computed(() => props.source.split(/(<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/)/))
</script>

<template>
  <figure>
    <figcaption>{{ title }}</figcaption>
    <pre><code><span v-for="(segment, index) in segments" :key="index" :class="{ 'code-comment': index % 2 === 1 }">{{ segment }}</span></code></pre>
  </figure>
</template>

<style scoped>
.code-comment {
  color: var(--text);
  background: var(--panel);
  font-weight: 700;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
</style>
