import { createStore, Store } from 'vuex'

export interface Employee {
  id: string
  firstName: string
  lastName: string
  headshot: {
    url: string
  }
}

export interface ScoringGuess {
  dateCreated: Date
  employee: Employee
}

export interface ScoringRound {
  employees: {
    selected: Employee
    options: Employee[]
  }
  guesses: ScoringGuess[]
}

export interface State {
  employees: Employee[]
  rounds: ScoringRound[]
}

export default function createVuexStore (initialState?: Partial<State>): Store<State> {
  return createStore<State>({
    state: {
      employees: [],
      rounds: [],
      ...initialState
    },
    mutations: {
      setEmployees (state, employees) {
        state.employees = employees
      },
      setRounds (state, rounds) {
        state.rounds = rounds
      }
    },
    actions: {
      async getEmployees (context) {
        try {
          const data = await fetchEmployees()
          const trimmedData: Employee[] = data.map(employee => {
            const { id, firstName, lastName, headshot: { url } } = employee
            return { id, firstName, lastName, headshot: { url } }
          })
          context.commit('setEmployees', trimmedData)
        } catch (error) {
          console.error(error, 'Error fetching employee list')
        }
      },
      async createRounds ({ state, commit, dispatch }) {
        if (!state.employees.length) {
          await dispatch('getEmployees')
          dispatch('createRounds')
        } else {
          // randomize all employees
          const randomSortedEmployees = state.employees
            .map(e => ({ ...e, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(e => ({ ...e, sort: undefined }) as Employee)

          // group random employees in 5 sets of 6
          const employeeSets: Employee[][] = []
          for (let i = 0; i < 5; i++) {
            const startIndex = i * 6
            const endIndex = startIndex + 6
            const selectedEmployees = randomSortedEmployees.slice(startIndex, endIndex)
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
          commit('setRounds', rounds)
        }
      }
    }
  })
}

async function fetchEmployees (): Promise<Employee[]> {
  const response = await fetch('https://namegame.willowtreeapps.com/api/v1.0/profiles')
  const data = await response.json()
  return data
}
