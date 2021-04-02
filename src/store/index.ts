import { createStore, createLogger, Store as VuexStore } from 'vuex'
import {
  EmployeesModule,
  Store as EmployeesStore,
  State as EmployeesState
} from '@/store/employees'
import {
  ScoringModule,
  Store as ScoringStore,
  State as ScoringState
} from '@/store/scoring'

export type State = {
  employees: EmployeesState,
  scoring: ScoringState
}

export type Store = EmployeesStore<Pick<State, 'employees'>> &
  ScoringStore<Pick<State, 'scoring'>>

export const createStoreInstance = (): VuexStore<State> => createStore({
  plugins:
    process.env.NODE_ENV === 'development'
      ? [createLogger()]
      : [],
  modules: {
    employees: EmployeesModule,
    scoring: ScoringModule
  }
})

export const store = createStoreInstance()

export function useStore (): Store {
  return store as Store
}
