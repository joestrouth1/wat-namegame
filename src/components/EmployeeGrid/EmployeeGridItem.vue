<template>
  <button type="button" class="button">
    <span class="label">{{ label }}</span>
    <img :src="employee.headshot.url" alt="" class="headshot" />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Employee } from '@/store'

export default defineComponent({
  name: 'EmployeeGridItem',
  props: {
    employee: {
      type: Object as PropType<Employee>,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.button {
  appearance: none;
  background: none;
  border: 1px solid white;
  border-radius: var(--size-4);
  overflow: hidden;
  padding: 0;
  position: relative;
  aspect-ratio: 1 / 1;

  &:hover,
  &:focus {
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
  }
}

.label {
  position: absolute;
  top: 0;
  left: 0;
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

.headshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
