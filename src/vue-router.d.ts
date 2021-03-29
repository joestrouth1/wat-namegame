// eslint-disable-next-line
import * as VueRouter from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}
