<template>
  <div class="employee-grid">
    <EmployeeGridItem
      v-for="(employee, index) in round.employees.options"
      :employee="employee"
      :label="(index + 1).toString()"
      :key="employee.id"
      @click="handleClick(employee)"
    >
      <span>{{ index + 1 }}</span>
      {{ employee.firstName }} {{ employee.lastName }}
    </EmployeeGridItem>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Employee } from '@/store/employees'
import { ActionTypes, ScoringRound } from '@/store/scoring'
import EmployeeGridItem from './EmployeeGridItem.vue'

export default defineComponent({
  name: 'EmployeeGrid',
  components: {
    EmployeeGridItem
  },
  props: {
    round: {
      type: Object as PropType<ScoringRound>,
      required: true
    }
  },
  methods: {
    handleClick (employee: Employee) {
      this.$store.dispatch(ActionTypes.CREATE_GUESS, { employee })
    }
  }
})
</script>

<style lang="scss" scoped>
.employee-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: var(--size-16);
  gap: var(--size-16);
  padding: 0 var(--size-16);
}
</style>
