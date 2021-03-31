<template>
  <div class="score page">
    <SiteHeader />
    <main class="main">
      <div class="hero">
        <img alt="" class="illustration" src="@/assets/illustration.svg" />
        <h1 class="heading">
          Congratulations, you scored
          {{ finalScore.correct }}/{{ finalScore.total }}!
        </h1>
        <SiteButton class="link" element="router-link" to="/">
          Return to Home
        </SiteButton>
      </div>
      <div class="results">
        {{ JSON.stringify(finalScore, null, 2) }}
        <ScoreResult
          label="Correct Selections"
          :value="`${finalScore.stats.percentCorrect}%`"
        />
        <ScoreResult
          label="Incorrect Selections"
          :value="`${finalScore.stats.percentIncorrect}%`"
        />
        <ScoreResult
          label="Avg. Selection Time"
          :value="`${finalScore.stats.avgSelectionTime} sec`"
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
    finalScore () {
      return this.$store.getters.finalScore
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
}

.hero {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  padding: var(--size-40) var(--size-16);

  background-color: var(--color-blue-dark);
}

.illustration {
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
  align-self: stretch;
}

.results {
  display: flex;
  flex-flow: column nowrap;
  * + * {
    margin-top: var(--size-24);
  }
}
</style>
