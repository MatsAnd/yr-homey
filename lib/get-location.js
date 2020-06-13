const { ManagerGeolocation } = require('homey')

module.exports = () => {
  return {
    lat: ManagerGeolocation.getLatitude() || 59.2662,
    lon: ManagerGeolocation.getLongitude() || 10.4051,
    accuracy: ManagerGeolocation.getAccuracy()
  }
}
