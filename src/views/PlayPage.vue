<template>
  <div class="play page">
    <SiteHeader back />
    <main class="main">
      <h1 class="heading">
        <template v-if="!areRoundsLoaded">Loading...</template>
        <template v-else>
          <span class="lead">
            Which one of these good looking photos is the real
          </span>
          {{ selectedEmployee.firstName }} {{ selectedEmployee.lastName }}
        </template>
      </h1>
      <EmployeeGrid v-if="currentRound" :round="currentRound" />
      <p class="hint">
        <template v-if="!lastGuess">Choose the matching photo</template>
        <template v-else-if="lastGuess.correct === false">Try again!</template>
        <template v-else>Correct!</template>
      </p>
      <SiteButton @click="handleContinue" v-if="lastGuess?.correct">
        Continue
      </SiteButton>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Employee } from '@/store/employees'
import {
  ScoringRound,
  ScoringGuess,
  ActionTypes as ScoringActions
} from '@/store/scoring'

import SiteButton from '@/components/SiteButton/SiteButton.vue'
import SiteHeader from '@/components/SiteHeader/SiteHeader.vue'
import EmployeeGrid from '@/components/EmployeeGrid/EmployeeGrid.vue'

export default defineComponent({
  name: 'PlayPage',
  components: {
    SiteButton,
    SiteHeader,
    EmployeeGrid
  },
  data () {
    return {
      roundNumber: 1
    }
  },
  created () {
    this.$store.dispatch(ScoringActions.CREATE_ROUNDS)
  },
  computed: {
    areRoundsLoaded () {
      return !!this.$store.getters.allRounds.length
    },
    currentRound (): ScoringRound {
      return this.$store.getters.allRounds[this.roundNumber - 1]
    },
    selectedEmployee (): Employee | null {
      if (!this.currentRound) return null
      return this.currentRound.employees.selected
    },
    lastGuess (): ScoringGuess | null {
      if (!this.currentRound?.guesses.length) return null
      const latestGuess = this.currentRound.guesses.reduce((mostRecent, nextGuess) => {
        if (nextGuess.dateCreated > mostRecent.dateCreated) return nextGuess
        return mostRecent
      }, this.currentRound.guesses[0])
      return latestGuess
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/breakpoints";

.play {
  display: flex;
  flex-flow: column nowrap;
  gap: var(--size-40);

  min-height: 100%;
  overflow-x: hidden;

  @media (min-width: $desktop) {
    gap: var(--size-64);
  }
}

.main {
  flex-grow: 1;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  max-width: 58.75rem;
  margin: 0 auto;
  padding-bottom: var(--size-40);

  background-color: white;
}

.heading {
  text-align: center;
  margin: 0;
  padding: 0 0 var(--size-24);

  @media (min-width: $desktop) {
    padding-bottom: var(--size-64);
  }
}

.lead {
  font-size: var(--size-24);
  font-weight: var(--font-weight-normal);
  line-height: 1.333;

  display: none;
  @media (min-width: $desktop) {
    display: block;
    margin-bottom: var(--size-16);
  }
}

.hint {
  font-size: var(--size-20);
  font-weight: var(--font-weight-normal);
  line-height: 1.2;
  margin: 0;
  padding-top: var(--size-24);
}
</style>
