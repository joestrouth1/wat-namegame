import { mount, shallowMount, flushPromises } from '@vue/test-utils'
import HomePage from '@/views/HomePage.vue'
import { startRouter } from '../util'

describe('Home Page', () => {
  it('has an H1', () => {
    const wrapper = shallowMount(HomePage)
    const headings = wrapper.findAll('h1')

    expect(headings).toHaveLength(1)
    expect(headings[0].isVisible()).toBe(true)
  })

  it('renders instructions', () => {
    const wrapper = shallowMount(HomePage)
    const intro = wrapper.get('[data-testid="intro"]')

    expect(intro.text()).toMatch(/try matching/i)
  })

  it('navigates when CTA is pressed', async () => {
    const router = await startRouter()
    const wrapper = mount(HomePage, {
      global: {
        plugins: [router]
      }
    })
    const cta = wrapper.get('[data-testid="play-link"')

    await cta.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.path).toEqual('/play')
  })
})
