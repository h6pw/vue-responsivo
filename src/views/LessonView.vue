<script setup>
import { computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import ResponsivenessLesson from '@/lessons/responsividade/ResponsivenessLesson.vue'
import { useProgressStore } from '@/stores/progress'
import '@/assets/lesson.css'

const lessonContent = {
  responsividade: ResponsivenessLesson,
}

const props = defineProps({
  lesson: { type: Object, required: true },
})
const progress = useProgressStore()
const content = computed(() => lessonContent[props.lesson.slug])
watch(
  () => props.lesson.slug,
  (slug) => progress.markVisited(slug),
  { immediate: true },
)
</script>

<template>
  <article class="briefing-page" :class="{ 'briefing-page--complete': content }">
    <header class="lesson-heading">
      <RouterLink class="back-link" :to="{ name: 'home' }">← Voltar à trilha</RouterLink>
      <p class="eyebrow">{{ lesson.topic }}</p>
      <h1>{{ lesson.title }}</h1>
      <p>{{ lesson.description }}</p>
    </header>
    <component v-if="content" :is="content" :question="lesson.question" :route-name="lesson.slug" />
    <template v-else>
      <section class="briefing-question">
        <h2>Pergunta-guia</h2>
        <p>{{ lesson.question }}</p>
      </section>
      <p class="briefing-status">Prévia da lição. O conteúdo completo está em desenvolvimento.</p>
    </template>
  </article>
</template>
