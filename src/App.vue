<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import BreakpointIndicator from '@/components/BreakpointIndicator.vue'
import githubMark from '@/assets/github-mark.svg'
import './assets/guide.css'

const menuOpen = ref(false)
const menuButton = ref(null)

function dismissMenu() {
  if (!menuOpen.value) return
  menuOpen.value = false
  menuButton.value?.focus()
}
</script>

<template>
  <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>
  <header class="site-header" @keydown.esc="dismissMenu">
    <div class="site-width header-inner">
      <RouterLink class="brand" :to="{ name: 'home' }" @click="menuOpen = false">
        <span class="brand-symbol" aria-hidden="true"></span>
        Guia <strong>Vue 3</strong>
      </RouterLink>
      <button
        ref="menuButton"
        class="menu-toggle"
        type="button"
        aria-controls="site-nav"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <span class="menu-glyph" aria-hidden="true"><i></i><i></i></span>
        {{ menuOpen ? 'Fechar' : 'Menu' }}
      </button>
      <nav id="site-nav" class="site-nav" :class="{ 'site-nav--open': menuOpen }" aria-label="Guia">
        <RouterLink :to="{ name: 'home' }" @click="menuOpen = false">Trilha</RouterLink>
        <RouterLink :to="{ name: 'desafio' }" @click="menuOpen = false">Desafio</RouterLink>
      </nav>
    </div>
  </header>
  <main id="conteudo" class="site-width">
    <RouterView v-slot="{ Component, route }">
      <div :key="route.path" class="route-content">
        <component :is="Component" />
      </div>
    </RouterView>
  </main>
  <footer class="site-footer">
    <div class="site-width footer-inner">
      <p>Desenvolvido por</p>
      <ul aria-label="Autores no GitHub">
        <li>
          <a href="https://github.com/h6pw"><img :src="githubMark" alt="" /> Matheus Czubka</a>
        </li>
        <li>
          <a href="https://github.com/kadulim"><img :src="githubMark" alt="" /> Carlos Eduardo</a>
        </li>
      </ul>
    </div>
  </footer>
  <BreakpointIndicator />
</template>
