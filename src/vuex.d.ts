/* eslint-disable */
import { ComponentCustomProperties } from 'vue'
import { Store, State } from '@/store'
/* eslint-enable */

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store
  }
}
