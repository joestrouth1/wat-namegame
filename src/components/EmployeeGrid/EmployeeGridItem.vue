<template>
  <button type="button" class="button">
    <img :src="employee.headshot.url" alt="" class="headshot" />
    <span class="label">{{ label }}</span>
    <span v-if="hasBeenGuessed" :class="{ status: true, correct }">
      <img v-if="correct" src="@/assets/icons/correct.svg" alt="Correct!" />
      <img v-else src="@/assets/icons/incorrect.svg" alt="Incorrect!" />
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Employee } from '@/store/employees'

export default defineComponent({
  name: 'EmployeeGridItem',
  props: {
    employee: {
      type: Object as PropType<Employee>,
      required: true
    },
    correct: {
      type: Boolean,
      required: false
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    hasBeenGuessed (): boolean {
      if (typeof this.correct !== 'undefined') return true
      return false
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/breakpoints";

.button {
  appearance: none;
  background: none;
  border: 1px solid white;
  border-radius: var(--size-4);
  overflow: hidden;
  padding: 0;
  position: relative;

  // aspect-ratio hack
  &:before {
    display: block;
    padding-top: 100%;
    content: "";
  }

  &:hover,
  &:focus {
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
  }
}

.headshot {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.label {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: inline-block;
  padding: var(--size-8);

  background-color: var(--color-blue-dark);

  color: white;
  font-size: var(--size-20);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;

  border-bottom-right-radius: var(--size-4);
  border-right: 1px solid white;
  border-bottom: 1px solid white;
}

.status {
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: rgba(255, 59, 48, 0.6);

  &.correct {
    background-color: rgba(52, 199, 89, 0.6);
  }

  img {
    width: 50%;
    height: 50%;
  }
}
</style>
