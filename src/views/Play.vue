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
