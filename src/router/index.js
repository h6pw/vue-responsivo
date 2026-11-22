import { createRouter, createWebHashHistory } from 'vue-router'
import { lessons } from '@/data/lessons'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (!to.hash) return { top: 0 }

    const target = document.getElementById(to.hash.slice(1))
    if (!target) return { top: 0 }

    return {
      el: target,
      top: parseFloat(getComputedStyle(target).scrollMarginTop) || 0,
      behavior:
        to.path === from.path && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'smooth'
          : 'instant',
    }
  },
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    ...lessons.map((lesson) => ({
      path: '/' + lesson.slug,
      name: lesson.slug,
      component: () => import('@/views/LessonView.vue'),
      props: { lesson },
    })),
    { path: '/desafio', name: 'desafio', component: () => import('@/views/ChallengeView.vue') },
  ],
})

export default router
