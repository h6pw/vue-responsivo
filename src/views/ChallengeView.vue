<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <article class="briefing-page">
    <RouterLink class="back-link" :to="{ name: 'home' }">← Voltar à trilha</RouterLink>
    <p class="eyebrow">Última etapa</p>
    <h1>Desafio final</h1>
    <p>Use o que você descobriu no guia para resolver o desafio.</p>
    <p class="briefing-status">O desafio será definido junto com os laboratórios.</p>
  </article>
</template>
