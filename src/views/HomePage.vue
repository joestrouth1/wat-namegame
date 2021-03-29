<template>
  <main class="home page">
    <h1 class="title">
      <SiteLogo class="logo" />
    </h1>
    <div class="content">
      <p class="intro" data-testid="intro">
        Try matching the WillowTree Employee to their photo
      </p>
      <SiteButton element="router-link" to="/play">Play!</SiteButton>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SiteLogo from '@/components/SiteLogo/SiteLogo.vue'
import SiteButton from '@/components/SiteButton/SiteButton.vue'

export default defineComponent({
  name: 'HomePage',
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
  --home-padding-left: var(--size-16);
  --home-padding-right: var(--size-16);

  --home-color-background: var(--color-blue-dark);
  --home-color-text: white;

  display: grid;
  grid-template-areas:
    "."
    "title"
    "content"
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

.title {
  grid-area: title;
  margin: 0;
}
.logo {
  max-width: 29rem;
  transform: scale(1.15);
}

.content {
  font-size: var(--size-20);
  font-weight: var(--font-weight-medium);
  line-height: var(--size-24);
  text-align: center;
  color: white;

  transform: translateY(calc(var(--size-24) * -1));

  grid-area: content;
  display: flex;
  flex-flow: column nowrap;
  gap: var(--size-24);
}

.intro {
  padding: 0 var(--size-40);
}
</style>
