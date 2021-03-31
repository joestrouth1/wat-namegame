<template>
  <div class="employee-grid">
    <EmployeeGridItem
      v-for="(employee, index) in round.employees.options"
      :employee="employee"
      :key="employee.id"
      :label="(index + 1).toString()"
      :correct="isCorrect(employee)"
      @click="handleClick(employee)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Employee } from '@/store/employees'
import { ScoringRound } from '@/store/scoring'
import EmployeeGridItem from './EmployeeGridItem.vue'

export default defineComponent({
  name: 'EmployeeGrid',
  components: {
    EmployeeGridItem
  },
  emits: {
    guess: (payload: Employee) => {
      if (!payload.id) return false
      return true
    }
  },
  props: {
    round: {
      type: Object as PropType<ScoringRound>,
      required: true
    }
  },
  methods: {
    handleClick (employee: Employee) {
      this.$emit('guess', employee)
    },
    isCorrect (employee: Employee) {
      return this.round.guesses.find(
        (guess) => guess.employee.id === employee.id)?.correct
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/breakpoints";

.employee-grid {
  --employee-grid-columns: 2;
  --employee-grid-rows: 3;

  display: grid;
  grid-template-columns: repeat(var(--employee-grid-columns), 1fr);
  grid-template-rows: repeat(var(--employee-grid-rows), 1fr);
  grid-gap: var(--size-16);
  gap: var(--size-16);

  @media (min-width: $tablet) {
    --employee-grid-columns: 3;
    --employee-grid-rows: 2;
  }
}
</style>
