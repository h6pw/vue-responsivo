<script setup>
import LessonCode from '@/components/LessonCode.vue'
import LessonSections from '@/components/LessonSections.vue'
import VuePracticesLab from './VuePracticesLab.vue'
import { componentExample, listAndRouteExample, tokensExample } from './vueExamples'

defineProps({
  question: { type: String, required: true },
  routeName: { type: String, required: true },
})

const sources = [
  {
    title: 'Vue.js Oficial · Guia de Estilo (Style Guide)',
    description: 'Regras essenciais: nomes multi-word, propriedades de props e chaves no v-for.',
    url: 'https://vuejs.org/style-guide/',
  },
  {
    title: 'Vue.js Oficial · Renderização de Listas e Manutenção de Estado',
    description: 'Como o algoritmo do Virtual DOM usa a diretiva :key para rastrear elementos.',
    url: 'https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key',
  },
  {
    title: 'Vue Router · Carregamento sob demanda (Lazy Loading)',
    description: 'Divisão de código em chunks dinâmicos para otimização de performance.',
    url: 'https://router.vuejs.org/guide/advanced/lazy-loading.html',
  },
  {
    title: 'web.dev · Core Web Vitals (LCP, INP, CLS)',
    description:
      'Métricas oficiais do Google para medir velocidade, interatividade e estabilidade.',
    url: 'https://web.dev/explore/learn-core-web-vitals',
  },
  {
    title: 'MDN Web Docs · Usando propriedades personalizadas CSS (Variáveis)',
    description: 'Como criar sistemas de tokens escaláveis e manuteníveis com variáveis em :root.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties',
  },
]
</script>

<template>
  <LessonSections :route-name="routeName">
    <!-- 1. Explicação curta -->
    <template #explicacao>
      <div class="lesson-explanation">
        <div class="lesson-explanation-copy">
          <p>
            Construir aplicações em Vue 3 vai além de apenas fazer o código funcionar. Para que o
            projeto continue fácil de manter, escalável e rápido para o usuário final, seguimos boas
            práticas consagradas na arquitetura de componentes, desempenho e organização.
          </p>

          <dl class="lesson-concepts">
            <div>
              <dt>Estrutura de pastas modular</dt>
              <dd>
                Organize por responsabilidade: <code>components/</code> para peças reutilizáveis,
                <code>views/</code> para páginas completas, <code>router/</code> para rotas,
                <code>stores/</code> para estado global (Pinia) e <code>assets/</code> para estilos
                e tokens.
              </dd>
            </div>
            <div>
              <dt>Nomes de componentes com múltiplas palavras</dt>
              <dd>
                Use nomes compostos (ex.: <code>AppHeader.vue</code>, <code>AnimalCard.vue</code>),
                nunca palavras únicas como <code>Item.vue</code> ou <code>Menu.vue</code>. Isso
                evita conflitos com tags HTML nativas existentes e futuras.
              </dd>
            </div>
            <div>
              <dt>Props tipadas e eventos explícitos</dt>
              <dd>
                Declare <code>defineProps</code> com tipos (<code>String</code>,
                <code>Number</code>, <code>Object</code>) e defina <code>required</code> ou
                <code>default</code>. Emita eventos com <code>defineEmits</code>. Isso previne bugs
                silenciosos e facilita a vida da equipe.
              </dd>
            </div>
            <div>
              <dt>A regra vital: :key com ID único no v-for</dt>
              <dd>
                Sempre forneça uma chave exclusiva e estável (como <code>:key="item.id"</code>).
                Evite usar o <code>index</code> do array quando a lista puder sofrer remoções,
                adições ou reordenações.
              </dd>
            </div>
            <div>
              <dt>Variáveis CSS como design tokens</dt>
              <dd>
                Centralize cores, fontes e espaçamentos em <code>:root</code> usando variáveis CSS
                (ex.: <code>--green</code>, <code>--space-4</code>). Mudanças na identidade visual
                são feitas em um único lugar e propagadas instantaneamente.
              </dd>
            </div>
            <div>
              <dt>Core Web Vitals e Rotas Lazy</dt>
              <dd>
                Mantenha a página rápida monitorando <strong>LCP</strong> (carregamento do maior
                bloco), <strong>INP</strong> (resposta aos cliques) e
                <strong>CLS</strong> (estabilidade visual). Use <code>() => import(...)</code> no
                Vue Router para baixar o código das páginas apenas quando forem visitadas.
              </dd>
            </div>
          </dl>
        </div>

        <figure class="lesson-figure">
          <figcaption>Estrutura recomendada de um projeto Vue 3</figcaption>
          <div class="folder-tree" aria-hidden="true">
            <div class="tree-node tree-root">📁 src/</div>
            <div class="tree-node tree-sub">📁 assets/ <small>(design tokens & css)</small></div>
            <div class="tree-node tree-sub">
              📁 components/ <small>(peças reutilizáveis)</small>
            </div>
            <div class="tree-node tree-sub">📁 router/ <small>(rotas sob demanda)</small></div>
            <div class="tree-node tree-sub">📁 stores/ <small>(estado global Pinia)</small></div>
            <div class="tree-node tree-sub">📁 views/ <small>(telas das rotas)</small></div>
            <div class="tree-node tree-file">📄 App.vue</div>
            <div class="tree-node tree-file">📄 main.js</div>
          </div>
          <p>
            A separação clara entre <code>views</code> e <code>components</code> permite
            carregamento sob demanda eficiente pelo roteador.
          </p>
        </figure>
      </div>
    </template>

    <!-- 2. Exemplo de código comentado e laboratório -->
    <template #exemplo>
      <p>
        Abaixo você encontra exemplos reais de código aplicando componentes com props tipadas,
        chaves no <code>v-for</code>, carregamento assíncrono de rotas e variáveis como design
        tokens.
      </p>

      <div class="lesson-code-grid">
        <LessonCode
          title="Vue 3 SFC · Props tipadas e nomes de componentes"
          :source="componentExample"
        />
        <LessonCode
          title="Vue Router & v-for · Chave única e lazy loading"
          :source="listAndRouteExample"
        />
      </div>

      <div class="lesson-code-grid token-code-single">
        <LessonCode title="CSS · Variáveis no :root como Design Tokens" :source="tokensExample" />
      </div>

      <VuePracticesLab />
    </template>

    <!-- 3. Pergunta-guia respondida visivelmente -->
    <template #pergunta-guia>
      <p class="lesson-question">{{ question }}</p>

      <div class="answer-box">
        <h3>O que acontece com a anotação do Gato?</h3>
        <p>
          Digite “vacina” no segundo campo e remova o Cachorro. O resultado depende de como o Vue
          identifica cada linha.
        </p>
        <div class="lesson-viewport-comparison">
          <figure class="lesson-figure">
            <figcaption>Sem chave estável</figcaption>
            <p>Gato · campo vazio</p>
            <p>Papagaio · <strong>vacina</strong></p>
            <p>
              O Vue reaproveita os campos por posição. A anotação continua no segundo campo, agora
              associado ao Papagaio.
            </p>
          </figure>
          <figure class="lesson-figure">
            <figcaption>Com <code>:key="animal.id"</code></figcaption>
            <p>Gato · <strong>vacina</strong></p>
            <p>Papagaio · campo vazio</p>
            <p>
              O Vue identifica as linhas pelo ID. A anotação acompanha o Gato quando ele sobe para a
              primeira posição.
            </p>
          </figure>
        </div>
        <div class="core-vitals-summary">
          <h4>Resumo das Boas Práticas e Core Web Vitals no Vue 3</h4>
          <div class="vitals-pills">
            <div class="pill-card">
              <strong>LCP (≤ 2.5s)</strong>
              <span
                >Use lazy loading nas rotas do Vue Router para manter o pacote inicial leve.</span
              >
            </div>
            <div class="pill-card">
              <strong>INP (≤ 200ms)</strong>
              <span
                >Evite processamentos síncronos pesados dentro de watchers e computed
                properties.</span
              >
            </div>
            <div class="pill-card">
              <strong>CLS (≤ 0.10)</strong>
              <span
                >Sempre defina width e height e use chaves estáveis no v-for para transições
                previsíveis.</span
              >
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 4. Fontes consultadas -->
    <template #fontes>
      <ul class="lesson-sources">
        <li v-for="source in sources" :key="source.url">
          <a :href="source.url" target="_blank" rel="noopener noreferrer">
            {{ source.title }} <span aria-hidden="true">↗</span>
          </a>
          <p>{{ source.description }}</p>
        </li>
      </ul>
    </template>
  </LessonSections>
