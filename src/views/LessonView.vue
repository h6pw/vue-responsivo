<script setup>
import { watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useProgressStore } from '@/stores/progress'

const props = defineProps({
  lesson: { type: Object, required: true },
})
const progress = useProgressStore()
watch(
  () => props.lesson.slug,
  (slug) => progress.markVisited(slug),
  { immediate: true },
)
</script>

<template>
  <article class="briefing-page">
    <RouterLink class="back-link" :to="{ name: 'home' }">← Voltar à trilha</RouterLink>
    <p class="eyebrow">{{ lesson.topic }}</p>
    <h1>{{ lesson.title }}</h1>
    <p>{{ lesson.description }}</p>
    <section class="briefing-question">
      <h2>Pergunta-guia</h2>
      <p>{{ lesson.question }}</p>
    </section>
    <p class="briefing-status">Prévia da lição. O conteúdo completo está em desenvolvimento.</p>
  </article>
</template>
