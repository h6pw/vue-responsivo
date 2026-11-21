<script setup>
import LessonSections from '@/components/LessonSections.vue'
import UnitReferences from './UnitReferences.vue'
import UnitsLab from './UnitsLab.vue'

defineProps({ question: String, routeName: String })
const referenceSizes = [16, 20]
</script>
<template>
  <LessonSections :route-name="routeName">
    <template #explicacao><UnitReferences /></template>
    <template #exemplo><UnitsLab /></template>
    <template #pergunta-guia>
      <p class="lesson-question">{{ question }}</p>
      <p>
        Imagine duas pessoas lendo o mesmo guia. Uma usa a fonte padrão de 16 px. A outra aumenta a
        preferência do navegador para 20 px. Com <code>html { font-size: 100%; }</code>, a raiz
        acompanha essa escolha.
      </p>
      <div class="samples guide-samples">
        <section v-for="size in referenceSizes" :key="size" class="guide-sample">
          <h3>Fonte raiz de {{ size }} px</h3>
          <div>
            <p class="sample-measure"><code>24px</code> → 24 px</p>
            <p class="sample-text" style="font-size: 24px">Guia de estudos</p>
          </div>
          <div>
            <p class="sample-measure">
              <code>1.5rem</code> → {{ size }} × 1,5 = {{ size * 1.5 }} px
            </p>
            <p class="sample-text" :style="{ fontSize: size * 1.5 + 'px' }">Guia de estudos</p>
          </div>
        </section>
      </div>
      <p>
        Leia os cartões da esquerda para a direita ou de cima para baixo. Em ambos,
        <code>24px</code> pede 24 pixels CSS diretamente. Já <code>1.5rem</code> pede uma vez e meia
        o tamanho da raiz. Como a raiz passou de 16 para 20 px, o resultado passou de 24 para 30 px.
        O zoom da página amplia visualmente os dois textos.
      </p>
    </template>
    <template #fontes>
      <ul class="lesson-sources">
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length"
            >MDN Web Docs · Comprimentos absolutos e relativos</a
          >
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/percentage"
            >MDN Web Docs · Porcentagens no CSS</a
          >
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/flex_value"
            >MDN Web Docs · A unidade fr no Grid</a
          >
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-size"
            >MDN Web Docs · Tamanho da fonte</a
          >
        </li>
      </ul>
    </template>
  </LessonSections>
</template>
<style scoped>
.samples {
  display: grid;
  gap: var(--space-4);
}
.samples {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
}
.samples p {
  overflow-wrap: anywhere;
}
.sample-measure {
  color: var(--mint);
  font-family: var(--font-mono);
  font-size: 0.875rem;
}
.guide-sample {
  display: grid;
  gap: var(--space-3);
  min-inline-size: 0;
  padding: var(--space-3);
  border: var(--line) solid var(--slate-light);
  background: var(--night);
}
.guide-sample h3 {
  font-size: 1rem;
}
.sample-text {
  line-height: 1.25;
}
</style>
