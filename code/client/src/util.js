import { message } from 'antd'
import ONEUtil from '../../lib/util'

export default {
  handleError: (ex) => {
    console.trace(ex)
    const error = ex.response?.data?.error || ex.toString()
    const code = ex.response?.data?.code
    if (code === 0) {
      message.error('Relayer password is incorrect')
    } else if (code === 1) {
      message.error('Network is invalid')
    } else {
      message.error(`Connection Error: ${error}`)
    }
  },

  formatNumber: (number, maxPrecision) => {
    maxPrecision = maxPrecision || 5
    number = parseFloat(number)
    if (number < 10 ** (-maxPrecision)) {
      return '0'
    }
    const order = Math.ceil(Math.log10(Math.max(number, 1)))
    const digits = Math.max(0, maxPrecision - order)
    return number.toFixed(digits)
  },

  ellipsisAddress: (address) => {
    if (!address || address.length < 10) {
      return address
    }
    return address.slice(0, 6) + '...' + address.slice(address.length - 3, address.length - 1)
  },

  validBalance: (balance, allowFloat) => {
    if (typeof balance === 'number') { return true }
    if (typeof balance !== 'string') { return false }
    for (let i = 0; i < balance.length; i += 1) {
      const c = balance.charCodeAt(i)
      if (c < 48 || c > 57) {
        if (!allowFloat) {
          return false
        }
        if (c !== 46) {
          return false
        }
      }
    }
    return true
  },

  toBalance: (formatted, price) => {
    if (!exports.default.validBalance(formatted, true)) {
      return { balance: 0, formatted: '0', fiat: 0, fiatFormatted: '0', valid: false }
    }
    const f = parseFloat(formatted)
    const balance = ONEUtil.toFraction(f)
    const fiat = f * (price || 0)
    const fiatFormatted = exports.default.formatNumber(fiat)
    return { balance, formatted, fiat, fiatFormatted, valid: true }
  },

  computeBalance: (balance, price) => {
    if (!exports.default.validBalance(balance)) {
      return { balance: 0, formatted: '0', fiat: 0, fiatFormatted: '0', valid: false }
    }
    const ones = ONEUtil.toOne(balance || 0)
    const formatted = exports.default.formatNumber(ones)
    const fiat = (price || 0) * parseFloat(ones)
    const fiatFormatted = exports.default.formatNumber(fiat)
    return { balance, formatted, fiat, fiatFormatted, valid: true }
  }
}