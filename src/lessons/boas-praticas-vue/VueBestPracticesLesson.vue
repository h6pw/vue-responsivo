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

      <div class="token-code-single">
        <LessonCode title="CSS · Variáveis no :root como Design Tokens" :source="tokensExample" />
      </div>

      <VuePracticesLab />
    </template>

    <!-- 3. Pergunta-guia respondida visivelmente -->
    <template #pergunta-guia>
      <p class="lesson-question">{{ question }}</p>

      <div class="answer-box">
        <h3>O que acontece com o texto digitado?</h3>
        <p>
          O texto digitado pela pessoa no campo do segundo animal parecerá
          <strong>"pular" e ficar associado ao animal errado</strong> (ele permanecerá no campo do
          primeiro animal restante da lista, enquanto o campo do último animal desaparecerá da
          tela).
        </p>

        <h3>Por que essa falha bizarra acontece?</h3>
        <p>
          Isso acontece por causa do funcionamento interno do algoritmo de reconciliação do
          <strong>Virtual DOM do Vue</strong>:
        </p>

        <div class="lesson-viewport-comparison">
          <div class="lesson-viewport-case">
            <div>
              <h3>Sem :key (ou com :key="index")</h3>
              <p class="lesson-case-width">Estratégia in-place patch (reaproveitamento cego)</p>
              <p>
                Quando não há chave única, o Vue adota a estratégia de "atualização no local". Ao
                remover o primeiro animal da lista em memória, o array passa de 3 para 2 itens. O
                Vue simplesmente pega o primeiro elemento DOM que já existia na tela e atualiza seu
                texto para "Gato", e em seguida descarta o 3º elemento DOM.
              </p>
              <p>
                Porém, o texto que o usuário digitou dentro do <code>&lt;input&gt;</code> é um
                <strong>estado interno temporário do nó do navegador real</strong>. Como o primeiro
                nó DOM não foi destruído (apenas reaproveitado), ele continua exibindo o texto que
                já estava nele, enquanto o verdadeiro input onde o usuário digitou foi descartado ou
                deslocado!
              </p>
            </div>
          </div>

          <div class="lesson-viewport-case">
            <div>
              <h3>Com :key="animal.id" (Identificador único)</h3>
              <p class="lesson-case-width">Rastreamento estável de identidade</p>
              <p>
                Ao fornecer uma chave única que pertence aos dados (como o ID do banco de dados ou
                um UUID), o Vue sabe exatamente qual nó do Virtual DOM corresponde a qual elemento
                do DOM real.
              </p>
              <p>
                Quando o primeiro animal é removido, o Vue busca o nó com <code>id="c1"</code> e
                remove exatamente aquele elemento da tela. O nó com <code>id="g2"</code> (o Gato)
                sobe de posição intacto, mantendo seu campo de texto, foco e anotações exatamente
                como o usuário deixou!
              </p>
            </div>
          </div>
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
