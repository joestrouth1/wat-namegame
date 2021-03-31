<template>
  <component
    :is="componentName"
    :class="{
      button: true,
      [`button-${variant}`]: true,
    }"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'SiteButton',
  props: {
    variant: {
      type: String as PropType<'primary' | 'link' | 'outline'>,
      default: 'primary'
    },
    element: {
      type: String as PropType<'router-link' | 'button'>,
      default: 'button'
    }
  },
  computed: {
    componentName () {
      if (this.$props.element === 'router-link') return RouterLink
      return 'button'
    }
  }
})
</script>

<style lang="scss" scoped>
.button {
  --button-padding-vertical: var(--size-12);
  --button-padding-horizontal: var(--size-20);

  --button-border-radius: var(--size-16);
  --button-border-width: var(--size-4);
  --button-color-background: var(--color-blue);
  --button-color-border: transparent;
  --button-color-text: white;

  --button-font-size: var(--size-20);
  --button-font-weight: var(--font-weight-medium);
  --button-line-height: 1.2;
  --button-text-decoration: none;

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  border: var(--button-border-width) solid var(--button-color-border);
  appearance: none;

  padding: var(--button-padding-vertical) var(--button-padding-horizontal);

  border-radius: var(--button-border-radius);
  background-color: var(--button-color-background);
  color: var(--button-color-text);
  transition-property: background-color border-color;
  transition-duration: 0.2s;
  transition-timing-function: ease;

  font-size: var(--button-font-size);
  font-weight: var(--button-font-weight);
  line-height: var(--button-line-height);
  text-decoration: var(--button-text-decoration);
}

.button-link {
  --button-padding-vertical: 0;
  --button-padding-horizontal: 0;

  --button-border-radius: 0;
  --button-border-width: 0;
  --button-color-background: transparent;
  --button-color-text: inherit;

  --button-font-size: inherit;
  --button-font-weight: inherit;
  --button-line-height: inherit;
  --button-text-decoration: underline;
}

.button-outline {
  --button-color-background: transparent;
  --button-color-text: var(--color-blue);
  --button-color-border: var(--color-blue);
}
</style>
