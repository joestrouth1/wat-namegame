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

import { fetchEmployees } from './api'
import { State as RootState } from '@/store'

export interface Employee {
  id: string
  firstName: string
  lastName: string
  headshot: {
    url: string
  }
}

export type State = {
  list: Employee[]
}

const initialState: State = {
  list: []
}

// mutations enums
export enum MutationTypes {
  SET_EMPLOYEES = 'SET_EMPLOYEES',
}

// Mutation contracts
export type Mutations<S = State> = {
  [MutationTypes.SET_EMPLOYEES](state: S, employees: Employee[]): void
}

// Define mutations
const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_EMPLOYEES] (state: State, employees: Employee[]) {
    state.list = employees
  }
}

// Action enums
export enum ActionTypes {
  GET_EMPLOYEES = 'GET_EMPLOYEES',
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
  [ActionTypes.GET_EMPLOYEES](
    { commit }: AugmentedActionContext
  ): Promise<void>
}

// Define actions
export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.GET_EMPLOYEES] ({ commit }) {
    try {
      const data = await fetchEmployees()
      const trimmedData: Employee[] = data
        .filter(employee => !!employee.headshot.url)
        .map(employee => {
          const { id, firstName, lastName, headshot: { url } } = employee
          return { id, firstName, lastName, headshot: { url } }
        })
      commit(MutationTypes.SET_EMPLOYEES, trimmedData)
    } catch (error) {
      console.error(error, 'Error fetching employee list')
    }
  }
}

// getters types
export type Getters = {
  allEmployees(state: State): Employee[]
}

// getters
export const getters: GetterTree<State, RootState> & Getters = {
  allEmployees: (state) => {
    return state.list
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

export const EmployeesModule: Module<State, RootState> = {
  state: initialState,
  mutations,
  actions,
  getters
}
