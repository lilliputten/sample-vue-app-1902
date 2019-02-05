
class DataLoader {

  // Core loaders...

  /** fetchUrl ** {{{ Load app data
   * @param {string} url
   * @return {Promise<Response>}
   */
  fetchUrl(url) {

    return new Promise((resolve, reject) => {
      try {
        return fetch(url)
          .then((res) => {
            if (!res || res.status !== 200) {
              // eslint-disable-next-line no-console
              console.error('App:fetchUrl error (invalid response status)', res)
              debugger // eslint-disable-line no-debugger
              return reject(res)
            } else {
              resolve(res)
            }
          })
          .catch(reject)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('App:fetchUrl error (catch)', err)
        debugger // eslint-disable-line no-debugger
        return reject(err)
      }
    })

  }/*}}}*/

  /** loadJson ** {{{
   * @param {string} string
   * @return {Promise<any>}
   */
  loadJson(url) {

    return new Promise((resolve, reject) => {

      this.fetchUrl(url)
        .then((res) => {
          res.json()
            .then(resolve)
            .catch(reject)
        })
        .catch(reject)

    })

  }/*}}}*/
  /** loadJsonObject ** {{{ Load standard object and control `error` property
   * @param {string} url
   * @return {Promise<object>}
   */
  loadJsonObject(url) {

    return new Promise((resolve, reject) => {

      this.loadJson(url)
        .then((data) => {
          if (!data || typeof data !== 'object') {
            const err = 'DataLoader:loadJsonObject invalid response json returned (object expected)'
            // eslint-disable-next-line no-console
            console.error(err, data)
            debugger // eslint-disable-line no-debugger
            return reject(err)
          } else if (data.error) {
            const err = 'DataLoader:loadJsonObject error returned'
            // eslint-disable-next-line no-console
            console.error(err, data.error)
            debugger // eslint-disable-line no-debugger
            return reject([ err, data.error ])
          } else {
            // Success!
            resolve(data.result)
          }
        })
        .catch(reject)

    })

  }/*}}}*/

}

export default DataLoader
