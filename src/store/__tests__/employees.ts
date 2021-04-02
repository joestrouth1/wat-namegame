import { createStoreInstance } from '@/store'
import { ActionTypes } from '@/store/employees'

jest.mock('../employees/api')

describe('Employees module', () => {
  let store: ReturnType<typeof createStoreInstance>

  beforeEach(() => {
    store = createStoreInstance()
  })

  it('Saves employees to state', async () => {
    await store.dispatch(ActionTypes.GET_EMPLOYEES)

    expect(store.state.employees.list.length).toBeGreaterThan(0)
  })
})
