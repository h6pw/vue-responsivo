<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  documentHtml: { type: String, required: true },
  displayWidth: { type: Number, required: true },
  viewportWidth: { type: Number, required: true },
})
const screen = ref(null)
const screenSize = ref({ width: 0, height: 0 })
let observer

const scale = computed(() => screenSize.value.width / props.viewportWidth)
const frameStyle = computed(() => ({
  inlineSize: props.viewportWidth + 'px',
  blockSize: screenSize.value.height / scale.value + 'px',
  transform: 'scale(' + scale.value + ')',
}))

onMounted(() => {
  observer = new ResizeObserver(
    ([
      {
        contentRect: { width, height },
      },
    ]) => {
      screenSize.value = { width, height }
    },
  )
  observer.observe(screen.value)
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="lesson-lab-stage">
    <div ref="screen" class="viewport-screen" :style="{ '--screen-width': displayWidth + 'px' }">
      <iframe
        v-if="scale > 0"
        :srcdoc="documentHtml"
        :style="frameStyle"
        :title="title"
        tabindex="-1"
        sandbox=""
      ></iframe>
    </div>
  </div>
</template>