</template>

<style scoped>
.folder-tree {
  min-inline-size: 0;
  overflow-wrap: anywhere;
  display: grid;
  gap: var(--space-1);
  text-align: left;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  padding: var(--space-3);
  background: var(--night);
  border: var(--line) solid var(--slate);
  margin-block: var(--space-2);
}
.tree-node {
  padding: 0.15rem 0.4rem;
}
.tree-root {
  color: var(--mint);
  font-weight: 750;
}
.tree-sub {
  padding-inline-start: 1.5rem;
  color: var(--text);
}
.tree-sub small {
  color: var(--muted);
  font-family: var(--font-body);
}
.tree-file {
  padding-inline-start: 2.5rem;
  color: var(--muted);
}

.token-code-single {
  margin-block: var(--space-3);
  grid-template-columns: minmax(0, 1fr);
}

.answer-box {
  display: grid;
  gap: var(--space-3);
  margin-block-start: var(--space-2);
}
.answer-box h3 {
  margin: 0;
  color: var(--mint);
  font-size: 1.15rem;
}
.answer-box p {
  line-height: 1.6;
}

.core-vitals-summary {
  margin-block-start: var(--space-3);
  padding: var(--space-4);
  background: var(--night);
  border-inline-start: var(--space-1) solid var(--green);
  display: grid;
  gap: var(--space-3);
}
.core-vitals-summary h4 {
  margin: 0;
  color: var(--text);
  font-size: 1.1rem;
}
.vitals-pills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  gap: var(--space-3);
}
.pill-card {
  padding: var(--space-3);
  background: var(--panel);
  border: var(--line) solid var(--slate);
  display: grid;
  gap: var(--space-1);
  font-size: 0.85rem;
}
.pill-card strong {
  color: var(--mint);
  font-family: var(--font-mono);
  font-size: 0.95rem;
}
.pill-card span {
  color: var(--muted);
  line-height: 1.4;
}
</style>
