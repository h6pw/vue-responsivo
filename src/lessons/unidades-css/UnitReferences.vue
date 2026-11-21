<script setup>
import { computed, ref } from 'vue'

const toolbarVisible = ref(true)
const availableHeight = computed(() => (toolbarVisible.value ? 640 : 720))
</script>

<template>
  <p class="lesson-intro">
    Comece perguntando <strong>o que deve fazer essa medida mudar?</strong> Uma medida absoluta como
    <code>px</code> tem um tamanho definido em pixels CSS. Medidas relativas acompanham uma
    referência, como a fonte, o espaço de um contêiner ou o tamanho da janela.
  </p>

  <div class="reference-group lesson-explanation lesson-explanation--separated">
    <div class="lesson-explanation-copy">
      <h3>Tamanho da fonte e espaçamento</h3>
      <ul>
        <li>
          <code>px</code> mantém o valor em pixels CSS. Use em detalhes como uma borda de 1 px.
        </li>
        <li>
          <code>rem</code> acompanha a fonte da raiz (<code>html</code>). Use em títulos, textos e
          espaçamentos que devem crescer quando a fonte padrão aumenta.
        </li>
        <li>
          <code>em</code> acompanha a fonte do próprio elemento em propriedades como
          <code>padding</code>. Use para que o respiro do botão cresça junto com o texto. Em
          <code>font-size</code>, <code>em</code> usa o tamanho herdado.
        </li>
      </ul>
    </div>
    <figure class="lesson-figure">
      <figcaption>Mesma página, botões com fontes diferentes</figcaption>
      <p>A raiz mede 16 px. Os dois botões usam <code>padding-inline: 1em</code>.</p>
      <div class="button-example">
        <div>
          <span class="sample-button small-button">Salvar</span
          ><span>Fonte de 16 px · 1em = 16 px</span>
        </div>
        <div>
          <span class="sample-button large-button">Salvar</span
          ><span>Fonte de 24 px · 1em = 24 px</span>
        </div>
      </div>
      <p>
        No botão maior, o espaço lateral cresce. Na mesma página, <code>1rem</code> continua valendo
        16 px nos dois.
      </p>
    </figure>
  </div>

  <div class="reference-group lesson-explanation lesson-explanation--separated">
    <div class="lesson-explanation-copy">
      <h3>Largura do contêiner ou da janela</h3>
      <ul>
        <li>
          Em <code>width</code>, <code>%</code> usa a largura do bloco que contém o elemento. Use
          para dimensionar algo dentro de um cartão ou de uma coluna. Em outras propriedades, a
          referência da porcentagem pode mudar.
        </li>
        <li>
          <code>vw</code> usa a largura do viewport, a área da janela usada pela página.
          <code>1vw</code> equivale a 1% dessa largura. Use quando o tamanho deve acompanhar a
          janela, como numa faixa de destaque.
        </li>
      </ul>
    </div>
    <figure class="lesson-figure">
      <figcaption>Metade de 400 px e metade de 240 px</figcaption>
      <div class="width-example">
        <span>Viewport de 400 px · <strong>50vw = 200 px</strong></span>
        <div class="width-track" aria-hidden="true"><div></div></div>
        <span>Contêiner de 240 px · <strong>50% = 120 px</strong></span>
        <div class="width-track container-track" aria-hidden="true"><div></div></div>
      </div>
      <p>Cada barra preenchida cobre metade da sua própria referência.</p>
    </figure>
  </div>

  <div class="reference-group lesson-explanation lesson-explanation--separated">
    <div class="lesson-explanation-copy">
      <h3>Divisão do espaço no Grid</h3>
      <p>
        <code>fr</code> divide o espaço livre entre as trilhas flexíveis do Grid. Use para criar
        colunas proporcionais. Na conta, subtraia primeiro o <code>gap</code> e as trilhas fixas.
      </p>
    </div>
    <figure class="lesson-figure">
      <figcaption><code>1fr 2fr</code> em uma grade de 320 px</figcaption>
      <p>Com um vão de 20 px, sobram 300 px. Divida por 3 partes para obter 100 px por parte.</p>
      <div class="fraction-example">
        <span>1fr<br />100 px</span>
        <span>2fr<br />200 px</span>
      </div>
    </figure>
  </div>

  <div class="reference-group lesson-explanation lesson-explanation--separated">
    <div class="lesson-explanation-copy">
      <h3>Altura da janela no celular</h3>
      <ul>
        <li>
          <code>vh</code> usa a altura do viewport grande, como quando a barra do navegador está
          recolhida. Use para proporções que devem permanecer estáveis quando a barra aparece.
        </li>
        <li>
          <code>dvh</code> acompanha a altura disponível quando a barra aparece ou se recolhe. Use
          quando uma seção precisa se ajustar à área disponível, como uma tela de abertura com
          <code>min-height: 100dvh</code>.
        </li>
      </ul>
    </div>
    <figure class="lesson-figure">
      <figcaption>Simulação da barra do navegador</figcaption>
      <label class="toolbar-toggle"
        ><input v-model="toolbarVisible" type="checkbox" /> Barra visível</label
      >
      <div class="height-example" aria-hidden="true">
        <div class="height-track"><div class="height-fill size-vh"></div></div>
        <div class="height-track">
          <div
            class="height-fill size-dvh"
            :style="{ blockSize: (availableHeight / 720) * 100 + '%' }"
          ></div>
        </div>
      </div>
      <div class="height-example" aria-live="polite">
        <span><code>100vh</code> = 720 px</span>
        <span><code>100dvh</code> = {{ availableHeight }} px</span>
      </div>
      <p v-if="toolbarVisible">
        Com a barra visível, há 640 px disponíveis. Um bloco de 100vh pode avançar 80 px além dessa
        área.
      </p>
      <p v-else>Com a barra recolhida, os 720 px estão disponíveis e os dois valores coincidem.</p>
    </figure>
  </div>

  <div class="reference-group lesson-explanation lesson-explanation--separated">
    <div class="lesson-explanation-copy">
      <h3>Comprimento de uma linha de texto</h3>
      <p>
        Uma unidade <code>ch</code> corresponde à largura de avanço do dígito <strong>0</strong> na
        fonte usada. Use <code>max-width: 65ch</code> para limitar linhas de leitura. Em fontes
        proporcionais, cada letra pode ter uma largura diferente.
      </p>
    </div>
    <figure class="lesson-figure">
      <figcaption>Uma caixa com <code>width: 12ch</code></figcaption>
      <div class="character-example" aria-hidden="true">
        <span>000000000000</span><span>iiiiiiiiiiii</span>
      </div>
      <p>Doze zeros preenchem a largura. Doze letras “i” deixam espaço livre nesta fonte.</p>
    </figure>
  </div>
