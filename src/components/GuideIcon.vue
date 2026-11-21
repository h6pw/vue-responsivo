<script setup>
defineProps({
  topic: { type: String, required: true },
})
</script>

<template>
  <span class="guide-icon" aria-hidden="true">
    <span v-if="topic === 'viewport'" class="icon-viewport"><i></i></span>
    <span v-else-if="topic === 'units'" class="icon-units">Aa</span>
    <span v-else-if="topic === 'layout'" class="icon-layout"><i></i><i></i><i></i><i></i></span>
    <span v-else-if="topic === 'image'" class="icon-image"></span>
    <span v-else-if="topic === 'vue'" class="icon-vue"></span>
    <span v-else class="icon-challenge">✦</span>
  </span>
</template>
