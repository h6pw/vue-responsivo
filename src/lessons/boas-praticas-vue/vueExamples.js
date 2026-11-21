export const componentExample = `<!-- AnimalCard.vue: Nome multi-word (evita colisão com HTML) -->
<script setup>
// Props tipadas com validação explícita
const props = defineProps({
  animal: {
    type: Object,
    required: true,
    validator: (a) => typeof a.id === 'string' && typeof a.nome === 'string',
  },
  destacado: {
    type: Boolean,
    default: false,
  },
})

// Eventos emitidos documentados
const emit = defineEmits(['remover', 'editar'])
</script>

<template>
  <article class="animal-card" :class="{ 'is-destacado': destacado }">
    <h3>{{ animal.nome }}</h3>
    <!-- Campo de anotação com v-model para vincular ao estado do item -->
    <input
      v-model="animal.anotacao"
      type="text"
      placeholder="Escreva algo sobre este animal..."
    />
    <button type="button" @click="emit('remover', animal.id)">
      Remover
    </button>
  </article>
</template>`

export const listAndRouteExample = `<!-- Uso correto de :key com identificador único (NUNCA index!) -->
<template>
  <section class="zoo-lista">
    <!-- :key="animal.id" garante que o Vue mantenha a identidade
         de cada elemento no Virtual DOM durante adições ou remoções -->
    <AnimalCard
      v-for="animal in listaAnimais"
      :key="animal.id"
      :animal="animal"
      @remover="removerAnimal"
    />
  </section>
</template>

/* router/index.js: Carregamento sob demanda (Lazy Loading) */
const router = createRouter({
  routes: [
    {
      path: '/animais',
      name: 'animais',
      // Dynamic import: a página só é baixada quando o usuário clica na rota!
      // Reduz o bundle inicial e otimiza a métrica LCP.
      component: () => import('@/views/AnimaisView.vue'),
    },
  ],
})`

export const tokensExample = `/* Variáveis CSS em :root funcionam como design tokens:
   padronizam cores, fontes e espaçamentos no projeto todo. */
:root {
  /* Cores da marca */
  --green: #42b883;
  --mint: #aff3d3;
  --panel: #192b3a;

  /* Escala consistente de espaçamento em rem */
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-6: 2rem;

  /* Fontes tipográficas */
  --font-body: 'Segoe UI', Arial, sans-serif;
  --font-mono: Consolas, monospace;
}
`
