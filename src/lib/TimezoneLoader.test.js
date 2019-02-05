/* eslint-env es6, node, jest */
import TimezoneLoader from './TimezoneLoader'

let timezoneLoader = null

describe('TimezoneLoader', () => {

  /*{{{*/beforeAll(() => {
    timezoneLoader = new TimezoneLoader({ useRealUrls: false })
  })/*}}}*/

  /*{{{*/describe('should have basic features', () => {

    /*{{{*/it('should be object', () => {
      expect(typeof timezoneLoader).toBe('object')
    })/*}}}*/

  })/*}}}*/

})
