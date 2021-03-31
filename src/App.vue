<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ActionTypes as EmployeeActions } from '@/store/employees'

// TODO: order component properties per style guide
export default defineComponent({
  name: 'App',
  mounted () {
    if (!this.$store.getters.allEmployees.length) {
      this.$store.dispatch(EmployeeActions.GET_EMPLOYEES)
    }
  }
})
</script>

<style lang="scss">
@import "~modern-normalize/modern-normalize.css";

/**
Design Tokens
*/
:root {
  // Size
  --size-4: 0.25rem;
  --size-8: 0.5rem;
  --size-12: 0.75rem;
  --size-16: 1rem;
  --size-20: 1.25rem;
  --size-24: 1.5rem;
  --size-32: 2rem;
  --size-40: 2.5rem;
  --size-64: 4rem;
  --size-72: 4.5rem;

  // Color
  --color-blue: rgba(21, 101, 157, 1);
  --color-blue-dark: rgba(34, 53, 71, 1);

  // Type
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
}

/**
Base
*/
html,
body,
#app {
  height: 100%;
  overflow: auto;
  line-height: 1.25;
}

/**
Utilities
*/
.sr-only {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.focus-visible-only:focus:not(:focus-visible) {
  outline: none !important;
}

/**
Transitions
*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0 !important;
  }
}
</style>
