/* eslint-env es6, node, jest */
import TimezoneLoader from './TimezoneLoader'

let pageLoader

describe('TimezoneLoader', () => {

  /*{{{*/beforeAll(() => {
    pageLoader = new TimezoneLoader({ useRealUrls: false })
  })/*}}}*/

  /*{{{*/describe('should have basic features', () => {

    /*{{{*/it('should be object', () => {
      expect(typeof pageLoader).toBe('object');
    })/*}}}*/

    // /*{{{*/it('should have fetchUrl private method', () => {
    //   expect(typeof (pageLoader as any).fetchUrl).toBe('function');
    // })/*}}}*/
    //
    // /*{{{*/it('should have loadPage method', () => {
    //   expect(typeof pageLoader.loadPage).toBe('function');
    // })/*}}}*/

  })/*}}}*/

})
