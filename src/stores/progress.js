import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { lessons } from '@/data/lessons'

const storageKey = 'forma-variavel:visited'

function readVisited() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey))
    if (Array.isArray(saved))
      return lessons.filter((lesson) => saved.includes(lesson.slug)).map(({ slug }) => slug)
  } catch {
    // A navegação continua disponível quando o navegador bloqueia o armazenamento.
  }
  return []
}

export const useProgressStore = defineStore('progress', () => {
  const visited = ref(readVisited())
  const count = computed(() => visited.value.length)

  function markVisited(slug) {
    if (visited.value.includes(slug)) return
    visited.value.push(slug)
    try {
      localStorage.setItem(storageKey, JSON.stringify(visited.value))
    } catch {
      // O progresso continua disponível durante a sessão.
    }
  }

  return { visited, count, markVisited }
})
