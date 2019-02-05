/* eslint-env commonjs, browser, node */

const GOOGLE_API_KEY = '--UNDEFINED--'

const useRealUrls = false

const siteConfig = {

  // GOOGLE_API_KEY,
  useRealUrls,

  // Demo cities for corresponding data (see stub request urls below)
  stubCities: [
    'Moscow',
    'New York',
  ],

  coordsRealUrl: ({city}) => `https://geocode-maps.yandex.ru/1.x/?geocode=${city}&format=json&results=1`,
  coordsStubUrl: ({city}) => `/api-samples/yandex-${city}.json`,

  // eslint-disable-next-line no-unused-vars
  timezoneRealUrl: ({city, lat, lon, timestamp}) => `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=${timestamp}&key=${GOOGLE_API_KEY}`,
  timezoneStubUrl: ({city}) => `/api-samples/google-${city}.json`,

}

export default siteConfig
