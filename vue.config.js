const pwa = {
  name: 'The Name Game',
  themeColor: '#223547',
  msTileColor: '#2B4C68',
  manifestOptions: {
    short_name: 'Name Game',
    start_url: '/'
  }
}

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const config = {
  publicPath: '/',
  integrity: true,
  pwa
}

module.exports = config
