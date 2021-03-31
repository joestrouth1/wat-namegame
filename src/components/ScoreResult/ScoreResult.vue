<template>
  <div class="score-result">
    <span class="value">{{ value }}</span>
    <span class="label">{{ label }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScoreResult',
  props: {
    value: {
      type: String,
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
.score-result {
  --score-result-color-text: var(--color-blue-dark);

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  padding: 0 var(--size-16);

  color: var(--score-result-color-text);
}

.value {
  margin-bottom: var(--size-16);

  font-size: var(--size-40);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
}

.label {
  font-size: var(--size-24);
  font-weight: var(--font-weight-normal);
  line-height: 1.3333333;
}
</style>
