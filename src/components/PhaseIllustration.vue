<script setup>
const devices = ['desktop', 'tablet', 'phone']

defineProps({
  visual: { type: String, required: true },
})
</script>

<template>
  <div class="phase-art" :class="'phase-art--' + visual" aria-hidden="true">
    <div class="art-target"></div>
    <div v-if="visual === 'viewport'" class="art-devices">
      <div
        v-for="device in devices"
        :key="device"
        class="art-screen"
        :class="'art-screen--' + device"
      >
        <div class="art-screen-bar"></div>
        <div class="art-screen-banner"></div>
        <div class="art-screen-cards"><i></i><i></i></div>
      </div>
    </div>
    <div v-else-if="visual === 'units'" class="art-units">
      <div class="art-units-samples">
        <div class="art-unit-sample"><b>Aa</b><span>16px</span></div>
        <div class="art-unit-sample"><b class="art-unit-relative">Aa</b><span>1rem</span></div>
      </div>
      <div class="art-units-scale">
        <span>16 px</span>
        <span>Fonte-base</span>
        <span>24 px</span>
        <div class="art-units-track"><i></i></div>
      </div>
    </div>
    <div v-else-if="visual === 'layout'" class="art-layout">
      <div class="art-layout-tiles">
        <i v-for="tile in 5" :key="tile" class="art-layout-tile"></i>
        <i class="art-layout-empty"></i>
      </div>
      <div class="art-layout-mode">
        <span class="art-layout-flex">Flexbox</span>
        <span class="art-layout-grid">Grid</span>
      </div>
    </div>
    <div v-else-if="visual === 'image'" class="art-image">
      <div class="art-image-frame">
        <div class="art-image-landscape"><i></i><i></i></div>
      </div>
    </div>
    <div v-else class="art-code">
      <b class="art-code-bracket">&lt;</b>
      <div class="art-code-page">
        <span class="art-code-part art-code-header">Header</span>
        <span class="art-code-part art-code-card">Card</span>
        <span class="art-code-part art-code-card">Card</span>
        <span class="art-code-part art-code-footer">Footer</span>
      </div>
      <b class="art-code-bracket">&gt;</b>
    </div>
  </div>
</template>
