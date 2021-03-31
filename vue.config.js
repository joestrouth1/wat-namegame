const pwa = {
  name: 'The Name Game',
  themeColor: '#223547',
  msTileColor: '#2B4C68',
  manifestOptions: {
    short_name: 'Name Game',
    start_url: '/'
  },
  iconPaths: {
    faviconSVG: 'img/icons/favicon.svg',
    favicon32: 'img/icons/favicon-32x32.png',
    favicon16: 'img/icons/favicon-16x16.png',
    appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
    maskIcon: 'img/icons/favicon.svg',
    msTileImage: 'img/icons/msapplication-icon-144x144.png'
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
