import { createRouter, createWebHistory } from 'vue-router'
import { lessons } from '@/data/lessons'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
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
