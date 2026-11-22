<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const questions = [
  {
    id: 1,
    topic: 'Laboratório de Grid',
    title: 'Virada para 3 Colunas no Catálogo',
    question:
      'No nosso laboratório de Grid (com repeat(auto-fit, minmax(14rem, 1fr)), gap de 1rem e 1rem = 16px), a partir de qual largura interna do contêiner os 3 cartões cabem juntos na mesma linha (3 colunas)?',
    hint: 'Dica: cada coluna precisa de 14rem (224px) e existem 2 vãos (gaps) de 16px entre 3 colunas. Faça a soma!',
    options: [
      { text: '688 px (três colunas e apenas um vão)', correct: false },
      { text: '704 px (224 + 16 + 224 + 16 + 224)', correct: true },
      { text: '672 px (apenas 3 colunas sem os vãos)', correct: false },
      { text: '720 px (com margens externas adicionais)', correct: false },
    ],
    explanation:
      'Correto! 3 colunas de 224px = 672px. Entre 3 colunas existem 2 vãos de 16px = 32px. 672 + 32 = 704 px!',
  },
  {
    id: 2,
    topic: 'Laboratório de Imagens',
    title: 'Eliminando o Salto de Layout',
    question:
      'No laboratório de Imagens responsivas, qual combinação técnica reserva espaço para a foto e evita que sua chegada empurre o texto?',
    hint: 'Pense em como o navegador calcula a proporção antes do download começar.',
    options: [
      { text: 'Adicionar apenas loading="lazy" na imagem', correct: false },
      { text: 'Usar display: inline-block sem dimensões', correct: false },
      {
        text: 'Declarar width e height no HTML junto com max-width: 100% e height: auto no CSS',
        correct: true,
      },
      { text: 'Retirar os atributos width e height para deixar a imagem livre', correct: false },
    ],
    explanation:
      'Perfeito! Com width e height no HTML, o navegador calcula o proporção indicada pelas dimensões e reserva espaço antes da imagem chegar. Os atributos devem corresponder à proporção do arquivo.',
  },
  {
    id: 3,
    topic: 'Laboratório de Boas Práticas Vue',
    title: 'O Enigma do :key no v-for',
    question:
      'Ao remover o primeiro item de uma lista com inputs de texto renderizada com v-for sem :key, por que, no laboratório, a anotação digitada no campo do Gato aparece na linha do Papagaio?',
    hint: 'Lembre-se da estratégia in-place patch do Virtual DOM.',
    options: [
      {
        text: 'Porque o Vue reaproveitou os campos por posição. O segundo campo conservou o texto e passou a exibir o Papagaio.',
        correct: true,
      },
      { text: 'Porque o JavaScript perdeu a referência da memória RAM', correct: false },
      { text: 'Porque o v-model do Vue sobrescreve o DOM automaticamente', correct: false },
      { text: 'Porque os inputs de texto não suportam navegadores modernos', correct: false },
    ],
    explanation:
      'Exato! Sem uma chave única estável, o Vue usa atualização in-place: reaproveita os nós DOM existentes por índice, causando inconsistências em campos de formulário.',
  },
]

const userAnswers = ref({})
const submitted = ref({})

function selectOption(questionId, index) {
  if (submitted.value[questionId]) return
  userAnswers.value[questionId] = index
}

function verifyAnswer(questionId) {
  if (userAnswers.value[questionId] !== undefined) {
    submitted.value[questionId] = true
  }
}

function retryQuestion(questionId) {
  delete submitted.value[questionId]
  delete userAnswers.value[questionId]
}

const totalCorrect = computed(() => {
  return questions.filter((q) => {
    const chosenIndex = userAnswers.value[q.id]
    return submitted.value[q.id] && chosenIndex !== undefined && q.options[chosenIndex].correct
  }).length
})

const isAllCompleted = computed(() => {
  return questions.every((q) => submitted.value[q.id])
})
</script>

<template>
  <article class="briefing-page challenge-page">
    <header class="lesson-heading">
      <RouterLink class="back-link" :to="{ name: 'home' }">← Voltar à trilha</RouterLink>
      <p class="eyebrow">Última etapa · Desafio de fixação</p>
      <h1>Desafio Final do Guia</h1>
      <p>
        Teste seu domínio sobre os conceitos de responsividade e Vue 3. Todas as respostas foram
        demonstradas diretamente nos laboratórios interativos do nosso guia!
      </p>
    </header>

    <div class="score-banner">
      <div>
        <span class="score-title">Pontuação do Desafio</span>
        <strong class="score-number">{{ totalCorrect }} / {{ questions.length }}</strong>
        <span class="score-sub">questões corretas</span>
      </div>
      <div v-if="isAllCompleted" class="completion-badge">
        <span class="badge-star">🏆</span>
        <div>
          <strong>Parabéns! Desafio Concluído!</strong>
          <p>Você respondeu às três questões. Confira o resultado e revise as explicações.</p>
        </div>
      </div>
    </div>

    <section class="questions-list">
      <article
        v-for="(q, qIndex) in questions"
        :key="q.id"
        class="question-card"
        :class="{
          'is-correct': submitted[q.id] && q.options[userAnswers[q.id]]?.correct,
          'is-wrong': submitted[q.id] && !q.options[userAnswers[q.id]]?.correct,
        }"
      >
        <header class="question-header">
          <span class="question-badge">Questão {{ qIndex + 1 }} · {{ q.topic }}</span>
          <h3>{{ q.title }}</h3>
        </header>

        <p class="question-text">{{ q.question }}</p>
        <p class="question-hint">💡 {{ q.hint }}</p>

        <div class="options-group" role="group" :aria-label="q.title">
          <button
            v-for="(opt, optIndex) in q.options"
            :key="optIndex"
            type="button"
            class="option-button"
            :class="{
              'is-selected': userAnswers[q.id] === optIndex,
              'is-right-answer': submitted[q.id] && opt.correct,
              'is-wrong-answer': submitted[q.id] && userAnswers[q.id] === optIndex && !opt.correct,
            }"
            :aria-pressed="userAnswers[q.id] === optIndex"
            :disabled="submitted[q.id]"
            @click="selectOption(q.id, optIndex)"
          >
            <span class="option-indicator" aria-hidden="true">
              {{ String.fromCharCode(65 + optIndex) }}
            </span>
            <span class="option-text">{{ opt.text }}</span>
          </button>
        </div>

        <div class="question-actions">
          <button
            v-if="!submitted[q.id]"
            type="button"
            class="submit-btn"
            :disabled="userAnswers[q.id] === undefined"
            @click="verifyAnswer(q.id)"
          >
            Verificar resposta
          </button>
          <button v-else type="button" class="retry-btn" @click="retryQuestion(q.id)">
            ↻ Tentar novamente
          </button>
        </div>

        <!-- Feedback explicativo -->
        <div
          v-if="submitted[q.id]"
          class="feedback-box"
          :class="q.options[userAnswers[q.id]]?.correct ? 'feedback-good' : 'feedback-bad'"
        >
          <strong>
            {{
              q.options[userAnswers[q.id]]?.correct
                ? '✓ Resposta correta!'
                : '✕ Não foi dessa vez...'
            }}
          </strong>
          <p>{{ q.explanation }}</p>
        </div>
      </article>
    </section>
  </article>
