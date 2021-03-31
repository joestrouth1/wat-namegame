<template>
  <div class="play page">
    <SiteHeader back />
    <main class="main">
      <h1 class="heading focus-visible-only" tabindex="-1" ref="heading">
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
        class="employee-grid"
      />
      <p tabindex="-1" ref="hint" class="hint focus-visible-only">
        <template v-if="!lastGuess">Choose the matching photo</template>
        <template v-else-if="lastGuess.correct === false">Try again!</template>
        <template v-else>Correct!</template>
      </p>
      <SiteButton
        @click="handleContinue"
        v-bind="
          !lastGuess?.correct
            ? {
                variant: 'outline',
                ['aria-disabled']: true,
              }
            : {}
        "
        class="continue"
      >
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
      const refs = this.$refs as { hint: HTMLElement, heading: HTMLElement }
      if (!this.lastGuess?.correct) {
        refs.hint.focus()
      } else if (this.isGameComplete) {
        this.$router.push('/score')
      } else {
        this.$store.dispatch(ScoringActions.ADVANCE_ROUND)
        refs.heading.focus()
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
  align-self: center;
  flex-grow: 1;
  width: 100%;

  display: flex;
  flex-flow: column nowrap;
  padding: var(--size-40) var(--size-16);

  background-color: white;
  text-align: center;

  @media (min-width: $desktop) {
    padding-top: var(--size-64);
    max-width: 58.75rem;
  }
}

.heading {
  margin: 0;
  margin: 0 0 var(--size-24);

  font-size: var(--size-24);
  font-weight: var(--font-weight-medium);
  line-height: var(--size-32);

  @media (min-width: $desktop) {
    margin-bottom: var(--size-64);
  }
}

.lead {
  font-size: var(--size-24);
  font-weight: var(--font-weight-normal);
  line-height: var(--size-32);

  display: none;
  @media (min-width: $desktop) {
    display: block;
    padding-bottom: var(--size-16);
  }
}

.hint {
  font-size: var(--size-20);
  font-weight: var(--font-weight-normal);
  line-height: 1.2;
  margin: 0;
  padding: var(--size-24) 0;
}

.continue {
  align-self: center;
  width: 100%;
  @media (min-width: $tablet) {
    max-width: 22.5rem;
  }
}
</style>
