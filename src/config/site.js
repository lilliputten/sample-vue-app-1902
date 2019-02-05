/* eslint-env commonjs, browser, node */

const GOOGLE_API_KEY = '--UNDEFINED--'

const USE_STUB_URLS = true

const siteConfig = {

  // GOOGLE_API_KEY,
  // USE_STUB_URLS,

  stubCities: [
    'Moscow',
    'New York',
  ],

  getCoordsRealUrl: ({city}) => `https://geocode-maps.yandex.ru/1.x/?geocode=${city}&format=json&results=1`,
  getCoordsStubUrl: ({city}) => `/api-samples/yandex-${city}.json`,

  // eslint-disable-next-line no-unused-vars
  getTimezoneRealUrl: ({city, lat, lon, timestamp}) => `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=${timestamp}&key=${GOOGLE_API_KEY}`,
  getTimezoneStubUrl: ({city}) => `/api-samples/google-${city}.json`,

}

// Make urls depends on USE_STUB_URLS value...
siteConfig.getCoordsUrl = USE_STUB_URLS ? siteConfig.getCoordsStubUrl : siteConfig.getCoordsRealUrl
siteConfig.getTimezoneUrl = USE_STUB_URLS ? siteConfig.getTimezoneStubUrl : siteConfig.getTimezoneRealUrl

export default siteConfig

