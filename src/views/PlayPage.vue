<template>
  <div class="play page">
    <SiteHeader back />
    <main class="main">
      <h1 class="heading">
        <template v-if="!currentRound">Loading...</template>
        <template v-else>
          <span class="lead">
            Which one of these good looking photos is the real
          </span>
          {{ selectedEmployee.firstName }} {{ selectedEmployee.lastName }}
        </template>
      </h1>
      <EmployeeGrid
        v-if="currentRound"
        :round="currentRound"
        @guess="handleGuess"
      />
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
    areRoundsLoaded (): boolean {
      return !!this.$store.getters.currentRound
    },
    currentRound (): ScoringRound | null {
      return this.$store.getters.currentRound
    },
    selectedEmployee (): Employee | null {
      if (!this.currentRound) return null
      return this.currentRound.employees.selected
    },
    lastGuess (): ScoringGuess | null {
      return this.$store.getters.lastGuess
    },
    isGameComplete (): boolean {
      return this.$store.getters.isGameComplete
    }
  },
  methods: {
    handleGuess (employee: Employee) {
      this.$store.dispatch(ScoringActions.CREATE_GUESS, { employee })
    },
    handleContinue () {
      if (this.isGameComplete) {
        this.$router.push('/score')
      } else {
        this.$store.dispatch(ScoringActions.ADVANCE_ROUND)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/breakpoints";

.play {
  display: flex;
  flex-flow: column nowrap;
  min-height: 100%;
  overflow-x: hidden;
}

.main {
  flex-grow: 1;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  max-width: 58.75rem;
  margin: 0 auto;
  padding: var(--size-40) 0;

  background-color: white;

  @media (min-width: $desktop) {
    padding-top: var(--size-64);
  }
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
