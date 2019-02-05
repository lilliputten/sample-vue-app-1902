/* eslint-disable no-debugger, no-console */
import DataLoader from './DataLoader'

import { site as siteConfig } from '../config'

class TimezoneLoader extends DataLoader {

  /** getErrorText ** {{{
   * @param {string} msg
   * @param {*} err
   * @return {string}
   */
  getErrorText(msg, err) {
    let result
    if (typeof err !== 'object') {
      result = String(err)
    } else if (err.errorMessage) {
      result = err.errorMessage
      if (err.status) {
        result += ` (${err.status})`
      }
    }
    // else: JSON.stringify(err) ???
    if (msg && result) {
      result = `${msg}: ${result}`
    }
    return result || msg
  }/*}}}*/

  /** getCoords ** {{{
   * @param {object} props
   * @param {string} props.city
   * @return {Promise<{ lat: number, lon: number }>}
   */
  getCoords(props) {

    return new Promise((resolve, reject) => {

      let url = siteConfig.getCoordsUrl
      if (typeof url === 'function') {
        url = url(props)
      }

      this.loadJson(url)
        .then((data) => {
          const pos = data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.Point?.pos
          const posList = pos && typeof pos === 'string' && pos.trim().split(' ').map((s) => Number(s))
          if (!Array.isArray(posList) || posList.length !== 2) {
            const errMsg = 'TimezoneLoader:getCoords invalid coordinates (Yandex API) data returned'
            const err = this.getErrorText(errMsg, data)
            // eslint-disable-next-line no-console
            console.error(errMsg, data)
            debugger; // eslint-disable-line no-debugger
            return reject(err)
          } else {
            // Success!
            const [ lon, lat ] = posList;
            const coords = { lat, lon }
            return resolve(coords)
          }
        })
        .catch(reject)

    })

  }/*}}}*/

  /** getTimezone ** {{{
   * @param {object} props
   * @param {string} props.city
   * @param {number} props.lat
   * @param {number} props.lon
   * @param {number} [props.timestamp=Date.now()]
   * @return {Promise<{ id: string, name: string }>}
   */
  getTimezone(props) {

    return new Promise((resolve, reject) => {

      // Add timestamp if absent (required by Google API?)
      if (!props.timestamp) {
        const timestamp = Math.round(Date.now() / 1000 )
        props = Object.assign({ timestamp }, props)
      }

      let url = siteConfig.getTimezoneUrl
      if (typeof url === 'function') {
        url = url(props)
      }

      this.loadJson(url)
        .then((data) => {
          if (typeof data !== 'object' || !data.timeZoneId) {
            const errMsg = 'TimezoneLoader:getCoords invalid timezone (Google API) data returned'
            const err = this.getErrorText(errMsg, data)
            // eslint-disable-next-line no-console
            console.error(errMsg, data)
            debugger; // eslint-disable-line no-debugger
            return reject(err)
          } else {
            // Success!
            // eslint-disable-next-line no-unused-vars
            const { timeZoneId, timeZoneName } = data
            const timezoneData = { id: timeZoneId.trim(), name: timeZoneName.trim() }
            return resolve(timezoneData)
          }
        })
        .catch(reject)

    })

  }/*}}}*/

  /** loadTimezone ** {{{
   * @param {object} props
   * @param {string} props.city
   * @return {Promise<{ timeZoneId: string, timeZoneName: string }>}
   */
  async loadTimezone(props) {
    const coords = await this.getCoords(props)
    const timezoneProps = Object.assign({}, coords, props)
    const timezoneData = await this.getTimezone(timezoneProps)
    return timezoneData
  }/*}}}*/

}

export default TimezoneLoader
