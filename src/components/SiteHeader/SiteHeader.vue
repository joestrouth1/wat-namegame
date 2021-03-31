<template>
  <header class="header">
    <nav :class="{ nav: true, back }">
      <site-button
        v-if="back"
        aria-label="Back"
        variant="link"
        @click="$router.back()"
        class="back-button"
      >
        <img src="@/assets/icons/arrow-left.svg" alt="Back" />
      </site-button>
      <router-link to="/" class="link">
        <img src="@/assets/wordmark.svg" alt="The Name Game" class="wordmark" />
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import SiteButton from '../SiteButton/SiteButton.vue'

export default defineComponent({
  name: 'SiteHeader',
  props: {
    back: Boolean
  },
  components: {
    RouterLink,
    SiteButton
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/breakpoints";

.header {
  --header-color-background: var(--color-blue-dark);

  background-color: var(--header-color-background);

  padding: var(--header-padding);
}

.nav {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: var(--size-16) var(--size-32);

  &.back {
    padding: var(--size-8);
    padding-right: var(--size-24);
    justify-content: flex-start;
    * + * {
      margin-left: var(--size-8);
    }
  }
}

.back-button {
  --button-padding-horizontal: var(--size-8);
  --button-padding-vertical: var(--size-8);

  color: white;
  text-decoration: none;
}

.link {
  line-height: 1;
}

.wordmark {
  max-width: 100%;
  height: auto;
}
</style>
