<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  mounted () {
    if (!this.$store.state.employees.length) {
      this.$store.dispatch('getEmployees')
    }
  }
})
</script>

<style lang="scss">
@import url("~modern-normalize/modern-normalize.css");

/**
Design Tokens
*/
:root {
  // Size
  --size-4: 0.25rem;
  --size-8: 0.5rem;
  --size-12: 0.75rem;
  --size-16: 1rem;
  --size-24: 1.5rem;
  --size-32: 2rem;
  --size-40: 2.5rem;

  // Color
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
</style>
