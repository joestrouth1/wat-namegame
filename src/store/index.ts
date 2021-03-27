import { createStore } from 'vuex'

interface Employee {
  id: string
  firstName: string
  lastName: string
  headshot: {
    url: string
  }
}

interface ScoringGuess {
  dateCreated: Date
  employee: Employee
}

interface ScoringRound {
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

export default createStore<State>({
  state: {
    employees: [],
    rounds: []
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
    getEmployees (context) {
      fetchEmployees().then(data => {
        context.commit('setEmployees', data)
      }).catch(error => {
        console.error(error, 'Error fetching employee list')
      })
    }
  }
})

async function fetchEmployees (): Promise<Employee[]> {
  const response = await fetch('https://namegame.willowtreeapps.com/api/v1.0/profiles')
  const data = await response.json()
  return data
}
