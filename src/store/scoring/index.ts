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
import { nanoid } from 'nanoid'

import { State as RootState } from '@/store'
import { Employee, ActionTypes as EmployeeActionTypes } from '@/store/employees'

export interface ScoringGuess {
  id: string
  dateCreated: Date
  employee: Employee
  correct: boolean
}

export interface ScoringRound {
  id: string
  employees: {
    selected: Employee
    options: Employee[]
  }
  guesses: ScoringGuess[]
}

export interface FinalScore {
  correct: number
  total: number
  stats: {
    percentCorrect: number
    percentIncorrect: number
    avgSelectionTime: number
  }
}

export type State = {
  rounds: ScoringRound[],
  currentRoundId: string
}

const initialState: State = {
  rounds: [],
  currentRoundId: ''
}

// getters types
export type Getters = {
  allRounds(state: State): ScoringRound[]
  currentRound(state: State): ScoringRound | null
  lastGuess(
    state: State,
    getters: {
      currentRound: ReturnType<Getters['currentRound']>
    }
  ): ScoringGuess | null
  isGameComplete (state: State): boolean
  finalScore(state: State): FinalScore
}

// getters
export const getters: GetterTree<State, RootState> & Getters = {
  allRounds (state) {
    return state.rounds
  },
  currentRound (state) {
    const round = state.rounds.find(round => round.id === state.currentRoundId)
    return round ?? null
  },
  lastGuess (_state, { currentRound }) {
    if (!currentRound?.guesses?.length) return null

    const { guesses } = currentRound
    return guesses.reduce((mostRecent, nextGuess) => {
      if (nextGuess.dateCreated > mostRecent.dateCreated) return nextGuess
      return mostRecent
    }, currentRound.guesses[0])
  },
  isGameComplete (state) {
    if (!state.rounds.length) return false
    return state.rounds.every(round => {
      const hasGuesses = round.guesses.length > 0
      const hasCorrectGuess = round.guesses.some(guess => guess.correct)
      return hasGuesses && hasCorrectGuess
    })
  },
  finalScore (state) {
    const { rounds } = state
    const correct = rounds.reduce(
      (acc, next) => next.guesses.length === 1 ? ++acc : acc,
      0
    )
    const total = rounds.length

    const allGuesses = rounds.flatMap(({ guesses }) => guesses)
    const correctGuesses = allGuesses.filter(guess => guess.correct)
    const percentCorrect = correctGuesses.length / allGuesses.length
    const percentIncorrect = 1 - percentCorrect

    const sortedGuessTimestamps = allGuesses
      .map(({ dateCreated }) => Number(dateCreated))
      .sort((a, b) => a - b)
    const firstGuess = sortedGuessTimestamps.shift() as number
    const lastGuess = sortedGuessTimestamps.pop() as number
    const gameDurationInSeconds = (lastGuess - firstGuess) / 1000
    const avgSelectionTime = gameDurationInSeconds / allGuesses.length

    return {
      correct,
      total,
      stats: {
        avgSelectionTime,
        percentCorrect,
        percentIncorrect
      }
    }
  }
}

// resolved getters
type GettersMap = {
  [K in keyof Getters]: ReturnType<Getters[K]>
}

// mutations enums
export enum MutationTypes {
  SET_ROUNDS = 'SET_ROUNDS',
  SET_CURRENT_ROUND_ID = 'SET_CURRENT_ROUND_ID',
  ADD_GUESS = 'ADD_GUESS'
}

// Mutation contracts
export type Mutations<S = State> = {
  [MutationTypes.SET_ROUNDS](state: S, rounds: ScoringRound[]): void
  [MutationTypes.SET_CURRENT_ROUND_ID](state: S, roundId: string): void
  [MutationTypes.ADD_GUESS](state: S, payload: {
    roundId: ScoringRound['id'],
    guess: ScoringGuess
  }): void
}

// Define mutations
const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_ROUNDS] (state, rounds) {
    state.rounds = rounds
  },
  [MutationTypes.SET_CURRENT_ROUND_ID] (state, roundId) {
    state.currentRoundId = roundId
  },
  [MutationTypes.ADD_GUESS] (state, { roundId, guess }) {
    const targetRound = state.rounds.find(({ id }) => id === roundId)
    if (!targetRound) {
      console.error('Failed to save guess, unknown scoring round')
    } else {
      targetRound.guesses.push(guess)
    }
  }
}

// Action enums
export enum ActionTypes {
  CREATE_ROUNDS = 'CREATE_ROUNDS',
  CREATE_GUESS = 'CREATE_GUESS',
  ADVANCE_ROUND = 'ADVANCE_ROUND'
}

// Actions context
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit' | 'getters'> & {
  getters: GettersMap
}

// Actions contracts
export interface Actions {
  [ActionTypes.CREATE_ROUNDS](
    context: AugmentedActionContext
  ): Promise<void>
  [ActionTypes.CREATE_GUESS](
    context: AugmentedActionContext,
    payload: {
      employee: Employee
    }
  ): void,
  [ActionTypes.ADVANCE_ROUND](
    context: AugmentedActionContext
  ): void
}

// Define actions
export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.CREATE_ROUNDS] ({ commit, dispatch, rootState }) {
    if (!rootState.employees.list.length) {
      await dispatch(EmployeeActionTypes.GET_EMPLOYEES)
      dispatch(ActionTypes.CREATE_ROUNDS)
    } else {
      // randomize all employees
      const randomSortedEmployees = rootState.employees.list
        .map(e => ({ ...e, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ sort, ...rest }) => ({ ...rest }) as Employee)

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
          id: nanoid(),
          employees: {
            selected: options[Math.floor(Math.random() * options.length)],
            options
          },
          guesses: []
        }
      })
      commit(MutationTypes.SET_ROUNDS, rounds)
      commit(MutationTypes.SET_CURRENT_ROUND_ID, rounds[0].id)
    }
  },
  [ActionTypes.CREATE_GUESS] ({ commit, getters }, { employee }) {
    const currentRound = getters.currentRound
    if (!currentRound) {
      console.error('Failed to create guess, no current scoring round')
    } else {
      const { id, employees, guesses } = currentRound

      const employeeAlreadyGuessed = guesses.some(guess => guess.employee.id === id)
      const roundAlreadyCompleted = guesses.some(guess => guess.correct)
      if (employeeAlreadyGuessed || roundAlreadyCompleted) return

      const newGuess: ScoringGuess = {
        id: nanoid(),
        correct: employee.id === employees.selected.id,
        dateCreated: new Date(),
        employee
      }
      commit(MutationTypes.ADD_GUESS, { roundId: id, guess: newGuess })
    }
  },
  [ActionTypes.ADVANCE_ROUND] ({ commit, state }) {
    const newRound = state.rounds.find(round => {
      const isRoundNew = round.guesses.length === 0
      const isRoundIncomplete =
        round.guesses.length > 0 &&
        round.guesses.every(guess => !guess.correct)
      return isRoundNew || isRoundIncomplete
    })
    if (!newRound) {
      return console.error('Failed to advance round: all rounds complete')
    } else {
      commit(MutationTypes.SET_CURRENT_ROUND_ID, newRound.id)
    }
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
  getters: GettersMap
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
