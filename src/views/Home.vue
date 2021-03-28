<template>
  <div class="home page">
    <site-logo class="logo" />
    <main class="main">
      <p class="intro">Try matching the WillowTree Employee to their photo</p>
      <site-button element="router-link" to="/play">Play!</site-button>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SiteLogo from '@/components/SiteLogo/SiteLogo.vue'
import SiteButton from '@/components/SiteButton/SiteButton.vue'

export default defineComponent({
  name: 'Home',
  components: {
    SiteLogo,
    SiteButton
  }
})
</script>

<style lang="scss" scoped>
.home {
  --home-padding-top: var(--size-40);
  --home-padding-bottom: var(--size-40);
  --home-padding-left: var(--size-40);
  --home-padding-right: var(--size-40);
  @supports (padding-top: env(safe-area-inset-top)) {
    --home-padding-top: max(env(safe-area-inset-top), var(--size-40));
    --home-padding-bottom: max(env(safe-area-inset-bottom), var(--size-40));
    --home-padding-left: max(env(safe-area-inset-left), var(--size-16));
    --home-padding-right: max(env(safe-area-inset-right), var(--size-16));
  }

  --home-color-background: var(--color-blue-dark);
  --home-color-text: white;

  display: grid;
  grid-template-areas:
    "."
    "logo"
    "main"
    ".";
  grid-template-rows: 1fr auto auto 1fr;
  grid-template-columns: 1fr;
  justify-items: center;
  min-height: 100%;
  overflow-x: hidden;

  padding: var(--home-padding-top) var(--home-padding-right)
    var(--home-padding-bottom) var(--home-padding-left);

  background-color: var(--home-color-background);
  color: var(--home-color-text);
}

.logo {
  grid-area: logo;
  transform: scale(1.15);
  max-width: 29rem;
}

.main {
  font-size: var(--size-20);
  font-weight: var(--font-weight-medium);
  line-height: var(--size-24);
  text-align: center;
  color: white;

  transform: translateY(calc(var(--size-24) * -1));

  grid-area: main;
  display: flex;
  flex-flow: column nowrap;
  gap: var(--size-24);
}

.intro {
  padding: 0 var(--size-40);
}
</style>
