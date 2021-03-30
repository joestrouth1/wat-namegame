import { createStore, createLogger } from 'vuex'
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

export const store = createStore({
  plugins:
    process.env.NODE_ENV === 'production'
      ? []
      : [createLogger()],
  modules: {
    employees: EmployeesModule,
    scoring: ScoringModule
  }
})

export function useStore (): Store {
  return store as Store
}
