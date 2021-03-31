<template>
  <div class="score page">
    <SiteHeader />
    <main class="main">
      <div class="hero">
        <img alt="" class="illustration" src="@/assets/illustration.svg" />
        <h1 class="heading">
          Congratulations, you scored
          {{ score.correct }}/{{ score.total }}!
        </h1>
      </div>
      <SiteButton class="link" element="router-link" to="/">
        Return to Home
      </SiteButton>
      <div class="results">
        <ScoreResult
          label="Correct Selections"
          :value="score.stats.percentCorrect"
        />
        <ScoreResult
          label="Incorrect Selections"
          :value="score.stats.percentIncorrect"
        />
        <ScoreResult
          label="Avg. Selection Time"
          :value="score.stats.avgSelectionTime"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SiteHeader from '@/components/SiteHeader/SiteHeader.vue'
import SiteButton from '@/components/SiteButton/SiteButton.vue'
import ScoreResult from '@/components/ScoreResult/ScoreResult.vue'

export default defineComponent({
  name: 'Score',
  components: {
    SiteButton,
    SiteHeader,
    ScoreResult
  },
  computed: {
    score () {
      function formatPercent (value: number): string {
        return `${Math.round(value * 100)}%`
      }
      const { correct, total, stats } = this.$store.getters.finalScore
      const formattedStats = {
        percentCorrect: formatPercent(stats.percentCorrect),
        percentIncorrect: formatPercent(stats.percentIncorrect),
        avgSelectionTime: `${stats.avgSelectionTime.toFixed(1)} sec`
      }
      return {
        correct,
        total,
        stats: formattedStats
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.score {
  display: flex;
  flex-flow: column nowrap;
  min-height: 100%;
  overflow-x: hidden;
  padding-bottom: var(--size-40);
}

.hero {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  padding: var(--size-40) var(--size-16);

  background-color: var(--color-blue-dark);
}

.heading {
  margin: 0 0 var(--size-32);

  font-size: var(--size-32);
  font-weight: var(--font-weight-medium);
  line-height: 1.25;
  text-align: center;

  color: white;
}

.link {
  transform: translateY(-50%);
  margin: 0 var(--size-16);
}

.results {
  display: flex;
  flex-flow: column nowrap;
  * + * {
    margin-top: var(--size-24);
  }
}
</style>
