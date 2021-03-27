<template>
  <div class="play page">
    <site-header back />
    <main class="main">
      Content
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SiteHeader from '@/components/SiteHeader/SiteHeader.vue'

export default defineComponent({
  name: 'Play',
  components: {
    SiteHeader
  }
})
</script>

<style lang="scss" scoped>
.main {
  --main-padding-top: var(--size-40);
  --main-padding-bottom: var(--size-40);
  --main-padding-left: var(--size-16);
  --main-padding-right: var(--size-16);
  @supports (padding-top: env(safe-area-inset-top)) {
    --main-padding-top: max(env(safe-area-inset-top), var(--size-40));
    --main-padding-bottom: max(env(safe-area-inset-bottom), var(--size-40));
    --main-padding-left: max(env(safe-area-inset-left), var(--size-16));
    --main-padding-right: max(env(safe-area-inset-right), var(--size-16));
  }

  padding: var(--main-padding-top) var(--main-padding-right)
    var(--main-padding-bottom) var(--main-padding-left);
}
</style>
