<script setup>
defineProps({ lesson: { type: String, required: true } })
</script>

<template>
  <figure class="challenge-figure">
    <template v-if="lesson === 'responsividade'">
      <figcaption>Celular de 390 px · breakpoint de 640 px</figcaption>
      <div class="challenge-phone">
        <div class="phone-screen" aria-hidden="true">?</div>
        <div>
          <span>Tela física simulada: <strong>390 px</strong></span
          ><span>Meta viewport: <strong>desligada</strong></span
          ><span>Viewport CSS: <strong>?</strong></span>
        </div>
      </div>
    </template>
    <template v-else-if="lesson === 'unidades-css'">
      <figcaption>Mudança na preferência de fonte do navegador</figcaption>
      <div class="scenario-pair">
        <div><span>Raiz antes</span><strong>16 px</strong></div>
        <div><span>Raiz depois</span><strong>20 px</strong></div>
      </div>
      <div class="scenario-pair">
        <div><code>24px</code><span>Tamanho final: ?</span></div>
        <div><code>1.5rem</code><span>Tamanho final: ?</span></div>
      </div>
    </template>
    <template v-else-if="lesson === 'flexbox-grid'">
      <figcaption>Três cartões e dois vãos na mesma linha</figcaption>
      <div class="grid-ruler">
        <strong>224 px</strong><span>16 px</span><strong>224 px</strong><span>16 px</span
        ><strong>224 px</strong>
      </div>
      <p>Largura interna total: ?</p>
    </template>
    <template v-else-if="lesson === 'imagens-responsivas'">
      <figcaption>O mesmo artigo em dois momentos</figcaption>
      <div class="scenario-pair">
        <div>
          <strong>Antes de carregar</strong><span class="article-text">Texto do artigo</span>
        </div>
        <div>
          <strong>Depois de carregar</strong><span class="article-image">Foto</span
          ><span class="article-text">Texto do artigo</span>
        </div>
      </div>
    </template>
    <template v-else>
      <figcaption>Lista sem chave estável. O primeiro animal será removido.</figcaption>
      <div class="animal-rows">
        <div><strong>Cachorro</strong><span>Campo vazio</span></div>
        <div><strong>Gato</strong><span class="typed-note">vacina</span></div>
        <div><strong>Papagaio</strong><span>Campo vazio</span></div>
      </div>
    </template>
  </figure>
</template>

<style scoped>
.challenge-figure {
  display: grid;
  gap: var(--space-2);
  margin: 0;
  padding: var(--space-3);
  min-inline-size: 0;
  border: var(--line) solid var(--slate);
  background: var(--panel);
}
.challenge-figure figcaption {
  color: var(--mint);
  font-weight: 700;
  font-size: 0.875rem;
}
.challenge-phone {
  display: grid;
  grid-template-columns: minmax(0, 6rem) minmax(0, 1fr);
  gap: var(--space-3);
  align-items: center;
}
.phone-screen {
  display: grid;
  place-items: center;
  min-block-size: 4.5rem;
  border: var(--stroke) solid var(--mint);
  border-radius: var(--space-2);
  background: var(--night);
  color: var(--mint);
  font: 750 1.5rem / 1 var(--font-mono);
}
.challenge-phone > div:last-child,
.scenario-pair > div,
.animal-rows {
  display: grid;
  gap: var(--space-1);
}
.scenario-pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
}
.scenario-pair > div,
.animal-rows > div {
  align-content: start;
  background: var(--night);
  padding: var(--space-2);
  font-size: 0.875rem;
}
.grid-ruler {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
  gap: var(--space-1);
  align-items: center;
  text-align: center;
  font-size: 0.75rem;
}
.grid-ruler strong,
.article-image {
  padding: var(--space-2) var(--space-1);
  color: var(--ink);
  background: var(--mint);
}
.grid-ruler + p {
  text-align: center;
  font-size: 0.85rem;
}
.article-text,
.typed-note {
  padding: var(--space-1);
  color: var(--mint);
  background: var(--panel);
}
.article-image {
  min-block-size: 2rem;
  text-align: center;
}
.animal-rows > div {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  gap: var(--space-2);
}
</style>