</template>

<style scoped>
.challenge-page {
  display: grid;
  gap: var(--space-5);
  max-width: 54rem;
  margin-inline: auto;
}
.score-banner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--panel);
  border: var(--line) solid var(--slate);
  border-block-start: var(--stroke) solid var(--green);
}
.score-title {
  display: block;
  font-size: 0.8rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.score-number {
  font-family: var(--font-mono);
  font-size: 2.25rem;
  color: var(--mint);
  line-height: 1.1;
  display: block;
}
.score-sub {
  color: var(--muted);
  font-size: 0.85rem;
}
.completion-badge {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: rgb(66 184 131 / 15%);
  border: var(--line) solid var(--green);
  border-radius: 4px;
}
.badge-star {
  font-size: 2rem;
}
.completion-badge strong {
  display: block;
  color: var(--mint);
  font-size: 1rem;
}
.completion-badge p {
  margin: 0;
  color: var(--text);
  font-size: 0.85rem;
}

.questions-list {
  display: grid;
  gap: var(--space-5);
}
.question-card {
  padding: var(--space-4);
  background: var(--night);
  border: var(--line) solid var(--slate);
  display: grid;
  gap: var(--space-3);
  transition: border-color 0.2s ease;
}
.question-card.is-correct {
  border-color: var(--green);
}
.question-card.is-wrong {
  border-color: #e76f51;
}
.question-header {
  display: grid;
  gap: var(--space-1);
}
.question-badge {
  color: var(--mint);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
}
.question-header h3 {
  margin: 0;
  color: var(--text);
  font-size: 1.25rem;
}
.question-text {
  line-height: 1.6;
  color: var(--text);
  font-size: 0.95rem;
}
.question-hint {
  font-size: 0.85rem;
  color: var(--muted);
  background: var(--panel);
  padding: var(--space-2) var(--space-3);
  border-inline-start: var(--space-1) solid var(--slate-light);
}

.options-group {
  display: grid;
  gap: var(--space-2);
}
.option-button {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--panel);
  border: var(--line) solid var(--slate);
  color: var(--text);
  cursor: pointer;
  text-align: left;
  font: inherit;
  transition: all 0.2s ease;
}
.option-button:hover:not(:disabled) {
  border-color: var(--mint);
  background: rgb(175 243 211 / 5%);
}
.option-button.is-selected {
  border-color: var(--mint);
  background: rgb(175 243 211 / 10%);
}
.option-button.is-right-answer {
  border-color: var(--green) !important;
  background: rgb(66 184 131 / 20%) !important;
}
.option-button.is-wrong-answer {
  border-color: #e76f51 !important;
  background: rgb(231 111 81 / 20%) !important;
}
.option-indicator {
  display: grid;
  place-items: center;
  flex: none;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--night);
  border: var(--line) solid var(--slate-light);
  color: var(--mint);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 750;
}
.is-selected .option-indicator {
  background: var(--mint);
  color: var(--ink);
}
.option-text {
  flex: 1;
  font-size: 0.9rem;
  line-height: 1.4;
}

.question-actions {
  display: flex;
  justify-content: flex-end;
}
.submit-btn {
  padding: var(--space-2) var(--space-4);
  background: var(--green);
  color: var(--ink);
  font-weight: 750;
  border: 0;
  cursor: pointer;
}
.submit-btn:hover:not(:disabled) {
  background: var(--mint);
}
.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.retry-btn {
  padding: var(--space-2) var(--space-3);
  background: var(--slate-light);
  color: var(--text);
  border: 0;
  cursor: pointer;
  font-weight: 700;
}

.feedback-box {
  padding: var(--space-3) var(--space-4);
  border: var(--line) solid transparent;
  display: grid;
  gap: var(--space-1);
  font-size: 0.9rem;
  line-height: 1.5;
}
.feedback-good {
  background: rgb(66 184 131 / 15%);
  border-color: var(--green);
  color: var(--mint);
}
.feedback-bad {
  background: rgb(231 111 81 / 15%);
  border-color: #e76f51;
  color: #f4a261;
}
</style>
