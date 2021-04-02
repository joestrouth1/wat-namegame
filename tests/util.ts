import router from '@/router'
import { Router } from 'vue-router'

export async function startRouter (url = '/'): Promise<Router> {
  router.push(url)
  await router.isReady()
  return router
}
