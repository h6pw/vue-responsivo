<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

defineProps({
  routeName: { type: String, required: true },
})

const sections = [
  { id: 'explicacao', label: 'Explicação' },
  { id: 'exemplo', label: 'Exemplo e laboratório' },
  { id: 'pergunta-guia', label: 'Pergunta-guia' },
  { id: 'fontes', label: 'Fontes' },
]

const main = ref(null)
const activeId = ref(sections[0].id)
let panels = []
let frame = 0

function updateActive() {
  frame = 0
  const readingLine = Math.max(100, window.innerHeight * 0.33)
  const visible = panels.filter((panel) => panel.getBoundingClientRect().top <= readingLine)
  const last = panels.at(-1)
  const atEnd =
    window.scrollY > 0 &&
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
  activeId.value = atEnd ? last.id : (visible.at(-1) ?? panels[0]).id
}

function scheduleUpdate() {
  if (!frame) frame = requestAnimationFrame(updateActive)
}

onMounted(() => {
  panels = Array.from(main.value.children)
  updateActive()
  window.addEventListener('scroll', scheduleUpdate, { passive: true })
  window.addEventListener('resize', scheduleUpdate)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scheduleUpdate)
  window.removeEventListener('resize', scheduleUpdate)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <div class="lesson-layout">
    <nav class="lesson-rail" aria-label="Partes da lição">
      <ol>
        <li v-for="section in sections" :key="section.id">
          <RouterLink
            :to="{ name: routeName, hash: '#' + section.id }"
            :aria-current="activeId === section.id ? 'location' : undefined"
          >
            <span class="lesson-dot" aria-hidden="true"></span>
            <span class="lesson-rail-label">{{ section.label }}</span>
          </RouterLink>
        </li>
      </ol>
      <p class="lesson-rail-caption" aria-hidden="true">
        {{ sections.find((section) => section.id === activeId)?.label }}
      </p>
    </nav>

    <div ref="main" class="lesson-panels">
      <section
        v-for="section in sections"
        :id="section.id"
        :key="section.id"
        class="lesson-panel"
        :aria-labelledby="section.id + '-titulo'"
      >
        <h2 :id="section.id + '-titulo'">{{ section.label }}</h2>
        <slot :name="section.id" />
      </section>
    </div>
  </div>
</template>
