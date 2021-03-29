<template>
  <div class="play page">
    <SiteHeader back />
    <main class="main">
      <h1>
        <span v-if="!areRoundsLoaded">Loading...</span>
        <span v-else>
          {{ selectedEmployee.firstName }} {{ selectedEmployee.lastName }}
        </span>
      </h1>
      <div v-if="currentRound" class="employee-grid">
        <button
          v-for="(employee, index) in currentRound.employees.options"
          :key="employee.id"
        >
          <span>{{ index + 1 }}</span>
          {{ employee.firstName }} {{ employee.lastName }}
        </button>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SiteHeader from '@/components/SiteHeader/SiteHeader.vue'
import { Employee, ScoringRound } from '@/store'

export default defineComponent({
  name: 'Play',
  components: {
    SiteHeader
  },
  data () {
    return {
      roundNumber: 1
    }
  },
  created () {
    this.$store.dispatch('createRounds')
  },
  computed: {
    areRoundsLoaded () {
      return !!this.$store.state.rounds.length
    },
    currentRound (): ScoringRound {
      return this.$store.state.rounds[this.roundNumber - 1]
    },
    selectedEmployee (): Employee | null {
      if (!this.currentRound) return null
      return this.currentRound.employees.selected
    }
  }
})
</script>

<style lang="scss" scoped>
.main {
  --main-padding-top: var(--size-40);
  --main-padding-bottom: var(--size-40);
  --main-padding-left: var(--size-16);
  --main-padding-right: var(--size-16);
  @supports (padding-top: env(safe-area-inset-top)) {
    --main-padding-top: max(env(safe-area-inset-top), var(--size-40));
    --main-padding-bottom: max(env(safe-area-inset-bottom), var(--size-40));
    --main-padding-left: max(env(safe-area-inset-left), var(--size-16));
    --main-padding-right: max(env(safe-area-inset-right), var(--size-16));
  }

  padding: var(--main-padding-top) var(--main-padding-right)
    var(--main-padding-bottom) var(--main-padding-left);
}
</style>
