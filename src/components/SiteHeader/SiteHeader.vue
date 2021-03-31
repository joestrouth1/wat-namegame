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
      <div class="link-container">
        <router-link to="/" class="link">
          <img
            src="@/assets/wordmark.svg"
            alt="The Name Game"
            class="wordmark"
          />
        </router-link>
      </div>
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
  --nav-padding-vertical: var(--size-16);
  --nav-padding-left: var(--size-32);
  --nav-padding-right: var(--size-32);

  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto 1fr;
  justify-items: stretch;
  align-items: center;
  padding: var(--nav-padding-vertical) var(--nav-padding-right)
    var(--nav-padding-vertical) var(--nav-padding-left);

  @media (min-width: $tablet) {
    --nav-padding-vertical: var(--size-32);
  }

  .link-container {
    grid-row: 1;
    grid-column: 1/3;
    line-height: 1;
    text-align: center;
  }

  &.back {
    --nav-padding-vertical: var(--size-8);
    --nav-padding-left: var(--size-8);
    --nav-padding-right: var(--size-24);
    justify-content: flex-start;

    @media (max-width: $mobile) {
      * + * {
        margin-left: var(--size-8);
      }
      .link-container {
        grid-column: 2/3;
      }
    }
    @media (min-width: $tablet) {
      --nav-padding-left: var(--size-24);
      --nav-padding-vertical: var(--size-32);
    }
  }
}

.back-button {
  --button-padding-horizontal: var(--size-8);
  --button-padding-vertical: var(--size-8);

  grid-column: 1/2;
  grid-row: 1;
  color: white;
  text-decoration: none;
}

.wordmark {
  max-width: 100%;
  height: auto;
}
</style>
