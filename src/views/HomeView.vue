<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import GuideIcon from '@/components/GuideIcon.vue'
import PhaseIllustration from '@/components/PhaseIllustration.vue'
import { lessons } from '@/data/lessons'
import { useProgressStore } from '@/stores/progress'

const progress = useProgressStore()
const selectedIndex = ref(0)
const current = computed(() => lessons[selectedIndex.value])
const preview = ref(null)
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')

function selectLesson(index, event) {
  selectedIndex.value = index
  if (event.detail === 0 || window.matchMedia('(min-width: 47rem)').matches) return

  preview.value?.scrollIntoView({
    behavior: motionPreference.matches ? 'instant' : 'smooth',
    block: 'start',
  })
}

function moveSelection(event, index) {
  const destinations = {
    ArrowUp: (index + lessons.length - 1) % lessons.length,
    ArrowDown: (index + 1) % lessons.length,
    Home: 0,
    End: lessons.length - 1,
  }
  if (!Object.hasOwn(destinations, event.key)) return
  event.preventDefault()
  selectedIndex.value = destinations[event.key]
  event.currentTarget.closest('ul').querySelectorAll('button')[selectedIndex.value].focus()
}
</script>

<template>
  <section class="home-intro" aria-labelledby="home-title">
    <div>
      <h1 id="home-title" class="eyebrow">
        <span class="intro-mark" aria-hidden="true"></span> Guia de responsividade
      </h1>
      <p class="home-description">
        Aprenda a criar interfaces responsivas com Vue 3, do primeiro ajuste de tela ao desafio
        final.
      </p>
    </div>
    <div class="progress-box">
      <p>
        <strong
          >{{ progress.count }}<span>/{{ lessons.length }}</span></strong
        >
        lições visitadas
      </p>
      <div class="progress-segments" aria-hidden="true">
        <i
          v-for="step in lessons.length"
          :key="step"
          :class="{ filled: step <= progress.count }"
        ></i>
      </div>
    </div>
  </section>

  <section class="phase-catalog" aria-labelledby="choose-phase">
    <div class="catalog-control">
      <div class="catalog-heading">
        <h2 id="choose-phase">Trilha de aprendizado</h2>
        <span aria-hidden="true"></span>
      </div>
      <ul class="phase-list">
        <li v-for="(lesson, index) in lessons" :key="lesson.slug">
          <button
            type="button"
            class="phase-button"
            :aria-pressed="selectedIndex === index"
            aria-controls="phase-preview"
            @click="selectLesson(index, $event)"
            @keydown="moveSelection($event, index)"
          >
            <GuideIcon :topic="lesson.visual" />
            <span class="phase-label">
              <strong>{{ lesson.title }}</strong>
              <small>{{ lesson.topic }}</small>
            </span>
            <span class="phase-indicator" aria-hidden="true">
              {{ progress.visited.includes(lesson.slug) ? '✓' : '→' }}
            </span>
            <span v-if="progress.visited.includes(lesson.slug)" class="screen-reader"
              >Visitada</span
            >
          </button>
        </li>
      </ul>
      <RouterLink class="challenge-link" :to="{ name: 'desafio' }">
        <GuideIcon topic="challenge" />
        <span>Desafio final</span>
        <span aria-hidden="true">↗</span>
      </RouterLink>
    </div>

    <article
      id="phase-preview"
      ref="preview"
      class="phase-preview"
      aria-labelledby="phase-title"
      aria-live="polite"
    >
      <div :key="current.slug" class="preview-card">
        <PhaseIllustration :visual="current.visual" />
        <div class="preview-content">
          <p class="eyebrow preview-kicker"><span aria-hidden="true"></span> {{ current.title }}</p>
          <h2 id="phase-title">{{ current.mission }}</h2>
          <p>{{ current.description }}</p>
        </div>
        <RouterLink class="enter-phase" :to="{ name: current.slug }">
          Abrir lição <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </article>
  </section>
</template>
