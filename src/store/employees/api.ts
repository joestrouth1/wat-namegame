import { Employee } from '@/store/employees'

export async function fetchEmployees (): Promise<Employee[]> {
  const response = await fetch('https://namegame.willowtreeapps.com/api/v1.0/profiles')
  const data = await response.json()
  return data
}
