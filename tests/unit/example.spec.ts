import { shallowMount } from '@vue/test-utils'
import HomePage from '@/views/HomePage.vue'

describe('Home Page', () => {
  it('renders instructions', () => {
    const wrapper = shallowMount(HomePage)
    wrapper.get('[data-testid="intro"]')
    expect(wrapper.text()).toMatch(/try matching/i)
  })
})
