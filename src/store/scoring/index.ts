import {
  ActionContext,
  ActionTree,
  GetterTree,
  MutationTree,
  Module,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions
} from 'vuex'

import { State as RootState } from '@/store'
import { Employee, ActionTypes as EmployeeActionTypes } from '@/store/employees'

export interface ScoringGuess {
  dateCreated: Date
  employee: Employee
  correct: boolean
}

export interface ScoringRound {
  employees: {
    selected: Employee
    options: Employee[]
  }
  guesses: ScoringGuess[]
}

export type State = {
  rounds: ScoringRound[]
}

const initialState: State = {
  rounds: []
}

// mutations enums
export enum MutationTypes {
  SET_ROUNDS = 'SET_ROUNDS',
}

// Mutation contracts
export type Mutations<S = State> = {
  [MutationTypes.SET_ROUNDS](state: S, rounds: ScoringRound[]): void
}

// Define mutations
const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_ROUNDS] (state: State, rounds: ScoringRound[]) {
    state.rounds = rounds
  }
}

// Action enums
export enum ActionTypes {
  CREATE_ROUNDS = 'CREATE_ROUNDS',
  TEST_ACTION = 'TEST_ACTION'
}

// Actions context
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

// Actions contracts
export interface Actions {
  [ActionTypes.CREATE_ROUNDS](
    context: AugmentedActionContext
  ): Promise<void>
  [ActionTypes.TEST_ACTION](
    context: AugmentedActionContext,
    payload: { sample: Date }
  ): void
}

// Define actions
export const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.TEST_ACTION] (context, payload) {
    console.log(payload)
  },
  async [ActionTypes.CREATE_ROUNDS] ({ commit, dispatch, rootState }) {
    if (!rootState.employees.list.length) {
      await dispatch(EmployeeActionTypes.GET_EMPLOYEES)
      dispatch(ActionTypes.CREATE_ROUNDS)
    } else {
      // randomize all employees
      const randomSortedEmployees = rootState.employees.list
        .map(e => ({ ...e, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(e => ({ ...e, sort: undefined }) as Employee)

      // group random employees in 5 sets of 6
      const employeeSets: Employee[][] = []
      for (let i = 0; i < 5; i++) {
        const startIndex = i * 6
        const endIndex = startIndex + 6
        const selectedEmployees = randomSortedEmployees
          .slice(startIndex, endIndex)
        employeeSets.push(selectedEmployees)
      }

      const rounds: ScoringRound[] = employeeSets.map(options => {
        return {
          employees: {
            selected: options[Math.floor(Math.random() * options.length)],
            options
          },
          guesses: []
        }
      })
      commit(MutationTypes.SET_ROUNDS, rounds)
    }
  }
}

// getters types
export type Getters = {
  allRounds(state: State): ScoringRound[]
}

// getters
export const getters: GetterTree<State, RootState> & Getters = {
  allRounds: (state) => {
    return state.rounds
  }
}

// setup store type
export type Store<S = State> = Omit<
  VuexStore<S>,
  'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>,
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    options?: DispatchOptions
  ): ReturnType<Actions[K]>,
}

export const ScoringModule: Module<State, RootState> = {
  state: initialState,
  mutations,
  actions,
  getters
}