</template>

<style scoped>
.reference-group .lesson-explanation-copy {
  gap: var(--space-2);
}
.reference-group h3 {
  margin: 0;
}
.reference-group ul {
  display: grid;
  gap: var(--space-2);
  margin: 0;
  padding-inline-start: var(--space-4);
}
.reference-group .lesson-figure {
  gap: var(--space-2);
  padding: var(--space-3);
  line-height: 1.45;
}
.reference-group figcaption {
  color: var(--text);
  font-weight: 750;
}
.button-example,
.width-example,
.character-example {
  display: grid;
  gap: var(--space-2);
}
.button-example {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 9rem), 1fr));
  align-items: end;
}
.button-example > div {
  display: grid;
  justify-items: center;
  gap: var(--space-1);
}
.sample-button {
  padding: 0.25em 1em;
  background: var(--mint);
  color: var(--ink);
}
/* Os valores em px fazem parte da demonstração de em. */
.small-button {
  font-size: 16px;
}
.large-button {
  font-size: 24px;
}
.width-example {
  text-align: start;
}
.width-track,
.height-track {
  outline: var(--line) solid var(--slate-light);
  background: var(--panel);
}
.width-track > div {
  inline-size: 50%;
  block-size: 0.75rem;
  background: var(--mint);
}
.container-track {
  inline-size: 60%;
}
.container-track > div,
.size-dvh {
  background: var(--green);
}
.fraction-example,
.height-example {
  display: grid;
  gap: 6.25%;
  inline-size: min(100%, 20rem);
  margin-inline: auto;
}
.fraction-example {
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
}
.fraction-example span {
  padding-block: var(--space-2);
  background: var(--mint);
  color: var(--ink);
}
.height-example {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.height-track {
  block-size: 5rem;
}
.height-fill {
  inline-size: 100%;
}
.size-vh {
  block-size: 100%;
  background: var(--mint);
}
.toolbar-toggle input {
  accent-color: var(--green);
}
.character-example {
  inline-size: min(100%, 12ch);
  margin-inline: auto;
  text-align: start;
  font:
    1.25rem Arial,
    sans-serif;
  outline: var(--line) solid var(--green);
}
</style>
