const { ManagerGeolocation } = require('homey')

module.exports = () => {
  return {
    lat: ManagerGeolocation.getLatitude() || 59.2512,
    lon: ManagerGeolocation.getLongitude() || 10.3605,
    accuracy: ManagerGeolocation.getAccuracy()
  }
}
